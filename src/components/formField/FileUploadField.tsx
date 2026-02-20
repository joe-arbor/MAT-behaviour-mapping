import React, { useId, useRef } from 'react';
import { FormField } from './FormField';
import { Button } from '../button/Button';
import './formField.scss';

export interface FileUploadFieldProps {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  /** Accepted file types (e.g. "image/*" or ".pdf") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  disabled?: boolean;
  /** Display value (e.g. file name); controlled by parent if provided */
  value?: string;
  /** Called when user selects file(s) */
  onChange?: (files: FileList | null) => void;
  /** Label for the browse button */
  browseLabel?: string;
  id?: string;
  className?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  tooltip,
  error,
  accept,
  multiple = false,
  disabled = false,
  value: valueProp,
  onChange,
  browseLabel = 'Browse...',
  id: idProp,
  className,
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = React.useState('');
  const value = valueProp !== undefined ? valueProp : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const display = files?.length ? (multiple ? `${files.length} file(s)` : files[0]?.name ?? '') : '';
    if (valueProp === undefined) setInternalValue(display);
    onChange?.(files ?? null);
  };

  return (
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} id={id} className={className}>
      <div className="ds-form-field__file-row">
        <input
          type="text"
          readOnly
          className="ds-form-field__file-input"
          value={value}
          placeholder=""
          disabled={disabled}
          aria-hidden
          tabIndex={-1}
        />
        <div className="ds-form-field__file-browse">
          <Button
            type="button"
            variant="secondary"
            color="grey"
            size="small"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
          >
            {browseLabel}
          </Button>
        </div>
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
          tabIndex={-1}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      </div>
    </FormField>
  );
};
