import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../button/Button';
import './slideover.scss';

export interface SlideoverButtonConfig {
  label: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface SlideoverProps {
  open: boolean;
  onClose: () => void;
  /** Title shown in the header (centre) */
  title?: React.ReactNode;
  /** Body content (scrollable) */
  children?: React.ReactNode;
  /** Zero, one, or two footer buttons (right-aligned). Omit or empty = no footer. */
  footerButtons?: [] | [SlideoverButtonConfig] | [SlideoverButtonConfig, SlideoverButtonConfig];
  /** Panel width (default 580px) */
  width?: number | string;
  /** Accessible label for the panel */
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  id?: string;
  className?: string;
}

/**
 * Slideover: panel that enters from the right, full height, with overlay. Header (back, title), scrollable body, optional footer (0, 1, or 2 buttons). Same visual style as modal (white background, single border).
 */
export const Slideover: React.FC<SlideoverProps> = ({
  open,
  onClose,
  title,
  children,
  footerButtons = [],
  width = 580,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  id: propId,
  className,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

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

  const panelId = propId ?? `ds-slideover-${Math.random().toString(36).slice(2, 9)}`;
  const titleId = `${panelId}-title`;
  const hasFooter = footerButtons.length > 0;
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  const slideover = (
    <div
      className={classnames('ds-slideover-overlay', className)}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        id={panelId}
        ref={panelRef}
        className="ds-slideover"
        style={{ width: widthStyle }}
        role="dialog"
        aria-modal
        aria-labelledby={title != null ? titleId : ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ds-slideover__header">
          <button
            type="button"
            className="ds-slideover__back"
            onClick={onClose}
            aria-label="Back"
          >
            <ChevronLeft size={18} strokeWidth={2} aria-hidden />
            <span>Back</span>
          </button>
          {title != null && (
            <h2 id={titleId} className="ds-slideover__title">
              {title}
            </h2>
          )}
        </header>

        <div className="ds-slideover__body">{children}</div>

        {hasFooter && (
          <footer className="ds-slideover__footer">
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

  return typeof document !== 'undefined' ? createPortal(slideover, document.body) : null;
};

export default Slideover;
