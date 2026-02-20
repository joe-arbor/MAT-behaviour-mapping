import React from 'react';
import classnames from 'classnames';
import './button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'secondaryV1' | 'tertiary';
export type ButtonColor = 'grey' | 'green' | 'orange' | 'red';
export type ButtonSize = 'small' | 'medium';
export type ButtonSegment = 'standalone' | 'left' | 'center' | 'right';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  /** Show dropdown arrow (menu) on the right */
  menu?: boolean;
  /** For segmented button group: position in group */
  segment?: ButtonSegment;
  /** Legacy Ext.js style: sharp corners, no rounding */
  legacy?: boolean;
  /** Segmented / toolbar: show as selected (e.g. first segment) */
  active?: boolean;
  /** Icon to show left of label */
  iconLeft?: React.ReactNode;
  /** Icon to show right of label (ignored if menu is true) */
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

const ChevronDown = () => (
  <span className="ds-button__chevron" aria-hidden>
    ▾
  </span>
);

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  color = 'green',
  size = 'medium',
  disabled = false,
  menu = false,
  segment = 'standalone',
  legacy = false,
  active = false,
  iconLeft,
  iconRight,
  children,
  className,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={classnames(
        'ds-button',
        `ds-button--${variant}`,
        `ds-button--${color}`,
        `ds-button--${size}`,
        `ds-button--segment-${segment}`,
        {
          'ds-button--disabled': disabled,
          'ds-button--menu': menu,
          'ds-button--legacy': legacy,
          'ds-button--active': active,
        },
        className,
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {iconLeft && <span className="ds-button__icon ds-button__icon--left">{iconLeft}</span>}
      <span className="ds-button__label">{children}</span>
      {menu && <ChevronDown />}
      {!menu && iconRight && (
        <span className="ds-button__icon ds-button__icon--right">{iconRight}</span>
      )}
    </button>
  );
};

export default Button;
