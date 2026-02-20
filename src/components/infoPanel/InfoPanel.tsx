import React from 'react';
import classnames from 'classnames';
import { Section } from '../section/Section';
import './infoPanel.scss';

export interface InfoPanelProps {
  /** Header: avatar, name, reference (e.g. "8F"). Rendered inside the section header. */
  header: React.ReactNode;
  /** Optional icon or action in the header (e.g. folder icon before reference) */
  headerAction?: React.ReactNode;
  /** List content: rows, tags, or custom. Rendered in the section body. */
  children?: React.ReactNode;
  /** When true, section can be expanded/collapsed */
  expandable?: boolean;
  /** Initial expanded state when expandable */
  defaultExpanded?: boolean;
  /** Called when expandable section is toggled */
  onExpandChange?: (expanded: boolean) => void;
  className?: string;
  id?: string;
}

/**
 * Info Panel: a section with a custom header (avatar, name, reference) and a list of details.
 * Composes Section, section header, and list content.
 */
export const InfoPanel: React.FC<InfoPanelProps> = ({
  header,
  headerAction,
  children,
  expandable = false,
  defaultExpanded = true,
  onExpandChange,
  className,
  id,
}) => {
  return (
    <Section
      id={id}
      title={header}
      headerAction={headerAction}
      expandable={expandable}
      defaultExpanded={defaultExpanded}
      onExpandChange={onExpandChange}
      isSubsection
      emptyMessage=""
      className={classnames('ds-info-panel', className)}
    >
      {children != null && (Array.isArray(children) ? children.length > 0 : true) ? (
        <div className="ds-info-panel__list">{children}</div>
      ) : null}
    </Section>
  );
};

export default InfoPanel;
