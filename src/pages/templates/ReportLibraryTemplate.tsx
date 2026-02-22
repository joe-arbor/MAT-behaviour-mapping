import { useState } from 'react';
import classnames from 'classnames';
import { PanelLeftClose, PanelRightOpen, Search, Plus, ChevronRight } from 'lucide-react';
import { TopNav } from '../../components/topNav';
import { Sidebar } from '../../components/sidebar';
import { SideMenu, SideMenuItem } from '../../components/sideMenu';
import { Breadcrumbs, BreadcrumbItem } from '../../components/breadcrumbs';
import { Button } from '../../components/button/Button';
import { Checkbox } from '../../components/formField/Checkbox';
import './templatePage.scss';
import './dailyAttendanceTemplate.scss';
import './reportLibraryTemplate.scss';

const REPORTING_MENU_ITEMS: SideMenuItem[] = [
  { id: 'report-library', label: 'Report Library', href: '/templates/report-library', isFavorite: true },
  { id: 'template-library', label: 'Template Library', href: '#', isFavorite: false },
  {
    id: 'smart-reports',
    label: 'Smart Reports',
    href: '#',
    isFavorite: false,
    children: [{ id: 'smart-reports-sub', label: 'Smart Reports', href: '#' }],
  },
];

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'Reporting', href: '#' },
  { label: 'Report Library', isCurrent: true },
];

const CATEGORY_PILLS = [
  'All',
  'Students',
  'Enrolment',
  'Attendance',
  'Behaviour',
  'Assessments',
  'Assignments',
  'Staff',
  'Parents',
  'Interventions',
  'Cover',
  'Meals',
  'Payments',
  'Clubs',
  'Trips',
  'Admin',
  'School',
  'Medical',
  'SEN',
  'Pastoral',
  'Child Protection Note',
  'Safeguarding',
  'In Care Notes',
];

interface ReportCardData {
  id: string;
  title: string;
  description: string;
  type: 'arbor' | 'custom';
}

const MOCK_REPORTS: ReportCardData[] = [
  {
    id: '1',
    title: 'Medical : Events',
    description:
      'This report is about Medical Events this academic year. It is showing data about Medical Events.',
    type: 'custom',
  },
  {
    id: '2',
    title: 'Attendance : Pupil Data Over Time',
    description: 'Shows pupil attendance data over a selected time period with trends and summaries.',
    type: 'arbor',
  },
  {
    id: '3',
    title: 'Student Profile Report',
    description: 'Detailed profile for a single student including demographics, attendance and behaviour.',
    type: 'arbor',
  },
  {
    id: '4',
    title: 'Behaviour Today',
    description: 'Summary of behaviour incidents and positive events recorded today.',
    type: 'arbor',
  },
  {
    id: '5',
    title: 'Leavers',
    description: 'List of students who have left or are due to leave, with leaver reason and date.',
    type: 'custom',
  },
  {
    id: '6',
    title: 'SEN Info',
    description: 'Overview of students with special educational needs and support plans.',
    type: 'arbor',
  },
  {
    id: '7',
    title: 'Account Balances',
    description: 'Current meal and payment account balances by student or family.',
    type: 'custom',
  },
  {
    id: '8',
    title: 'Assignments Overview',
    description: 'Summary of assignments set, due dates and completion status.',
    type: 'arbor',
  },
  {
    id: '9',
    title: 'Enrolment by Year Group',
    description: 'Enrolment counts and breakdown by year group and registration status.',
    type: 'arbor',
  },
  {
    id: '10',
    title: 'Cover Summary',
    description: 'Cover arrangements and uncovered sessions for a selected period.',
    type: 'custom',
  },
  {
    id: '11',
    title: 'Pastoral Overview',
    description: 'Pastoral structure, tutors and key contacts by year group.',
    type: 'arbor',
  },
  {
    id: '12',
    title: 'Safeguarding Log',
    description: 'Safeguarding concerns and follow-up actions (restricted access).',
    type: 'arbor',
  },
];

export function ReportLibraryTemplate() {
  const [arborBuiltIn, setArborBuiltIn] = useState(true);
  const [myCustom, setMyCustom] = useState(true);
  const [otherCustom, setOtherCustom] = useState(true);
  const [activePill, setActivePill] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(6);
  const [sideMenuOpen, setSideMenuOpen] = useState(true);

  const handleToggleFavorite = () => {};

  const leading = (
    <button
      type="button"
      className="template-page__breadcrumb-toggle"
      aria-label={sideMenuOpen ? 'Collapse side navigation' : 'Expand side navigation'}
      title={sideMenuOpen ? 'Collapse side navigation' : 'Expand side navigation'}
      onClick={() => setSideMenuOpen((prev) => !prev)}
    >
      {sideMenuOpen ? <PanelLeftClose size={18} aria-hidden /> : <PanelRightOpen size={18} aria-hidden />}
    </button>
  );

  const visibleReports = MOCK_REPORTS.slice(0, displayCount);

  return (
    <div className="template-page template-page--with-nav">
      <TopNav
        searchPlaceholder="Search or ask..."
        onAskArborClick={() => {}}
      />

      <div className={classnames('template-page__body', !sideMenuOpen && 'template-page__body--side-nav-closed')}>
        <Sidebar className="template-page__sidebar" />
        <SideMenu
          className="template-page__side-menu"
          pageTitle="Reporting"
          items={REPORTING_MENU_ITEMS}
          selectedId="report-library"
          onSelect={() => {}}
          onToggleFavorite={handleToggleFavorite}
        />

        <main className="template-page__content">
          <Breadcrumbs items={BREADCRUMB_ITEMS} leading={leading} />

          <div className="template-page__content-inner">
            <header className="template-page__content-header">
              <div className="template-page__content-header-top">
                <h1 className="template-page__content-title">Report Library</h1>
              </div>
              <div className="template-page__content-header-actions">
                <Button variant="primary" color="green" iconLeft={<Plus size={18} aria-hidden />}>
                  Create Report from Template
                </Button>
              </div>
            </header>

            <div className="report-library-filters">
              <div className="report-library-filters__checkboxes">
                <Checkbox
                  id="filter-arbor"
                  label="Arbor Built-In Reports"
                  checked={arborBuiltIn}
                  onChange={(e) => setArborBuiltIn(e.target.checked)}
                />
                <Checkbox
                  id="filter-my"
                  label="My Custom Reports"
                  checked={myCustom}
                  onChange={(e) => setMyCustom(e.target.checked)}
                />
                <Checkbox
                  id="filter-other"
                  label="Other Custom Reports"
                  checked={otherCustom}
                  onChange={(e) => setOtherCustom(e.target.checked)}
                />
              </div>
            </div>

            <div className="report-library-pills-row">
              <div className="report-library-pills-row__scroll">
                {CATEGORY_PILLS.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    className={`report-library-pill ${activePill === pill ? 'report-library-pill--active' : ''}`}
                    onClick={() => setActivePill(pill)}
                  >
                    {pill}
                  </button>
                ))}
              </div>
              <div className="report-library-pills-row__search">
                <label htmlFor="report-library-search" className="report-library-search__label">
                  <Search size={18} className="report-library-search__icon" aria-hidden />
                  <input
                    id="report-library-search"
                    type="search"
                    className="report-library-search__input"
                    placeholder="Search Reports"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search reports"
                  />
                </label>
              </div>
            </div>

            <div className="report-library-grid">
              {visibleReports.map((report) => (
                <article key={report.id} className="report-library-card">
                  <h2 className="report-library-card__title">{report.title}</h2>
                  <p className="report-library-card__description">{report.description}</p>
                  <div className="report-library-card__footer">
                    <span
                      className={`report-library-card__tag report-library-card__tag--${report.type}`}
                      aria-hidden
                    >
                      {report.type === 'arbor' ? 'Arbor Report' : 'Custom Report'}
                    </span>
                    <span className="report-library-card__arrow" aria-hidden>
                      <ChevronRight size={20} />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {displayCount < MOCK_REPORTS.length && (
              <div className="report-library-load-more">
                <Button
                  variant="primary"
                  color="green"
                  onClick={() => setDisplayCount((n) => Math.min(n + 9, MOCK_REPORTS.length))}
                >
                  Load More Reports
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
