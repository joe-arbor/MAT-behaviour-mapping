import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import './dropdown.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  /** Options shown in the menu */
  options: DropdownOption[];
  /** Current value (controlled) */
  value?: string;
  /** Initial value (uncontrolled) */
  defaultValue?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Label shown beside the trigger (e.g. "Year group") */
  label?: React.ReactNode;
  /** Trigger button text when no value (optional) */
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const CaretDown = () => (
  <span className="ds-dropdown__caret" aria-hidden>
    ▾
  </span>
);
const CaretUp = () => (
  <span className="ds-dropdown__caret ds-dropdown__caret--up" aria-hidden>
    ▾
  </span>
);

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value: controlledValue,
  defaultValue = '',
  onChange,
  label,
  placeholder,
  disabled = false,
  id: propId,
  className,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string) => {
    if (controlledValue === undefined) setUncontrolledValue(optionValue);
    onChange?.(optionValue);
    setOpen(false);
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

  const triggerId = propId ? `${propId}-trigger` : undefined;
  const menuId = propId ? `${propId}-menu` : undefined;

  return (
    <div
      ref={rootRef}
      className={classnames('ds-dropdown', className, { 'ds-dropdown--open': open })}
    >
      {label !== undefined && (
        <label className="ds-dropdown__label" htmlFor={triggerId}>
          {label}
        </label>
      )}
      <button
        id={triggerId}
        type="button"
        className="ds-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={triggerId}
        aria-controls={menuId}
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <span className="ds-dropdown__trigger-text">{displayLabel ?? 'Select…'}</span>
        {open ? <CaretUp /> : <CaretDown />}
      </button>
      {open && (
        <ul
          id={menuId}
          className="ds-dropdown__menu"
          role="listbox"
          aria-activedescendant={selectedOption ? `${propId ?? 'dropdown'}-opt-${selectedOption.value}` : undefined}
        >
          {options.map(opt => (
            <li
              key={opt.value}
              id={propId ? `${propId}-opt-${opt.value}` : undefined}
              role="option"
              aria-selected={opt.value === value}
              className={classnames('ds-dropdown__item', {
                'ds-dropdown__item--selected': opt.value === value,
              })}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
