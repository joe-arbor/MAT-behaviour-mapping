import type { CategoryMappingRow } from './categoryMappingTable';

export interface CategoryMappingFiltersState {
  /** Empty array = all schools */
  schoolValues: string[];
  lastUpdatedFrom: Date | null;
  lastUpdatedTo: Date | null;
  /** Empty = anyone */
  updatedBy: string;
}

export const EMPTY_CATEGORY_MAPPING_FILTERS: CategoryMappingFiltersState = {
  schoolValues: [],
  lastUpdatedFrom: null,
  lastUpdatedTo: null,
  updatedBy: '',
};

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

function isWithinLastUpdatedRange(row: CategoryMappingRow, from: Date | null, to: Date | null): boolean {
  const t = new Date(row.lastUpdatedIso).getTime();
  if (from != null && t < startOfDayMs(from)) return false;
  if (to != null && t > endOfDayMs(to)) return false;
  return true;
}

export function applyCategoryMappingFilters(
  rows: CategoryMappingRow[],
  filters: CategoryMappingFiltersState,
): CategoryMappingRow[] {
  return rows.filter((row) => {
    if (filters.schoolValues.length > 0 && !filters.schoolValues.includes(row.school)) {
      return false;
    }

    if (!isWithinLastUpdatedRange(row, filters.lastUpdatedFrom, filters.lastUpdatedTo)) {
      return false;
    }

    if (filters.updatedBy !== '' && row.lastUpdatedBy !== filters.updatedBy) {
      return false;
    }

    return true;
  });
}

export function buildCategoryMappingFilterPreview(filters: CategoryMappingFiltersState): string {
  const parts: string[] = [];
  if (filters.schoolValues.length > 0) {
    parts.push(
      filters.schoolValues.length === 1
        ? filters.schoolValues[0]!
        : `${filters.schoolValues.length} schools`,
    );
  }
  if (filters.lastUpdatedFrom != null || filters.lastUpdatedTo != null) {
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    if (filters.lastUpdatedFrom != null && filters.lastUpdatedTo != null) {
      parts.push(`${fmt(filters.lastUpdatedFrom)}–${fmt(filters.lastUpdatedTo)}`);
    } else if (filters.lastUpdatedFrom != null) {
      parts.push(`From ${fmt(filters.lastUpdatedFrom)}`);
    } else {
      parts.push(`To ${fmt(filters.lastUpdatedTo!)}`);
    }
  }
  if (filters.updatedBy !== '') parts.push(filters.updatedBy);
  return parts.length > 0 ? parts.join(' · ') : 'No filters applied';
}
