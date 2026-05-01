import { useNavigate } from 'react-router-dom';
import type { ColDef, INoRowsOverlayParams, ValueFormatterParams } from 'ag-grid-community';
import { Button } from '../../../components/button/Button';

export const CATEGORY_REPORTING_TABLE_ID = 'mat-behaviour-category-reporting';

export const CATEGORY_REPORTING_MAP_BEHAVIOUR_PATH = '/templates/mat-mis/behaviour/category-mapping';

export interface CategoryReportingRow {
  id: string;
  category: string;
  sentiment: string;
  description: string;
  incidents: number | null;
  percentOfAll: number | null;
  schoolsWithIncidents: number | null;
  pupilsInvolved: number | null;
  ratePer100Pupils: number | null;
  highestSchool: string;
  lastRecorded: string;
}

export const EMPTY_CATEGORY_REPORTING_ROWS: CategoryReportingRow[] = [];

function formatNumber(p: ValueFormatterParams<CategoryReportingRow>) {
  const v = p.value;
  if (v == null || v === '') return '';
  if (typeof v === 'number') return String(v);
  return String(v);
}

function formatPercent(p: ValueFormatterParams<CategoryReportingRow>) {
  const v = p.value;
  if (v == null || v === '') return '';
  if (typeof v === 'number') return `${v}%`;
  return String(v);
}

export const categoryReportingColumnDefs: ColDef<CategoryReportingRow>[] = [
  {
    field: 'category',
    headerName: 'Category',
    headerTooltip: 'Behaviour category used for reporting across the trust',
    flex: 1.2,
    minWidth: 160,
    sort: 'asc',
    sortIndex: 0,
  },
  {
    field: 'sentiment',
    headerName: 'Sentiment',
    headerTooltip: 'Shows whether the category is positive or negative',
    minWidth: 120,
  },
  {
    field: 'description',
    headerName: 'Description',
    headerTooltip: 'Explains what this category includes',
    flex: 1.4,
    minWidth: 200,
  },
  {
    field: 'incidents',
    headerName: 'Incidents',
    headerTooltip: 'Logged incidents in this category for the selected filters',
    minWidth: 100,
    valueFormatter: formatNumber,
  },
  {
    field: 'percentOfAll',
    headerName: '% of all behaviour incidents',
    headerTooltip: 'Percentage of filtered incidents in this category',
    minWidth: 200,
    valueFormatter: formatPercent,
  },
  {
    field: 'schoolsWithIncidents',
    headerName: 'Schools with incidents',
    headerTooltip: 'Schools with at least one incident in this category',
    minWidth: 160,
    valueFormatter: formatNumber,
  },
  {
    field: 'pupilsInvolved',
    headerName: 'Pupils involved',
    headerTooltip: 'Unique pupils involved in this category',
    minWidth: 130,
    valueFormatter: formatNumber,
  },
  {
    field: 'ratePer100Pupils',
    headerName: 'Rate per 100 pupils',
    headerTooltip: 'Incidents per 100 pupils, for comparing schools of different sizes',
    minWidth: 150,
    valueFormatter: formatNumber,
  },
  {
    field: 'highestSchool',
    headerName: 'Highest school',
    headerTooltip: 'School with the most incidents in this category',
    minWidth: 160,
  },
  {
    field: 'lastRecorded',
    headerName: 'Last recorded',
    headerTooltip: 'Date of the most recent incident in this category',
    minWidth: 140,
    valueFormatter: (p) => (p.value ? String(p.value) : ''),
  },
];

/** Empty-state overlay with primary CTA to Map Behaviour Types (registered as `agNoRowsOverlay`). */
export function CategoryReportingNoRowsOverlay(_params: INoRowsOverlayParams) {
  const navigate = useNavigate();
  return (
    <div className="mat-behaviour-category-page__no-rows-overlay">
      <p className="mat-behaviour-category-page__no-rows-overlay-message">
        No data yet, map behaviour types first
      </p>
      <Button
        type="button"
        variant="primary"
        onClick={() => navigate(CATEGORY_REPORTING_MAP_BEHAVIOUR_PATH)}
      >
        Map behaviour types
      </Button>
    </div>
  );
}

export function CategoryReportingNoFilterResultsOverlay(_params: INoRowsOverlayParams) {
  return (
    <div className="mat-behaviour-category-page__no-rows-overlay">
      <p className="mat-behaviour-category-page__no-rows-overlay-message">
        No category analysis data matches the selected filters
      </p>
    </div>
  );
}
