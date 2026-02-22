import { useState } from 'react';
import classnames from 'classnames';
import { PanelLeftClose, PanelRightOpen, Search, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TopNav } from '../../components/topNav';
import { Sidebar } from '../../components/sidebar';
import { SideMenu, SideMenuItem } from '../../components/sideMenu';
import { Breadcrumbs, BreadcrumbItem } from '../../components/breadcrumbs';
import { Button } from '../../components/button/Button';
import './templatePage.scss';
import './dailyAttendanceTemplate.scss';
import './browseStudentsTemplate.scss';

const STUDENTS_MENU_ITEMS: SideMenuItem[] = [
  { id: 'browse-students', label: 'Browse Students', href: '/templates/browse-students', isFavorite: true },
  { id: 'leavers', label: 'Leavers', href: '#', isFavorite: false },
  { id: 'birthdays', label: 'Birthdays', href: '#', isFavorite: false },
  { id: 'bulk-export', label: 'Bulk Export', href: '#', isFavorite: false },
  { id: 'student-profiles', label: 'Student Profiles', href: '#', isFavorite: false },
  { id: 'data-collection-sheets', label: 'Data Collection Sheets', href: '#', isFavorite: false },
];

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'My Home', href: '/templates/home' },
  { label: 'Students', href: '#' },
  { label: 'All Students', href: '#' },
  { label: 'Browse Students', isCurrent: true },
];

interface StudentRow {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  year: string;
  form: string;
  enrollmentDate: string;
  hasPhoto?: boolean;
}

const MOCK_STUDENTS: StudentRow[] = [
  { id: '1', firstName: 'Andy', lastName: 'Adams', dob: '13 Feb 2011', year: 'Year 7', form: '7RH', enrollmentDate: '17 Aug 2008', hasPhoto: true },
  { id: '2', firstName: 'Daniel', lastName: 'Adams', dob: '5 Mar 2010', year: 'Year 8', form: '8AB', enrollmentDate: '2 Sep 2009' },
  { id: '3', firstName: 'Emily', lastName: 'Adams', dob: '22 Nov 2011', year: 'Year 7', form: '7RH', enrollmentDate: '1 Sep 2019', hasPhoto: true },
  { id: '4', firstName: 'Leanne', lastName: 'Adams', dob: '8 Jul 2009', year: 'Year 9', form: '9CD', enrollmentDate: '3 Sep 2015', hasPhoto: true },
  { id: '5', firstName: 'Oliver', lastName: 'Adams', dob: '14 Jan 2012', year: 'Year 6', form: '6EF', enrollmentDate: '5 Sep 2017' },
  { id: '6', firstName: 'Emma', lastName: 'Allen', dob: '30 May 2010', year: 'Year 8', form: '8AB', enrollmentDate: '1 Sep 2018' },
  { id: '7', firstName: 'James', lastName: 'Ahmed', dob: '19 Sep 2011', year: 'Year 7', form: '7RH', enrollmentDate: '2 Sep 2019' },
  { id: '8', firstName: 'Sofia', lastName: 'Ali', dob: '11 Dec 2009', year: 'Year 9', form: '9CD', enrollmentDate: '4 Sep 2016' },
  { id: '9', firstName: 'Liam', lastName: 'Anderson', dob: '3 Apr 2012', year: 'Year 6', form: '6EF', enrollmentDate: '1 Sep 2020' },
  { id: '10', firstName: 'Isla', lastName: 'Baker', dob: '27 Aug 2011', year: 'Year 7', form: '7RH', enrollmentDate: '2 Sep 2019' },
];

const PAGE_SIZE = 6;

export function BrowseStudentsTemplate() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sideMenuOpen, setSideMenuOpen] = useState(true);

  const filteredStudents = MOCK_STUDENTS.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.firstName.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q) ||
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageStudents = filteredStudents.slice(startIndex, startIndex + PAGE_SIZE);

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

  return (
    <div className="template-page template-page--with-nav">
      <TopNav searchPlaceholder="Search or ask..." onAskArborClick={() => {}} />

      <div className={classnames('template-page__body', !sideMenuOpen && 'template-page__body--side-nav-closed')}>
        <Sidebar className="template-page__sidebar" />
        <SideMenu
          className="template-page__side-menu"
          pageTitle="Students"
          items={STUDENTS_MENU_ITEMS}
          selectedId="browse-students"
          onSelect={() => {}}
          onToggleFavorite={() => {}}
        />

        <main className="template-page__content">
          <Breadcrumbs items={BREADCRUMB_ITEMS} leading={leading} />

          <div className="template-page__content-inner">
            <header className="template-page__content-header">
              <div className="template-page__content-header-top">
                <h1 className="template-page__content-title">Browse Students</h1>
              </div>
            </header>

            <div className="browse-students-toolbar">
              <div className="browse-students-toolbar__search-row">
                <input
                  type="search"
                  className="browse-students-toolbar__input"
                  placeholder="Search students"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Search students"
                />
                <Button variant="primary" color="green" iconLeft={<Search size={18} aria-hidden />}>
                  Search
                </Button>
                <Button variant="secondary" color="grey">
                  Manage
                </Button>
              </div>
              <p className="browse-students-toolbar__filter-text">
                <Check size={18} className="browse-students-toolbar__check" aria-hidden />
                Students per class: All current and future students
              </p>
            </div>

            <div className="browse-students-grid">
              {pageStudents.map((student) => (
                <Link
                  key={student.id}
                  to="#"
                  className="browse-students-card"
                >
                  <div className="browse-students-card__avatar" aria-hidden>
                    {student.hasPhoto ? (
                      <div className="browse-students-card__avatar-img" />
                    ) : (
                      <div className="browse-students-card__avatar-placeholder">
                        {student.firstName.charAt(0)}
                        {student.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="browse-students-card__body">
                    <h2 className="browse-students-card__name">
                      {student.firstName} {student.lastName}
                    </h2>
                    <p className="browse-students-card__meta">DOB: {student.dob}</p>
                    <p className="browse-students-card__meta">Year: {student.year}</p>
                    <p className="browse-students-card__meta">Form: {student.form}</p>
                  </div>
                  <div className="browse-students-card__date">{student.enrollmentDate}</div>
                </Link>
              ))}
            </div>

            <nav className="browse-students-pagination" aria-label="Pagination">
              <Button
                variant="tertiary"
                color="grey"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                iconLeft={<ChevronLeft size={18} aria-hidden />}
                aria-label="Previous page"
              >
                Previous
              </Button>
              <span className="browse-students-pagination__info">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="tertiary"
                color="grey"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                iconRight={<ChevronRight size={18} aria-hidden />}
                aria-label="Next page"
              >
                Next
              </Button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
