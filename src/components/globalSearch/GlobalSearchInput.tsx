import React, { useState, useRef, useMemo } from 'react';
import classnames from 'classnames';
import { Search, X } from 'lucide-react';
import { SearchPopoverPanel } from './SearchPopoverPanel';
import type { SearchCategory, SearchResultGroup, SearchResultItem } from './globalSearchTypes';
import './globalSearch.scss';

/** Mock: filter items by query (simple substring match) and scope to active tab. */
function getMockResultGroups(query: string, category: SearchCategory): SearchResultGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const allFavourites: SearchResultItem[] = [
    { id: 'f1', label: 'Attendance', href: '#' },
    { id: 'f2', label: 'Daily Attendance', href: '#' },
    { id: 'f3', label: 'Behavioural Incidents Reporting', href: '#' },
    { id: 'f4', label: 'Log behaviour incident', href: '#' },
    { id: 'f5', label: 'Record Behaviour Points', href: '#' },
  ];
  const allPages: SearchResultItem[] = [
    { id: 'p0', label: 'Home', breadcrumb: 'Homepage', href: '/templates/home' },
    { id: 'report-library', label: 'Report Library', breadcrumb: 'Reporting', href: '/templates/report-library' },
    { id: 'browse-students', label: 'Browse Students', breadcrumb: 'Students', href: '/templates/browse-students' },
    { id: 'class-ks3-ma1', label: 'KS3 Mathematics: Year 8: 8y/Ma1', breadcrumb: 'School > Timetable > Class', href: '/templates/class' },
    { id: 'p1', label: 'Attendance', breadcrumb: 'Students', href: '#' },
    { id: 'p2', label: 'Attendance Fines', breadcrumb: 'Students > Attendance > Absentees', href: '#' },
  ];
  const allHelp: SearchResultItem[] = [
    { id: 'h1', label: 'How to take attendance from a register', href: '#' },
    { id: 'h2', label: 'Inviting guardians to the app', href: '#' },
    { id: 'h3', label: 'What you can search for in Arbor', href: '#' },
  ];
  const allStaff: SearchResultItem[] = [
    { id: 'st1', label: 'Alex Johnson', breadcrumb: 'Class Teacher', href: '#' },
    { id: 'st2', label: 'Pat Kelly', breadcrumb: 'SENCO', href: '#' },
  ];

  const match = (item: SearchResultItem) =>
    item.label.toLowerCase().includes(q) ||
    (item.breadcrumb?.toLowerCase().includes(q) ?? false);

  if (category === 'favourites') {
    const items = allFavourites.filter(match);
    if (!items.length) return [];
    return [{ title: 'Favourites', count: items.length, items: items.slice(0, 8) }];
  }
  if (category === 'pages') {
    const items = allPages.filter(match);
    if (!items.length) return [];
    return [{ title: 'Pages', count: items.length, items: items.slice(0, 8), showAllHref: '#' }];
  }
  if (category === 'helpCentre') {
    const items = allHelp.filter(match);
    if (!items.length) return [];
    return [{ title: 'Help Centre articles', count: items.length, items: items.slice(0, 8) }];
  }
  const items = allStaff.filter(match);
  if (!items.length) return [];
  return [{ title: 'Staff', count: items.length, items: items.slice(0, 8) }];
}

export interface GlobalSearchInputProps {
  placeholder?: string;
  /** Called when user submits (Enter) or selects a result */
  onSearch?: (value: string) => void;
  /** Called when user selects a result (navigate); panel closes */
  onResultSelect?: () => void;
  /** Optional class for the wrapper (e.g. to match TopNav search form width) */
  className?: string;
  /** Use TopNav styling (pill form) when true */
  variant?: 'default' | 'topNav';
}

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({
  placeholder = 'Search or ask...',
  onSearch,
  onResultSelect,
  className,
  variant = 'topNav',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('staff');
  const [currentOnly, setCurrentOnly] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPanelOpen = isFocused || query.length >= 1;

  const resultGroups = useMemo(
    () => getMockResultGroups(query, activeCategory),
    [query, activeCategory]
  );

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={classnames('ds-global-search', `ds-global-search--${variant}`, className)}
    >
      <form
        className="ds-global-search__form"
        onSubmit={handleSubmit}
        role="search"
      >
        <Search size={18} className="ds-global-search__icon" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          className="ds-global-search__input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {}}
          aria-label="Search"
          aria-expanded={isPanelOpen}
          aria-controls="global-search-panel"
        />
        {query.length > 0 && (
          <button
            type="button"
            className="ds-global-search__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={14} aria-hidden />
          </button>
        )}
      </form>

      <SearchPopoverPanel
        open={isPanelOpen}
        onClose={() => setIsFocused(false)}
        query={query}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        currentOnly={currentOnly}
        onCurrentOnlyChange={setCurrentOnly}
        resultGroups={resultGroups}
        onResultSelect={onResultSelect}
        anchorRef={wrapperRef}
      />
    </div>
  );
};
