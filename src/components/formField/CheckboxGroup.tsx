import React, { useId } from 'react';
import { FormField } from './FormField';
import './formField.scss';

export interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Group label (e.g. "Options") */
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  /** Selected values (controlled) */
  value?: string[];
  /** Default selected (uncontrolled) */
  defaultValue?: string[];
  /** Called when selection changes */
  onChange?: (value: string[]) => void;
  options: CheckboxGroupOption[];
  /** Number of columns for layout (default 2) */
  columns?: number;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  tooltip,
  error,
  value: controlledValue,
  defaultValue = [],
  onChange,
  options,
  columns = 2,
  disabled = false,
  id: idProp,
  name: nameProp,
  className,
}) => {
  const generatedId = useId();
  const groupId = idProp ?? generatedId;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (optionValue: string, checked: boolean) => {
    const next = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    if (!isControlled) setUncontrolledValue(next);
    onChange?.(next);
  };

  return (
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} className={className}>
      <div
        className="ds-form-field__checkbox-group"
        role="group"
        aria-labelledby={label != null ? `${groupId}-label` : undefined}
        style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 'var(--spacing-small)' }}
      >
        {label != null && (
          <span id={`${groupId}-label`} className="ds-form-field__label ds-form-field__label--sr-only" style={{ gridColumn: '1 / -1' }}>
            {label}
          </span>
        )}
        {options.map((opt) => (
          <label key={opt.value} className="ds-form-field__choice-row">
            <input
              type="checkbox"
              name={nameProp}
              value={opt.value}
              checked={value.includes(opt.value)}
              disabled={disabled || opt.disabled}
              onChange={(e) => handleChange(opt.value, e.target.checked)}
              className="ds-form-field__choice-input"
              aria-invalid={!!error}
            />
            <span className="ds-form-field__choice-label">{opt.label}</span>
          </label>
        ))}
      </div>
    </FormField>
  );
}
