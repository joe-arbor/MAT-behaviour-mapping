import React from 'react';
import classnames from 'classnames';
import './kpiBox.scss';

export type KpiStatusVariant = 'default' | 'success' | 'info' | 'caution' | 'warning' | 'danger';
export type KpiComparisonDirection = 'up' | 'down' | 'neutral';

export interface KpiBarSegment {
  label: string;
  value: number;
  /** Renders in the value column; defaults to `value` when missing. */
  valueLabel?: React.ReactNode;
  /** No bar width; value excluded from max; shows "N/A" in the value column. */
  isUnavailable?: boolean;
  color?: string;
  /** For diverging charts: which side of center. Ignored for simple bar chart. */
  direction?: 'left' | 'right';
}

export type KpiBoxVariant = 'status' | 'numberWithComparison' | 'barChart' | 'barChartDiverging';

export interface KpiBoxProps {
  /** Box title (e.g. "Kpi Box 1") */
  title: React.ReactNode;
  /** Date or period label (e.g. "Today", "Yesterday") */
  date: React.ReactNode;
  /** Optional description shown below main content */
  description?: string;
  /** Visual variant */
  variant: KpiBoxVariant;
  /** For variant="status": status text (e.g. "Developing") */
  statusText?: React.ReactNode;
  /** For variant="status": maps to semantic tokens (success, caution, warning, danger, info, default) */
  statusVariant?: KpiStatusVariant;
  /** For numberWithComparison / barChart / barChartDiverging: main value shown prominently */
  value?: React.ReactNode;
  /** For variant="numberWithComparison": comparison line (e.g. "Up by 10% compared to last year") */
  comparisonText?: React.ReactNode;
  /** For variant="numberWithComparison": up = success, down = warning/danger, neutral = grey */
  comparisonDirection?: KpiComparisonDirection;
  /** For variant="barChart" | "barChartDiverging": bar segments. For diverging, use direction on each segment. */
  bars?: KpiBarSegment[];
  /** Optional semantic colour for the display number (value). For numberWithComparison, derived from comparisonDirection when not set. */
  valueVariant?: KpiStatusVariant;
  className?: string;
  id?: string;
}

const STATUS_VARIANT_CLASS: Record<KpiStatusVariant, string> = {
  default: 'ds-kpi-box__status--default',
  success: 'ds-kpi-box__status--success',
  info: 'ds-kpi-box__status--info',
  caution: 'ds-kpi-box__status--caution',
  warning: 'ds-kpi-box__status--warning',
  danger: 'ds-kpi-box__status--danger',
};

const VALUE_VARIANT_CLASS: Record<KpiStatusVariant, string> = {
  default: 'ds-kpi-box__value--default',
  success: 'ds-kpi-box__value--success',
  info: 'ds-kpi-box__value--info',
  caution: 'ds-kpi-box__value--caution',
  warning: 'ds-kpi-box__value--warning',
  danger: 'ds-kpi-box__value--danger',
};

const COMPARISON_DIRECTION_CLASS: Record<KpiComparisonDirection, string> = {
  up: 'ds-kpi-box__comparison--up',
  down: 'ds-kpi-box__comparison--down',
  neutral: 'ds-kpi-box__comparison--neutral',
};

function valueVariantFromDirection(direction: KpiComparisonDirection): KpiStatusVariant {
  if (direction === 'up') return 'success';
  if (direction === 'down') return 'warning';
  return 'default';
}

export const KpiBox: React.FC<KpiBoxProps> = ({
  title,
  date,
  description,
  variant,
  statusText,
  statusVariant = 'default',
  value,
  comparisonText,
  comparisonDirection = 'neutral',
  bars = [],
  valueVariant,
  className,
  id,
}) => {
  const displayValueVariant: KpiStatusVariant =
    valueVariant ??
    (variant === 'numberWithComparison' ? valueVariantFromDirection(comparisonDirection) : 'default');
  const valueClassName = classnames('ds-kpi-box__value', VALUE_VARIANT_CLASS[displayValueVariant]);

  const maxBarValue =
    variant === 'barChart' && bars.length > 0
      ? Math.max(...bars.filter((b) => !b.isUnavailable).map((b) => b.value), 1)
      : 1;
  const maxDivergingValue =
    variant === 'barChartDiverging' && bars.length > 0
      ? Math.max(...bars.map((b) => Math.abs(b.value)), 1)
      : 1;

  return (
    <article
      id={id}
      className={classnames(
        'ds-kpi-box',
        `ds-kpi-box--${variant}`,
        className
      )}
    >
      <header className="ds-kpi-box__header">
        <span className="ds-kpi-box__title">{title}</span>
        <span className="ds-kpi-box__date">{date}</span>
      </header>

      <div className="ds-kpi-box__body">
        {variant === 'status' && (
          <p className={classnames('ds-kpi-box__status', STATUS_VARIANT_CLASS[statusVariant])}>
            {statusText}
          </p>
        )}

        {variant === 'numberWithComparison' && (
          <>
            <p className={valueClassName}>{value}</p>
            {comparisonText != null && (
              <p className={classnames('ds-kpi-box__comparison', COMPARISON_DIRECTION_CLASS[comparisonDirection])}>
                <span className="ds-kpi-box__comparison-icon" aria-hidden />
                {comparisonText}
              </p>
            )}
          </>
        )}

        {(variant === 'barChart' || variant === 'barChartDiverging') && (
          <>
            {value != null && <p className={valueClassName}>{value}</p>}
            {variant === 'barChart' && (
              <div className="ds-kpi-box__bars ds-kpi-box__bars--simple">
                {bars.map((bar, i) => {
                  const widthPct = bar.isUnavailable
                    ? 0
                    : (bar.value / maxBarValue) * 100;
                  const display = bar.isUnavailable
                    ? 'N/A'
                    : (bar.valueLabel != null ? bar.valueLabel : bar.value);
                  return (
                    <div
                      key={i}
                      className={classnames('ds-kpi-box__bar-row', {
                        'ds-kpi-box__bar-row--unavailable': bar.isUnavailable,
                      })}
                    >
                      <span className="ds-kpi-box__bar-label">{bar.label}</span>
                      <div className="ds-kpi-box__bar-track">
                        <div
                          className={classnames('ds-kpi-box__bar-fill', {
                            'ds-kpi-box__bar-fill--unavailable': bar.isUnavailable,
                          })}
                          style={{
                            width: `${widthPct}%`,
                            backgroundColor: bar.color,
                          }}
                        />
                      </div>
                      <span className="ds-kpi-box__bar-value">{display}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {variant === 'barChartDiverging' && (
              <div className="ds-kpi-box__bars ds-kpi-box__bars--diverging">
                {bars.map((bar, i) => {
                  const isLeft = bar.direction === 'left';
                  const pct = (Math.abs(bar.value) / maxDivergingValue) * 100;
                  return (
                    <div key={i} className="ds-kpi-box__bar-row ds-kpi-box__bar-row--diverging">
                      <span className="ds-kpi-box__bar-label">{bar.label}</span>
                      <div className="ds-kpi-box__bar-diverging-track">
                        <div className="ds-kpi-box__bar-diverging-side ds-kpi-box__bar-diverging-side--left">
                          {isLeft && (
                            <div
                              className="ds-kpi-box__bar-fill ds-kpi-box__bar-fill--left"
                              style={{ width: `${pct}%`, backgroundColor: bar.color }}
                            />
                          )}
                        </div>
                        <span className="ds-kpi-box__bar-diverging-center" aria-hidden />
                        <div className="ds-kpi-box__bar-diverging-side ds-kpi-box__bar-diverging-side--right">
                          {!isLeft && (
                            <div
                              className="ds-kpi-box__bar-fill ds-kpi-box__bar-fill--right"
                              style={{ width: `${pct}%`, backgroundColor: bar.color }}
                            />
                          )}
                        </div>
                        <span className="ds-kpi-box__bar-value">{bar.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {description != null && description !== '' && (
        <p className="ds-kpi-box__description">{description}</p>
      )}
    </article>
  );
};

export default KpiBox;
