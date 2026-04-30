import type { ColDef, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { Combobox, type ComboboxOption } from '../../../components/combobox/Combobox';

export const CATEGORY_SETUP_TABLE_ID = 'mat-behaviour-category-setup';

export type CategoryStatus = 'Active' | 'Inactive';

export interface CategorySetupRow {
  id: string;
  category: string;
  sentiment: string;
  description: string;
  source: string;
  status: string;
  schoolsUsing: number;
  behaviourTypesMapped: number;
  lastUpdated: string;
  lastUpdatedBy: string;
}

const CATEGORY_STATUS_OPTIONS: ComboboxOption[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export interface CategorySetupColumnHandlers {
  onStatusChange: (row: CategorySetupRow, next: CategoryStatus) => void;
}

function formatNumber(p: ValueFormatterParams<CategorySetupRow>) {
  const v = p.value;
  if (v == null || v === '') return '';
  if (typeof v === 'number') return String(v);
  return String(v);
}

function StatusCell(
  params: ICellRendererParams<CategorySetupRow> & CategorySetupColumnHandlers,
) {
  const { data, onStatusChange } = params;
  if (!data) return null;

  const value =
    data.status === 'Inactive' ? 'Inactive' : 'Active';

  return (
    <div
      className="mat-behaviour-category-page__setup-status-cell"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Combobox
        options={CATEGORY_STATUS_OPTIONS}
        value={value}
        onChange={(v) => {
          const next = Array.isArray(v) ? v[0] : v;
          if (next === 'Active' || next === 'Inactive') {
            onStatusChange(data, next);
          }
        }}
        placeholder="Status"
        variant="inline"
        showClear={false}
      />
    </div>
  );
}

export function buildCategorySetupColumnDefs(
  handlers: CategorySetupColumnHandlers,
): ColDef<CategorySetupRow>[] {
  const { onStatusChange } = handlers;

  return [
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
      field: 'status',
      headerName: 'Status',
      headerTooltip: 'Whether schools can still use this category',
      minWidth: 160,
      sortable: false,
      cellClass: 'mat-behaviour-category-page__setup-status-ag-cell',
      cellStyle: { overflow: 'visible' },
      cellRenderer: (params: ICellRendererParams<CategorySetupRow>) => (
        <StatusCell {...params} onStatusChange={onStatusChange} />
      ),
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
}
