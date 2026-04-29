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
    headerTooltip:
      'The category name, for example Respect or Defiance / Non-Compliance.',
    flex: 1.2,
    minWidth: 160,
  },
  {
    field: 'sentiment',
    headerName: 'Sentiment',
    headerTooltip: 'Positive or Negative.',
    minWidth: 120,
  },
  {
    field: 'description',
    headerName: 'Description',
    headerTooltip: 'The plain-language meaning of the category.',
    flex: 1.4,
    minWidth: 200,
  },
  {
    field: 'source',
    headerName: 'Source',
    headerTooltip: 'Arbor default, Custom, or Government framework.',
    minWidth: 160,
  },
  {
    field: 'versionIntroduced',
    headerName: 'Version introduced',
    headerTooltip: 'The category version introduced, for example v1.0.',
    minWidth: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    headerTooltip: 'Active or Archived.',
    minWidth: 110,
  },
  {
    field: 'schoolsUsing',
    headerName: 'Schools using',
    headerTooltip:
      'Number of schools in the MAT that currently use the category.',
    minWidth: 130,
    valueFormatter: formatNumber,
  },
  {
    field: 'behaviourTypesMapped',
    headerName: 'Behaviour types mapped',
    headerTooltip:
      'Count of school-defined behaviour types currently mapped into that category.',
    minWidth: 180,
    valueFormatter: formatNumber,
  },
  {
    field: 'lastUpdated',
    headerName: 'Last updated',
    headerTooltip: 'Useful for governance and trust-wide auditing.',
    minWidth: 140,
    valueFormatter: (p) => (p.value ? String(p.value) : ''),
  },
  {
    field: 'lastUpdatedBy',
    headerName: 'Last updated by',
    headerTooltip: 'Useful where MAT admins collaborate on setup.',
    minWidth: 160,
  },
];
