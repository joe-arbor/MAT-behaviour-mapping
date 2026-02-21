import React from 'react';
import classnames from 'classnames';
import { HelpCircle } from 'lucide-react';
import { Button } from '../button/Button';
import { Attachment } from '../attachment/Attachment';
import './courseActionSidebar.scss';

export interface CourseActionSidebarProps {
  /** Ask Arbor / Course button label */
  askArborLabel?: string;
  /** Callback when Ask Arbor is clicked */
  onAskArbor?: () => void;
  /** Show attachments block with upload */
  showAttachments?: boolean;
  /** Callback when files change (for attachments) */
  onAttachmentsChange?: (files: { id: string; file: File }[]) => void;
  /** Show action buttons: Download Student List, Communications, Browse Student Profiles, Delete Course */
  showActions?: boolean;
  onDownloadStudentList?: () => void;
  onCommunications?: () => void;
  onBrowseStudentProfiles?: () => void;
  onDeleteCourse?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const CourseActionSidebar: React.FC<CourseActionSidebarProps> = ({
  askArborLabel = 'Ask Arbor / Course',
  onAskArbor,
  showAttachments = true,
  onAttachmentsChange,
  showActions = true,
  onDownloadStudentList,
  onCommunications,
  onBrowseStudentProfiles,
  onDeleteCourse,
  className,
  children,
}) => {
  return (
    <aside className={classnames('ds-course-action-sidebar', className)}>
      <div className="ds-course-action-sidebar__ask">
        <Button
          variant="primary"
          color="green"
          size="medium"
          iconLeft={<HelpCircle size={18} aria-hidden />}
          onClick={onAskArbor}
        >
          {askArborLabel}
        </Button>
      </div>

      {showAttachments && (
        <div className="ds-course-action-sidebar__attachments">
          <Attachment
            title="Attachments"
            allowUpload
            allowDelete
            allowDownload
            onChange={onAttachmentsChange}
          />
        </div>
      )}

      {showActions && (
        <div className="ds-course-action-sidebar__actions">
          <Button
            variant="primary"
            color="green"
            size="medium"
            onClick={onDownloadStudentList}
          >
            Download Student List
          </Button>
          <Button
            variant="primary"
            color="orange"
            size="medium"
            menu
            onClick={onCommunications}
          >
            Communications
          </Button>
          <Button
            variant="primary"
            color="red"
            size="medium"
            onClick={onBrowseStudentProfiles}
          >
            Browse Student Profiles
          </Button>
          <Button
            variant="primary"
            color="red"
            size="medium"
            onClick={onDeleteCourse}
          >
            Delete Course
          </Button>
        </div>
      )}

      {children}
    </aside>
  );
};
