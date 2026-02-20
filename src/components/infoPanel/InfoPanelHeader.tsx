import React from 'react';
import classnames from 'classnames';
import './infoPanel.scss';

export interface InfoPanelHeaderProps {
  /** Avatar image or placeholder (left) */
  avatar?: React.ReactNode;
  /** Name or title (bold, primary text) */
  name: React.ReactNode;
  /** Reference code (e.g. "8F"), shown right-aligned, lighter */
  reference?: React.ReactNode;
  className?: string;
}

/**
 * Info Panel header content: avatar, name, reference.
 * Pass as the `header` prop of InfoPanel.
 */
export const InfoPanelHeader: React.FC<InfoPanelHeaderProps> = ({
  avatar,
  name,
  reference,
  className,
}) => {
  return (
    <span className={classnames('ds-info-panel-header', className)} role="presentation">
      {avatar != null && (
        <span className="ds-info-panel-header__avatar" aria-hidden>
          {avatar}
        </span>
      )}
      <span className="ds-info-panel-header__name">{name}</span>
      {reference != null && (
        <span className="ds-info-panel-header__reference">{reference}</span>
      )}
    </span>
  );
};

export default InfoPanelHeader;
