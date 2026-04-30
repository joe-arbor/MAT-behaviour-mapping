import { useMemo, useState } from 'react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ArborDataTable } from '../../../components/arborDataTable';
import './matBehaviourCategory.scss';
import { useBehaviourCategoryMapping } from './BehaviourCategoryMappingContext';
import { DUMMY_CATEGORY_MAPPING_ROWS } from './categoryMappingDummyData';
import { applyBehaviourTypeMappings } from './categoryMappingDerived';
import { buildCategoryReportingRows } from './categoryReportingDerived';
import { CategoryReportingFilterBar } from './CategoryReportingFilterBar';
import {
  EMPTY_CATEGORY_REPORTING_FILTERS,
  applyCategoryReportingFilters,
  type CategoryReportingFiltersState,
} from './categoryReportingFilterUtils';
import {
  CATEGORY_REPORTING_TABLE_ID,
  CategoryReportingNoFilterResultsOverlay,
  CategoryReportingNoRowsOverlay,
  EMPTY_CATEGORY_REPORTING_ROWS,
  categoryReportingColumnDefs,
  type CategoryReportingRow,
} from './categoryReportingTable';
import { buildMatBehaviourCategoryBreadcrumbs } from './matBehaviourCategoryBreadcrumbs';

const CATEGORY_REPORTING_BREADCRUMBS =
  buildMatBehaviourCategoryBreadcrumbs('Category Analysis');

export function MatBehaviourCategoryReporting() {
  const { mappings } = useBehaviourCategoryMapping();
  const [appliedFilters, setAppliedFilters] = useState<CategoryReportingFiltersState>(
    EMPTY_CATEGORY_REPORTING_FILTERS,
  );

  const hasAnyMappedBehaviourType = useMemo(
    () => Object.values(mappings).some(Boolean),
    [mappings],
  );

  const mappedRows = useMemo(
    () => applyBehaviourTypeMappings(DUMMY_CATEGORY_MAPPING_ROWS, mappings),
    [mappings],
  );

  const rowData = useMemo(() => {
    if (!hasAnyMappedBehaviourType) return EMPTY_CATEGORY_REPORTING_ROWS;

    const filteredRows = applyCategoryReportingFilters(mappedRows, appliedFilters);
    return buildCategoryReportingRows(filteredRows);
  }, [appliedFilters, hasAnyMappedBehaviourType, mappedRows]);

  const NoRowsOverlayComponent = hasAnyMappedBehaviourType
    ? CategoryReportingNoFilterResultsOverlay
    : CategoryReportingNoRowsOverlay;

  return (
    <div className="mat-behaviour-category-page">
      <Breadcrumbs
        className="mat-behaviour-category-page__breadcrumbs"
        items={CATEGORY_REPORTING_BREADCRUMBS}
      />
      <h1 className="template-page__title">Category Analysis</h1>
      <CategoryReportingFilterBar
        allRows={mappedRows}
        applied={appliedFilters}
        onAppliedChange={setAppliedFilters}
      />
      <div className="mat-behaviour-category-page__reporting-table">
        <ArborDataTable<CategoryReportingRow>
          tableId={CATEGORY_REPORTING_TABLE_ID}
          rowData={rowData}
          getRowId={(row) => row.id}
          columnDefs={categoryReportingColumnDefs}
          rowSelection={false}
          noRowsOverlayComponent={NoRowsOverlayComponent}
        />
      </div>
    </div>
  );
}
