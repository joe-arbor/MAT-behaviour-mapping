import React from 'react';
import { Modal } from './Modal';
import { Button } from '../button/Button';
import { CircleAlert } from 'lucide-react';
import './errorModal.scss';

export interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  /** Called when "Refresh page" is clicked */
  onRefresh?: () => void;
  /** Error ID shown in the body (e.g. "89ecb6a4-0e50-11f1-8bfa-0ab83eba8f87") */
  errorId?: string;
  /** URL for the "Press here" support link (e.g. Contact Us form) */
  supportLinkHref?: string;
  /** Label for the support link (default "Press here") */
  supportLinkLabel?: string;
}

const defaultSupportLinkLabel = 'Press here';

/**
 * Error handling modal: "Sorry, something went wrong" with body copy, support options, error ID,
 * and Close / Refresh page actions.
 */
export const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  onRefresh,
  errorId = '',
  supportLinkHref,
  supportLinkLabel = defaultSupportLinkLabel,
}) => {
  const supportLink = supportLinkHref ? (
    <a href={supportLinkHref} target="_blank" rel="noopener noreferrer">
      {supportLinkLabel}
    </a>
  ) : (
    supportLinkLabel
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Sorry, something went wrong"
      headerIcon={
        <span className="ds-modal__header-icon ds-modal__header-icon--destructive" aria-hidden>
          <CircleAlert size={24} strokeWidth={2} />
        </span>
      }
      footer={
        <>
          <Button variant="secondary" color="grey" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" color="green" onClick={onRefresh ?? (() => window.location.reload())}>
            Refresh page
          </Button>
        </>
      }
    >
      <p>
        Try refreshing the page and starting again. If the problem continues, there are two options
        depending on your support plan:
      </p>
      <ul>
        <li>
          <strong>Arbor supported:</strong> {supportLink} to send an email to our Support Team using
          our Contact Us form (the error ID will be added automatically).
        </li>
        <li>
          <strong>Partner supported:</strong> Please get in touch with your Support Partner, and
          let them know the error ID below.
        </li>
      </ul>
      {errorId && <p>ID: {errorId}</p>}
    </Modal>
  );
};

export default ErrorModal;
