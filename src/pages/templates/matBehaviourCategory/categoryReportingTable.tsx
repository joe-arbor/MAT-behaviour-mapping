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
    headerTooltip:
      'The main reporting dimension. This column is always first so you scan categories before detail.',
    flex: 1.2,
    minWidth: 160,
  },
  {
    field: 'sentiment',
    headerName: 'Sentiment',
    headerTooltip:
      'Positive or Negative for fast scanning and comparing the two sets without reading every label.',
    minWidth: 120,
  },
  {
    field: 'description',
    headerName: 'Description',
    headerTooltip:
      'Optional in some views; useful early on while users are still learning the 23 default categories.',
    flex: 1.4,
    minWidth: 200,
  },
  {
    field: 'incidents',
    headerName: 'Incidents',
    headerTooltip:
      'Total count of logged behaviour incidents mapped to that category in the selected period.',
    minWidth: 100,
    valueFormatter: formatNumber,
  },
  {
    field: 'percentOfAll',
    headerName: '% of all behaviour incidents',
    headerTooltip:
      'Share of all behaviour incidents—helps users understand relative weight, not just raw count.',
    minWidth: 200,
    valueFormatter: formatPercent,
  },
  {
    field: 'schoolsWithIncidents',
    headerName: 'Schools with incidents',
    headerTooltip:
      'Number of schools in the MAT where that category appears—trust-wide patterns vs localised ones.',
    minWidth: 160,
    valueFormatter: formatNumber,
  },
  {
    field: 'pupilsInvolved',
    headerName: 'Pupils involved',
    headerTooltip:
      'Unique pupil count so the table is not dominated only by repeat incidents.',
    minWidth: 130,
    valueFormatter: formatNumber,
  },
  {
    field: 'ratePer100Pupils',
    headerName: 'Rate per 100 pupils',
    headerTooltip:
      'Fair comparison across schools of different sizes.',
    minWidth: 150,
    valueFormatter: formatNumber,
  },
  {
    field: 'highestSchool',
    headerName: 'Highest school',
    headerTooltip:
      'The school with the highest count or rate for that category—a clear next step for follow-up.',
    minWidth: 160,
  },
  {
    field: 'lastRecorded',
    headerName: 'Last recorded',
    headerTooltip:
      'Date of the most recent incident in that category—recency and safeguarding-style scanning.',
    minWidth: 140,
    valueFormatter: (p) => (p.value ? String(p.value) : ''),
  },
];

/** Empty-state overlay with primary CTA to Category Mapping (registered as `agNoRowsOverlay`). */
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
        Map behaviour
      </Button>
    </div>
  );
}

export function CategoryReportingNoFilterResultsOverlay(_params: INoRowsOverlayParams) {
  return (
    <div className="mat-behaviour-category-page__no-rows-overlay">
      <p className="mat-behaviour-category-page__no-rows-overlay-message">
        No category reporting data matches the selected filters
      </p>
    </div>
  );
}
