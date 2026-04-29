import { useState } from 'react';
import {
  FilterPanel,
  FilterFieldStudent,
  FilterFieldStaff,
} from '../../components/filterPanel';
import { Section } from '../../components/section/Section';
import { DatePicker } from '../../components/datePicker/DatePicker';
import { Dropdown } from '../../components/dropdown/Dropdown';
import './filterPanelShowcase.scss';

const DETAILS_TEXT =
  'Filter Panel is used to edit filter and display settings of another component. At the moment the only component supported is Table. ' +
  'Any field that will be used to filter the target component (get a subset of the data), needs to be defined as child of Filter Panel: here all Form Fields are accepted, plus 2 bespoke filter fields: Filter Field Student and Filter Field Staff, used to filter by student and staff respectively. ' +
  'All the other fields will go under Filter Panel Display.';

const DESCRIPTION_OPTIONS = [{ value: 'description', label: 'Description' }];

const SHOULD_RELOAD_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const FIRST_LETTER_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

const STUDENT_GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
];

const DATE_RANGE_OPTIONS = [
  { value: 'custom', label: 'Custom' },
  { value: 'term', label: 'Term' },
];

function formatDatePreview(d: Date | null): string {
  if (!d) return '';
  const day = d.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day}${suffix} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function FilterPanelShowcase() {
  const [dateValue, setDateValue] = useState<Date | null>(new Date(2026, 1, 20));
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [studentValue, setStudentValue] = useState<string[]>(['female']);
  const [shouldReload, setShouldReload] = useState('no');
  const [firstLetter, setFirstLetter] = useState('any');
  const [descriptionDropdown, setDescriptionDropdown] = useState('description');
  const [dateRangeType, setDateRangeType] = useState('custom');

  const filterPreviewParts: string[] = [];
  filterPreviewParts.push(`Should Reload ${shouldReload === 'yes' ? 'Yes' : 'No'}`);
  filterPreviewParts.push(`Date ${formatDatePreview(dateValue)}`);
  if (studentValue.length > 0) {
    const labels = studentValue.map((v) => STUDENT_GENDER_OPTIONS.find((o) => o.value === v)?.label ?? v);
    filterPreviewParts.push(`Students who are ${labels.join(', ')}`);
  }
  const filterPreviewText = filterPreviewParts.join('. ') + (filterPreviewParts.length ? '.' : '');

  return (
    <div className="filter-panel-showcase">
      <h1 className="filter-panel-showcase__title">Filter Panel</h1>

      <Section title="Details" isSubsection className="filter-panel-showcase__details-section">
        <div className="filter-panel-showcase__details-row">
          <Dropdown
            options={DESCRIPTION_OPTIONS}
            value={descriptionDropdown}
            onChange={setDescriptionDropdown}
            label="Description"
          />
        </div>
        <p className="filter-panel-showcase__details-text">{DETAILS_TEXT}</p>
      </Section>

      <FilterPanel
        filterPreview={filterPreviewText || 'No filters applied.'}
        display={
          <Dropdown
            options={FIRST_LETTER_OPTIONS}
            value={firstLetter}
            onChange={setFirstLetter}
            label="First letter"
          />
        }
        onApply={() => {}}
        onCancel={() => {}}
      >
        <DatePicker
          label="Date"
          value={dateValue}
          onChange={setDateValue}
          placeholder="Select date"
        />
        <div className="filter-panel-showcase__date-range">
          <Dropdown
            options={DATE_RANGE_OPTIONS}
            value={dateRangeType}
            onChange={setDateRangeType}
            label="Date Range"
          />
          <DatePicker
            label="From"
            value={dateFrom}
            onChange={setDateFrom}
            placeholder="From"
          />
          <DatePicker
            label="To"
            value={dateTo}
            onChange={setDateTo}
            placeholder="To"
          />
        </div>
        <FilterFieldStudent
          label="Students who are..."
          value={studentValue}
          onChange={setStudentValue}
          options={STUDENT_GENDER_OPTIONS}
          placeholder="Select…"
          showAddClause
          onAddClause={() => {}}
        />
        <Dropdown
          options={SHOULD_RELOAD_OPTIONS}
          value={shouldReload}
          onChange={setShouldReload}
          label="Should Reload"
        />
        <FilterFieldStaff
          label="Staff who are..."
          value={[]}
          onChange={() => {}}
          options={[]}
          placeholder="Select…"
          showAddClause
          onAddClause={() => {}}
        />
      </FilterPanel>
    </div>
  );
}
