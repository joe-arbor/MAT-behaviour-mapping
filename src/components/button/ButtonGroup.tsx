import React from 'react';
import classnames from 'classnames';
import './buttonGroup.scss';

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Segmented: buttons share borders and only outer corners rounded */
  segmented?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  segmented = false,
}) => (
  <div
    className={classnames('ds-button-group', { 'ds-button-group--segmented': segmented }, className)}
    role="group"
  >
    {children}
  </div>
);

export default ButtonGroup;
