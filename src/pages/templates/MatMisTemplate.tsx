import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FavouritesWidget } from '../../components/widgets';
import { Sidebar } from '../../components/sidebar';
import { TopNav } from '../../components/topNav';
import { matMisFavouritesItems } from './matMisFavouritesItems';
import { matMisSidebarItems } from './matMisSidebarItems';
import { matMisTopNavMenuItems } from './matMisTopNavMenuItems';
import type { MatMisOutletContext } from './MatMisOverview';
import './templatePage.scss';
import './matMisTemplate.scss';

export function MatMisTemplate() {
  const [lastSearch, setLastSearch] = useState<string | null>(null);
  const location = useLocation();
  const behaviourSideNav = location.pathname.startsWith('/templates/mat-mis/behaviour/');
  const matMisHomePath =
    location.pathname.replace(/\/+$/, '') === '/templates/mat-mis';
  const outletContext: MatMisOutletContext = { lastSearch };

  return (
    <div className="template-page template-page--mat-mis">
      <TopNav
        menuItems={matMisTopNavMenuItems}
        searchPlaceholder="Search or ask..."
        onSearch={(value) => setLastSearch(value)}
        arborLogoTo="/templates/mat-mis"
      />
      <div className="mat-mis-template__body">
        <Sidebar items={matMisSidebarItems} />
        <div className="mat-mis-template__work">
          {matMisHomePath ? (
            <aside className="mat-mis-template__favourites" aria-label="Favourites">
              <FavouritesWidget
                className="mat-mis-template__favourites-widget"
                items={matMisFavouritesItems}
              />
            </aside>
          ) : null}
          <main
            className={
              behaviourSideNav
                ? 'template-page__content template-page__content--behaviour-split'
                : 'template-page__content'
            }
          >
            <div className="template-page__content-inner">
              <Outlet context={outletContext} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
