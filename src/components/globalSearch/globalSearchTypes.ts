export type SearchCategory = 'staff' | 'pages' | 'helpCentre' | 'favourites';

export interface SearchResultItem {
  id: string;
  label: string;
  /** Optional breadcrumb path (e.g. "Students > Attendance > Registers") */
  breadcrumb?: string;
  href?: string;
  /** For custom reports, prefix with asterisks */
  isCustomReport?: boolean;
}

export interface SearchResultGroup {
  title: string;
  count?: number;
  items: SearchResultItem[];
  showAllHref?: string;
}
