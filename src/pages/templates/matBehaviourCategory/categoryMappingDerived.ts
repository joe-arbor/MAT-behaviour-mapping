import type { CategoryMappingRow } from './categoryMappingTable';

export type BehaviourTypeMappings = Record<string, string>;

export function applyBehaviourTypeMappings(
  rows: CategoryMappingRow[],
  mappings: BehaviourTypeMappings,
): CategoryMappingRow[] {
  return rows.map((row) => ({
    ...row,
    behaviourCategory: mappings[row.behaviourType] ?? row.behaviourCategory,
  }));
}

export interface CategoryUsageCounts {
  schoolsUsing: number;
  behaviourTypesMapped: number;
}

/**
 * Per Arbor category: distinct schools and distinct behaviour types among rows
 * with a non-empty resolved behaviour category.
 */
export function aggregateCategoryUsage(
  mappedRows: CategoryMappingRow[],
): Map<string, CategoryUsageCounts> {
  const accumulated = new Map<string, { schools: Set<string>; types: Set<string> }>();

  for (const row of mappedRows) {
    const category = row.behaviourCategory?.trim();
    if (!category) continue;

    let entry = accumulated.get(category);
    if (!entry) {
      entry = { schools: new Set<string>(), types: new Set<string>() };
      accumulated.set(category, entry);
    }
    entry.schools.add(row.school);
    entry.types.add(row.behaviourType);
  }

  const out = new Map<string, CategoryUsageCounts>();
  for (const [category, { schools, types }] of accumulated) {
    out.set(category, {
      schoolsUsing: schools.size,
      behaviourTypesMapped: types.size,
    });
  }
  return out;
}
