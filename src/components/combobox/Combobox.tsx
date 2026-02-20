import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import './combobox.scss';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  /** Options (local store) */
  options: ComboboxOption[];
  /** Single: one value; multi: array of values */
  multiple?: boolean;
  /** Controlled value (single: string, multi: string[]) */
  value?: string | string[];
  /** Uncontrolled default */
  defaultValue?: string | string[];
  /** Called when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Placeholder when empty */
  placeholder?: string;
  /** Label above the field */
  label?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  multiple = false,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  label,
  disabled = false,
  id: propId,
  className,
}) => {
  const defaultVal = multiple ? (defaultValue ?? []) : (defaultValue ?? '');
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(defaultVal);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const selectedValues = multiple ? (value as string[]) : (value ? [value as string] : []);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const filteredOptions = filter.trim()
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(filter.toLowerCase()) ||
          o.value.toLowerCase().includes(filter.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    let next: string | string[];
    if (multiple) {
      const arr = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      next = arr;
    } else {
      next = optionValue;
      setOpen(false);
      setFilter('');
    }
    if (controlledValue === undefined) setUncontrolledValue(next);
    onChange?.(next);
  };

  const handleClearOne = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    if (multiple) {
      const arr = selectedValues.filter((v) => v !== optionValue);
      if (controlledValue === undefined) setUncontrolledValue(arr);
      onChange?.(arr);
    } else {
      if (controlledValue === undefined) setUncontrolledValue('');
      onChange?.('');
    }
  };

  const handleInputFocus = () => {
    if (disabled) return;
    setOpen(true);
    if (!multiple && selectedValues.length > 0) setFilter('');
  };

  const handleInputBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const triggerId = propId ? `${propId}-combobox` : undefined;
  const listId = propId ? `${propId}-list` : undefined;

  const displayLabel = (v: string) => options.find((o) => o.value === v)?.label ?? v;

  return (
    <div
      ref={rootRef}
      className={classnames('ds-combobox', className, {
        'ds-combobox--open': open,
        'ds-combobox--disabled': disabled,
        'ds-combobox--multiple': multiple,
      })}
    >
      {label !== undefined && (
        <label className="ds-combobox__label" htmlFor={triggerId}>
          {label}
        </label>
      )}
      <div
        className="ds-combobox__trigger"
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        <div className="ds-combobox__input-wrap">
          {multiple && selectedValues.length > 0 ? (
            <span className="ds-combobox__chips">
              {selectedValues.map((v) => (
                <span key={v} className="ds-combobox__chip">
                  <span className="ds-combobox__chip-label">{displayLabel(v)}</span>
                  <button
                    type="button"
                    className="ds-combobox__chip-remove"
                    onClick={(e) => handleClearOne(e, v)}
                    aria-label={`Remove ${displayLabel(v)}`}
                    disabled={disabled}
                  >
                    ×
                  </button>
                </span>
              ))}
            </span>
          ) : null}
          <input
            ref={inputRef}
            id={triggerId}
            type="text"
            className="ds-combobox__input"
            value={
              open
                ? filter
                : !multiple && selectedValues.length > 0
                  ? displayLabel(selectedValues[0])
                  : ''
            }
            onChange={(e) => setFilter(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={selectedValues.length === 0 ? placeholder : undefined}
            readOnly={!multiple && selectedValues.length > 0 && !open}
            disabled={disabled}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-disabled={disabled}
          />
          {!multiple && selectedValues.length > 0 && (
            <button
              type="button"
              className="ds-combobox__clear"
              onClick={(e) => {
                e.stopPropagation();
                if (controlledValue === undefined) setUncontrolledValue('');
                onChange?.('');
              }}
              aria-label="Clear selection"
              disabled={disabled}
            >
              ×
            </button>
          )}
        </div>
        <span className="ds-combobox__caret" aria-hidden>
          ▾
        </span>
      </div>
      {open && (
        <ul
          id={listId}
          className="ds-combobox__list"
          role="listbox"
          aria-multiselectable={multiple}
        >
          {filteredOptions.length === 0 ? (
            <li className="ds-combobox__list-empty">No options</li>
          ) : (
            filteredOptions.map((opt) => (
              <li
                key={opt.value}
                className={classnames('ds-combobox__option', {
                  'ds-combobox__option--selected': selectedValues.includes(opt.value),
                })}
                role="option"
                aria-selected={selectedValues.includes(opt.value)}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Combobox;
