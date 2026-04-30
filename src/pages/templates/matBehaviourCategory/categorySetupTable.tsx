import type { ColDef, ValueFormatterParams } from 'ag-grid-community';

export const CATEGORY_SETUP_TABLE_ID = 'mat-behaviour-category-setup';

export interface CategorySetupRow {
  id: string;
  category: string;
  sentiment: string;
  description: string;
  source: string;
  versionIntroduced: string;
  status: string;
  schoolsUsing: number;
  behaviourTypesMapped: number;
  lastUpdated: string;
  lastUpdatedBy: string;
}

function formatNumber(p: ValueFormatterParams<CategorySetupRow>) {
  const v = p.value;
  if (v == null || v === '') return '';
  if (typeof v === 'number') return String(v);
  return String(v);
}

export const categorySetupColumnDefs: ColDef<CategorySetupRow>[] = [
  {
    field: 'category',
    headerName: 'Category',
    headerTooltip: 'The behaviour category schools use for reporting',
    flex: 1.2,
    minWidth: 160,
  },
  {
    field: 'sentiment',
    headerName: 'Sentiment',
    headerTooltip: 'Whether the category records positive or negative behaviour',
    minWidth: 120,
  },
  {
    field: 'description',
    headerName: 'Description',
    headerTooltip: 'When schools should use this category',
    flex: 1.4,
    minWidth: 200,
  },
  {
    field: 'source',
    headerName: 'Source',
    headerTooltip: 'Where this category came from',
    minWidth: 160,
  },
  {
    field: 'versionIntroduced',
    headerName: 'Version introduced',
    headerTooltip: 'When this category was added',
    minWidth: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    headerTooltip: 'Whether schools can still use this category',
    minWidth: 110,
  },
  {
    field: 'schoolsUsing',
    headerName: 'Schools using',
    headerTooltip: 'How many schools use this category',
    minWidth: 130,
    valueFormatter: formatNumber,
  },
  {
    field: 'behaviourTypesMapped',
    headerName: 'Behaviour types mapped',
    headerTooltip:
      'How many school behaviour types are mapped to this category',
    minWidth: 180,
    valueFormatter: formatNumber,
  },
  {
    field: 'lastUpdated',
    headerName: 'Last updated',
    headerTooltip: 'When this category was last changed',
    minWidth: 140,
    valueFormatter: (p) => (p.value ? String(p.value) : ''),
  },
  {
    field: 'lastUpdatedBy',
    headerName: 'Last updated by',
    headerTooltip: 'Who last changed this category',
    minWidth: 160,
  },
];
