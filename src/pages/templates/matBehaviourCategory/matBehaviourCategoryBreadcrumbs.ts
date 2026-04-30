import type { BreadcrumbDropdownItem, BreadcrumbItem } from '../../../components/breadcrumbs';

export type MatBehaviourCategoryBreadcrumbLabel =
  | 'Category Analysis'
  | 'Map Behaviour Types'
  | 'Manage Categories';

const BEHAVIOUR_CATEGORY_PAGES: Record<
  MatBehaviourCategoryBreadcrumbLabel,
  BreadcrumbDropdownItem
> = {
  'Category Analysis': {
    label: 'Category Analysis',
    href: '/templates/mat-mis/behaviour/category-reporting',
  },
  'Map Behaviour Types': {
    label: 'Map Behaviour Types',
    href: '/templates/mat-mis/behaviour/category-mapping',
  },
  'Manage Categories': {
    label: 'Manage Categories',
    href: '/templates/mat-mis/behaviour/category-setup',
  },
};

export function buildMatBehaviourCategoryBreadcrumbs(
  currentPage: MatBehaviourCategoryBreadcrumbLabel,
): BreadcrumbItem[] {
  return [
    { label: 'MAT MIS', href: '/templates/mat-mis' },
    { label: 'Analytics', href: '#' },
    { label: 'Behaviour', href: '#' },
    {
      label: 'Behaviour Categories',
      dropdownItems: Object.values(BEHAVIOUR_CATEGORY_PAGES),
    },
    { label: currentPage, isCurrent: true },
  ];
}
