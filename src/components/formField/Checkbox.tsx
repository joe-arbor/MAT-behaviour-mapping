import React, { useId } from 'react';
import { Info } from 'lucide-react';
import { FormField } from './FormField';
import './formField.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  tooltip,
  error,
  disabled = false,
  id: idProp,
  className,
  ...inputProps
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <FormField label={undefined} tooltip={undefined} error={error} disabled={disabled} id={id} className={className}>
      <label className="ds-form-field__choice-row" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          className="ds-form-field__choice-input"
          disabled={disabled}
          aria-invalid={!!error}
          {...inputProps}
        />
        <span className="ds-form-field__choice-label">{label ?? 'Checkbox'}</span>
        {tooltip && (
          <span className="ds-form-field__choice-tooltip" title={tooltip}>
            <Info size={14} strokeWidth={2} />
          </span>
        )}
      </label>
    </FormField>
  );
};
