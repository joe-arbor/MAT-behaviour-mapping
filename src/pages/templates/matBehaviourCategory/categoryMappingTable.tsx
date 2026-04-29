import type { ColDef, ValueFormatterParams } from 'ag-grid-community';

export const CATEGORY_MAPPING_TABLE_ID = 'mat-behaviour-category-mapping';

export interface CategoryMappingRow {
  id: string;
  behaviourType: string;
  school: string;
  behaviourCategory: string;
  severity: number;
  usedInIncidents: number | null;
  lastUpdated: string;
  /** ISO 8601 — used for filtering; display uses `lastUpdated`. */
  lastUpdatedIso: string;
  lastUpdatedBy: string;
}

export const EMPTY_CATEGORY_MAPPING_ROWS: CategoryMappingRow[] = [];

function formatUsedInIncidents(p: ValueFormatterParams<CategoryMappingRow>) {
  const v = p.value;
  if (v == null || v === '') return '';
  if (typeof v === 'number') return String(v);
  return String(v);
}

function formatSeverity(p: ValueFormatterParams<CategoryMappingRow>) {
  const v = p.value;
  if (v == null || v === '') return '';
  if (typeof v === 'number') return v > 0 ? `+${v}` : String(v);
  return String(v);
}

export const categoryMappingColumnDefs: ColDef<CategoryMappingRow>[] = [
  {
    field: 'behaviourType',
    headerName: 'Behaviour type',
    headerTooltip: 'The core thing being mapped.',
    flex: 1.4,
    minWidth: 180,
  },
  {
    field: 'school',
    headerName: 'School',
    headerTooltip:
      'Needed because the same label may mean slightly different things in different schools.',
    flex: 1,
    minWidth: 140,
  },
  {
    field: 'behaviourCategory',
    headerName: 'Behaviour category',
    headerTooltip: "Shows Arbor's proposed default category, if one exists.",
    flex: 1.2,
    minWidth: 160,
  },
  {
    field: 'severity',
    headerName: 'Severity',
    headerTooltip:
      'Rating from +5 to -5. Positive and negative values both become more severe the further they are from 0.',
    minWidth: 110,
    valueFormatter: formatSeverity,
  },
  {
    field: 'usedInIncidents',
    headerName: 'Used in incidents',
    headerTooltip:
      'Count of how often that behaviour type appears. This helps users prioritise high-impact mappings first.',
    minWidth: 140,
    valueFormatter: formatUsedInIncidents,
  },
  {
    field: 'lastUpdated',
    headerName: 'Last updated',
    headerTooltip: 'Useful for audit and recency.',
    minWidth: 140,
    valueFormatter: (p) => (p.value ? String(p.value) : ''),
  },
  {
    field: 'lastUpdatedBy',
    headerName: 'Last updated by',
    headerTooltip:
      'Useful in a MAT context where multiple trust staff may be working through the setup.',
    minWidth: 160,
  },
];
