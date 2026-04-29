import type { CategoryMappingRow, CategoryReportingSlice } from './categoryMappingTable';

export interface CategoryReportingFiltersState {
  dateFrom: Date | null;
  dateTo: Date | null;
  schoolValues: string[];
  categoryValues: string[];
  yearGroupValues: string[];
  studentGroupValues: string[];
}

export const EMPTY_CATEGORY_REPORTING_FILTERS: CategoryReportingFiltersState = {
  dateFrom: null,
  dateTo: null,
  schoolValues: [],
  categoryValues: [],
  yearGroupValues: [],
  studentGroupValues: [],
};

function cloneDate(d: Date | null): Date | null {
  return d ? new Date(d.getTime()) : null;
}

export function cloneCategoryReportingFilters(
  filters: CategoryReportingFiltersState,
): CategoryReportingFiltersState {
  return {
    dateFrom: cloneDate(filters.dateFrom),
    dateTo: cloneDate(filters.dateTo),
    schoolValues: [...filters.schoolValues],
    categoryValues: [...filters.categoryValues],
    yearGroupValues: [...filters.yearGroupValues],
    studentGroupValues: [...filters.studentGroupValues],
  };
}

function startOfDayMs(d: Date): number {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function endOfDayMs(d: Date): number {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x.getTime();
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isWithinDateRange(
  slice: CategoryReportingSlice,
  from: Date | null,
  to: Date | null,
): boolean {
  const t = new Date(slice.incidentDateIso).getTime();
  if (from != null && t < startOfDayMs(from)) return false;
  if (to != null && t > endOfDayMs(to)) return false;
  return true;
}

function getLatestSlice(slices: CategoryReportingSlice[]): CategoryReportingSlice {
  return slices.reduce((latest, slice) =>
    slice.incidentDateIso > latest.incidentDateIso ? slice : latest,
  );
}

export function applyCategoryReportingFilters(
  rows: CategoryMappingRow[],
  filters: CategoryReportingFiltersState,
): CategoryMappingRow[] {
  return rows.flatMap((row) => {
    if (filters.schoolValues.length > 0 && !filters.schoolValues.includes(row.school)) {
      return [];
    }

    const category = row.behaviourCategory.trim();
    if (filters.categoryValues.length > 0 && !filters.categoryValues.includes(category)) {
      return [];
    }

    const matchingSlices = row.reportingSlices.filter((slice) => {
      if (!isWithinDateRange(slice, filters.dateFrom, filters.dateTo)) return false;
      if (
        filters.yearGroupValues.length > 0 &&
        !filters.yearGroupValues.includes(slice.yearGroup)
      ) {
        return false;
      }
      if (
        filters.studentGroupValues.length > 0 &&
        !filters.studentGroupValues.includes(slice.studentGroup)
      ) {
        return false;
      }
      return true;
    });

    if (matchingSlices.length === 0) return [];

    const usedInIncidents = matchingSlices.reduce((sum, slice) => sum + slice.incidents, 0);
    const latestSlice = getLatestSlice(matchingSlices);

    return [
      {
        ...row,
        usedInIncidents,
        lastUpdated: latestSlice.incidentDate,
        lastUpdatedIso: latestSlice.incidentDateIso,
        reportingSlices: matchingSlices,
      },
    ];
  });
}

export function buildCategoryReportingFilterPreview(
  filters: CategoryReportingFiltersState,
): string {
  const parts: string[] = [];

  if (filters.dateFrom != null || filters.dateTo != null) {
    if (filters.dateFrom != null && filters.dateTo != null) {
      parts.push(`${formatDate(filters.dateFrom)}-${formatDate(filters.dateTo)}`);
    } else if (filters.dateFrom != null) {
      parts.push(`From ${formatDate(filters.dateFrom)}`);
    } else {
      parts.push(`To ${formatDate(filters.dateTo!)}`);
    }
  }

  if (filters.schoolValues.length > 0) {
    parts.push(
      filters.schoolValues.length === 1
        ? filters.schoolValues[0]!
        : `${filters.schoolValues.length} schools`,
    );
  }
  if (filters.categoryValues.length > 0) {
    parts.push(
      filters.categoryValues.length === 1
        ? filters.categoryValues[0]!
        : `${filters.categoryValues.length} categories`,
    );
  }
  if (filters.yearGroupValues.length > 0) {
    parts.push(
      filters.yearGroupValues.length === 1
        ? filters.yearGroupValues[0]!
        : `${filters.yearGroupValues.length} year groups`,
    );
  }
  if (filters.studentGroupValues.length > 0) {
    parts.push(
      filters.studentGroupValues.length === 1
        ? filters.studentGroupValues[0]!
        : `${filters.studentGroupValues.length} student groups`,
    );
  }

  return parts.length > 0 ? parts.join(' | ') : 'No filters applied';
}

