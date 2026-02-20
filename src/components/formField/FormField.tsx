import React from 'react';
import { Info } from 'lucide-react';
import classnames from 'classnames';
import './formField.scss';

export interface FormFieldProps {
  /** Label shown above the control */
  label?: React.ReactNode;
  /** Optional tooltip (info icon); title attribute used for native tooltip */
  tooltip?: string;
  /** Error message shown below the control */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Content (the actual input/control) */
  children: React.ReactNode;
  /** Id linking label to control (for accessibility) */
  id?: string;
  className?: string;
  /** If true, label is hidden visually but still for screen readers */
  labelVisuallyHidden?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  tooltip,
  error,
  disabled = false,
  children,
  id: idProp,
  className,
  labelVisuallyHidden = false,
}) => {
  return (
    <div
      className={classnames(
        'ds-form-field',
        disabled && 'ds-form-field--disabled',
        error && 'ds-form-field--error',
        className
      )}
    >
      {(label != null || tooltip) && (
        <div className="ds-form-field__label-row">
          {label != null && (
            <label
              className={classnames('ds-form-field__label', labelVisuallyHidden && 'ds-form-field__label--sr-only')}
              htmlFor={idProp}
            >
              {label}
            </label>
          )}
          {tooltip && (
            <span className="ds-form-field__tooltip" title={tooltip} role="img" aria-label={tooltip}>
              <Info size={14} strokeWidth={2} />
            </span>
          )}
        </div>
      )}
      {children}
      {error && (
        <div id={idProp ? `${idProp}-error` : undefined} className="ds-form-field__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
