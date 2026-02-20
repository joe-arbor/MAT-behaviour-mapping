import React from 'react';
import classnames from 'classnames';
import './banner.scss';

export type BannerVariant = 'system' | 'info' | 'warning' | 'error';

export interface BannerProps {
  variant: BannerVariant;
  /** Optional title */
  title?: React.ReactNode;
  /** Body content (preferably text; can accept HTML via dangerouslySetInnerHTML if needed) */
  children?: React.ReactNode;
  /** Optional icon (e.g. person silhouette, chat bubble) */
  icon?: React.ReactNode;
  /** Optional action buttons (one or two) */
  actions?: React.ReactNode;
  className?: string;
  id?: string;
}

export const Banner: React.FC<BannerProps> = ({
  variant,
  title,
  children,
  icon,
  actions,
  className,
  id,
}) => {
  return (
    <div
      id={id}
      className={classnames('ds-banner', `ds-banner--${variant}`, className)}
      role="region"
      aria-label={typeof title === 'string' ? title : 'Banner'}
    >
      {icon != null && <div className="ds-banner__icon">{icon}</div>}
      <div className="ds-banner__content">
        {title != null && <h3 className="ds-banner__title">{title}</h3>}
        {children != null && <div className="ds-banner__body">{children}</div>}
      </div>
      {actions != null && <div className="ds-banner__actions">{actions}</div>}
    </div>
  );
};

export default Banner;
