import React, { useState } from 'react';
import classnames from 'classnames';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './section.scss';

export type SectionVariant = 'plain' | 'warning' | 'important';

export interface SectionProps {
  /** Section title (optional) */
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Visual variant: plain (default), warning (orange), important (red) */
  variant?: SectionVariant;
  /** Shown when children are empty; aligned right in a muted style */
  emptyMessage?: string;
  /** Renders in the header top-right (e.g. "Add" create button) */
  headerAction?: React.ReactNode;
  /** When true, section content can be expanded/collapsed */
  expandable?: boolean;
  /** Initial expanded state when expandable */
  defaultExpanded?: boolean;
  /** Called when expandable section is toggled */
  onExpandChange?: (expanded: boolean) => void;
  /** Nested subsection styling when inside another Section */
  isSubsection?: boolean;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  variant = 'plain',
  emptyMessage = 'no data found',
  headerAction,
  expandable = false,
  defaultExpanded = true,
  onExpandChange,
  isSubsection = false,
  className,
  id,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = expandable ? internalExpanded : true;

  const handleToggle = () => {
    if (!expandable) return;
    const next = !expanded;
    setInternalExpanded(next);
    onExpandChange?.(next);
  };

  const isEmpty = children == null || (Array.isArray(children) && children.length === 0);
  const showEmpty = isEmpty && emptyMessage;

  return (
    <section
      id={id}
      className={classnames(
        'ds-section',
        `ds-section--${variant}`,
        {
          'ds-section--expandable': expandable,
          'ds-section--expanded': expandable && expanded,
          'ds-section--subsection': isSubsection,
        },
        className
      )}
    >
      {(title != null || headerAction != null || expandable) && (
        <header className="ds-section__header">
          {title != null && <span className="ds-section__title">{title}</span>}
          {headerAction != null && (
            <div className="ds-section__action">{headerAction}</div>
          )}
          {expandable && (
            <button
              type="button"
              className="ds-section__toggle"
              onClick={handleToggle}
              aria-expanded={expanded}
              aria-controls={id ? `${id}-content` : undefined}
            >
              <span className="ds-section__caret" aria-hidden>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
          )}
        </header>
      )}
      <div
        id={id ? `${id}-content` : undefined}
        className="ds-section__body"
        hidden={expandable && !expanded}
      >
        {showEmpty ? (
          <p className="ds-section__empty">{emptyMessage}</p>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export interface SectionRowProps {
  /** Row label (left side) */
  label?: React.ReactNode;
  /** Row content (right side) or collapsible content */
  children: React.ReactNode;
  /** When true, row can be expanded/collapsed */
  collapsible?: boolean;
  /** Initial open state when collapsible */
  defaultOpen?: boolean;
}

export const SectionRow: React.FC<SectionRowProps> = ({
  label,
  children,
  collapsible = false,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={classnames('ds-section-row', {
        'ds-section-row--collapsible': collapsible,
        'ds-section-row--open': collapsible && open,
      })}
    >
      {collapsible ? (
        <>
          <button
            type="button"
            className="ds-section-row__trigger"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span className="ds-section-row__caret" aria-hidden>
              {open ? '−' : '+'}
            </span>
            {label}
          </button>
          {open && <div className="ds-section-row__content">{children}</div>}
        </>
      ) : (
        <>
          {label != null && <span className="ds-section-row__label">{label}</span>}
          <span className="ds-section-row__value">{children}</span>
        </>
      )}
    </div>
  );
};

export interface SectionPropertyRowProps {
  /** Label on the left */
  label?: React.ReactNode;
  /** Value or action on the right */
  value?: React.ReactNode;
}

export const SectionPropertyRow: React.FC<SectionPropertyRowProps> = ({
  label,
  value,
}) => (
  <div className="ds-section-property-row">
    {label != null && (
      <span className="ds-section-property-row__label">{label}</span>
    )}
    <span className="ds-section-property-row__value">{value}</span>
  </div>
);

export default Section;
