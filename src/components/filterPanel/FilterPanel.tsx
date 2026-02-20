import React, { useState } from 'react';
import classnames from 'classnames';
import { Filter, Layout, Pencil } from 'lucide-react';
import { Section } from '../section/Section';
import { Button } from '../button/Button';
import './filterPanel.scss';

export interface FilterPanelProps {
  /** Filter fields: Form Fields plus Filter Field Student / Filter Field Staff. Rendered in "Editing filter..." section. */
  children?: React.ReactNode;
  /** Display settings fields. Rendered in "Display settings..." section. */
  display?: React.ReactNode;
  /** Preview text shown when collapsed (e.g. "Should Reload No Date 20th Feb 2026. Students who are Female,") */
  filterPreview?: React.ReactNode;
  /** Initial expanded state (default: false = collapsed) */
  defaultExpanded?: boolean;
  /** Called when Apply is clicked */
  onApply?: () => void;
  /** Called when Cancel is clicked */
  onCancel?: () => void;
  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
}

/**
 * Filter Panel is used to edit filter and display settings of another component.
 * At the moment the only component supported is Table.
 *
 * Default state is collapsed, showing a preview of applied filters and a "Change" action.
 * Clicking the panel or "Change" expands it to show all filter and display fields.
 *
 * - Any field used to filter the target component (subset of data) must be a **child** of Filter Panel:
 *   all Form Fields are accepted, plus Filter Field Student and Filter Field Staff.
 * - All other fields go under **Filter Panel Display** (via the `display` prop).
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  children,
  display,
  filterPreview,
  defaultExpanded = false,
  onApply,
  onCancel,
  onExpandedChange,
  className,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleExpand = () => {
    setExpanded(true);
    onExpandedChange?.(true);
  };

  const handleCancel = () => {
    setExpanded(false);
    onCancel?.();
    onExpandedChange?.(false);
  };

  const handleApply = () => {
    onApply?.();
    setExpanded(false);
    onExpandedChange?.(false);
  };

  return (
    <div
      className={classnames('ds-filter-panel', className, {
        'ds-filter-panel--expanded': expanded,
        'ds-filter-panel--collapsed': !expanded,
      })}
    >
      {!expanded && (
        <button
          type="button"
          className="ds-filter-panel__preview"
          onClick={handleExpand}
          aria-expanded={false}
          aria-label="Edit filters"
          data-testid="filter-panel-preview"
        >
          <Filter size={18} strokeWidth={2} className="ds-filter-panel__preview-icon" aria-hidden />
          <span className="ds-filter-panel__preview-text">
            {filterPreview != null ? filterPreview : 'No filters applied.'}
          </span>
          <span className="ds-filter-panel__preview-change">
            <Pencil size={16} strokeWidth={2} aria-hidden />
            Change
          </span>
        </button>
      )}

      {expanded && (
        <div data-testid="filter-panel-expanded">
          <Section className="ds-filter-panel__section">
          <Section
            title={
              <span className="ds-filter-panel__filter-title">
                <Filter size={18} strokeWidth={2} aria-hidden />
                <span>Editing filter...</span>
              </span>
            }
            isSubsection
            className="ds-filter-panel__filter-section"
          >
            <div className="ds-filter-panel__filter-fields">{children}</div>
          </Section>

          {display != null && (
            <Section
              title={
                <span className="ds-filter-panel__display-title">
                  <Layout size={18} strokeWidth={2} aria-hidden />
                  <span>Display settings...</span>
                </span>
              }
              isSubsection
              className="ds-filter-panel__display-section"
            >
              <div className="ds-filter-panel__display-fields">{display}</div>
            </Section>
          )}

          <footer className="ds-filter-panel__footer">
            <Button variant="secondaryV1" color="grey" onClick={handleCancel} type="button">
              Cancel
            </Button>
            <Button variant="primary" color="green" onClick={handleApply} type="button" iconLeft={<Pencil size={16} strokeWidth={2} />}>
              Apply
            </Button>
          </footer>
          </Section>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
