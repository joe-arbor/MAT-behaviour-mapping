import { useState } from 'react';
import { FavouritesWidget } from '../../components/widgets';
import { Sidebar } from '../../components/sidebar';
import { TopNav } from '../../components/topNav';
import { matMisFavouritesItems } from './matMisFavouritesItems';
import { matMisSidebarItems } from './matMisSidebarItems';
import { matMisTopNavMenuItems } from './matMisTopNavMenuItems';
import { MatMisDashboard } from './MatMisDashboard';
import './templatePage.scss';
import './matMisTemplate.scss';

export function MatMisTemplate() {
  const [lastSearch, setLastSearch] = useState<string | null>(null);

  return (
    <div className="template-page template-page--mat-mis">
      <TopNav
        menuItems={matMisTopNavMenuItems}
        searchPlaceholder="Search or ask..."
        onSearch={(value) => setLastSearch(value)}
      />
      <div className="mat-mis-template__body">
        <Sidebar items={matMisSidebarItems} />
        <div className="mat-mis-template__work">
          <aside className="mat-mis-template__favourites" aria-label="Favourites">
            <FavouritesWidget
              className="mat-mis-template__favourites-widget"
              items={matMisFavouritesItems}
            />
          </aside>
          <main className="template-page__content">
            <div className="template-page__content-inner">
              <h1 className="template-page__title">MAT MIS Overview</h1>
              {lastSearch !== null && (
                <p className="mat-mis-template__search-hint" role="status">
                  Last search: <strong>{lastSearch || '(empty)'}</strong>
                </p>
              )}
              <MatMisDashboard />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
