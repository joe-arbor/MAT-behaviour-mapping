import React, { useId } from 'react';
import classnames from 'classnames';
import { FormField } from './FormField';
import './formField.scss';

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  id?: string;
  className?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  tooltip,
  error,
  disabled = false,
  id: idProp,
  className,
  ...textareaProps
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} id={id} className={className}>
      <textarea
        id={id}
        className={classnames('ds-form-field__textarea')}
        disabled={disabled}
        aria-invalid={!!error}
        {...textareaProps}
      />
    </FormField>
  );
};
