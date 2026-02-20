import React, { useState, useMemo } from 'react';
import { flushSync } from 'react-dom';
import classnames from 'classnames';
import type { ShowcaseSection } from './showcaseSections';
import { showcaseSections, COMPONENT_CATEGORIES } from './showcaseSections';
import { ShowcaseContext } from './ShowcaseContext';
import { ShowcaseErrorBoundary } from './ShowcaseErrorBoundary';
import './pageShell.scss';

export interface PageShellProps {
  /**
   * Optional className for the shell container
   */
  className?: string;
  /**
   * Sections to display (defaults to showcaseSections).
   * Use this to override or inject sections when needed.
   */
  sections?: ShowcaseSection[];
  /**
   * Initial section id to select (defaults to first section)
   */
  defaultSectionId?: string;
}

/** Group sections by category in display order. */
function groupByCategory(sections: ShowcaseSection[]): Map<string, ShowcaseSection[]> {
  const map = new Map<string, ShowcaseSection[]>();
  for (const cat of COMPONENT_CATEGORIES) {
    map.set(cat, []);
  }
  for (const section of sections) {
    const list = map.get(section.category) ?? [];
    list.push(section);
    map.set(section.category, list);
  }
  return map;
}

/**
 * PageShell
 *
 * Sidebar shows expandable categories (Foundations, Content, Input, Navigation, Surfaces).
 * Each category contains component sections. Add components in showcaseSections.tsx and set their category.
 */
export const PageShell: React.FC<PageShellProps> = ({
  className,
  sections = showcaseSections,
  defaultSectionId,
}) => {
  const firstId = sections[0]?.id;
  const [selectedId, setSelectedId] = useState<string>(defaultSectionId ?? firstId ?? '');
  const selected = sections.find(s => s.id === selectedId);

  const byCategory = useMemo(() => groupByCategory(sections), [sections]);

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const selectedSection = sections.find(s => s.id === (defaultSectionId ?? firstId));
    return new Set(selectedSection ? [selectedSection.category] : [COMPONENT_CATEGORIES[0]]);
  });

  const toggleCategory = (category: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  return (
    <div className={classnames('page-shell', className)}>
      <aside className="page-shell__sidebar" aria-label="Showcase navigation">
        <div className="page-shell__sidebar-header">
          <h2 className="page-shell__sidebar-title">Components</h2>
        </div>
        <nav className="page-shell__nav">
          <ul className="page-shell__nav-list" role="list">
            {COMPONENT_CATEGORIES.map(category => {
              const items = byCategory.get(category) ?? [];
              if (items.length === 0) return null;
              const isExpanded = expanded.has(category);
              return (
                <li key={category} className="page-shell__nav-category">
                  <button
                    type="button"
                    className={classnames('page-shell__nav-category-btn', {
                      'page-shell__nav-category-btn--expanded': isExpanded,
                    })}
                    onClick={() => toggleCategory(category)}
                    aria-expanded={isExpanded}
                    aria-controls={`page-shell__category-${category}`}
                  >
                    <span className="page-shell__nav-category-chevron" aria-hidden>
                      {isExpanded ? '▼' : '▶'}
                    </span>
                    {category}
                  </button>
                  <ul
                    id={`page-shell__category-${category}`}
                    className="page-shell__nav-sublist"
                    role="list"
                    hidden={!isExpanded}
                  >
                    {items.map(section => (
                      <li key={section.id} className="page-shell__nav-item">
                        <button
                          type="button"
                          className={classnames('page-shell__nav-link', {
                            'page-shell__nav-link--active': section.id === selectedId,
                          })}
                          onClick={(e) => {
                            // #region agent log
                            fetch('http://127.0.0.1:7622/ingest/8c9a920c-e800-47b1-bcc4-72c12ff2d909',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3e222a'},body:JSON.stringify({sessionId:'3e222a',runId:'run1',hypothesisId:'H4',location:'PageShell.tsx:navClick',message:'nav link clicked',data:{sectionId:section.id},timestamp:Date.now()})}).catch(()=>{});
                            // #endregion
                            const navButton = e.currentTarget;
                            // Flush state so we can restore focus in the same tick.
                            flushSync(() => {
                              setSelectedId(section.id);
                              setExpanded(prev => new Set(prev).add(category));
                            });
                            navButton.focus();
                            // Browser may still move focus to first focusable in new content (e.g. native color
                            // input) in a later task; restore focus again so the colour picker doesn't open.
                            const restore = () => {
                              navButton.focus();
                              fetch('http://127.0.0.1:7622/ingest/8c9a920c-e800-47b1-bcc4-72c12ff2d909',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3e222a'},body:JSON.stringify({sessionId:'3e222a',runId:'run1',hypothesisId:'H4',location:'PageShell.tsx:restoreFocus',message:'restoreFocus ran',data:{},timestamp:Date.now()})}).catch(()=>{});
                            };
                            window.setTimeout(restore, 50);
                            window.setTimeout(restore, 120);
                          }}
                          aria-current={section.id === selectedId ? 'true' : undefined}
                        >
                          {section.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="page-shell__canvas" aria-label="Component preview">
        <ShowcaseContext.Provider
          value={{
            setSelectedId,
            setExpanded,
            sections,
            byCategory,
          }}
        >
          {selected ? (
            <div className="page-shell__canvas-inner">
              <header className="page-shell__canvas-header">
                <h1 className="page-shell__canvas-title">{selected.name}</h1>
                {selected.description && (
                  <p className="page-shell__canvas-description">{selected.description}</p>
                )}
              </header>
              <div className="page-shell__canvas-content">
                <ShowcaseErrorBoundary>
                  {selected.render()}
                </ShowcaseErrorBoundary>
              </div>
            </div>
          ) : (
            <div className="page-shell__canvas-empty">
              <p>Select a component from the sidebar.</p>
            </div>
          )}
        </ShowcaseContext.Provider>
      </main>
    </div>
  );
};

export default PageShell;
