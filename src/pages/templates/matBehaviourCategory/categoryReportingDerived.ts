import type { CategoryMappingRow } from './categoryMappingTable';
import type { CategoryReportingRow } from './categoryReportingTable';
import {
  ARBOR_CATEGORY_DESCRIPTIONS,
  getCategorySentiment,
  getCategorySortIndex,
} from './categoryMetadata';

const NO_CATEGORY = 'No category';
const NO_CATEGORY_DESCRIPTION = 'Unmapped behaviour types not yet assigned to an Arbor category.';

interface ReportingAccumulator {
  category: string;
  incidents: number;
  pupilsInvolved: number;
  pupilPopulation: number;
  schoolsWithIncidents: Set<string>;
  incidentsBySchool: Map<string, number>;
  latestRecordedIso: string;
  latestRecordedDisplay: string;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function roundPercent(value: number): number {
  return Math.round(value * 10) / 10;
}

function hashString(s: string): number {
  let hash = 0;

  for (let i = 0; i < s.length; i++) {
    hash = Math.imul(31, hash) + s.charCodeAt(i);
  }

  return Math.abs(hash);
}

function estimateSchoolPopulation(school: string): number {
  return 420 + (hashString(school) % 780);
}

function estimatePupilsInvolved(school: string, category: string, incidents: number): number {
  if (incidents <= 0) return 0;

  const repeatIncidentFactor = 0.42 + (hashString(`${school}:${category}`) % 22) / 100;
  return Math.max(1, Math.min(incidents, Math.round(incidents * repeatIncidentFactor)));
}

function findHighestSchool(incidentsBySchool: ReadonlyMap<string, number>): string {
  let highestSchool = '';
  let highestIncidents = -1;

  for (const [school, incidents] of incidentsBySchool) {
    if (incidents > highestIncidents || (incidents === highestIncidents && school < highestSchool)) {
      highestSchool = school;
      highestIncidents = incidents;
    }
  }

  return highestSchool;
}

function buildReportingRow(
  accumulator: ReportingAccumulator,
  totalIncidents: number,
): CategoryReportingRow {
  const isNoCategory = accumulator.category === NO_CATEGORY;

  return {
    id: slugify(accumulator.category),
    category: accumulator.category,
    sentiment: isNoCategory ? 'Unmapped' : getCategorySentiment(accumulator.category),
    description: isNoCategory
      ? NO_CATEGORY_DESCRIPTION
      : ARBOR_CATEGORY_DESCRIPTIONS[accumulator.category] ?? '',
    incidents: accumulator.incidents,
    percentOfAll: totalIncidents > 0 ? roundPercent((accumulator.incidents / totalIncidents) * 100) : 0,
    schoolsWithIncidents: accumulator.schoolsWithIncidents.size,
    pupilsInvolved: accumulator.pupilsInvolved,
    ratePer100Pupils:
      accumulator.pupilPopulation > 0
        ? roundPercent((accumulator.pupilsInvolved / accumulator.pupilPopulation) * 100)
        : 0,
    highestSchool: findHighestSchool(accumulator.incidentsBySchool),
    lastRecorded: accumulator.latestRecordedDisplay,
  };
}

export function buildCategoryReportingRows(mappedRows: CategoryMappingRow[]): CategoryReportingRow[] {
  const accumulators = new Map<string, ReportingAccumulator>();
  let totalIncidents = 0;

  for (const row of mappedRows) {
    const category = row.behaviourCategory.trim() || NO_CATEGORY;
    const incidents = row.usedInIncidents ?? 0;
    totalIncidents += incidents;

    let accumulator = accumulators.get(category);
    if (!accumulator) {
      accumulator = {
        category,
        incidents: 0,
        pupilsInvolved: 0,
        pupilPopulation: 0,
        schoolsWithIncidents: new Set<string>(),
        incidentsBySchool: new Map<string, number>(),
        latestRecordedIso: '',
        latestRecordedDisplay: '',
      };
      accumulators.set(category, accumulator);
    }

    accumulator.incidents += incidents;
    accumulator.incidentsBySchool.set(
      row.school,
      (accumulator.incidentsBySchool.get(row.school) ?? 0) + incidents,
    );

    if (incidents > 0) {
      if (!accumulator.schoolsWithIncidents.has(row.school)) {
        accumulator.pupilPopulation += estimateSchoolPopulation(row.school);
      }

      accumulator.schoolsWithIncidents.add(row.school);
      accumulator.pupilsInvolved += estimatePupilsInvolved(row.school, category, incidents);
    }

    if (!accumulator.latestRecordedIso || row.lastUpdatedIso > accumulator.latestRecordedIso) {
      accumulator.latestRecordedIso = row.lastUpdatedIso;
      accumulator.latestRecordedDisplay = row.lastUpdated;
    }
  }

  return [...accumulators.values()]
    .sort((a, b) => {
      if (a.category === NO_CATEGORY) return 1;
      if (b.category === NO_CATEGORY) return -1;
      return getCategorySortIndex(a.category) - getCategorySortIndex(b.category);
    })
    .map((accumulator) => buildReportingRow(accumulator, totalIncidents));
}

