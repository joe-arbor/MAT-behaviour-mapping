import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
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
  staff: 'Staff',
  pages: 'Pages',
  helpCentre: 'Help Centre articles',
  favourites: 'Favourites',
};

const CATEGORY_ORDER: SearchCategory[] = ['staff', 'pages', 'helpCentre', 'favourites'];

export interface SearchPopoverPanelProps {
  open: boolean;
  onClose: () => void;
  query: string;
  activeCategory: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
  currentOnly: boolean;
  onCurrentOnlyChange: (value: boolean) => void;
  /** Grouped results; empty when no query = empty state. */
  resultGroups: SearchResultGroup[];
  /** Called when user clicks a result (panel should close after) */
  onResultSelect?: () => void;
  /** Ref of the anchor (search input) for positioning */
  anchorRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export const SearchPopoverPanel: React.FC<SearchPopoverPanelProps> = ({
  open,
  onClose,
  query,
  activeCategory,
  onCategoryChange,
  currentOnly,
  onCurrentOnlyChange,
  resultGroups,
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
      id="global-search-panel"
      ref={panelRef}
      className={classnames('ds-global-search__panel', className)}
      role="dialog"
      aria-label="Search"
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
        {!isEmpty && !hasResults && (
          <p className="ds-global-search__empty-hint">No results for &quot;{query}&quot;.</p>
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
                  {group.items.map((item) => {
                    const href = item.href ?? '#';
                    const isInternal = href.startsWith('/') && !href.startsWith('//');
                    const linkContent = (
                      <>
                        {item.isCustomReport && '**** '}
                        <span className="ds-global-search__result-label">{highlightQuery(item.label, query)}</span>
                        {item.breadcrumb && (
                          <span className="ds-global-search__result-breadcrumb">{highlightQuery(item.breadcrumb, query)}</span>
                        )}
                      </>
                    );
                    const linkProps = {
                      className: 'ds-global-search__result-link',
                      onClick: () => {
                        onResultSelect?.();
                        onClose();
                      },
                    };
                    return (
                      <li key={item.id}>
                        {isInternal ? (
                          <Link to={href} {...linkProps}>
                            {linkContent}
                          </Link>
                        ) : (
                          <a href={href} {...linkProps}>
                            {linkContent}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
