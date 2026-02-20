import React, { useId } from 'react';
import { FormField } from './FormField';
import './formField.scss';

export interface TimeFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  id?: string;
  className?: string;
}

export const TimeField: React.FC<TimeFieldProps> = ({
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
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} id={id} className={className}>
      <div className="ds-form-field__input-wrap">
        <input
          id={id}
          type="time"
          className="ds-form-field__input"
          disabled={disabled}
          aria-invalid={!!error}
          {...inputProps}
        />
      </div>
    </FormField>
  );
};
