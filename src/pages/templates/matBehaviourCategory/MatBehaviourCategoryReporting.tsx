import { useMemo } from 'react';
import { Breadcrumbs, type BreadcrumbItem } from '../../../components/breadcrumbs';
import { ArborDataTable } from '../../../components/arborDataTable';
import './matBehaviourCategory.scss';
import { useBehaviourCategoryMapping } from './BehaviourCategoryMappingContext';
import { DUMMY_CATEGORY_MAPPING_ROWS } from './categoryMappingDummyData';
import { applyBehaviourTypeMappings } from './categoryMappingDerived';
import { buildCategoryReportingRows } from './categoryReportingDerived';
import {
  CATEGORY_REPORTING_TABLE_ID,
  CategoryReportingNoRowsOverlay,
  EMPTY_CATEGORY_REPORTING_ROWS,
  categoryReportingColumnDefs,
  type CategoryReportingRow,
} from './categoryReportingTable';
import { MatBehaviourFilterBar } from './MatBehaviourFilterBar';

const CATEGORY_REPORTING_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'MAT MIS', href: '/templates/mat-mis' },
  { label: 'Analytics', href: '#' },
  { label: 'Behaviour', href: '#' },
  {
    label: 'Category reporting',
    dropdownItems: [
      {
        label: 'Category Reporting',
        href: '/templates/mat-mis/behaviour/category-reporting',
      },
      {
        label: 'Category Mapping',
        href: '/templates/mat-mis/behaviour/category-mapping',
      },
      {
        label: 'Category Setup',
        href: '/templates/mat-mis/behaviour/category-setup',
      },
    ],
  },
  { label: 'Category Reporting', isCurrent: true },
];

export function MatBehaviourCategoryReporting() {
  const { mappings } = useBehaviourCategoryMapping();

  const hasAnyMappedBehaviourType = useMemo(
    () => Object.values(mappings).some(Boolean),
    [mappings],
  );

  const rowData = useMemo(() => {
    if (!hasAnyMappedBehaviourType) return EMPTY_CATEGORY_REPORTING_ROWS;

    const mappedRows = applyBehaviourTypeMappings(DUMMY_CATEGORY_MAPPING_ROWS, mappings);
    return buildCategoryReportingRows(mappedRows);
  }, [hasAnyMappedBehaviourType, mappings]);

  return (
    <div className="mat-behaviour-category-page">
      <Breadcrumbs
        className="mat-behaviour-category-page__breadcrumbs"
        items={CATEGORY_REPORTING_BREADCRUMBS}
      />
      <h1 className="template-page__title">Category Reporting</h1>
      <MatBehaviourFilterBar />
      <div className="mat-behaviour-category-page__reporting-table">
        <ArborDataTable<CategoryReportingRow>
          tableId={CATEGORY_REPORTING_TABLE_ID}
          rowData={rowData}
          getRowId={(row) => row.id}
          columnDefs={categoryReportingColumnDefs}
          rowSelection={false}
          noRowsOverlayComponent={CategoryReportingNoRowsOverlay}
        />
      </div>
    </div>
  );
}
