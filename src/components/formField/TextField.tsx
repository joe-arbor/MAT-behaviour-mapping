import React, { useId } from 'react';
import classnames from 'classnames';
import { FormField } from './FormField';
import './formField.scss';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  /** 'text' or 'password' */
  type?: 'text' | 'password';
  id?: string;
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  tooltip,
  error,
  type = 'text',
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
          type={type}
          className={classnames('ds-form-field__input')}
          disabled={disabled}
          aria-invalid={!!error}
          {...inputProps}
        />
      </div>
    </FormField>
  );
};
