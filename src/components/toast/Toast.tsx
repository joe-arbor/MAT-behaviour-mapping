import React, { useEffect } from 'react';
import classnames from 'classnames';
import './toast.scss';

export type ToastVariant = 'info' | 'error' | 'warning' | 'success';

const AUTO_DISMISS_MS = 2000;

export interface ToastProps {
  variant: ToastVariant;
  /** Message content */
  children: React.ReactNode;
  /** Called when the toast is closed (by user or auto-dismiss) */
  onClose: () => void;
  /** Override: if true, auto-dismiss after 2s; if false, persist until close. Default: true for info/success, false for warning/error */
  autoDismiss?: boolean;
  className?: string;
}

const IconInfo = () => <span className="ds-toast__icon ds-toast__icon--circle" aria-hidden>i</span>;
const IconError = () => <span className="ds-toast__icon ds-toast__icon--circle" aria-hidden>!</span>;
const IconWarning = () => <span className="ds-toast__icon ds-toast__icon--triangle" aria-hidden>!</span>;
const IconSuccess = () => <span className="ds-toast__icon ds-toast__icon--check" aria-hidden>✓</span>;

const ICONS: Record<ToastVariant, React.FC> = {
  info: IconInfo,
  error: IconError,
  warning: IconWarning,
  success: IconSuccess,
};

export const Toast: React.FC<ToastProps> = ({
  variant,
  children,
  onClose,
  autoDismiss,
  className,
}) => {
  const shouldAutoDismiss = autoDismiss ?? (variant === 'info' || variant === 'success');

  useEffect(() => {
    if (!shouldAutoDismiss) return;
    const t = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [shouldAutoDismiss, onClose]);

  const Icon = ICONS[variant];

  return (
    <div
      className={classnames('ds-toast', `ds-toast--${variant}`, className)}
      role="alert"
    >
      <Icon />
      <p className="ds-toast__message">{children}</p>
      <button
        type="button"
        className="ds-toast__close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
