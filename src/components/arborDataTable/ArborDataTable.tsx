import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Section } from '../section/Section';
import { ArborDataTableToolbar, type TableRowSize } from './ArborDataTableToolbar';
import { ArborDataTableFooter } from './ArborDataTableFooter';
import {
  loadTableState,
  saveTableState,
  clearTableState,
} from './arborDataTablePersistence';
import type { ArborDataTableProps } from './arborDataTableTypes';
import { ArborDataTableInnerTooltipHeader } from './ArborDataTableInnerTooltipHeader';
import './arborDataTable.scss';

const DEFAULT_PAGE_SIZE = 100;
const SEARCH_DEBOUNCE_MS = 200;

/** Use DS Tooltip for string `headerTooltip`; keeps AG Grid default header shell (sort, menu, filter). */
function withDsHeaderTooltip<T>(col: ColDef<T>): ColDef<T> {
  const headerTooltip = col.headerTooltip;
  if (typeof headerTooltip !== 'string' || !headerTooltip.trim()) {
    return col;
  }
  const prevParams = col.headerComponentParams as Record<string, unknown> | undefined;
  if (prevParams?.innerHeaderComponent != null) {
    return col;
  }

  const { headerTooltip: _omitTooltip, headerTooltipValueGetter: _omitGetter, ...rest } = col;

  return {
    ...rest,
    headerComponentParams: {
      ...prevParams,
      innerHeaderComponent: ArborDataTableInnerTooltipHeader,
      innerHeaderComponentParams: {
        ...(prevParams?.innerHeaderComponentParams as object | undefined),
        tooltipText: headerTooltip,
      },
    },
  };
}

export function ArborDataTable<T = any>({
  tableId,
  title,
  collapsible = false,
  defaultCollapsed = false,
  rowData = [],
  datasource,
  getRowId,
  columnDefs,
  defaultColDef,
  rowSelection = true,
  bulkActions,
  downloads,
  onRowClick,
  showToolbar = true,
  showHideColumns = true,
  showSearch = true,
  showExpandButton = true,
  searchDebounceMs = SEARCH_DEBOUNCE_MS,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  initialState,
  rowStyleRules,
  onExpandTable,
  onHelp,
  className,
  noRowsOverlayComponent,
  noRowsOverlayComponentParams,
}: ArborDataTableProps<T>) {
  const gridRef = useRef<AgGridReact>(null);
  /** Host for column menus / filter popups so they inherit `.ds-arbor-table-wrapper.ag-theme-alpine` theme vars and Arbor overrides (default is `document.body`). */
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [gridApi, setGridApi] = useState<GridApi<T> | null>(null);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [hiddenColumnCount] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowCount, setRowCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rowSize, setRowSize] = useState<TableRowSize>('medium');
  const [columnBorders, setColumnBorders] = useState(false);
  const [cellBorders, setCellBorders] = useState(false);

  /** AG Grid v33+ expects custom no-rows UI via `components.agNoRowsOverlay`, not legacy `noRowsOverlayComponent` alone. */
  const gridComponents = useMemo(
    () => (noRowsOverlayComponent ? { agNoRowsOverlay: noRowsOverlayComponent } : undefined),
    [noRowsOverlayComponent],
  );

  const persisted = loadTableState(tableId);
  // Daily attendance: never apply persisted filter/state so the register always shows full data
  const effectivePersisted = tableId === 'daily-attendance-registers' ? null : persisted;
  const initialPageSize = effectivePersisted?.pageSize ?? initialState?.pageSize ?? defaultPageSize;

  useEffect(() => {
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  const onGridReady = useCallback(
    (event: GridReadyEvent<T>) => {
      const api = event.api;
      setGridApi(api);
      const wrapper = tableWrapperRef.current;
      if (wrapper) {
        api.setGridOption('popupParent', wrapper);
      }

      // Defer persistence and layout so the grid finishes its first paint (helps with React 18 Strict Mode).
      requestAnimationFrame(() => {
        const isDailyAttendance = tableId === 'daily-attendance-registers';
        const state = effectivePersisted ?? initialState;
        if (state?.filterModel) api.setFilterModel(state.filterModel);
        if (state?.sortModel && Array.isArray(state.sortModel) && state.sortModel.length > 0) {
          const columnState = state.sortModel.map((s: any) => ({
            colId: s.colId,
            sort: s.sort ?? null,
            sortIndex: s.sortIndex ?? null,
          }));
          api.applyColumnState({ state: columnState });
        }
        if (state?.hiddenCols?.length) {
          api.setColumnsVisible(state.hiddenCols, false);
        }
        if (state?.columnOrder?.length) {
          api.applyColumnState({
            state: state.columnOrder.map((colId: string) => ({ colId })),
            applyOrder: true,
          });
        }
        if (state?.columnWidths && Object.keys(state.columnWidths).length > 0) {
          api.setColumnWidths(
            Object.entries(state.columnWidths).map(([colId, width]) => ({ key: colId, newWidth: width }))
          );
        }

        const fitColumns = () => {
          try {
            api.sizeColumnsToFit();
          } catch {
            /* ignore: zero-width container during flex layout */
          }
        };
        fitColumns();
        requestAnimationFrame(fitColumns);

        // If client-side data exists but a restored filter (or quick filter) shows 0 rows, clear filters so data is visible
        const displayed = api.getDisplayedRowCount?.() ?? 0;
        if (!datasource && rowData?.length) {
          if (isDailyAttendance) {
            // Daily attendance: always clear filters and force rowData via API so rows show reliably
            api.setFilterModel(null);
            api.setGridOption('quickFilterText', '');
            requestAnimationFrame(() => {
              api.setGridOption('rowData', rowData);
            });
          } else if (displayed === 0) {
            api.setFilterModel(null);
            api.setGridOption('quickFilterText', '');
          }
        }
      });
    },
    [tableId, effectivePersisted, initialState, datasource, rowData?.length]
  );

  useEffect(() => {
    if (!gridApi || !tableWrapperRef.current) return;
    gridApi.setGridOption('popupParent', tableWrapperRef.current);
  }, [gridApi]);

  const onSelectionChanged = useCallback(() => {
    const api = gridRef.current?.api;
    if (!api) return;
    const selected = api.getSelectedRows();
    setSelectedRowCount(selected.length);
  }, []);

  useEffect(() => {
    if (!gridApi) return;
    gridApi.setGridOption('quickFilterText', searchValue);
  }, [gridApi, searchValue]);

  useEffect(() => {
    const t = setTimeout(() => setSearchValue(searchInputValue), searchDebounceMs);
    return () => clearTimeout(t);
  }, [searchInputValue, searchDebounceMs]);

  const updateFooterFromApi = useCallback(() => {
    const api = gridRef.current?.api;
    if (!api) return;
    setCurrentPage(api.paginationGetCurrentPage() + 1);
    setTotalPages(api.paginationGetTotalPages() || 1);
    setRowCount(api.paginationGetRowCount?.() ?? api.getDisplayedRowCount?.() ?? 0);
  }, []);

  useEffect(() => {
    if (!gridApi) return;
    updateFooterFromApi();
    const listener = () => updateFooterFromApi();
    gridApi.addEventListener('paginationChanged', listener);
    gridApi.addEventListener('modelUpdated', listener);
    return () => {
      gridApi.removeEventListener('paginationChanged', listener);
      gridApi.removeEventListener('modelUpdated', listener);
    };
  }, [gridApi, updateFooterFromApi]);

  const handlePageChange = useCallback(
    (page: number) => {
      gridApi?.paginationGoToPage(page - 1);
      updateFooterFromApi();
    },
    [gridApi, updateFooterFromApi]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setPageSize(size);
      gridApi?.setGridOption('paginationPageSize', size);
      saveTableState(tableId, { pageSize: size });
      updateFooterFromApi();
    },
    [gridApi, tableId, updateFooterFromApi]
  );

  const statusText =
    selectedRowCount > 0
      ? `You have selected ${selectedRowCount} row${selectedRowCount === 1 ? '' : 's'}`
      : `Showing ${rowCount} results`;

  const rowClassRules = rowStyleRules?.length
    ? Object.fromEntries(
        rowStyleRules.map((rule) => [rule.className, (params: any) => rule.when(params.data)])
      )
    : undefined;

  const effectiveColumnDefs = React.useMemo(() => {
    const cols = [...columnDefs.map(withDsHeaderTooltip)];
    if (rowSelection) {
      cols.unshift({
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 48,
        maxWidth: 48,
        suppressSizeToFit: true,
        pinned: 'left',
      } as any);
    }
    return cols;
  }, [columnDefs, rowSelection]);

  const wrapperClass = [
    'ds-arbor-table-wrapper',
    'ag-theme-alpine',
    rowSize === 'extraSmall' && 'ag-theme-alpine--super-condensed',
    rowSize === 'small' && 'ag-theme-alpine--condensed',
    rowSize === 'large' && 'ag-theme-alpine--normal',
    columnBorders && 'table--column-borders',
    cellBorders && 'table--cell-borders',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleResetTable = useCallback(() => {
    clearTableState(tableId);
    gridApi?.resetColumnState();
    gridApi?.setFilterModel(null);
    gridApi?.applyColumnState({ state: [] });
    setPageSize(defaultPageSize);
    gridApi?.setGridOption('paginationPageSize', defaultPageSize);
  }, [tableId, defaultPageSize, gridApi]);

  const handleExpandClick = useCallback(() => {
    if (onExpandTable) {
      onExpandTable();
      setIsFullScreen((prev) => !prev);
    }
  }, [onExpandTable]);

  const content = (
    <div ref={tableWrapperRef} className={wrapperClass}>
      {showToolbar && (
        <ArborDataTableToolbar
          selectedRowCount={selectedRowCount}
          bulkActions={bulkActions}
          onBulkAction={(action, rows) => action.handler(rows)}
          hiddenColumnCount={hiddenColumnCount}
          onHideColumnsClick={showHideColumns ? () => {} : undefined}
          showUndoRedo={true}
          undoDisabled={true}
          redoDisabled={true}
          showSearch={showSearch}
          searchValue={searchInputValue}
          onSearchChange={setSearchInputValue}
          showTips={true}
          tipsDisabled={true}
          showSettings={true}
          rowSize={rowSize}
          columnBorders={columnBorders}
          cellBorders={cellBorders}
          onRowSizeChange={setRowSize}
          onColumnBordersChange={setColumnBorders}
          onCellBordersChange={setCellBorders}
          onResetTable={handleResetTable}
          showHelp={!!onHelp}
          onHelpClick={typeof onHelp === 'function' ? onHelp : undefined}
          showExpand={showExpandButton}
          isFullScreen={isFullScreen}
          onExpandClick={handleExpandClick}
          downloads={downloads}
          gridApi={gridApi ?? undefined}
          onDownload={() => {}}
        />
      )}

      <div className="ag-grid-container">
        <AgGridReact<T>
          key={tableId}
          ref={gridRef}
          rowData={datasource ? undefined : rowData}
          serverSideDatasource={datasource}
          columnDefs={effectiveColumnDefs}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            ...defaultColDef,
          }}
          getRowId={(params) => getRowId(params.data)}
          rowHeight={34}
          rowSelection={rowSelection ? 'multiple' : undefined}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          onRowClicked={onRowClick ? (e) => e.data && onRowClick(e.data) : undefined}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[25, 50, 100]}
          suppressPaginationPanel={true}
          rowClassRules={rowClassRules}
          animateRows={true}
          domLayout="normal"
          loading={datasource ? undefined : false}
          components={gridComponents}
          overlayComponentParams={
            noRowsOverlayComponentParams != null
              ? { noRows: noRowsOverlayComponentParams }
              : undefined
          }
        />
      </div>

      <ArborDataTableFooter
        statusText={statusText}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[25, 50, 100]}
        showExpand={showExpandButton}
        onExpandClick={handleExpandClick}
      />
    </div>
  );

  if (title != null || collapsible) {
    return (
      <Section
        title={title}
        expandable={collapsible}
        defaultExpanded={!defaultCollapsed}
      >
        {content}
      </Section>
    );
  }

  return content;
}
