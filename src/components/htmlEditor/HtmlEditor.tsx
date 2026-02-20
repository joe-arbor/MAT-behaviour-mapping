import { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import './htmlEditor.scss';

export type HtmlEditorToolbarPreset =
  | 'full'           // formatting, colors, link, table, no image
  | 'withImage'      // like full + image
  | 'withPageBreak'  // basic formatting + page break
  | 'minimal';       // undo, redo, merge fields only

export interface HtmlEditorProps {
  /** HTML value (controlled) */
  value?: string;
  /** Called when content changes */
  onChange?: (value: string) => void;
  /** Placeholder when empty */
  placeholder?: string;
  /** Toolbar preset */
  toolbar?: HtmlEditorToolbarPreset;
  /** Max character count (enforced in onChange); enables character counter when set */
  maxLength?: number;
  /** Show word count in footer */
  showWordCount?: boolean;
  /** Show "Show preview" button in footer */
  showPreviewButton?: boolean;
  /** Id for preview target / aria */
  id?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional label */
  label?: string;
  className?: string;
}

const TOOLBAR_FULL = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ font: [] }, { size: ['12px', '14px', '16px', '18px'] }],
    [{ color: [] }, { background: [] }],
    ['link', 'unlink'],
    ['blockquote', 'code-block'],
    ['clean'],
  ],
};

const TOOLBAR_WITH_IMAGE = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ font: [] }, { size: ['12px', '14px', '16px', '18px'] }],
    [{ color: [] }, { background: [] }],
    ['link', 'unlink', 'image'],
    ['blockquote', 'code-block'],
    ['clean'],
  ],
};

const TOOLBAR_WITH_PAGE_BREAK = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ font: [] }, { size: ['12px', '14px', '16px', '18px'] }],
    [{ color: [] }, { background: [] }],
    ['link', 'unlink'],
    ['clean'],
  ],
};

const TOOLBAR_MINIMAL = {
  toolbar: [
    ['undo', 'redo'],
  ],
};

function getModules(preset: HtmlEditorToolbarPreset) {
  switch (preset) {
    case 'full':
      return TOOLBAR_FULL;
    case 'withImage':
      return TOOLBAR_WITH_IMAGE;
    case 'withPageBreak':
      return TOOLBAR_WITH_PAGE_BREAK;
    case 'minimal':
      return TOOLBAR_MINIMAL;
    default:
      return TOOLBAR_FULL;
  }
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

function stripHtml(html: string): string {
  const doc = typeof document !== 'undefined' ? new DOMParser().parseFromString(html || '', 'text/html') : null;
  return doc ? doc.body?.textContent || '' : '';
}

function countChars(html: string): number {
  return stripHtml(html).length;
}

export const HtmlEditor: React.FC<HtmlEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'html editor placeholder',
  toolbar = 'full',
  maxLength,
  showWordCount = true,
  showPreviewButton = false,
  id: idProp,
  disabled = false,
  label,
  className,
}) => {
  const id = idProp || `html-editor-${Math.random().toString(36).slice(2, 9)}`;
  const [internalValue, setInternalValue] = useState(value);
  const isControlled = onChange !== undefined;
  const currentValue = isControlled ? (value ?? '') : internalValue;

  const modules = useMemo(() => getModules(toolbar), [toolbar]);

  const handleChange = (content: string) => {
    if (isControlled) {
      onChange?.(content);
    } else {
      setInternalValue(content);
    }
  };

  const chars = countChars(currentValue);
  const words = countWords(currentValue);
  const remaining = maxLength != null ? Math.max(0, maxLength - chars) : null;

  return (
    <div
      className={`ds-html-editor ${disabled ? 'ds-html-editor--disabled' : ''} ${className ?? ''}`}
      data-toolbar={toolbar}
    >
      {label != null && (
        <label htmlFor={id} className="ds-html-editor__label">
          {label}
        </label>
      )}
      <div className="ds-html-editor__wrapper">
        <ReactQuill
          id={id}
          theme="snow"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          modules={modules}
          readOnly={disabled}
          className="ds-html-editor__quill"
        />
      </div>
      <footer className="ds-html-editor__footer">
        {remaining != null && (
          <span className="ds-html-editor__counter" aria-live="polite">
            {remaining} character{remaining !== 1 ? 's' : ''} remaining, {words} word{words !== 1 ? 's' : ''}
          </span>
        )}
        {showWordCount && remaining == null && (
          <span className="ds-html-editor__counter">
            {words} word{words !== 1 ? 's' : ''}
          </span>
        )}
        {showPreviewButton && (
          <button
            type="button"
            className="ds-html-editor__preview-btn"
            onClick={() => {}}
          >
            Show preview for: {id}
          </button>
        )}
      </footer>
    </div>
  );
};

export default HtmlEditor;
