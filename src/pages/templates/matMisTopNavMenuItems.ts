import type { TopNavMenuItem } from '../../components/topNav';

/**
 * MAT MIS top navigation (multi-academy / trust). Replace placeholder children with real routes as needed.
 */
export const matMisTopNavMenuItems: TopNavMenuItem[] = [
  {
    id: 'my-items',
    label: 'My Items',
    children: [
      { id: 'mat-my-account', label: 'My Account', href: '#' },
      { id: 'mat-my-homepage', label: 'My Homepage', href: '#' },
      { id: 'mat-my-permissions', label: 'My Permissions', href: '#' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    children: [
      { id: 'mat-analytics-overview', label: 'Overview', href: '#' },
      { id: 'mat-analytics-cohorts', label: 'Cohorts', href: '#' },
      { id: 'mat-analytics-reports', label: 'Reports', href: '#' },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    children: [
      { id: 'mat-admin-users', label: 'Users & Security', href: '#' },
      { id: 'mat-admin-data', label: 'Data & Integrations', href: '#' },
      { id: 'mat-admin-billing', label: 'Billing', href: '#' },
    ],
  },
  {
    id: 'institutions',
    label: 'Institutions',
    children: [
      { id: 'mat-inst-schools', label: 'Schools & Academies', href: '#' },
      { id: 'mat-inst-structure', label: 'Group Structure', href: '#' },
    ],
  },
  {
    id: 'group-staff',
    label: 'Group Staff',
    children: [
      { id: 'mat-staff-directory', label: 'Directory', href: '#' },
      { id: 'mat-staff-roles', label: 'Roles', href: '#' },
    ],
  },
  {
    id: 'system',
    label: 'System',
    children: [
      { id: 'mat-sys-settings', label: 'System Settings', href: '#' },
      { id: 'mat-sys-audit', label: 'Audit', href: '#' },
    ],
  },
];
