import React, { useId } from 'react';
import classnames from 'classnames';
import { FormField } from './FormField';
import './formField.scss';

export interface DurationFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  id?: string;
  className?: string;
}

export const DurationField: React.FC<DurationFieldProps> = ({
  label,
  tooltip,
  error,
  disabled = false,
  placeholder = 'hh:mm',
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
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          className={classnames('ds-form-field__input')}
          disabled={disabled}
          aria-invalid={!!error}
          {...inputProps}
        />
      </div>
    </FormField>
  );
};
