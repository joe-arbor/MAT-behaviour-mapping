import React, { useId } from 'react';
import classnames from 'classnames';
import { FormField } from './FormField';
import './formField.scss';

export interface CurrencyFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  /** Currency symbol (e.g. £, $) */
  symbol?: string;
  id?: string;
  className?: string;
}

export const CurrencyField: React.FC<CurrencyFieldProps> = ({
  label,
  tooltip,
  error,
  disabled = false,
  symbol = '£',
  id: idProp,
  className,
  ...inputProps
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} id={id} className={className}>
      <div className="ds-form-field__input-wrap">
        <span className="ds-form-field__prefix" aria-hidden>
          {symbol}
        </span>
        <input
          id={id}
          type="number"
          step="0.01"
          className={classnames('ds-form-field__input')}
          disabled={disabled}
          aria-invalid={!!error}
          {...inputProps}
        />
      </div>
    </FormField>
  );
};
