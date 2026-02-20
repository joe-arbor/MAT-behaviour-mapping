import React from 'react';
import classnames from 'classnames';
import './kpiBox.scss'; // for .ds-kpi-box-grid

export interface KpiBoxGridProps {
  /** Number of columns in the grid (default 3) */
  columns?: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const KpiBoxGrid: React.FC<KpiBoxGridProps> = ({
  columns = 3,
  children,
  className,
  id,
}) => (
  <div
    id={id}
    className={classnames('ds-kpi-box-grid', className)}
    style={{ '--kpi-box-grid-columns': columns } as React.CSSProperties}
  >
    {children}
  </div>
);

export default KpiBoxGrid;
