import React from 'react';
import classnames from 'classnames';
import './tag.scss';

export interface TagsProps {
  children: React.ReactNode;
  className?: string;
}

/** Container for tags — applies margin between tags (margin-right 8px, margin-bottom 7px). */
export const Tags: React.FC<TagsProps> = ({ children, className }) => (
  <span className={classnames('ds-tags', className)}>
    {children}
  </span>
);

export default Tags;
