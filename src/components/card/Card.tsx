import classnames from 'classnames';
import './card.scss';

export interface CardProps {
  /** Main title */
  title: React.ReactNode;
  /** Optional subtitle above the title (small, light grey) */
  subtitle?: React.ReactNode;
  /** Body/description text below the title */
  description?: React.ReactNode;
  /** Optional icon or element to the left of the content */
  icon?: React.ReactNode;
  /** Optional element on the right (e.g. chevron, arrow) */
  rightElement?: React.ReactNode;
  /** Optional info/tooltip icon next to the title */
  titleInfo?: React.ReactNode;
  /** Optional action (e.g. button) at bottom of card */
  action?: React.ReactNode;
  /** Selected state: shows green border (e.g. for tile selection) */
  selected?: boolean;
  /** Inactive/disabled state: muted background and text */
  inactive?: boolean;
  /** Click handler; when set, card is interactive (cursor, hover) */
  onClick?: () => void;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  icon,
  rightElement,
  titleInfo,
  action,
  selected = false,
  inactive = false,
  onClick,
  className,
  id,
  children,
}) => {
  const isInteractive = typeof onClick === 'function';
  const Wrapper = isInteractive ? 'button' : 'div';
  const wrapperProps = isInteractive ? { type: 'button' as const, onClick } : {};

  return (
    <Wrapper
      id={id}
      className={classnames(
        'ds-card',
        {
          'ds-card--selected': selected,
          'ds-card--inactive': inactive,
          'ds-card--interactive': isInteractive,
        },
        className
      )}
      {...wrapperProps}
    >
      <div className="ds-card__inner">
        {icon != null && <div className="ds-card__icon">{icon}</div>}
        <div className="ds-card__content">
          {subtitle != null && (
            <div className="ds-card__subtitle">{subtitle}</div>
          )}
          <div className="ds-card__title-row">
            <h3 className="ds-card__title">{title}</h3>
            {titleInfo != null && (
              <span className="ds-card__title-info">{titleInfo}</span>
            )}
          </div>
          {description != null && (
            <p className="ds-card__description">{description}</p>
          )}
          {children}
        </div>
        {rightElement != null && (
          <div className="ds-card__right">{rightElement}</div>
        )}
      </div>
      {action != null && <div className="ds-card__action">{action}</div>}
    </Wrapper>
  );
};

export default Card;
