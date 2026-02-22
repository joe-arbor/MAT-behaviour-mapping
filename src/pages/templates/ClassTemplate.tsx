import React, { useState } from 'react';
import classnames from 'classnames';
import { PanelLeftClose, PanelRightOpen, ChevronRight } from 'lucide-react';
import { TopNav } from '../../components/topNav';
import { Sidebar } from '../../components/sidebar';
import { SideMenu, SideMenuItem } from '../../components/sideMenu';
import { Breadcrumbs, BreadcrumbItem } from '../../components/breadcrumbs';
import { CourseHeader } from '../../components/courseHeader';
import { CourseActionSidebar } from '../../components/courseActionSidebar';
import { Section } from '../../components/section/Section';
import { Button } from '../../components/button/Button';
import { Tabs, TabList, Tab, TabPanel } from '../../components/tabs/Tabs';
import { ArborDataTable } from '../../components/arborDataTable';
import { Slideover } from '../../components/slideover';
import type { ColDef } from 'ag-grid-community';
import './templatePage.scss';
import './dailyAttendanceTemplate.scss';
import './classTemplate.scss';

const CLASS_PAGE_MENU_ITEMS: SideMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', isFavorite: false },
  { id: 'timetable', label: 'Timetable', isFavorite: false },
  {
    id: 'academic',
    label: 'Academic',
    children: [
      {
        id: 'course-ma1',
        label: 'KS3 Mathematics Year 8: By/Ma1',
        children: [
          { id: 'overview', label: 'Overview', isFavorite: false },
          { id: 'attendance', label: 'Attendance', isFavorite: false },
          { id: 'timetable', label: 'Timetable', isFavorite: false },
          { id: 'assignments', label: 'Assignments', isFavorite: false },
          { id: 'assessments', label: 'Assessments', isFavorite: false },
          { id: 'grades', label: 'Grades', isFavorite: false },
          { id: 'departments', label: 'Departments', isFavorite: false },
          { id: 'download-student-list', label: 'Download Student List', isFavorite: false },
          { id: 'mark-entry', label: 'Mark Entry', isFavorite: false },
          { id: 'relationships', label: 'Relationships', isFavorite: false },
        ],
      },
    ],
  },
];

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'Students', href: '#' },
  { label: 'Curriculum', href: '#' },
  { label: 'Academics', href: '#' },
  { label: 'Courses', href: '#' },
  { label: 'Overview', href: '#' },
  { label: 'KS3 Mathematics Year 8: By/Ma1', href: '#' },
  { label: 'Overview', isCurrent: true },
];

const ADMIN_ITEMS = [
  { label: 'Course Name', value: 'By/Ma1' },
  { label: 'Academic year', value: '2025/2026' },
  { label: 'Students', value: '27' },
  { label: 'Take attendance', value: 'Lesson attendance (20 min)' },
];

interface ClassLessonRow {
  id: string;
  day: string;
  timeSlot: string;
  startDate: string;
  endDate: string;
  staff: string;
  room: string;
  status: string;
}

const CLASS_LESSON_ROWS: ClassLessonRow[] = [
  { id: '1', day: 'Monday', timeSlot: '13:00 - 14:00', startDate: '01 Sep 2025', endDate: '31 Aug 2026', staff: 'Charlie Ellis', room: 'S2', status: 'Scheduled' },
  { id: '2', day: 'Tuesday', timeSlot: '09:00 - 10:00', startDate: '01 Sep 2025', endDate: '31 Aug 2026', staff: 'Charlie Ellis', room: 'S2', status: 'Scheduled' },
  { id: '3', day: 'Wednesday', timeSlot: '14:00 - 15:00', startDate: '01 Sep 2025', endDate: '31 Aug 2026', staff: 'Charlie Ellis', room: 'S2', status: 'Scheduled' },
  { id: '4', day: 'Thursday', timeSlot: '10:00 - 11:00', startDate: '01 Sep 2025', endDate: '31 Aug 2026', staff: 'Charlie Ellis', room: 'S2', status: 'Scheduled' },
  { id: '5', day: 'Friday', timeSlot: '11:00 - 12:00', startDate: '01 Sep 2025', endDate: '31 Aug 2026', staff: 'Charlie Ellis', room: 'S2', status: 'Scheduled' },
];

const CLASS_LESSON_COLUMNS: ColDef<ClassLessonRow>[] = [
  { field: 'day', headerName: 'Day', flex: 1, minWidth: 100 },
  { field: 'timeSlot', headerName: 'Time Slot', flex: 1, minWidth: 120 },
  { field: 'startDate', headerName: 'Start Date', flex: 1, minWidth: 100 },
  { field: 'endDate', headerName: 'End Date', flex: 1, minWidth: 100 },
  { field: 'staff', headerName: 'Staff', flex: 1, minWidth: 120 },
  { field: 'room', headerName: 'Room', flex: 1, minWidth: 80 },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
];

interface EnrolledStudentRow {
  id: string;
  student: string;
  startDate: string;
  endDate: string;
}

const ENROLLED_STUDENT_ROWS: EnrolledStudentRow[] = [
  { id: '1', student: 'Anderson, Liam', startDate: '01 Sep 2025', endDate: '31 Aug 2026' },
  { id: '2', student: 'Chapman, Roy', startDate: '01 Sep 2025', endDate: '31 Aug 2026' },
  { id: '3', student: 'Smith, Emma', startDate: '01 Sep 2025', endDate: '31 Aug 2026' },
  { id: '4', student: 'Jones, Oliver', startDate: '01 Sep 2025', endDate: '31 Aug 2026' },
  { id: '5', student: 'Williams, Ava', startDate: '01 Sep 2025', endDate: '31 Aug 2026' },
];

const ENROLLED_COLUMNS: ColDef<EnrolledStudentRow>[] = [
  { field: 'student', headerName: 'Student', flex: 2, minWidth: 180 },
  { field: 'startDate', headerName: 'Start Date', flex: 1, minWidth: 100 },
  { field: 'endDate', headerName: 'End Date', flex: 1, minWidth: 100 },
];

function DetailRow({ label = '', value }: { label?: string; value?: string }) {
  return (
    <button type="button" className="class-template__detail-row">
      {label ? <span className="class-template__detail-label">{label}{value != null && value !== '' ? ': ' : ''}</span> : null}
      {value != null && value !== '' ? <span className="class-template__detail-value">{value}</span> : null}
      <ChevronRight size={16} className="class-template__detail-arrow" aria-hidden />
    </button>
  );
}

export function ClassTemplate() {
  const [askArborOpen, setAskArborOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(CLASS_PAGE_MENU_ITEMS);
  const [sideMenuOpen, setSideMenuOpen] = useState(true);

  const handleToggleFavorite = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => toggleFavoriteInTree(item, id))
    );
  };

  const leading = (
    <button
      type="button"
      className="ds-breadcrumbs__leading-btn"
      aria-label={sideMenuOpen ? 'Collapse side navigation' : 'Expand side navigation'}
      title={sideMenuOpen ? 'Collapse side navigation' : 'Expand side navigation'}
      onClick={() => setSideMenuOpen((prev) => !prev)}
    >
      {sideMenuOpen ? <PanelLeftClose size={18} aria-hidden /> : <PanelRightOpen size={18} aria-hidden />}
    </button>
  );

  return (
    <div className="template-page template-page--with-nav template-page--class">
      <TopNav
        searchPlaceholder="Search or ask..."
        onAskArborClick={() => setAskArborOpen(true)}
      />

      <div className={classnames('template-page__body', !sideMenuOpen && 'template-page__body--side-nav-closed')}>
        <Sidebar className="template-page__sidebar" />
        <SideMenu
          className="template-page__side-menu"
          pageTitle="Enrolment"
          items={menuItems}
          selectedId="overview"
          onSelect={() => {}}
          onToggleFavorite={handleToggleFavorite}
        />

        <main className="template-page__content">
          <div className="template-page__content-main">
            <div className="class-template__breadcrumbs-row">
              <Breadcrumbs items={BREADCRUMB_ITEMS} leading={leading} />
              <div className="class-template__lesson-nav">
                <a href="#" className="class-template__lesson-link">Previous lesson</a>
                <span className="class-template__lesson-sep">·</span>
                <a href="#" className="class-template__lesson-link">Next lesson</a>
                <span className="class-template__lesson-meta">13:00 - 14:00 Mon, 25 Feb 2026 Charlie Ellis</span>
              </div>
            </div>

            <div className="template-page__content-inner">
              <CourseHeader
                title="KS3 Mathematics Year 8: By/Ma1"
                meta={[
                  { label: 'Academic Level', value: 'Coretie Elite' },
                  { label: 'Parent Course', value: 'KS3 Mathematics / Year 8' },
                  { label: 'By Teacher', value: '27 Students' },
                ]}
              />

              <Section title="Admin">
                <ul className="class-template__detail-list" role="list">
                  {ADMIN_ITEMS.map((item, i) => (
                    <li key={i}>
                      <DetailRow label={item.label} value={item.value} />
                    </li>
                  ))}
                </ul>
              </Section>

              <Section
                title="Academic Lead"
                headerAction={
                  <Button variant="primary" color="green" size="small">Add</Button>
                }
              >
                <p className="class-template__lead-name">Charlie Ellis</p>
              </Section>

              <Section
                title="Modules"
                headerAction={
                  <Button variant="primary" color="green" size="small">Add</Button>
                }
              >
                <p className="class-template__empty">No modules added</p>
                <div className="class-template__table-toolbar" />
              </Section>

              <Section
                title="Classes & Lessons"
                headerAction={
                  <Button variant="primary" color="green" size="small">Add</Button>
                }
              >
                <Tabs defaultValue="current" className="class-template__tabs">
                  <TabList>
                    <Tab id="current">Current</Tab>
                    <Tab id="historic">Historic</Tab>
                    <Tab id="future">Future</Tab>
                  </TabList>
                  <TabPanel id="current">
                    <p className="class-template__table-desc">This table shows all classes and lessons from tomorrow onwards, today.</p>
                    <ArborDataTable<ClassLessonRow>
                      tableId="class-lessons"
                      rowData={CLASS_LESSON_ROWS}
                      getRowId={(row) => row.id}
                      columnDefs={CLASS_LESSON_COLUMNS}
                      rowSelection={false}
                      showToolbar
                      showHideColumns
                      showSearch
                      showExpandButton
                      onExpandTable={() => {}}
                    />
                  </TabPanel>
                  <TabPanel id="historic">Historic classes and lessons.</TabPanel>
                  <TabPanel id="future">Future classes and lessons.</TabPanel>
                </Tabs>
              </Section>

              <Section
                title="Enrolled Students"
                headerAction={
                  <Button variant="primary" color="green" size="small">Add</Button>
                }
              >
                <ArborDataTable<EnrolledStudentRow>
                  tableId="enrolled-students"
                  rowData={ENROLLED_STUDENT_ROWS}
                  getRowId={(row) => row.id}
                  columnDefs={ENROLLED_COLUMNS}
                  rowSelection={true}
                  showToolbar
                  bulkActions={[{ id: 'export', label: 'Export selected', handler: (rows) => console.log(rows) }]}
                  showHideColumns
                  showSearch
                  showExpandButton
                  onExpandTable={() => {}}
                />
              </Section>

              <Section title="Linked Curriculums">
                <ul className="class-template__detail-list" role="list">
                  <li><DetailRow value="KS3 Mathematics 2025" /></li>
                </ul>
              </Section>

              <Section title="Assessment Characteristics">
                <ul className="class-template__detail-list" role="list">
                  <li><DetailRow label="Main assessable course" value="KS3 Mathematics" /></li>
                  <li><DetailRow label="Linked assessments through" value="KS3 Mathematics Current" /></li>
                  <li><DetailRow label="Main assessable course" value="None" /></li>
                </ul>
              </Section>

              <Section title="Assigned Progress Assessments">
                <ul className="class-template__detail-list" role="list">
                  <li><DetailRow label="KS3 Mathematics Current - Autumn 25" /></li>
                </ul>
              </Section>
            </div>
          </div>

          <aside className="template-page__content-sidebar">
            <CourseActionSidebar
              onAskArbor={() => setAskArborOpen(true)}
              showAttachments
              showActions
            />
          </aside>
        </main>
      </div>

      <Slideover
        open={askArborOpen}
        onClose={() => setAskArborOpen(false)}
        title="Ask Arbor"
      >
        <p>Start a conversation with the AI-powered tool here.</p>
      </Slideover>
    </div>
  );
}

function toggleFavoriteInTree(item: SideMenuItem, targetId: string): SideMenuItem {
  if (item.id === targetId) {
    return { ...item, isFavorite: !item.isFavorite };
  }
  if (item.children) {
    return {
      ...item,
      children: item.children.map((child) => toggleFavoriteInTree(child, targetId)),
    };
  }
  return item;
}
