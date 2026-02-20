import { useState } from 'react';
import { Toast } from '../../components/toast/Toast';
import { Button } from '../../components/button/Button';
import './toastShowcase.scss';

type ToastItem = { id: number; variant: 'info' | 'error' | 'warning' | 'success'; message: string };

const EXAMPLES: Record<ToastItem['variant'], string> = {
  info: 'Ofsted report ready for download.',
  error: 'No admin permissions. Choose different database or use different login credentials.',
  warning: 'Warning! You are about to make change.',
  success: 'You have successfully added a new curriculum.',
};

export function ToastShowcase() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [nextId, setNextId] = useState(0);

  const addToast = (variant: ToastItem['variant']) => {
    const id = nextId;
    setNextId((n) => n + 1);
    setToasts((prev) => [...prev, { id, variant, message: EXAMPLES[variant] }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="toast-showcase">
      <section className="toast-showcase__section">
        <h2 className="toast-showcase__heading">Toast notifications</h2>
        <p className="toast-showcase__intro">
          Info and success toasts auto-dismiss after 2 seconds. Warning and error toasts stay until the close icon is clicked.
        </p>

        <h3 className="toast-showcase__subheading">Trigger a toast</h3>
        <div className="toast-showcase__actions">
          <Button variant="secondary" color="grey" onClick={() => addToast('info')}>
            Show info
          </Button>
          <Button variant="secondary" color="red" onClick={() => addToast('error')}>
            Show error
          </Button>
          <Button variant="secondary" color="orange" onClick={() => addToast('warning')}>
            Show warning
          </Button>
          <Button variant="secondary" color="green" onClick={() => addToast('success')}>
            Show success
          </Button>
        </div>

        <div className="toast-showcase__container" aria-live="polite">
          <div className="toast-showcase__stack">
            {toasts.map((t) => (
              <Toast key={t.id} variant={t.variant} onClose={() => removeToast(t.id)}>
                {t.message}
              </Toast>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
