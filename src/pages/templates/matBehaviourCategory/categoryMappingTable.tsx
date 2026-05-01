import type { ColDef, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';

export const CATEGORY_MAPPING_TABLE_ID = 'mat-behaviour-category-mapping';

export interface CategoryReportingSlice {
  id: string;
  incidentDate: string;
  /** ISO 8601 — used for reporting date range filters. */
  incidentDateIso: string;
  yearGroup: string;
  studentGroup: string;
  incidents: number;
}

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
  reportingSlices: CategoryReportingSlice[];
}

export const EMPTY_CATEGORY_MAPPING_ROWS: CategoryMappingRow[] = [];

export interface CategoryMappingColumnHandlers {
  onAddCategory?: (row: CategoryMappingRow) => void;
}

function BehaviourCategoryCell({
  data,
  value,
  onAddCategory,
}: ICellRendererParams<CategoryMappingRow> & CategoryMappingColumnHandlers) {
  if (value != null && value !== '') return String(value);
  if (!data || !onAddCategory) return '';

  return (
    <button
      type="button"
      className="mat-behaviour-category-page__mapping-add-category-link"
      onClick={(event) => {
        event.stopPropagation();
        onAddCategory(data);
      }}
    >
      Add category
    </button>
  );
}

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

export function buildCategoryMappingColumnDefs({
  onAddCategory,
}: CategoryMappingColumnHandlers = {}): ColDef<CategoryMappingRow>[] {
  return [
    {
      field: 'behaviourType',
      headerName: 'Behaviour type',
      headerTooltip: 'Behaviour type being mapped',
      flex: 1.4,
      minWidth: 180,
      sort: 'asc',
      sortIndex: 0,
    },
    {
      field: 'school',
      headerName: 'School',
      headerTooltip: 'School this mapping belongs to',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'behaviourCategory',
      headerName: 'Behaviour category',
      headerTooltip: 'Category selected for this mapping',
      flex: 1.2,
      minWidth: 160,
      cellRenderer: (params: ICellRendererParams<CategoryMappingRow>) => (
        <BehaviourCategoryCell {...params} onAddCategory={onAddCategory} />
      ),
    },
    {
      field: 'severity',
      headerName: 'Severity',
      headerTooltip: 'How severe this behaviour type is',
      minWidth: 110,
      valueFormatter: formatSeverity,
    },
    {
      field: 'usedInIncidents',
      headerName: 'Used in incidents',
      headerTooltip: 'How often this appears in incidents',
      minWidth: 140,
      valueFormatter: formatUsedInIncidents,
    },
    {
      field: 'lastUpdated',
      headerName: 'Last updated',
      headerTooltip: 'When this mapping was last changed',
      minWidth: 140,
      valueFormatter: (p) => (p.value ? String(p.value) : ''),
    },
    {
      field: 'lastUpdatedBy',
      headerName: 'Last updated by',
      headerTooltip: 'Who last changed this mapping',
      minWidth: 160,
    },
  ];
}

export const categoryMappingColumnDefs = buildCategoryMappingColumnDefs();
