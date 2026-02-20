import type { ReactNode } from 'react';
import type { ColDef } from 'ag-grid-community';

/** Unique id for persisting table state (columns, sort, filter, page size). */
export type TableId = string;

/** Bulk action item: id, label, optional icon, optional confirm, handler with selected rows. */
export interface BulkActionSpec {
  id: string;
  label: string;
  icon?: ReactNode;
  requiresConfirm?: boolean;
  handler: (selectedRows: any[]) => void;
}

/** Download option: id, label, handler receives gridApi. */
export interface DownloadSpec {
  id: string;
  label: string;
  handler: (gridApi: any) => void;
}

/** Tooltip config: local (immediate) or remote (fetch), with getters. */
export interface TooltipSpec {
  mode: 'local' | 'remote';
  localGetter?: (row: any, colId?: string) => string;
  remoteGetter?: (rowId: string, colId?: string) => Promise<string>;
}

/** Aggregation column: colId and function. */
export interface AggregationColumnSpec {
  colId: string;
  fn: 'avg' | 'sum' | 'count';
}

/** Row style rule: when(row) and className to apply. */
export interface RowStyleRule {
  when: (row: any) => boolean;
  className: string;
}

/** Persisted state keys (per tableId). */
export interface TableState {
  sortModel?: any[];
  filterModel?: any;
  hiddenCols?: string[];
  columnOrder?: string[];
  columnWidths?: Record<string, number>;
  pageSize?: number;
}

/** ArborDataTable props (subset for first implementation; extend as needed). */
export interface ArborDataTableProps<T = any> {
  tableId: TableId;
  title?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  /** Client-side: pass row array. */
  rowData?: T[];
  /** Server-side: pass datasource with getRows. */
  datasource?: { getRows: (params: any) => void };
  getRowId: (row: T) => string;
  columnDefs: ColDef<T>[];
  defaultColDef?: ColDef<T>;
  /** Enable row selection (checkbox column). */
  rowSelection?: boolean;
  bulkActions?: BulkActionSpec[];
  downloads?: DownloadSpec[];
  onRowClick?: (row: T) => void;
  rowTooltip?: TooltipSpec;
  cellTooltip?: TooltipSpec;
  aggregation?: { pinnedBottom: boolean; columns: AggregationColumnSpec[] };
  rowStyleRules?: RowStyleRule[];
  initialState?: Partial<TableState>;
  /** Show toolbar: bulk action, hide columns, search, download, icon cluster. */
  showToolbar?: boolean;
  showHideColumns?: boolean;
  showSearch?: boolean;
  showDownload?: boolean;
  showExpandButton?: boolean;
  /** Search debounce ms. */
  searchDebounceMs?: number;
  /** Default page size. */
  defaultPageSize?: number;
  onExpandTable?: () => void;
  /** Help link or handler. */
  onHelp?: () => void | string;
  className?: string;
}
