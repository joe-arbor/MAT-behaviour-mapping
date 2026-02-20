import { Maximize2 } from 'lucide-react';
import { Button } from '../button/Button';
import './arborDataTable.scss';

export interface ArborDataTableFooterProps {
  /** Left: "Showing X results" or "You have selected N row(s)" */
  statusText: string;
  /** Current page (1-based) */
  currentPage: number;
  /** Page size */
  pageSize: number;
  /** Total pages */
  totalPages: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  /** Right: Expand table button */
  showExpand?: boolean;
  onExpandClick?: () => void;
}

export function ArborDataTableFooter({
  statusText,
  currentPage,
  pageSize,
  totalPages: totalPagesProp,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [25, 50, 100],
  showExpand,
  onExpandClick,
}: ArborDataTableFooterProps) {
  const totalPages = totalPagesProp || 1;
  return (
    <div className="ds-arbor-table-footer">
      <div className="ds-arbor-table-footer__left">
        <span className="ds-arbor-table-footer__status">{statusText}</span>
      </div>
      <div className="ds-arbor-table-footer__center">
        <div className="ds-arbor-table-footer__pagination">
          <button
            type="button"
            className="ds-arbor-table-footer__page-btn"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span className="ds-arbor-table-footer__page-info">
            {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="ds-arbor-table-footer__page-btn"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages || totalPages === 0}
            aria-label="Next page"
          >
            ›
          </button>
          <select
            className="ds-arbor-table-footer__page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="ds-arbor-table-footer__right">
        {showExpand && onExpandClick && (
          <Button variant="secondary" size="small" onClick={onExpandClick}>
            <Maximize2 size={16} />
            Expand table
          </Button>
        )}
      </div>
    </div>
  );
}
