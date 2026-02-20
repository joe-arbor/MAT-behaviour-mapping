import React from 'react';
import { Tooltip } from '../../components/tooltip';
import { Button } from '../../components/button/Button';
import { Info } from 'lucide-react';
import './tooltipShowcase.scss';

export function TooltipShowcase() {
  return (
    <div className="tooltip-showcase">
      <h1 className="tooltip-showcase__title">Tooltips</h1>
      <p className="tooltip-showcase__intro">
        Hover over the trigger (button or info icon) to show the tooltip. Most cases use a simple tooltip; use the advanced variant when you need a title and an action (e.g. Edit).
      </p>

      <section className="tooltip-showcase__section">
        <h2 className="tooltip-showcase__heading">Simple tooltip</h2>
        <p className="tooltip-showcase__desc">Single content line; good for buttons, icons, and short hints.</p>
        <div className="tooltip-showcase__row">
          <Tooltip content="Save your changes">
            <Button variant="primary" color="grey">Save</Button>
          </Tooltip>
          <Tooltip content="Additional information about this field">
            <span className="tooltip-showcase__icon-trigger" aria-label="More information">
              <Info size={16} strokeWidth={2} />
            </span>
          </Tooltip>
        </div>
      </section>

      <section className="tooltip-showcase__section">
        <h2 className="tooltip-showcase__heading">Advanced tooltip</h2>
        <p className="tooltip-showcase__desc">Title, content, and optional action (e.g. Edit link in green).</p>
        <div className="tooltip-showcase__row">
          <Tooltip
            title="Title"
            content="Content"
            action={
              <button type="button" onClick={() => window.alert('Edit clicked')}>
                Edit
              </button>
            }
          >
            <Button variant="secondary" color="grey">Hover for details</Button>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}
