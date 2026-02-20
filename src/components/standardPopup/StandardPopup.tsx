import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import { X, Maximize2 } from 'lucide-react';
import { Button } from '../button/Button';
import './standardPopup.scss';

export interface StandardPopupButtonConfig {
  label: React.ReactNode;
  onClick: () => void;
  /** Primary (solid green) vs secondary (outline) */
  variant?: 'primary' | 'secondary';
}

export interface StandardPopupProps {
  open: boolean;
  onClose: () => void;
  /** Title shown in the header (centre) */
  title?: React.ReactNode;
  /** Body content (scrollable) */
  children?: React.ReactNode;
  /** Zero, one, or two footer buttons (right-aligned) */
  footerButtons?: [] | [StandardPopupButtonConfig] | [StandardPopupButtonConfig, StandardPopupButtonConfig];
  /** When true, popup is 80% of viewport width/height instead of fixed 500x600 */
  responsive?: boolean;
  /** Called when user clicks expand to fullscreen */
  onExpand?: () => void;
  /** Accessible label for the dialog */
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  id?: string;
  className?: string;
}

/**
 * Standard popup: 500×600px (or 80% viewport when responsive). Header with expand, title, close;
 * scrollable body on white; sticky footer with 0, 1, or 2 buttons.
 */
export const StandardPopup: React.FC<StandardPopupProps> = ({
  open,
  onClose,
  title,
  children,
  footerButtons = [],
  responsive = false,
  onExpand,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  id: propId,
  className,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleExpandClick = () => {
    if (onExpand) {
      onExpand();
    } else {
      setIsFullscreen((prev) => !prev);
    }
  };

  if (!open) return null;

  const dialogId = propId ?? `ds-standard-popup-${Math.random().toString(36).slice(2, 9)}`;
  const titleId = `${dialogId}-title`;
  const hasFooter = footerButtons.length > 0;

  const popup = (
    <div
      className={classnames(
        'ds-standard-popup-overlay',
        isFullscreen && 'ds-standard-popup-overlay--fullscreen',
        className,
      )}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        id={dialogId}
        ref={panelRef}
        className={classnames(
          'ds-standard-popup',
          responsive && 'ds-standard-popup--responsive',
          isFullscreen && 'ds-standard-popup--fullscreen',
        )}
        role="dialog"
        aria-modal
        aria-labelledby={title != null ? titleId : ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ds-standard-popup__header">
          <button
            type="button"
            className="ds-standard-popup__header-btn"
            onClick={handleExpandClick}
            aria-label="Expand to fullscreen"
            title="Expand to fullscreen"
          >
            <Maximize2 size={18} strokeWidth={2} />
          </button>
          {title != null && (
            <h2 id={titleId} className="ds-standard-popup__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="ds-standard-popup__header-btn"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="ds-standard-popup__body">{children}</div>

        {hasFooter && (
          <footer className="ds-standard-popup__footer">
            {footerButtons.length === 1 && (
              <Button
                variant={footerButtons[0].variant === 'primary' ? 'primary' : 'secondary'}
                color="green"
                onClick={footerButtons[0].onClick}
              >
                {footerButtons[0].label}
              </Button>
            )}
            {footerButtons.length === 2 && (
              <>
                <Button variant="secondary" color="green" onClick={footerButtons[0].onClick}>
                  {footerButtons[0].label}
                </Button>
                <Button variant="primary" color="green" onClick={footerButtons[1].onClick}>
                  {footerButtons[1].label}
                </Button>
              </>
            )}
          </footer>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(popup, document.body) : null;
};

export default StandardPopup;
