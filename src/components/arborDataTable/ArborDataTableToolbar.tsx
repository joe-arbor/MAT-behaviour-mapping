import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Search,
  Settings,
  HelpCircle,
  Maximize2,
  Minimize2,
  Pencil,
  Undo2,
  Redo2,
  ClipboardCheck,
  CheckSquare,
} from 'lucide-react';
import { Button } from '../button/Button';
import type { BulkActionSpec, DownloadSpec } from './arborDataTableTypes';
import './arborDataTable.scss';

export type TableRowSize = 'extraSmall' | 'small' | 'medium' | 'large';

export interface ArborDataTableToolbarProps {
  /** Selected row count; bulk action disabled when 0 */
  selectedRowCount: number;
  bulkActions?: BulkActionSpec[];
  onBulkAction?: (action: BulkActionSpec, selectedRows: any[]) => void;
  /** Hidden column count; label "Hide columns" vs "X columns hidden" */
  hiddenColumnCount: number;
  onHideColumnsClick?: () => void;
  /** Undo/Redo (32×32 icon buttons) */
  showUndoRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  undoDisabled?: boolean;
  redoDisabled?: boolean;
  /** Search — on the right */
  showSearch?: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  /** Tips button (32×32, disabled) */
  showTips?: boolean;
  tipsDisabled?: boolean;
  onTipsClick?: () => void;
  /** Settings: row size + cell/column borders */
  showSettings?: boolean;
  rowSize?: TableRowSize;
  columnBorders?: boolean;
  cellBorders?: boolean;
  onRowSizeChange?: (size: TableRowSize) => void;
  onColumnBordersChange?: (on: boolean) => void;
  onCellBordersChange?: (on: boolean) => void;
  onResetTable?: () => void;
  /** Help */
  showHelp?: boolean;
  onHelpClick?: () => void;
  /** Full screen toggle */
  showExpand?: boolean;
  isFullScreen?: boolean;
  onExpandClick?: () => void;
  /** Optional download (can be in toolbar if provided) */
  downloads?: DownloadSpec[];
  onDownload?: (spec: DownloadSpec) => void;
  gridApi?: any;
  /** Legacy: selection toggle */
  showSelectionToggle?: boolean;
  onSelectionToggleClick?: () => void;
}

const ROW_SIZE_LABELS: Record<TableRowSize, string> = {
  extraSmall: 'Extra small',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
};

export function ArborDataTableToolbar({
  selectedRowCount,
  bulkActions = [],
  onBulkAction,
  hiddenColumnCount,
  onHideColumnsClick,
  showUndoRedo,
  onUndo,
  onRedo,
  undoDisabled,
  redoDisabled,
  showSearch,
  searchValue,
  onSearchChange,
  showTips = true,
  tipsDisabled = true,
  onTipsClick,
  showSettings,
  rowSize = 'medium',
  columnBorders,
  cellBorders,
  onRowSizeChange,
  onColumnBordersChange,
  onCellBordersChange,
  onResetTable,
  showHelp,
  onHelpClick,
  showExpand,
  isFullScreen,
  onExpandClick,
  downloads = [],
  onDownload,
  gridApi,
  showSelectionToggle,
  onSelectionToggleClick,
}: ArborDataTableToolbarProps) {
  const [bulkOpen, setBulkOpen] = useState(false);
  const [hideColsOpen, setHideColsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    const close = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setSettingsOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [settingsOpen]);

  const handleBulkAction = (action: BulkActionSpec) => {
    if (gridApi && onBulkAction) {
      const rows = gridApi.getSelectedRows();
      onBulkAction(action, rows);
    }
    setBulkOpen(false);
  };

  const handleDownload = (spec: DownloadSpec) => {
    if (gridApi && spec.handler) spec.handler(gridApi);
    onDownload?.(spec);
    setDownloadOpen(false);
  };

  return (
    <div className="ds-arbor-table-toolbar">
      {/* Left: Bulk action (primary green + dropdown), Undo, Redo, Hide columns */}
      <div className="ds-arbor-table-toolbar__left">
        {bulkActions.length > 0 && (
          <div className="ds-arbor-table-toolbar__bulk">
            <Button
              variant="primary"
              color="green"
              size="medium"
              disabled={selectedRowCount === 0}
              onClick={() => setBulkOpen(!bulkOpen)}
              iconLeft={<Pencil size={16} />}
            >
              Bulk action
            </Button>
            <button
              type="button"
              className="ds-arbor-table-toolbar__caret"
              aria-expanded={bulkOpen}
              onClick={() => setBulkOpen(!bulkOpen)}
              disabled={selectedRowCount === 0}
            >
              <ChevronDown size={16} />
            </button>
            {bulkOpen && (
              <ul className="ds-arbor-table-toolbar__menu">
                {bulkActions.map((action) => (
                  <li key={action.id}>
                    <button type="button" onClick={() => handleBulkAction(action)}>
                      {action.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showUndoRedo && (
          <>
            <button
              type="button"
              className="ds-arbor-table-toolbar__icon-32"
              onClick={onUndo}
              disabled={undoDisabled}
              title="Undo"
              aria-label="Undo"
            >
              <Undo2 size={18} />
            </button>
            <button
              type="button"
              className="ds-arbor-table-toolbar__icon-32"
              onClick={onRedo}
              disabled={redoDisabled}
              title="Redo"
              aria-label="Redo"
            >
              <Redo2 size={18} />
            </button>
          </>
        )}

        {onHideColumnsClick != null && (
          <div className="ds-arbor-table-toolbar__hide-cols">
            <Button
              variant="secondary"
              color="grey"
              size="medium"
              onClick={() => setHideColsOpen(!hideColsOpen)}
            >
              {hiddenColumnCount === 0 ? 'Hide columns' : `${hiddenColumnCount} columns hidden`}
              <ChevronDown size={14} className="ds-arbor-table-toolbar__caret-inline" />
            </Button>
            {hideColsOpen && (
              <ul className="ds-arbor-table-toolbar__menu">
                <li>
                  <button type="button" onClick={() => { onHideColumnsClick(); setHideColsOpen(false); }}>
                    Column visibility panel (placeholder)
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Right: Search, Tips (32×32 disabled), Settings, Help, Full screen */}
      <div className="ds-arbor-table-toolbar__right">
        {showSearch && (
          <div className="ds-arbor-table-toolbar__search">
            <Search size={16} aria-hidden />
            <input
              type="search"
              placeholder="Search this table"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="ds-arbor-table-toolbar__search-input"
            />
          </div>
        )}

        {downloads.length > 0 && (
          <div className="ds-arbor-table-toolbar__download">
            <Button
              variant="secondary"
              size="medium"
              onClick={() => setDownloadOpen(!downloadOpen)}
            >
              Download
              <ChevronDown size={14} className="ds-arbor-table-toolbar__caret-inline" />
            </Button>
            {downloadOpen && (
              <ul className="ds-arbor-table-toolbar__menu ds-arbor-table-toolbar__menu--right">
                {downloads.map((d) => (
                  <li key={d.id}>
                    <button type="button" onClick={() => handleDownload(d)}>
                      {d.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showTips && (
          <button
            type="button"
            className="ds-arbor-table-toolbar__icon-32"
            onClick={onTipsClick}
            disabled={tipsDisabled}
            title="Tips"
            aria-label="Tips"
          >
            <ClipboardCheck size={18} />
          </button>
        )}

        {showSettings && (
          <div className="ds-arbor-table-toolbar__settings" ref={settingsRef}>
            <button
              type="button"
              className="ds-arbor-table-toolbar__icon-32"
              onClick={() => setSettingsOpen(!settingsOpen)}
              title="Settings"
              aria-label="Table settings"
              aria-expanded={settingsOpen}
            >
              <Settings size={18} />
            </button>
            {settingsOpen && (
              <div className="ds-arbor-table-toolbar__menu ds-arbor-table-toolbar__menu--right ds-arbor-table-toolbar__settings-menu">
                {onResetTable && (
                  <button type="button" className="ds-arbor-table-toolbar__menu-item" onClick={() => { onResetTable(); setSettingsOpen(false); }}>
                    Reset table
                  </button>
                )}
                <div className="ds-arbor-table-toolbar__menu-section">Row size</div>
                {(['extraSmall', 'small', 'medium', 'large'] as TableRowSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="ds-arbor-table-toolbar__menu-item"
                    onClick={() => { onRowSizeChange?.(size); }}
                  >
                    {ROW_SIZE_LABELS[size]}
                    {rowSize === size && ' ✓'}
                  </button>
                ))}
                {onColumnBordersChange != null && (
                  <>
                    <div className="ds-arbor-table-toolbar__menu-section">Borders</div>
                    <label className="ds-arbor-table-toolbar__menu-item ds-arbor-table-toolbar__menu-item--checkbox">
                      <input
                        type="checkbox"
                        checked={columnBorders ?? false}
                        onChange={(e) => onColumnBordersChange(e.target.checked)}
                      />
                      Column borders
                    </label>
                    {onCellBordersChange != null && (
                      <label className="ds-arbor-table-toolbar__menu-item ds-arbor-table-toolbar__menu-item--checkbox">
                        <input
                          type="checkbox"
                          checked={cellBorders ?? false}
                          onChange={(e) => onCellBordersChange(e.target.checked)}
                        />
                        Cell borders
                      </label>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {showHelp && (
          <button
            type="button"
            className="ds-arbor-table-toolbar__icon-32"
            onClick={onHelpClick}
            title="Help"
            aria-label="Open help centre"
          >
            <HelpCircle size={18} />
          </button>
        )}

        {showExpand && onExpandClick && (
          <button
            type="button"
            className={`ds-arbor-table-toolbar__icon-32 ${isFullScreen ? 'ds-arbor-table-toolbar__icon-32--active' : ''}`}
            onClick={onExpandClick}
            title={isFullScreen ? 'Exit full screen' : 'Full screen'}
            aria-label={isFullScreen ? 'Exit full screen' : 'Full screen'}
          >
            {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        )}

        {showSelectionToggle && (
          <button
            type="button"
            className="ds-arbor-table-toolbar__icon-32"
            onClick={onSelectionToggleClick}
            title="Selection"
            aria-label="Toggle selection"
          >
            <CheckSquare size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
