import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import './modal.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Optional title in the header */
  title?: React.ReactNode;
  /** Optional icon (e.g. error icon) shown left of title */
  headerIcon?: React.ReactNode;
  /** Body content */
  children?: React.ReactNode;
  /** Footer content (e.g. action buttons), typically right-aligned */
  footer?: React.ReactNode;
  /** Accessible label for the dialog */
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  id?: string;
  className?: string;
}

/**
 * Modal dialog: overlay + panel with optional header (icon + title), body, and footer.
 * Closes on Escape and optionally on overlay click. Focus is moved into the panel when open.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  headerIcon,
  children,
  footer,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  id: propId,
  className,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    return () => {
      previousActiveElement.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && panelRef.current) {
      const focusable = panelRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (focusable ?? panelRef.current)?.focus();
    }
  }, [open]);

  if (!open) return null;

  const dialogId = propId ?? `ds-modal-${Math.random().toString(36).slice(2, 9)}`;
  const titleId = `${dialogId}-title`;

  const modal = (
    <div
      className={classnames('ds-modal-overlay', className)}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        id={dialogId}
        ref={panelRef}
        className="ds-modal"
        role="dialog"
        aria-modal
        aria-labelledby={title ? titleId : ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {(title != null || headerIcon != null) && (
          <div className="ds-modal__header">
            {headerIcon != null && (
              <span className="ds-modal__header-icon" aria-hidden>
                {headerIcon}
              </span>
            )}
            {title != null && (
              <h2 id={titleId} className="ds-modal__title">
                {title}
              </h2>
            )}
          </div>
        )}
        {children != null && <div className="ds-modal__body">{children}</div>}
        {footer != null && <div className="ds-modal__footer">{footer}</div>}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modal, document.body) : null;
};

export default Modal;
