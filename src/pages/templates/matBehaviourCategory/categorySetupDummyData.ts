import type { CategoryUsageCounts } from './categoryMappingDerived';
import { BEHAVIOUR_CATEGORY_OPTIONS } from './behaviourCategoryOptions';
import { ARBOR_CATEGORY_DESCRIPTIONS, getCategorySentiment } from './categoryMetadata';
import type { CategorySetupRow } from './categorySetupTable';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const LAST_UPDATED_DISPLAY = '29/04/2026';
const LAST_UPDATED_BY = 'Joe Carter';

const ZERO_USAGE: CategoryUsageCounts = { schoolsUsing: 0, behaviourTypesMapped: 0 };

/**
 * Builds setup rows; `schoolsUsing` and `behaviourTypesMapped` come from category mapping aggregates.
 */
export function buildCategorySetupRows(
  usageByCategory: ReadonlyMap<string, CategoryUsageCounts>,
): CategorySetupRow[] {
  return BEHAVIOUR_CATEGORY_OPTIONS.map((opt) => {
    const category = opt.value;
    const counts = usageByCategory.get(category) ?? ZERO_USAGE;

    return {
      id: slugify(category),
      category,
      sentiment: getCategorySentiment(category),
      description: ARBOR_CATEGORY_DESCRIPTIONS[category] ?? '',
      source: 'Arbor default',
      status: 'Active',
      schoolsUsing: counts.schoolsUsing,
      behaviourTypesMapped: counts.behaviourTypesMapped,
      lastUpdated: LAST_UPDATED_DISPLAY,
      lastUpdatedBy: LAST_UPDATED_BY,
    };
  });
}
