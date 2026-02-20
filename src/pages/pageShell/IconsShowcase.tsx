import { useMemo, useState } from 'react';
import { DynamicIcon, iconNames } from 'lucide-react/dynamic';
import './iconsShowcase.scss';

const ICON_SIZES = [12, 16, 24, 36] as const;
const DEFAULT_SIZE = 24;

/** Sort icon names for display (stable alphabetical, kebab-case) */
const sortedIconNames = [...iconNames].sort((a, b) => a.localeCompare(b, 'en'));

function filterIconNames(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return sortedIconNames;
  const kebab = q.replace(/\s+/g, '-');
  return sortedIconNames.filter((name) => {
    const nameLower = name.toLowerCase();
    return nameLower.includes(q) || name.includes(kebab) || nameLower.includes(kebab);
  });
}

export function IconsShowcase() {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState<number>(DEFAULT_SIZE);
  const filteredNames = useMemo(() => filterIconNames(search), [search]);

  return (
    <div className="icons-showcase">
      <section className="icons-showcase__section">
        <h2 className="icons-showcase__heading">Icons (Lucide)</h2>
        <p className="icons-showcase__intro">
          Search and browse the full Lucide icon set. Default size is 24px; use the size control to change how icons are displayed.
        </p>

        <div className="icons-showcase__controls">
          <div className="icons-showcase__search-wrap">
            <label htmlFor="icons-search" className="icons-showcase__search-label">
              Search icons
            </label>
            <input
              id="icons-search"
              type="search"
              className="icons-showcase__search"
              placeholder="Search by name (e.g. user, message-circle)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              aria-describedby="icons-search-hint"
            />
            <span id="icons-search-hint" className="icons-showcase__search-hint">
              {filteredNames.length} icon{filteredNames.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="icons-showcase__size-wrap">
            <label htmlFor="icons-size" className="icons-showcase__size-label">
              Size
            </label>
            <select
              id="icons-size"
              className="icons-showcase__size-select"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              aria-describedby="icons-size-hint"
            >
              {ICON_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}px
                </option>
              ))}
            </select>
            <span id="icons-size-hint" className="icons-showcase__size-hint">
              Default: 24px
            </span>
          </div>
        </div>

        <ul className="icons-showcase__grid" aria-label="Icon grid">
          {filteredNames.map((name) => (
            <li key={name} className="icons-showcase__card">
              <div className="icons-showcase__card-preview" title={`${size}px`}>
                <DynamicIcon name={name} size={size} strokeWidth={1.5} />
              </div>
              <div className="icons-showcase__card-name" title={name}>
                {name}
              </div>
            </li>
          ))}
        </ul>

        {filteredNames.length === 0 && (
          <p className="icons-showcase__empty">No icons match your search.</p>
        )}
      </section>
    </div>
  );
}
