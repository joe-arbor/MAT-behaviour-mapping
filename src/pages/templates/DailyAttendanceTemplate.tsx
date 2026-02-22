import { useState } from 'react';
import classnames from 'classnames';
import { PanelLeftClose, PanelRightOpen } from 'lucide-react';
import { TopNav } from '../../components/topNav';
import { Sidebar } from '../../components/sidebar';
import { SideMenu, SideMenuItem } from '../../components/sideMenu';
import { Breadcrumbs, BreadcrumbItem } from '../../components/breadcrumbs';
import { Button } from '../../components/button/Button';
import { FilterPanel } from '../../components/filterPanel';
import { DatePicker } from '../../components/datePicker/DatePicker';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { ArborDataTableToolbar } from '../../components/arborDataTable';
import { Slideover } from '../../components/slideover';
import './templatePage.scss';
import './dailyAttendanceTemplate.scss';

const SESSION_OPTIONS = [
  { value: 'am', label: 'AM' },
  { value: 'pm', label: 'PM' },
];

function formatDatePreview(d: Date | null, session: string): string {
  if (!d) return 'No date selected.';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[d.getDay()];
  const date = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const sessionLabel = session === 'pm' ? 'PM' : 'AM';
  return `${dayName}, ${date} ${month} ${year} ${sessionLabel}. Showing Attendance Registers. Showing Interventions.`;
}

const ATTENDANCE_MENU_ITEMS: SideMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', isFavorite: false },
  {
    id: 'registers',
    label: 'Registers',
    children: [
      { id: 'daily-attendance', label: 'Daily Attendance', isFavorite: true },
      { id: 'quick-follow-up', label: 'Quick Follow-Up', isFavorite: false },
      { id: 'incomplete-registers', label: 'Incomplete Registers', isFavorite: true },
      { id: 'registers-by-date', label: 'Registers By Date', isFavorite: false },
      { id: 'bulk-edit-standard', label: 'Bulk Edit Marks Standard', isFavorite: true },
      { id: 'bulk-edit-advanced', label: 'Bulk Edit Marks Advanced', isFavorite: false },
      { id: 'roll-call-marks', label: 'Roll Call Marks', isFavorite: false },
    ],
  },
  {
    id: 'absentees',
    label: 'Absentees',
    children: [
      { id: 'absentees-by-date', label: 'Absentees By Date', isFavorite: false },
    ],
  },
  { id: 'latecomers', label: 'Latecomers', isFavorite: true },
  { id: 'statistics', label: 'Statistics', isFavorite: true },
  { id: 'attendance-over-time', label: 'Attendance Over Time', isFavorite: true },
  { id: 'reports', label: 'Reports', isFavorite: true },
  {
    id: 'admin',
    label: 'Admin',
    children: [
      { id: 'admin-settings', label: 'Settings', isFavorite: false },
    ],
  },
];

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'Students', href: '#' },
  { label: 'Attendance', href: '#' },
  { label: 'Registers', href: '#' },
  { label: 'Daily Attendance', isCurrent: true },
];

interface AttendanceRegisterRow {
  id: string;
  time: string;
  lessonEvent: string;
  yearGroup: string;
  eventType: string;
  teacher: string;
  present: number;
  late: number;
  absent: number;
}

function parseMarks(marks: string): { present: number; late: number; absent: number } {
  if (!marks || marks === '(No Students)') return { present: 0, late: 0, absent: 0 };
  const present = parseInt(marks.match(/Present:\s*(\d+)/)?.[1] ?? '0', 10);
  const absent = parseInt(marks.match(/Absent:\s*(\d+)/)?.[1] ?? '0', 10);
  const late = parseInt(marks.match(/Late:\s*(\d+)/)?.[1] ?? '0', 10);
  return { present, late, absent };
}

// Data from 2026-02-21 Daily Attendance.xlsx (Time, Lesson/Event, Year Group, Event Type, Teacher, Marks)
type RawAttendanceRow = [string, string, string, string, string, string];
const ATTENDANCE_REGISTER_RAW: RawAttendanceRow[] = [
  ['12:40 - 15:20', 'pm exclusion', '', 'Internal Exclusion Session', 'Jade Baker', '(No Students)'],
  ['13:40 - 14:30', 'AppliedA+D: Year 11: 11A/Ap', 'Year 11', 'Lesson', 'Andy Holmes', 'Present: 32 Absent: 3 Late: 0'],
  ['13:40 - 14:30', 'Citizenship: Year 8: 8F/Ci6', 'Year 8', 'Lesson', 'Adele Reynolds', 'Present: 24 Absent: 3 Late: 0'],
  ['13:40 - 14:30', 'Citizenship: Year 8: 8G/Ci7', 'Year 8', 'Lesson', 'Sienna Campbell', 'Present: 24 Absent: 3 Late: 0'],
  ['13:40 - 14:30', 'Citizenship: Year 10: 10A/Ci1', 'Year 10', 'Lesson', 'Nikki Clark', 'Present: 24 Absent: 2 Late: 1'],
  ['13:40 - 14:30', 'Computer Scienc: Year 7: 7F/Cs6', 'Year 7', 'Lesson', 'Nikki Young', 'Present: 27 Absent: 2 Late: 1'],
  ['13:40 - 14:30', 'Computer Scienc: Year 8: 8E/Cs5', 'Year 8', 'Lesson', 'Maisie Palmer', 'Present: 26 Absent: 1 Late: 0'],
  ['13:40 - 14:30', 'Computer Scienc: Year 11: 11A/Cs', 'Year 11', 'Lesson', 'Alexa Anderson', 'Present: 35 Absent: 3 Late: 1'],
  ['13:40 - 14:30', 'Food: Year 11: 11A/Fd', 'Year 11', 'Lesson', 'Yvette Gray', 'Present: 50 Absent: 6 Late: 3'],
  ['13:40 - 14:30', 'Geography: Year 7: 7A/Gg1', 'Year 7', 'Lesson', 'Tyler Chapman', 'Present: 29 Absent: 3 Late: 2'],
  ['13:40 - 14:30', 'Geography: Year 7: 7C/Gg3', 'Year 7', 'Lesson', 'Isobel Davies', 'Present: 29 Absent: 3 Late: 0'],
  ['13:40 - 14:30', 'Geography: Year 8: 8H/Gg8', 'Year 8', 'Lesson', 'Olivia Wright', 'Present: 22 Absent: 5 Late: 0'],
  ['13:40 - 14:30', 'German: Year 7: 7G/De7', 'Year 7', 'Lesson', 'Zach Patel', 'Present: 24 Absent: 6 Late: 0'],
  ['13:40 - 14:30', 'German: Year 9: 9A/De1', 'Year 9', 'Lesson', 'John Palmer', 'Present: 24 Absent: 2 Late: 1'],
  ['13:40 - 14:30', 'History: Year 7: 7B/Hi2', 'Year 7', 'Lesson', 'Emma Richardson', 'Present: 27 Absent: 5 Late: 1'],
  ['13:40 - 14:30', 'History: Year 7: 7D/Hi4', 'Year 7', 'Lesson', 'John Butler', 'Present: 27 Absent: 5 Late: 0'],
  ['13:40 - 14:30', 'History: Year 7: 7H/Hi8', 'Year 7', 'Lesson', 'Beth Watson', 'Present: 28 Absent: 1 Late: 1'],
  ['13:40 - 14:30', 'History: Year 9: 9C/Hi3', 'Year 9', 'Lesson', 'Isabelle Cooper', 'Present: 23 Absent: 5 Late: 0'],
  ['13:40 - 14:30', 'History: Year 9: 9D/Hi4', 'Year 9', 'Lesson', 'Jamie Allen', 'Present: 25 Absent: 1 Late: 1'],
  ['13:40 - 14:30', 'KS3 Mathematics: Year 9: 9z/Ma5', 'Year 9', 'Lesson', 'Jackson Morris', 'Present: 26 Absent: 1 Late: 0'],
  ['13:40 - 14:30', 'KS3 Mathematics: Year 9: 9z/Ma6', 'Year 9', 'Lesson', 'Trishana Gara', 'Present: 24 Absent: 3 Late: 0'],
  ['13:40 - 14:30', 'KS3 Mathematics: Year 9: 9z/Ma7', 'Year 9', 'Lesson', 'Tim Price', 'Present: 23 Absent: 4 Late: 1'],
  ['13:40 - 14:30', 'KS3 Mathematics: Year 9: 9z/Ma8', 'Year 9', 'Lesson', 'Yvette Murphy', 'Present: 27 Absent: 0 Late: 1'],
  ['13:40 - 14:30', 'KS4 Mathematics: Year 10: 10z/Ma5', 'Year 10', 'Lesson', 'Darren Rogers', 'Present: 26 Absent: 2 Late: 0'],
  ['13:40 - 14:30', 'KS4 Mathematics: Year 10: 10z/Ma6', 'Year 10', 'Lesson', 'Melissa Baker', 'Present: 21 Absent: 4 Late: 1'],
  ['13:40 - 14:30', 'KS4 Mathematics: Year 10: 10z/Ma7', 'Year 10', 'Lesson', 'Adrian Johnson', 'Present: 23 Absent: 2 Late: 0'],
  ['13:40 - 14:30', 'KS4 Mathematics: Year 10: 10z/Ma8', 'Year 10', 'Lesson', 'Maria King', 'Present: 22 Absent: 1 Late: 1'],
  ['13:40 - 14:30', 'LeisureTravelTo: Year 11: 11A/LT', 'Year 11', 'Lesson', 'Maisie Jackson', 'Present: 32 Absent: 3 Late: 2'],
  ['13:40 - 14:30', 'Music: Year 9: 9B/Mu2', 'Year 9', 'Lesson', 'Archie James', 'Present: 21 Absent: 5 Late: 1'],
  ['13:40 - 14:30', 'PerformingArts: Year 11: 11A/PA', 'Year 11', 'Lesson', 'Amber Lewis', 'Present: 32 Absent: 3 Late: 0'],
  ['13:40 - 14:30', 'Physical Educn: Year 7: 7E/PE5', 'Year 7', 'Lesson', 'Sebastian Hall', 'Present: 27 Absent: 2 Late: 1'],
  ['13:40 - 14:30', 'Portugese: Year 10: 10B/Po2', 'Year 10', 'Lesson', 'Nick Harris', 'Present: 23 Absent: 1 Late: 2'],
  ['13:40 - 14:30', 'Portugese: Year 10: 10C/Po3', 'Year 10', 'Lesson', 'Kelly Cook', 'Present: 25 Absent: 1 Late: 0'],
  ['13:40 - 14:30', 'Portugese: Year 10: 10D/Po4', 'Year 10', 'Lesson', 'Abigail Stewart', 'Present: 22 Absent: 4 Late: 0'],
  ['13:40 - 14:30', 'Science: Year 8: 8y/Sc1', 'Year 8', 'Lesson', 'Abigail Brown', 'Present: 22 Absent: 5 Late: 0'],
  ['13:40 - 14:30', 'Science: Year 8: 8y/Sc2', 'Year 8', 'Lesson', 'Astha Madan', 'Present: 24 Absent: 3 Late: 0'],
  ['13:40 - 14:30', 'Science: Year 8: 8y/Sc3', 'Year 8', 'Lesson', 'Kirti Oommen', 'Present: 25 Absent: 1 Late: 1'],
  ['13:40 - 14:30', 'Science: Year 8: 8y/Sc4', 'Year 8', 'Lesson', 'Keeley Wood', 'Present: 24 Absent: 2 Late: 1'],
  ['13:40 - 14:30', 'Speech and Language Therapy', '', 'Intervention Session', 'Joanne Hill', ''],
  ['13:40 - 14:30', 'Textiles: Year 11: 11A/Tx', 'Year 11', 'Lesson', 'Lexi Palmer', 'Present: 34 Absent: 4 Late: 1'],
  ['13:40 - 15:20', 'Art: Year 13: 13B/Ar', 'Year 13', 'Lesson', 'Millie Stevens', 'Present: 35 Absent: 4 Late: 1'],
  ['13:40 - 15:20', 'Chemistry: Year 13: 13B/Ch', 'Year 13', 'Lesson', 'Oscar Morgan', 'Present: 38 Absent: 8 Late: 1'],
  ['13:40 - 15:20', 'German: Year 13: 13B/De', 'Year 13', 'Lesson', 'Holly Graham', 'Present: 36 Absent: 2 Late: 1'],
  ['13:40 - 15:20', 'LeisureTravelTo: Year 13: 13B/LT', 'Year 13', 'Lesson', 'Jeremy Lloyd', 'Present: 35 Absent: 4 Late: 0'],
  ['13:40 - 15:20', 'PerformingArts: Year 13: 13B/PA', 'Year 13', 'Lesson', 'Yvette Robertson', 'Present: 31 Absent: 6 Late: 1'],
  ['13:40 - 15:20', 'Philosophy: Year 13: 13B/Pi', 'Year 13', 'Lesson', 'Deepesh Mohanty', 'Present: 37 Absent: 4 Late: 2'],
  ['14:30 - 15:20', 'Art: Year 10: 10B/Ar', 'Year 10', 'Lesson', 'Andy Holmes', 'Present: 44 Absent: 2 Late: 0'],
  ['14:30 - 15:20', 'Chemistry: Year 11: 11y/Ch2', 'Year 11', 'Lesson', 'Astha Madan', 'Present: 25 Absent: 3 Late: 0'],
  ['14:30 - 15:20', 'Computer Scienc: Year 7: 7E/Cs5', 'Year 7', 'Lesson', 'Maisie Palmer', 'Present: 27 Absent: 3 Late: 0'],
  ['14:30 - 15:20', 'Computer Scienc: Year 10: 10B/Cs', 'Year 10', 'Lesson', 'Alexa Anderson', 'Present: 48 Absent: 7 Late: 1'],
  ['14:30 - 15:20', 'Design Tech: Year 8: 8E/DT5', 'Year 8', 'Lesson', 'Bethany Mason', 'Present: 24 Absent: 1 Late: 2'],
  ['14:30 - 15:20', 'Design Tech: Year 8: 8F/DT6', 'Year 8', 'Lesson', 'Archie James', 'Present: 24 Absent: 3 Late: 0'],
  ['14:30 - 15:20', 'Geography: Year 7: 7F/Gg6', 'Year 7', 'Lesson', 'Isobel Davies', 'Present: 28 Absent: 2 Late: 0'],
  ['14:30 - 15:20', 'Geography: Year 7: 7G/Gg7', 'Year 7', 'Lesson', 'Tyler Chapman', 'Present: 23 Absent: 6 Late: 1'],
  ['14:30 - 15:20', 'Geography: Year 7: 7H/Gg8', 'Year 7', 'Lesson', 'Olivia Wright', 'Present: 28 Absent: 2 Late: 0'],
  ['14:30 - 15:20', 'Geography: Year 9: 9C/Gg3', 'Year 9', 'Lesson', 'Jamie Allen', 'Present: 23 Absent: 5 Late: 0'],
  ['14:30 - 15:20', 'Geography: Year 9: 9D/Gg4', 'Year 9', 'Lesson', 'Yvette Murphy', 'Present: 24 Absent: 2 Late: 1'],
  ['14:30 - 15:20', 'German: Year 8: 8G/De7', 'Year 8', 'Lesson', 'Zach Patel', 'Present: 23 Absent: 3 Late: 1'],
  ['14:30 - 15:20', 'German: Year 8: 8H/De8', 'Year 8', 'Lesson', 'John Palmer', 'Present: 21 Absent: 5 Late: 1'],
  ['14:30 - 15:20', 'German: Year 12: 12E/De', 'Year 12', 'Lesson', 'Elsie Hunter', 'Present: 22 Absent: 1 Late: 1'],
  ['14:30 - 15:20', 'History: Year 9: 9A/Hi1', 'Year 9', 'Lesson', 'Beth Watson', 'Present: 24 Absent: 3 Late: 0'],
  ['14:30 - 15:20', 'History: Year 9: 9B/Hi2', 'Year 9', 'Lesson', 'Emma Richardson', 'Present: 22 Absent: 5 Late: 0'],
  ['14:30 - 15:20', 'KS3 English: Year 9: 9z/En5', 'Year 9', 'Lesson', 'Sebastian Hall', 'Present: 26 Absent: 1 Late: 0'],
  ['14:30 - 15:20', 'KS3 English: Year 9: 9z/En6', 'Year 9', 'Lesson', 'Teagan Thompson', 'Present: 26 Absent: 1 Late: 0'],
  ['14:30 - 15:20', 'KS3 English: Year 9: 9z/En7', 'Year 9', 'Lesson', 'John Butler', 'Present: 22 Absent: 5 Late: 1'],
  ['14:30 - 15:20', 'KS3 English: Year 9: 9z/En8', 'Year 9', 'Lesson', 'Isabelle Cooper', 'Present: 27 Absent: 1 Late: 0'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 7: 7y/Ma1', 'Year 7', 'Lesson', 'Adrian Johnson', 'Present: 26 Absent: 2 Late: 2'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 7: 7y/Ma2', 'Year 7', 'Lesson', 'Amber Kennedy', 'Present: 25 Absent: 5 Late: 1'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 7: 7y/Ma3', 'Year 7', 'Lesson', 'Darren Rogers', 'Present: 26 Absent: 3 Late: 1'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 7: 7y/Ma4', 'Year 7', 'Lesson', 'Eileen Murphy', 'Present: 25 Absent: 3 Late: 2'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 8: 8y/Ma1', 'Year 8', 'Lesson', 'Charlie Ellis', 'Present: 24 Absent: 3 Late: 0'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 8: 8y/Ma2', 'Year 8', 'Lesson', 'Erin Hall', 'Present: 23 Absent: 3 Late: 1'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 8: 8y/Ma3', 'Year 8', 'Lesson', 'Jackson Morris', 'Present: 25 Absent: 1 Late: 1'],
  ['14:30 - 15:20', 'KS3 Mathematics: Year 8: 8y/Ma4', 'Year 8', 'Lesson', 'John Shaw', 'Present: 25 Absent: 2 Late: 0'],
  ['14:30 - 15:20', 'KS5 Mathematics: Year 12: 12E/Ma', 'Year 12', 'Lesson', 'Noah Rose', 'Present: 22 Absent: 1 Late: 1'],
  ['14:30 - 15:20', 'Music: Year 12: 12E/Mu', 'Year 12', 'Lesson', 'Jason Martin', 'Present: 8 Absent: 1 Late: 1'],
  ['14:30 - 15:20', 'Philosophy: Year 10: 10B/Pi', 'Year 10', 'Lesson', 'Luke Miller', 'Present: 36 Absent: 2 Late: 0'],
  ['14:30 - 15:20', 'Philosophy: Year 12: 12E/Pi', 'Year 12', 'Lesson', 'Yvette Gray', 'Present: 26 Absent: 0 Late: 0'],
  ['14:30 - 15:20', 'Physics: Year 11: 11y/Ph1', 'Year 11', 'Lesson', 'Abigail Brown', 'Present: 26 Absent: 2 Late: 2'],
  ['14:30 - 15:20', 'Portugese: Year 12: 12E/Po', 'Year 12', 'Lesson', 'Harry Fox', 'Present: 23 Absent: 1 Late: 2'],
  ['14:30 - 15:20', 'Science: Year 11: 11y/Sc3', 'Year 11', 'Lesson', 'Keeley Wood', 'Present: 21 Absent: 3 Late: 2'],
  ['14:30 - 15:20', 'Science: Year 11: 11y/Sc4', 'Year 11', 'Lesson', 'Yvette Bailey', 'Present: 22 Absent: 1 Late: 1'],
  ['14:30 - 15:20', 'Science: Year 11: 11z/Sc5', 'Year 11', 'Lesson', 'Zachary Harrison', 'Present: 27 Absent: 2 Late: 1'],
  ['14:30 - 15:20', 'Science: Year 11: 11z/Sc6', 'Year 11', 'Lesson', 'Amber Lewis', 'Present: 25 Absent: 4 Late: 0'],
  ['14:30 - 15:20', 'Science: Year 11: 11z/Sc7', 'Year 11', 'Lesson', 'Kirti Oommen', 'Present: 26 Absent: 1 Late: 0'],
  ['14:30 - 15:20', 'Science: Year 11: 11z/Sc8', 'Year 11', 'Lesson', 'Louis Wilkinson', 'Present: 20 Absent: 2 Late: 1'],
  ['14:30 - 15:20', 'Sociology: Year 10: 10B/So', 'Year 10', 'Lesson', 'Maisie Jackson', 'Present: 34 Absent: 2 Late: 1'],
  ['14:30 - 15:20', 'Sociology: Year 12: 12E/So', 'Year 12', 'Lesson', 'Scarlett Phillips', 'Present: 13 Absent: 1 Late: 1'],
  ['14:30 - 15:20', 'Textiles: Year 10: 10B/Tx', 'Year 10', 'Lesson', 'Lexi Palmer', 'Present: 27 Absent: 3 Late: 1'],
];

const ATTENDANCE_REGISTER_ROWS: AttendanceRegisterRow[] = ATTENDANCE_REGISTER_RAW.map((row, index) => {
  const [time, lessonEvent, yearGroup, eventType, teacher, marks] = row;
  const { present, late, absent } = parseMarks(marks);
  return {
    id: String(index + 1),
    time,
    lessonEvent,
    yearGroup: yearGroup || '',
    eventType,
    teacher,
    present,
    late,
    absent,
  };
});

export function DailyAttendanceTemplate() {
  const [askArborOpen, setAskArborOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

  const allIds = ATTENDANCE_REGISTER_ROWS.map((r) => r.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedRowIds.has(id));
  const someSelected = selectedRowIds.size > 0;

  const handleSelectAll = () => {
    setSelectedRowIds(allSelected ? new Set() : new Set(allIds));
  };

  const handleSelectRow = (id: string) => {
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedRows = ATTENDANCE_REGISTER_ROWS.filter((r) => selectedRowIds.has(r.id));
  const handleBulkExport = (_rows?: AttendanceRegisterRow[]) => {
    const rows = _rows ?? selectedRows;
    console.log('Export selected', rows);
  };
  const [menuItems, setMenuItems] = useState(ATTENDANCE_MENU_ITEMS);
  const [filterDate, setFilterDate] = useState<Date | null>(() => new Date(2026, 1, 20));
  const [filterSession, setFilterSession] = useState('pm');
  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const filterPreview = formatDatePreview(filterDate, filterSession);

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
    <div className="template-page template-page--with-nav">
      <TopNav
        searchPlaceholder="Search or ask..."
        onAskArborClick={() => setAskArborOpen(true)}
      />

      <div className={classnames('template-page__body', !sideMenuOpen && 'template-page__body--side-nav-closed')}>
        <Sidebar className="template-page__sidebar" />
        <SideMenu
          className="template-page__side-menu"
          pageTitle="Attendance"
          items={menuItems}
          selectedId="daily-attendance"
          onSelect={() => {}}
          onToggleFavorite={handleToggleFavorite}
        />

        <main className="template-page__content">
          <Breadcrumbs items={BREADCRUMB_ITEMS} leading={leading} />

          <div className="template-page__content-inner">
          <header className="template-page__content-header">
            <div className="template-page__content-header-top">
              <h1 className="template-page__content-title">Daily Attendance</h1>
            </div>
            <div className="template-page__content-header-actions">
              <Button variant="primary" color="green">
                Emergency evacuation register
              </Button>
            </div>
          </header>

          <FilterPanel
            filterPreview={filterPreview}
            onApply={() => {}}
            onCancel={() => {}}
          >
            <DatePicker
              label="Select date"
              value={filterDate}
              onChange={setFilterDate}
              placeholder="Select date"
            />
            <Dropdown
              label="Session"
              options={SESSION_OPTIONS}
              value={filterSession}
              onChange={setFilterSession}
            />
          </FilterPanel>

          <div className="daily-attendance-table">
            <ArborDataTableToolbar
              selectedRowCount={selectedRowIds.size}
              bulkActions={[{ id: 'export', label: 'Export selected', handler: handleBulkExport }]}
              onBulkAction={(_action, rows) => handleBulkExport(rows)}
              gridApi={{ getSelectedRows: () => selectedRows } as any}
              hiddenColumnCount={0}
              onHideColumnsClick={() => {}}
              showSettings
              showExpand
              onExpandClick={() => {}}
              downloads={[]}
            />
            <div className="daily-attendance-table__scroll">
              <table className="daily-attendance-table__table">
                <thead>
                  <tr>
                    <th className="daily-attendance-table__th-checkbox">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={handleSelectAll}
                        aria-label="Select all rows"
                      />
                    </th>
                    <th>Time</th>
                    <th>Lesson/Event</th>
                    <th>Year Group</th>
                    <th>Event Type</th>
                    <th>Teacher</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {ATTENDANCE_REGISTER_ROWS.map((row) => (
                    <tr key={row.id}>
                      <td className="daily-attendance-table__td-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedRowIds.has(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                          aria-label={`Select row ${row.id}`}
                        />
                      </td>
                      <td>{row.time}</td>
                      <td>{row.lessonEvent}</td>
                      <td>{row.yearGroup}</td>
                      <td>{row.eventType}</td>
                      <td>{row.teacher}</td>
                      <td>✓ {row.present}  🟡 {row.late}  ❌ {row.absent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="daily-attendance-table__footer">
              <span className="daily-attendance-table__footer-count">Showing {ATTENDANCE_REGISTER_ROWS.length} results</span>
              <span className="daily-attendance-table__footer-pagination">1 of 1</span>
              <span className="daily-attendance-table__footer-pagesize">100/page</span>
            </div>
          </div>
          </div>
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
