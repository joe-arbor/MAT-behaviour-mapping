import React, { useId } from 'react';
import classnames from 'classnames';
import { FormField } from './FormField';
import './formField.scss';

export interface NumberFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  /** Decimal places (e.g. 5 for 5 d.p.) */
  decimalPlaces?: number;
  id?: string;
  className?: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  tooltip,
  error,
  disabled = false,
  decimalPlaces,
  step,
  id: idProp,
  className,
  ...inputProps
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const stepValue = step ?? (decimalPlaces != null && decimalPlaces > 0 ? Math.pow(10, -decimalPlaces) : 1);

  return (
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} id={id} className={className}>
      <div className="ds-form-field__input-wrap">
        <input
          id={id}
          type="number"
          step={stepValue}
          className={classnames('ds-form-field__input')}
          disabled={disabled}
          aria-invalid={!!error}
          {...inputProps}
        />
      </div>
    </FormField>
  );
};
