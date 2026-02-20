import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import './datePicker.scss';

function formatDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const y = d.getFullYear();
  return `${day}/${m}/${y}`;
}

function parseDate(s: string): Date | null {
  if (!s || typeof s !== 'string') return null;
  const trimmed = s.trim();
  // DD/MM/YYYY
  const dmy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (dmy) {
    const [, day, month, year] = dmy;
    const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    return isNaN(d.getTime()) ? null : d;
  }
  // YYYY-MM-DD (ISO)
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const d = new Date(trimmed + 'T12:00:00');
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: Date[] = [];
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function getStartPadding(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface DatePickerProps {
  /** Current value (Date or date string DD/MM/YYYY or YYYY-MM-DD) */
  value?: Date | string | null;
  /** Uncontrolled default (Date or date string DD/MM/YYYY or YYYY-MM-DD) */
  defaultValue?: Date | string | null;
  /** Called when date changes */
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  /** Min selectable date (Date or string DD/MM/YYYY or YYYY-MM-DD) */
  min?: Date | string;
  /** Max selectable date (Date or string DD/MM/YYYY or YYYY-MM-DD) */
  max?: Date | string;
  id?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = 'Select date',
  label,
  disabled = false,
  min,
  max,
  id: propId,
  className,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(() => {
    const v = defaultValue ?? null;
    if (v instanceof Date) return v;
    if (typeof v === 'string') return parseDate(v);
    return null;
  });
  const value = controlledValue !== undefined
    ? (controlledValue instanceof Date ? controlledValue : controlledValue ? parseDate(controlledValue as string) : null)
    : uncontrolledValue;

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => value ? value.getMonth() : new Date().getMonth());
  const [viewYear, setViewYear] = useState(() => value ? value.getFullYear() : new Date().getFullYear());
  const rootRef = useRef<HTMLDivElement>(null);

  const displayValue = value ? formatDate(value) : '';
  const minDate = min != null
    ? (min instanceof Date ? new Date(min.getFullYear(), min.getMonth(), min.getDate()) : parseDate(min as string))
    : null;
  const maxDate = max != null
    ? (max instanceof Date ? new Date(max.getFullYear(), max.getMonth(), max.getDate()) : parseDate(max as string))
    : null;

  const isDisabled = (d: Date) => {
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    if (minDate && day < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime()) return true;
    if (maxDate && day > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime()) return true;
    return false;
  };

  const handleSelect = (d: Date) => {
    if (isDisabled(d)) return;
    const next = d;
    if (controlledValue === undefined) setUncontrolledValue(next);
    onChange?.(next);
    setOpen(false);
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const days = getDaysInMonth(viewYear, viewMonth);
  const startPad = getStartPadding(viewYear, viewMonth);

  const triggerId = propId ? `${propId}-datepicker` : undefined;
  const calendarId = propId ? `${propId}-calendar` : undefined;

  return (
    <div
      ref={rootRef}
      className={classnames('ds-date-picker', className, {
        'ds-date-picker--open': open,
        'ds-date-picker--disabled': disabled,
      })}
    >
      {label !== undefined && (
        <label className="ds-date-picker__label" htmlFor={triggerId}>
          {label}
        </label>
      )}
      <div
        className="ds-date-picker__trigger"
        onClick={() => !disabled && setOpen(!open)}
      >
        <input
          id={triggerId}
          type="text"
          className="ds-date-picker__input"
          value={displayValue}
          readOnly
          placeholder={placeholder}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={calendarId}
        />
        <span className="ds-date-picker__caret" aria-hidden>
          ▾
        </span>
      </div>
      {open && (
        <div
          id={calendarId}
          className="ds-date-picker__calendar"
          role="dialog"
          aria-label="Choose date"
        >
          <div className="ds-date-picker__nav">
            <button type="button" className="ds-date-picker__nav-btn" onClick={handlePrevMonth} aria-label="Previous month">
              ‹
            </button>
            <span className="ds-date-picker__month-year">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" className="ds-date-picker__nav-btn" onClick={handleNextMonth} aria-label="Next month">
              ›
            </button>
          </div>
          <div className="ds-date-picker__weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w} className="ds-date-picker__weekday">{w}</span>
            ))}
          </div>
          <div className="ds-date-picker__grid">
            {Array.from({ length: startPad }, (_, i) => (
              <span key={`pad-${i}`} className="ds-date-picker__day ds-date-picker__day--pad" />
            ))}
            {days.map((d) => {
              const selected = value && formatDate(d) === formatDate(value);
              const disabled = isDisabled(d);
              return (
                <button
                  key={d.getTime()}
                  type="button"
                  className={classnames('ds-date-picker__day', {
                    'ds-date-picker__day--selected': selected,
                    'ds-date-picker__day--disabled': disabled,
                  })}
                  onClick={() => handleSelect(d)}
                  disabled={disabled}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
