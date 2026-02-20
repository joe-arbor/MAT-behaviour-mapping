import React, { useId } from 'react';
import { Info } from 'lucide-react';
import classnames from 'classnames';
import { FormField } from './FormField';
import './formField.scss';

export interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Group label */
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  /** Selected value (controlled) */
  value?: string;
  /** Default selected (uncontrolled) */
  defaultValue?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  options: RadioGroupOption[];
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  tooltip,
  error,
  value: controlledValue,
  defaultValue,
  onChange,
  options,
  disabled = false,
  id: idProp,
  name: nameProp,
  className,
}) => {
  const generatedId = useId();
  const groupId = idProp ?? generatedId;
  const name = nameProp ?? groupId;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (optionValue: string) => {
    if (!isControlled) setUncontrolledValue(optionValue);
    onChange?.(optionValue);
  };

  return (
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} className={className}>
      <div
        className="ds-form-field__radio-group"
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-invalid={!!error}
      >
        {options.map((opt, index) => (
          <label
            key={opt.value}
            className={classnames('ds-form-field__choice-row', (disabled || opt.disabled) && 'ds-form-field__choice-row--disabled')}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={disabled || opt.disabled}
              onChange={() => handleChange(opt.value)}
              className="ds-form-field__choice-input"
              aria-describedby={opt.tooltip ? `${groupId}-opt-${index}-tip` : undefined}
            />
            <span className="ds-form-field__choice-label">{opt.label}</span>
            {opt.tooltip && (
              <span id={`${groupId}-opt-${index}-tip`} className="ds-form-field__choice-tooltip" title={opt.tooltip}>
                <Info size={14} strokeWidth={2} />
              </span>
            )}
          </label>
        ))}
      </div>
    </FormField>
  );
};
