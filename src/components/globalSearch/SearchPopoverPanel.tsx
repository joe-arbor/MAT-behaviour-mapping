import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import { Search } from 'lucide-react';
import type { SearchCategory, SearchResultGroup } from './globalSearchTypes';
import './globalSearch.scss';

/** Wrap case-insensitive matches of `query` in `text` with a highlight span. */
function highlightQuery(text: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;
  const lower = text.toLowerCase();
  const lowerQ = q.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let i = 0;
  while ((i = lower.indexOf(lowerQ, lastIndex)) !== -1) {
    if (i > lastIndex) parts.push(text.slice(lastIndex, i));
    parts.push(
      <mark key={i} className="ds-global-search__highlight" aria-hidden>
        {text.slice(i, i + q.length)}
      </mark>
    );
    lastIndex = i + q.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

const CATEGORY_LABELS: Record<SearchCategory, string> = {
  students: 'Students',
  staff: 'Staff',
  guardians: 'Guardians',
  customReports: 'Custom Reports',
  pages: 'Pages',
  helpCentre: 'Help Centre articles',
};

const CATEGORY_ORDER: SearchCategory[] = [
  'students',
  'staff',
  'guardians',
  'customReports',
  'pages',
  'helpCentre',
];

export interface SearchPopoverPanelProps {
  open: boolean;
  onClose: () => void;
  query: string;
  activeCategory: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
  currentOnly: boolean;
  onCurrentOnlyChange: (value: boolean) => void;
  showFavouritesFirst: boolean;
  /** Grouped results (e.g. Favourites, Pages, Custom Report). Empty when no query = empty state. */
  resultGroups: SearchResultGroup[];
  onViewAllResults: () => void;
  /** Called when user clicks a result (panel should close after) */
  onResultSelect?: () => void;
  /** Ref of the anchor (search input) for positioning */
  anchorRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

const EMPTY_STATE_MESSAGE = (
  <>
    Search for students, staff, pages and more. Or, start typing a question to browse Help Centre results.{' '}
    <a href="#" className="ds-global-search__help-link">Learn what you can search for in this Help Centre article.</a>
  </>
);

export const SearchPopoverPanel: React.FC<SearchPopoverPanelProps> = ({
  open,
  onClose,
  query,
  activeCategory,
  onCategoryChange,
  currentOnly,
  onCurrentOnlyChange,
  showFavouritesFirst,
  resultGroups,
  onViewAllResults,
  onResultSelect,
  anchorRef,
  className,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      ) return;
      onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const isEmpty = !query.trim();
  const hasResults = resultGroups.some((g) => g.items.length > 0);

  return (
    <div
      ref={panelRef}
      className={classnames('ds-global-search__panel', className)}
      role="dialog"
      aria-label="Search results"
    >
      <div className="ds-global-search__tabs">
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            className={classnames('ds-global-search__tab', {
              'ds-global-search__tab--active': activeCategory === cat,
            })}
            onClick={() => onCategoryChange(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {showFavouritesFirst && (
        <div className="ds-global-search__pill-row">
          <button type="button" className="ds-global-search__pill ds-global-search__pill--active">
            Favourites
          </button>
        </div>
      )}

      <div className="ds-global-search__filters">
        <label className="ds-global-search__checkbox-label">
          <input
            type="checkbox"
            className="ds-global-search__checkbox"
            checked={currentOnly}
            onChange={(e) => onCurrentOnlyChange(e.target.checked)}
          />
          <span>Current students, guardians, and staff only</span>
        </label>
      </div>

      <div className="ds-global-search__body">
        {isEmpty && (
          <p className="ds-global-search__empty-text">{EMPTY_STATE_MESSAGE}</p>
        )}
        {!isEmpty && !hasResults && (
          <p className="ds-global-search__empty-text">No results for "{query}".</p>
        )}
        {!isEmpty && hasResults && (
          <div className="ds-global-search__results">
            {resultGroups.map((group) => (
              <div key={group.title} className="ds-global-search__group">
                <div className="ds-global-search__group-header">
                  <span className="ds-global-search__group-title">
                    {group.title}
                    {group.count != null && ` (${group.count})`}
                  </span>
                  {group.showAllHref != null && (
                    <a href={group.showAllHref} className="ds-global-search__show-all">
                      Show all
                    </a>
                  )}
                </div>
                <ul className="ds-global-search__group-list" role="list">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href ?? '#'}
                        className="ds-global-search__result-link"
                        onClick={() => {
                          onResultSelect?.();
                          onClose();
                        }}
                      >
                        {item.isCustomReport && '**** '}
                        <span className="ds-global-search__result-label">{highlightQuery(item.label, query)}</span>
                        {item.breadcrumb && (
                          <span className="ds-global-search__result-breadcrumb">{highlightQuery(item.breadcrumb, query)}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <footer className="ds-global-search__footer">
          <button
            type="button"
            className="ds-global-search__view-all"
            onClick={() => {
              onViewAllResults();
              onClose();
            }}
          >
            <Search size={16} aria-hidden />
            View all results
          </button>
        </footer>
      )}
    </div>
  );
};
