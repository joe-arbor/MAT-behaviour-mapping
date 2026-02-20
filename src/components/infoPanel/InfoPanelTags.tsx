import React from 'react';
import classnames from 'classnames';
import { Tags } from '../tag/Tags';
import './infoPanel.scss';

export interface InfoPanelTagsProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper for tags in the info panel list (e.g. SEN, Intervention, FSM).
 * Uses the design system Tags component so Tag spacing and styling are correct.
 */
export const InfoPanelTags: React.FC<InfoPanelTagsProps> = ({ children, className }) => (
  <div className={classnames('ds-info-panel-tags', className)}>
    <Tags>{children}</Tags>
  </div>
);

export default InfoPanelTags;
