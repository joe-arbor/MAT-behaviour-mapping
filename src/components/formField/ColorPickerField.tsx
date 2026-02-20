import React, { useId, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormField } from './FormField';
import './formField.scss';

export interface ColorPickerFieldProps {
  label?: React.ReactNode;
  tooltip?: string;
  error?: string;
  /** Hex color value (e.g. #ffffff) */
  value?: string;
  /** Called when color changes */
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const ColorPickerField: React.FC<ColorPickerFieldProps> = ({
  label,
  tooltip,
  error,
  value = '#000000',
  onChange,
  disabled = false,
  id: idProp,
  className,
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const colorInputRef = useRef<HTMLInputElement>(null);
  const focusFromUserGesture = useRef(false);

  return (
    <FormField label={label} tooltip={tooltip} error={error} disabled={disabled} id={id} className={className}>
      <div className="ds-form-field__color-row">
        <div
          className="ds-form-field__color-swatch"
          style={{ backgroundColor: value || '#cccccc' }}
          onPointerDown={() => {
            // #region agent log
            fetch('http://127.0.0.1:7622/ingest/8c9a920c-e800-47b1-bcc4-72c12ff2d909',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3e222a'},body:JSON.stringify({sessionId:'3e222a',runId:'run1',hypothesisId:'H2',location:'ColorPickerField.tsx:swatchPointerDown',message:'swatch pointerdown',data:{},timestamp:Date.now()})}).catch(()=>{});
            // #endregion
            focusFromUserGesture.current = true;
          }}
          onClick={() => {
            /* Open picker only when swatch is clicked; input has pointer-events: none so it never receives stray clicks */
            colorInputRef.current?.click();
          }}
        >
          <input
            ref={colorInputRef}
            id={id}
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => {
              const fromGesture = focusFromUserGesture.current;
              const willBlur = !fromGesture && !!colorInputRef.current;
              // #region agent log
              fetch('http://127.0.0.1:7622/ingest/8c9a920c-e800-47b1-bcc4-72c12ff2d909',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3e222a'},body:JSON.stringify({sessionId:'3e222a',runId:'run1',hypothesisId:'H1_H3_H5',location:'ColorPickerField.tsx:colorInputFocus',message:'color input onFocus',data:{fromGesture,willBlur},timestamp:Date.now()})}).catch(()=>{});
              // #endregion
              if (willBlur && colorInputRef.current) {
                colorInputRef.current.blur();
              }
              focusFromUserGesture.current = false;
            }}
            disabled={disabled}
            className="ds-form-field__color-input-native"
            aria-invalid={!!error}
          />
        </div>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="ds-form-field__color-text"
          placeholder="#000000"
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="ds-form-field__color-dropdown" aria-hidden>
          <ChevronDown size={18} strokeWidth={2} />
        </span>
      </div>
    </FormField>
  );
};
