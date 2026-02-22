import React, { useState, useRef, useMemo } from 'react';
import classnames from 'classnames';
import { Search, X } from 'lucide-react';
import { SearchPopoverPanel } from './SearchPopoverPanel';
import type { SearchCategory, SearchResultGroup, SearchResultItem } from './globalSearchTypes';
import './globalSearch.scss';

/** Mock: filter items by query (simple substring match) and optionally scope to category. */
function getMockResultGroups(
  query: string,
  _category: SearchCategory,
  showFavouritesFirst: boolean
): SearchResultGroup[] {
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
    { id: 'p3', label: 'Attendance Over Time', breadcrumb: 'Students > Attendance', href: '#' },
    { id: 'p4', label: 'Raw Attendance Marks', breadcrumb: 'Students > Attendance > Admin', href: '#' },
    { id: 'p5', label: 'Daily Attendance', breadcrumb: 'Students > Attendance > Registers', href: '#' },
    { id: 'p6', label: 'Daily Attendance', breadcrumb: 'Students > Behaviour > Internal Exclusions', href: '#' },
    { id: 'p7', label: 'Course Attendance', breadcrumb: 'School > All Staff > Staff Development > Training Courses', href: '#' },
    { id: 'p8', label: 'Dashboard', breadcrumb: 'Students > Attendance', href: '#' },
    { id: 'p9', label: 'Behaviour', breadcrumb: 'Students', href: '#' },
    { id: 'p10', label: 'Behaviour Setup', breadcrumb: 'Students > Behaviour', href: '#' },
    { id: 'p11', label: 'Recorded Behaviour', breadcrumb: 'School > All Staff', href: '#' },
    { id: 'p12', label: 'Dashboard', breadcrumb: 'Students > Behaviour > Incidents', href: '#' },
    { id: 'p13', label: 'Reporting', breadcrumb: 'Students > Behaviour > Incidents', href: '#' },
    { id: 'p14', label: 'Dashboard', breadcrumb: 'Students > Behaviour > Detentions', href: '#' },
    { id: 'p15', label: 'Report', breadcrumb: 'Students > Behaviour > Detentions', href: '#' },
    { id: 'p16', label: 'Today', breadcrumb: 'Students > Behaviour > Detentions', href: '#' },
  ];
  const allCustomReports: SearchResultItem[] = [
    { id: 'c1', label: 'Attendance : Pupil Data Over Time', isCustomReport: true, href: '#' },
    { id: 'c2', label: 'GB Report : Attendance Whole School and Yr Group', isCustomReport: true, href: '#' },
    { id: 'c3', label: 'Attendance Report with Calculated fields', isCustomReport: true, href: '#' },
    { id: 'c4', label: 'Behaviour Today', isCustomReport: true, href: '#' },
    { id: 'c5', label: 'Governors Behaviour Report', isCustomReport: true, href: '#' },
  ];

  const match = (item: SearchResultItem) =>
    item.label.toLowerCase().includes(q) ||
    (item.breadcrumb?.toLowerCase().includes(q) ?? false);

  const favourites = allFavourites.filter(match);
  const pages = allPages.filter(match);
  const customReports = allCustomReports.filter(match);

  const groups: SearchResultGroup[] = [];
  if (showFavouritesFirst && favourites.length > 0) {
    groups.push({ title: 'Favourites', count: favourites.length, items: favourites });
  }
  if (pages.length > 0) {
    groups.push({ title: 'Pages', count: pages.length, items: pages.slice(0, 8), showAllHref: '#' });
  }
  if (customReports.length > 0) {
    groups.push({ title: 'Custom Report', count: customReports.length, items: customReports });
  }
  return groups;
}

export interface GlobalSearchInputProps {
  placeholder?: string;
  /** Called when user submits (Enter) or clicks "View all results" */
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
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('pages');
  const [currentOnly, setCurrentOnly] = useState(true);
  const [showFavouritesFirst] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPanelOpen = isFocused || query.length >= 1;

  const resultGroups = useMemo(
    () => getMockResultGroups(query, activeCategory, showFavouritesFirst),
    [query, activeCategory, showFavouritesFirst]
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

  const handleViewAllResults = () => {
    if (query.trim()) onSearch?.(query.trim());
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
        showFavouritesFirst={showFavouritesFirst}
        resultGroups={resultGroups}
        onViewAllResults={handleViewAllResults}
        onResultSelect={onResultSelect}
        anchorRef={wrapperRef}
      />
    </div>
  );
};
