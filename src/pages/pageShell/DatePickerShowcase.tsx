import { useState } from 'react';
import { DatePicker } from '../../components/datePicker/DatePicker';
import './datePickerShowcase.scss';

export function DatePickerShowcase() {
  const [date, setDate] = useState<Date | null>(null);
  const [dateWithValue, setDateWithValue] = useState<Date | null>(() => new Date(2025, 0, 15)); // 15 Jan 2025
  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, 11, 31);

  return (
    <div className="date-picker-showcase">
      <section className="date-picker-showcase__section">
        <h2 className="date-picker-showcase__heading">Form Field Date Picker</h2>
        <p className="date-picker-showcase__intro">
          Input field that opens a calendar to choose a date. Supports placeholder, min/max range, and disabled state.
        </p>

        <h3 className="date-picker-showcase__subheading">Default</h3>
        <div className="date-picker-showcase__row">
          <DatePicker
            label="Select date"
            value={date}
            onChange={setDate}
            placeholder="Select date"
          />
        </div>

        <h3 className="date-picker-showcase__subheading">With value</h3>
        <div className="date-picker-showcase__row">
          <DatePicker
            label="Date of birth"
            value={dateWithValue}
            onChange={setDateWithValue}
            placeholder="Select date"
          />
        </div>

        <h3 className="date-picker-showcase__subheading">With min and max</h3>
        <div className="date-picker-showcase__row">
          <DatePicker
            label="Academic year end"
            value={date}
            onChange={setDate}
            placeholder="Select date"
            min={today}
            max={nextYear}
          />
        </div>

        <h3 className="date-picker-showcase__subheading">States</h3>
        <div className="date-picker-showcase__row">
          <DatePicker
            label="Disabled"
            placeholder="Placeholder text"
            disabled
          />
        </div>
      </section>
    </div>
  );
}
