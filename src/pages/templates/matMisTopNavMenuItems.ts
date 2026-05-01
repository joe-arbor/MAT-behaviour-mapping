import type { TopNavMenuItem } from '../../components/topNav';

/**
 * MAT MIS top navigation (multi-academy / trust). Replace placeholder `href` values with real routes as needed.
 */
export const matMisTopNavMenuItems: TopNavMenuItem[] = [
  {
    id: 'my-items',
    label: 'My Items',
    children: [
      { id: 'mat-my-account', label: 'My Account', href: '#' },
      { id: 'mat-my-permissions', label: 'My Permissions', href: '#' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    children: [
      { id: 'mat-analytics-group-context', label: 'Group Context', href: '#' },
      { id: 'mat-analytics-attendance', label: 'Attendance', href: '#' },
      {
        id: 'mat-analytics-behaviour',
        label: 'Behaviour',
        children: [
          {
            id: 'mat-behaviour-category-reporting',
            label: 'Behaviour Categories',
            children: [
              {
                id: 'mat-behaviour-category-reporting-page',
                label: 'Category Analysis',
                href: '/templates/mat-mis/behaviour/category-reporting',
              },
              {
                id: 'mat-behaviour-category-mapping',
                label: 'Map Behaviour Types',
                href: '/templates/mat-mis/behaviour/category-mapping',
              },
              {
                id: 'mat-behaviour-category-setup',
                label: 'Manage Categories',
                href: '/templates/mat-mis/behaviour/category-setup',
              },
            ],
          },
          { id: 'mat-behaviour-dashboard', label: 'Dashboard', href: '#' },
          { id: 'mat-behaviour-exclusions-dashboard', label: 'Exclusions Dashboard', href: '#' },
          { id: 'mat-behaviour-school-summary', label: 'School Summary', href: '#' },
          { id: 'mat-behaviour-student-summary', label: 'Student Summary', href: '#' },
          { id: 'mat-behaviour-suspensions-group', label: 'Student Suspensions Across Group', href: '#' },
          { id: 'mat-behaviour-suspensions-dashboard', label: 'Suspensions Dashboard', href: '#' },
          { id: 'mat-behaviour-trends', label: 'Trends', href: '#' },
          { id: 'mat-behaviour-week-by-week', label: 'Week by Week', href: '#' },
        ],
      },
      { id: 'mat-analytics-assessment', label: 'Assessment', href: '#', hasSubmenu: true },
      { id: 'mat-analytics-staff-hr', label: 'Staff/HR', href: '#', hasSubmenu: true },
      { id: 'mat-analytics-custom-report-writer', label: 'Custom Report Writer', href: '#' },
      { id: 'mat-analytics-live-feeds', label: 'Live Feeds', href: '#' },
      { id: 'mat-analytics-thresholds', label: 'Thresholds', href: '#' },
      { id: 'mat-analytics-census-audit', label: 'Census Audit', href: '#' },
      { id: 'mat-analytics-parental-engagement', label: 'Parental Engagement', href: '#' },
      { id: 'mat-analytics-school-year-setup-audit', label: 'School Year Setup Audit', href: '#' },
      { id: 'mat-analytics-bi-viewer', label: 'BI Viewer', href: '#', hasSubmenu: true },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    children: [
      { id: 'mat-admin-academic-years', label: 'Academic Years', href: '#' },
      { id: 'mat-admin-arbor-workflows', label: 'Arbor Workflows', href: '#', hasSubmenu: true },
      { id: 'mat-admin-assessment', label: 'Assessment', href: '#', hasSubmenu: true },
      { id: 'mat-admin-communications', label: 'Communications', href: '#', hasSubmenu: true },
      { id: 'mat-admin-entity-import', label: 'Entity Import', href: '#' },
      { id: 'mat-admin-group-details', label: 'Group Details', href: '#' },
      { id: 'mat-admin-pushdowns', label: 'Pushdowns', href: '#', hasSubmenu: true },
      { id: 'mat-admin-user-defined-fields', label: 'User Defined Fields', href: '#' },
    ],
  },
  {
    id: 'institutions',
    label: 'Institutions',
    children: [
      { id: 'mat-inst-browse', label: 'Browse Institutions', href: '#' },
      { id: 'mat-inst-clusters', label: 'Clusters', href: '#' },
      { id: 'mat-inst-data-sharing', label: 'Data Sharing Agreements', href: '#' },
      { id: 'mat-inst-linked-orgs', label: 'Linked Organisations', href: '#' },
      { id: 'mat-inst-login-mis', label: 'Login to MIS', href: '#' },
      { id: 'mat-inst-ofsted', label: 'Ofsted Inspections', href: '#' },
    ],
  },
  {
    id: 'group-staff',
    label: 'Group Staff',
    children: [
      { id: 'mat-staff-absences', label: 'Absences', href: '#', hasSubmenu: true },
      { id: 'mat-staff-access-control', label: 'Access Control', href: '#', hasSubmenu: true },
      { id: 'mat-staff-add-new', label: 'Add New Staff Member', href: '#' },
      { id: 'mat-staff-browse', label: 'Browse Staff', href: '#', hasSubmenu: true },
      { id: 'mat-staff-hr-admin', label: 'HR Admin', href: '#', hasSubmenu: true },
      { id: 'mat-staff-positions', label: 'Positions', href: '#' },
      { id: 'mat-staff-scr', label: 'Single Central Record', href: '#', hasSubmenu: true },
      { id: 'mat-staff-development', label: 'Staff Development', href: '#', hasSubmenu: true },
      { id: 'mat-staff-users-security', label: 'Users & Security', href: '#', hasSubmenu: true },
    ],
  },
];
