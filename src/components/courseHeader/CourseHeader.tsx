import React from 'react';
import classnames from 'classnames';
import { Users } from 'lucide-react';
import './courseHeader.scss';

export interface CourseHeaderMeta {
  label: string;
  value: string;
}

export interface CourseHeaderProps {
  /** Course title (e.g. "KS3 Mathematics Year 8: By/Ma1") */
  title: string;
  /** Meta lines below title (e.g. Academic Level, Parent Course, By Teacher) */
  meta?: CourseHeaderMeta[];
  /** Optional icon node; default is a group/class icon */
  icon?: React.ReactNode;
  className?: string;
}

const DefaultIcon = () => (
  <div className="ds-course-header__icon-placeholder" aria-hidden>
    <Users size={48} className="ds-course-header__icon-svg" />
  </div>
);

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  meta = [],
  icon,
  className,
}) => {
  return (
    <header className={classnames('ds-course-header', className)}>
      <div className="ds-course-header__icon">
        {icon ?? <DefaultIcon />}
      </div>
      <div className="ds-course-header__body">
        <h1 className="ds-course-header__title">{title}</h1>
        {meta.length > 0 && (
          <ul className="ds-course-header__meta" role="list">
            {meta.map((m, i) => (
              <li key={i} className="ds-course-header__meta-item">
                <span className="ds-course-header__meta-label">{m.label}:</span>{' '}
                <span className="ds-course-header__meta-value">{m.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};
