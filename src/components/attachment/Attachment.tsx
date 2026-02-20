import { useCallback, useId, useRef, useState } from 'react';
import { Upload, FileText, Download, Trash2, ChevronRight } from 'lucide-react';
import classnames from 'classnames';
import './attachment.scss';

export interface AttachmentFile {
  id: string;
  file: File;
}

export interface AttachmentProps {
  /** Title shown in the header */
  title?: string;
  /** Allow adding files (show upload zone) */
  allowUpload?: boolean;
  /** Allow deleting files from the list */
  allowDelete?: boolean;
  /** Allow downloading files */
  allowDownload?: boolean;
  /** Controlled list of files (optional; if not provided, component manages its own state) */
  files?: AttachmentFile[];
  /** Called when files are added or removed */
  onChange?: (files: AttachmentFile[]) => void;
  /** Collapsible header; when true, content can be toggled */
  collapsible?: boolean;
  /** Initial collapsed state when collapsible */
  defaultCollapsed?: boolean;
  className?: string;
  id?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileTypeLabel(file: File): string {
  const type = file.type || '';
  if (type.startsWith('image/')) return 'Image';
  if (type.startsWith('video/')) return 'Video';
  if (type.startsWith('audio/')) return 'Audio';
  if (type.includes('pdf')) return 'PDF';
  return 'File';
}

export const Attachment: React.FC<AttachmentProps> = ({
  title = 'Attachments',
  allowUpload = true,
  allowDelete = true,
  allowDownload = true,
  files: controlledFiles,
  onChange,
  collapsible = false,
  defaultCollapsed = false,
  className,
  id: idProp,
}) => {
  const id = idProp || useId();
  const [internalFiles, setInternalFiles] = useState<AttachmentFile[]>([]);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledFiles !== undefined;
  const files = isControlled ? controlledFiles : internalFiles;

  const setFiles = useCallback(
    (next: AttachmentFile[]) => {
      if (!isControlled) setInternalFiles(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const handleFileSelect = useCallback(
    (selected: FileList | null) => {
      if (!selected?.length || !allowUpload) return;
      const newEntries: AttachmentFile[] = Array.from(selected).map((file) => ({
        id: `${id}-${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
      }));
      setFiles([...files, ...newEntries]);
    },
    [allowUpload, files, id, setFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!allowUpload) return;
      handleFileSelect(e.dataTransfer.files);
    },
    [allowUpload, handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleClickUpload = useCallback(() => {
    if (!allowUpload) return;
    inputRef.current?.click();
  }, [allowUpload]);

  const handleDownload = useCallback(
    (entry: AttachmentFile) => {
      if (!allowDownload) return;
      const url = URL.createObjectURL(entry.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = entry.file.name;
      a.click();
      URL.revokeObjectURL(url);
    },
    [allowDownload]
  );

  const handleDelete = useCallback(
    (entryId: string) => {
      if (!allowDelete) return;
      setFiles(files.filter((f) => f.id !== entryId));
    },
    [allowDelete, files, setFiles]
  );

  return (
    <div
      id={id}
      className={classnames('ds-attachment', className)}
      role="region"
      aria-label={title}
    >
      <header
        className={classnames('ds-attachment__header', {
          'ds-attachment__header--collapsible': collapsible,
        })}
      >
        <h3 className="ds-attachment__title">{title}</h3>
        {collapsible && (
          <button
            type="button"
            className="ds-attachment__toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-expanded={!collapsed}
            aria-controls={`${id}-content`}
          >
            <ChevronRight
              size={18}
              strokeWidth={2}
              className={classnames('ds-attachment__chevron', {
                'ds-attachment__chevron--open': !collapsed,
              })}
            />
          </button>
        )}
      </header>

      <div
        id={`${id}-content`}
        className="ds-attachment__content"
        hidden={collapsible && collapsed}
      >
        {allowUpload && (
          <div
            className="ds-attachment__dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClickUpload}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClickUpload();
              }
            }}
            aria-label="Drag or click to upload"
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              className="ds-attachment__input"
              onChange={(e) => {
                handleFileSelect(e.target.files);
                e.target.value = '';
              }}
              aria-hidden
            />
            <Upload size={40} strokeWidth={1.5} className="ds-attachment__upload-icon" />
            <p className="ds-attachment__upload-text">
              Drag or click to <span className="ds-attachment__upload-link">upload</span>
            </p>
          </div>
        )}

        {files.length > 0 && (
          <ul className="ds-attachment__list" role="list">
            {files.map((entry) => (
              <li key={entry.id} className="ds-attachment__item">
                <FileText size={20} strokeWidth={1.5} className="ds-attachment__file-icon" />
                <div className="ds-attachment__item-body">
                  <span className="ds-attachment__item-name">{entry.file.name}</span>
                  <span className="ds-attachment__item-meta">
                    {getFileTypeLabel(entry.file)}, {formatFileSize(entry.file.size)}
                  </span>
                </div>
                <div className="ds-attachment__item-actions">
                  {allowDownload && (
                    <button
                      type="button"
                      className="ds-attachment__action"
                      onClick={() => handleDownload(entry)}
                      title="Download"
                      aria-label={`Download ${entry.file.name}`}
                    >
                      <Download size={18} strokeWidth={2} />
                    </button>
                  )}
                  {allowDelete && (
                    <button
                      type="button"
                      className="ds-attachment__action"
                      onClick={() => handleDelete(entry.id)}
                      title="Delete"
                      aria-label={`Delete ${entry.file.name}`}
                    >
                      <Trash2 size={18} strokeWidth={2} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Attachment;
