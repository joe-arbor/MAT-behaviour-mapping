import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import classnames from 'classnames';
import './combobox.scss';

const LIST_MAX_HEIGHT_DEFAULT = 240;
const LIST_EDGE_GAP = 8;
const LIST_FLIP_THRESHOLD = 80;

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
  inputRef?: React.Ref<HTMLInputElement>;
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
  inputRef: forwardedInputRef,
}) => {
  const defaultVal = multiple ? (defaultValue ?? []) : (defaultValue ?? '');
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(defaultVal);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const selectedValues = multiple ? (value as string[]) : (value ? [value as string] : []);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [listPlacement, setListPlacement] = useState<{ flip: boolean; maxHeight: number }>(() => ({
    flip: false,
    maxHeight: LIST_MAX_HEIGHT_DEFAULT,
  }));
  const internalInputRef = useRef<HTMLInputElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      internalInputRef.current = node;
      if (typeof forwardedInputRef === 'function') {
        forwardedInputRef(node);
      } else if (forwardedInputRef) {
        (forwardedInputRef as { current: HTMLInputElement | null }).current = node;
      }
    },
    [forwardedInputRef],
  );

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

  const getNearestScrollParent = useCallback((start: HTMLElement | null): HTMLElement => {
    let el: HTMLElement | null = start?.parentElement ?? null;
    while (el) {
      const { overflowY } = window.getComputedStyle(el);
      if (/^(auto|scroll|overlay)$/.test(overflowY)) return el;
      el = el.parentElement;
    }
    return document.documentElement;
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    const triggerEl = triggerRef.current;
    const rootEl = rootRef.current;
    if (!triggerEl || !rootEl) return;

    const measure = () => {
      const clip = getNearestScrollParent(rootEl);
      const triggerRect = triggerEl.getBoundingClientRect();
      const clipRect = clip.getBoundingClientRect();
      const rawBelow = Math.max(0, clipRect.bottom - triggerRect.bottom - LIST_EDGE_GAP);
      const rawAbove = Math.max(0, triggerRect.top - clipRect.top - LIST_EDGE_GAP);
      const belowCap = Math.min(LIST_MAX_HEIGHT_DEFAULT, rawBelow);
      const aboveCap = Math.min(LIST_MAX_HEIGHT_DEFAULT, rawAbove);
      const flip = belowCap < LIST_FLIP_THRESHOLD && aboveCap > belowCap;
      const maxHeight = Math.min(LIST_MAX_HEIGHT_DEFAULT, Math.max(1, flip ? aboveCap : belowCap));
      setListPlacement({ flip, maxHeight });
    };

    measure();
    const clip = getNearestScrollParent(rootEl);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    clip.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(rootEl);
    ro.observe(triggerEl);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
      clip.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [open, filter, filteredOptions.length, getNearestScrollParent]);

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
        ref={triggerRef}
        className="ds-combobox__trigger"
        onClick={() => !disabled && internalInputRef.current?.focus()}
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
            ref={setInputRef}
            id={triggerId}
            type="text"
            className="ds-combobox__input"
            value={
              open
                ? filter
                : !multiple && selectedValues.length > 0
                  ? displayLabel(selectedValues[0] as string)
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
          ref={listRef}
          id={listId}
          className={classnames('ds-combobox__list', {
            'ds-combobox__list--flip': listPlacement.flip,
          })}
          style={{ maxHeight: listPlacement.maxHeight }}
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
