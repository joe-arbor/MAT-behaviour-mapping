import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import './tooltip.scss';

export interface TooltipProps {
  /** Trigger element (button, icon, etc.) that the tooltip hovers over */
  children: React.ReactNode;
  /** Main content. For simple tooltip this is the only content. */
  content: React.ReactNode;
  /** Optional title; when provided, tooltip uses advanced layout (title row + divider + content + optional action) */
  title?: React.ReactNode;
  /** Optional action (e.g. "Edit" link); shown bottom-right in advanced layout, styled green */
  action?: React.ReactNode;
  /** Delay in ms before showing (default 150) */
  delay?: number;
  /** Optional id for aria-describedby on trigger */
  id?: string;
  className?: string;
}

/**
 * Tooltip that appears on hover over the trigger. Renders below the trigger with an upward-pointing arrow.
 * Simple: content only. Advanced: pass title (and optionally action) for title row + content + green action link.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  title,
  action,
  delay = 150,
  id: propId,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const scheduleHide = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      hideTimeoutRef.current = null;
      setVisible(false);
      setPosition(null);
    }, 100);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    scheduleHide();
  };

  const cancelHide = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  useLayoutEffect(() => {
    if (!visible || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 8;
    setPosition({
      top: rect.bottom + gap,
      left: rect.left + rect.width / 2,
    });
  }, [visible]);

  const tooltipId = propId ?? `ds-tooltip-${Math.random().toString(36).slice(2, 9)}`;
  const isAdvanced = title != null;

  const tooltipBody = visible && position && (
    <div
      id={tooltipId}
      role="tooltip"
      className={classnames('ds-tooltip', { 'ds-tooltip--advanced': isAdvanced }, className)}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        transform: 'translateX(-50%)',
      }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
    >
      <div className="ds-tooltip__arrow" aria-hidden />
      <div className="ds-tooltip__inner">
        {isAdvanced ? (
          <>
            <div className="ds-tooltip__title">{title}</div>
            <div className="ds-tooltip__divider" aria-hidden />
            <div className="ds-tooltip__content-row">
              <div className="ds-tooltip__content">{content}</div>
              {action != null && <div className="ds-tooltip__action">{action}</div>}
            </div>
          </>
        ) : (
          <div className="ds-tooltip__content">{content}</div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className="ds-tooltip-trigger"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={visible ? tooltipId : undefined}
      >
        {children}
      </span>
      {typeof document !== 'undefined' && createPortal(tooltipBody, document.body)}
    </>
  );
};

export default Tooltip;
