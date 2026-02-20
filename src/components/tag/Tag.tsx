import React from 'react';
import classnames from 'classnames';
import './tag.scss';

export type TagSize = 'big' | 'default' | 'small';

export type TagVariant = 'default' | 'destructive' | 'info' | 'success';

export interface TagProps {
  size?: TagSize;
  /** Visual variant: default (neutral), destructive (red), info (blue), success (green) */
  variant?: TagVariant;
  children: React.ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ size = 'default', variant = 'default', children, className }) => (
  <span
    className={classnames('ds-tag', `ds-tag--${size}`, variant !== 'default' && `ds-tag--${variant}`, className)}
    role="status"
  >
    {children}
  </span>
);

export default Tag;
