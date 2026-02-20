import React from 'react';
import classnames from 'classnames';
import { ChevronRight } from 'lucide-react';
import './infoPanel.scss';

export interface InfoPanelRowProps {
  /** Label (left, muted) */
  label: React.ReactNode;
  /** Value (right, bold) */
  value: React.ReactNode;
  /** When set, row is clickable and shows arrow */
  onClick?: () => void;
  className?: string;
}

/**
 * A single label-value row in the info panel list.
 * Optionally clickable with a right-pointing arrow.
 */
export const InfoPanelRow: React.FC<InfoPanelRowProps> = ({
  label,
  value,
  onClick,
  className,
}) => {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      className={classnames('ds-info-panel-row', className, {
        'ds-info-panel-row--clickable': !!onClick,
      })}
      onClick={onClick}
    >
      <span className="ds-info-panel-row__label">{label}</span>
      <span className="ds-info-panel-row__value">
        {value}
        {onClick && (
          <ChevronRight size={16} strokeWidth={2} className="ds-info-panel-row__arrow" aria-hidden />
        )}
      </span>
    </Wrapper>
  );
};

export default InfoPanelRow;
