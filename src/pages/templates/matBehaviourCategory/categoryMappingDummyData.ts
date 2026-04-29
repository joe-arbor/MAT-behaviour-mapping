import type { CategoryMappingRow, CategoryReportingSlice } from './categoryMappingTable';

/** Deterministic PRNG (mulberry32) so rows stay stable across reloads. */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace<T>(arr: T[], rng: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = tmp;
  }
  return arr;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatUkDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const UK_SCHOOLS = [
  "St Mary's CofE Primary Academy, Bradford",
  'Riverside Academy Secondary School',
  'Oakwood Community School',
  'Meadowbrook Primary School',
  'Kingscliffe Grammar School',
  'Whitmore High School',
  'Greenfield Academy Trust — Ash Campus',
  'Park View Secondary College',
  'Elmstead Junior School',
  'Northgate Comprehensive School',
  'Hollybrook Infant & Nursery School',
  'Castle Hill Academy',
] as const;

/** Pool ≥24 labels; each school samples 18–24 distinct types without replacement. */
const BEHAVIOUR_TYPE_POOL = [
  'Chewing gum',
  'Incorrect uniform / PE kit',
  'Late to lesson',
  'Missing homework',
  'Disruption in class',
  'Refusal to follow instructions',
  'Inappropriate language',
  'Using mobile phone in lesson',
  'Physical altercation',
  'Verbal abuse towards staff',
  'Verbal abuse towards peer',
  'Unauthorised absence (truancy)',
  'Vaping on site',
  'Smoking on site',
  'Damage to school property',
  'Bullying — physical',
  'Bullying — verbal / social',
  'Discriminatory language',
  'Leaving classroom without permission',
  'Eating in unauthorised areas',
  'Plagiarism / copying',
  'Dishonesty / lying',
  'Rough play',
  'Persistent talking over others',
  'Failure to attend detention',
  'Swearing',
  'Interrupting learning',
  'Failure to bring correct equipment',
  'Lateness to school',
  'Inappropriate use of social media',
  'Fighting',
  'Throwing objects',
  'Defiance / non-compliance',
  'Cyberbullying',
  'Truancy from lesson',
  'Homophobic language',
  'Sexist language',
  'Racist language',
] as const;

const STAFF_NAMES = [
  'Sarah Mitchell',
  'James Okonkwo',
  'Priya Sharma',
  'David Hughes',
  'Emma Thompson',
  'Mohammed Ali',
  'Rachel Foster',
  'Tom Davies',
  'Aisha Rahman',
  "Chris O'Brien",
  'Lucy Chen',
  'Daniel Wright',
  'Hannah Patel',
  'Michael Fraser',
  'Sophie Campbell',
  'Oliver Grant',
  'Fatima Zahra',
  'Jack Morrison',
  'Rebecca Lewis',
  'Andrew Singh',
] as const;

export const REPORTING_YEAR_GROUPS = [
  'Reception',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
  'Year 7',
  'Year 8',
  'Year 9',
  'Year 10',
  'Year 11',
] as const;

export const REPORTING_STUDENT_GROUPS = [
  'Pupil premium',
  'SEN / SEND',
  'FSM',
  'EAL',
] as const;

const SEVERITY_BY_BEHAVIOUR_TYPE: Partial<Record<(typeof BEHAVIOUR_TYPE_POOL)[number], number>> = {
  'Chewing gum': -1,
  'Incorrect uniform / PE kit': -1,
  'Late to lesson': -1,
  'Missing homework': -1,
  'Disruption in class': -2,
  'Refusal to follow instructions': -2,
  'Inappropriate language': -2,
  'Using mobile phone in lesson': -1,
  'Physical altercation': -5,
  'Verbal abuse towards staff': -4,
  'Verbal abuse towards peer': -3,
  'Unauthorised absence (truancy)': -3,
  'Vaping on site': -3,
  'Smoking on site': -2,
  'Damage to school property': -4,
  'Bullying — physical': -5,
  'Bullying — verbal / social': -4,
  'Discriminatory language': -5,
  'Leaving classroom without permission': -3,
  'Eating in unauthorised areas': -1,
  'Plagiarism / copying': -2,
  'Dishonesty / lying': -2,
  'Rough play': -2,
  'Persistent talking over others': -1,
  'Failure to attend detention': -2,
  'Swearing': -2,
  'Interrupting learning': -1,
  'Failure to bring correct equipment': -1,
  'Lateness to school': -1,
  'Inappropriate use of social media': -3,
  'Fighting': -5,
  'Throwing objects': -3,
  'Defiance / non-compliance': -3,
  'Cyberbullying': -5,
  'Truancy from lesson': -3,
  'Homophobic language': -5,
  'Sexist language': -5,
  'Racist language': -5,
};

/** Reference "today" for demo recency (Apr 2026). */
const REFERENCE_END_MS = Date.UTC(2026, 3, 29);
const DAYS_LOOKBACK = 110;

function buildReportingSlices(
  rowId: string,
  totalIncidents: number,
  rng: () => number,
): CategoryReportingSlice[] {
  if (totalIncidents <= 0) return [];

  const sliceCount = Math.min(totalIncidents, 4 + Math.floor(rng() * 5));
  let remaining = totalIncidents;
  const slices: CategoryReportingSlice[] = [];

  for (let i = 0; i < sliceCount; i++) {
    const slicesLeft = sliceCount - i;
    const incidents =
      i === sliceCount - 1
        ? remaining
        : Math.max(1, Math.floor((remaining / slicesLeft) * (0.55 + rng() * 0.9)));
    remaining -= incidents;

    const daysAgo = Math.floor(rng() * DAYS_LOOKBACK);
    const incidentDate = new Date(REFERENCE_END_MS - daysAgo * 86400000);

    slices.push({
      id: `${rowId}-slice-${i}`,
      incidentDate: formatUkDate(incidentDate),
      incidentDateIso: incidentDate.toISOString(),
      yearGroup: REPORTING_YEAR_GROUPS[Math.floor(rng() * REPORTING_YEAR_GROUPS.length)]!,
      studentGroup: REPORTING_STUDENT_GROUPS[Math.floor(rng() * REPORTING_STUDENT_GROUPS.length)]!,
      incidents,
    });
  }

  return slices.sort((a, b) => a.incidentDateIso.localeCompare(b.incidentDateIso));
}

function buildDummyCategoryMappingRows(seed = 0xc471_0471): CategoryMappingRow[] {
  const rng = mulberry32(seed);
  const rows: CategoryMappingRow[] = [];

  UK_SCHOOLS.forEach((school, schoolIndex) => {
    const pool = shuffleInPlace([...BEHAVIOUR_TYPE_POOL], rng);
    const count = 18 + Math.floor(rng() * 7);
    const schoolSlug = slugify(school.slice(0, 32));

    for (let i = 0; i < count; i++) {
      const behaviourType = pool[i]!;
      const id = `${schoolSlug}-${slugify(behaviourType)}-${schoolIndex}`;
      const skew = rng() * rng();
      const targetIncidentTotal = Math.min(220, Math.floor(skew * 240 + rng() * 40));
      const reportingSlices = buildReportingSlices(id, targetIncidentTotal, rng);
      const usedInIncidents = reportingSlices.reduce((sum, slice) => sum + slice.incidents, 0);
      const daysAgo = Math.floor(rng() * DAYS_LOOKBACK);
      const updatedAt = new Date(REFERENCE_END_MS - daysAgo * 86400000);
      const lastUpdatedIso = updatedAt.toISOString();
      const lastUpdated = formatUkDate(updatedAt);
      const lastUpdatedBy = STAFF_NAMES[Math.floor(rng() * STAFF_NAMES.length)]!;

      rows.push({
        id,
        behaviourType,
        school,
        behaviourCategory: '',
        severity: SEVERITY_BY_BEHAVIOUR_TYPE[behaviourType] ?? 0,
        usedInIncidents,
        lastUpdated,
        lastUpdatedIso,
        lastUpdatedBy,
        reportingSlices,
      });
    }
  });

  return rows;
}

export const DUMMY_CATEGORY_MAPPING_ROWS: CategoryMappingRow[] =
  buildDummyCategoryMappingRows();
