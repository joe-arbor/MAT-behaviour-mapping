import React, { useContext } from 'react';
import { ShowcaseContext } from './ShowcaseContext';
import { COMPONENT_CATEGORIES } from './showcaseSections';
import './welcomeShowcase.scss';

/** Number of component sections (excluding Welcome). Update if sections change. */
const COMPONENT_SECTION_COUNT = 23;
/** Design token count from tokens.scss (--custom-properties). */
const TOKEN_COUNT = 358;

export function WelcomeShowcase() {
  const ctx = useContext(ShowcaseContext);

  const handleCategoryClick = (category: string) => {
    if (!ctx) return;
    const items = ctx.byCategory.get(category) ?? [];
    const first = items.find(s => s.id !== 'welcome') ?? items[0];
    if (first) {
      ctx.setSelectedId(first.id);
      ctx.setExpanded(prev => new Set(prev).add(category));
    }
  };

  return (
    <div className="welcome-showcase">
      <section className="welcome-showcase__hero" aria-label="Overview">
        <h2 className="welcome-showcase__title">Arbor Design System</h2>
        <p className="welcome-showcase__tagline">
          Build and prototype with a single source of truth. Compose from Figma and the component library.
        </p>
      </section>

      <section className="welcome-showcase__metrics" aria-label="System at a glance">
        <ul className="welcome-showcase__metrics-list">
          <li>
            <span className="welcome-showcase__metric-value">{COMPONENT_SECTION_COUNT}</span>
            <span className="welcome-showcase__metric-label">components</span>
          </li>
          <li className="welcome-showcase__metrics-sep" aria-hidden>
            ·
          </li>
          <li>
            <span className="welcome-showcase__metric-value">{TOKEN_COUNT}</span>
            <span className="welcome-showcase__metric-label">design tokens</span>
          </li>
          <li className="welcome-showcase__metrics-sep" aria-hidden>
            ·
          </li>
          <li>
            <span className="welcome-showcase__metric-label">Figma &amp; Storybook</span>
          </li>
        </ul>
      </section>

      <section className="welcome-showcase__categories" aria-label="Explore by category">
        <h3 className="welcome-showcase__categories-heading">Explore by category</h3>
        <div className="welcome-showcase__category-strip">
          {COMPONENT_CATEGORIES.map(category => {
            const items = ctx?.byCategory.get(category) ?? [];
            const count = items.filter(s => s.id !== 'welcome').length;
            if (count === 0) return null;
            return (
              <button
                key={category}
                type="button"
                className="welcome-showcase__category-pill"
                onClick={() => handleCategoryClick(category)}
              >
                <span className="welcome-showcase__category-name">{category}</span>
                <span className="welcome-showcase__category-count">{count}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
