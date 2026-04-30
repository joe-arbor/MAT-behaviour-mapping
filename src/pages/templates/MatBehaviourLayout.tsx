import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SideMenu, type SideMenuItem } from '../../components/sideMenu';
import {
  buildMatBehaviourSideMenuItems,
  findSideMenuSelectedId,
} from './matBehaviourSideMenuItems';
import { BehaviourCategoryMappingProvider } from './matBehaviourCategory/BehaviourCategoryMappingContext';
import './matBehaviourLayout.scss';

function toggleFavoriteInTree(item: SideMenuItem, targetId: string): SideMenuItem {
  if (item.id === targetId) {
    return { ...item, isFavorite: !item.isFavorite };
  }
  if (item.children) {
    return {
      ...item,
      children: item.children.map((child) => toggleFavoriteInTree(child, targetId)),
    };
  }
  return item;
}

function syncSideMenuItem(currentItems: SideMenuItem[], latestItem: SideMenuItem): SideMenuItem {
  const currentItem = currentItems.find((item) => item.id === latestItem.id);

  return {
    ...latestItem,
    isFavorite: currentItem?.isFavorite ?? latestItem.isFavorite,
    children: latestItem.children?.map((child) =>
      syncSideMenuItem(currentItem?.children ?? [], child),
    ),
  };
}

export function MatBehaviourLayout() {
  const location = useLocation();
  const [items, setItems] = useState<SideMenuItem[]>(() => buildMatBehaviourSideMenuItems());

  useEffect(() => {
    const latestItems = buildMatBehaviourSideMenuItems();
    setItems((currentItems) =>
      latestItems.map((latestItem) => syncSideMenuItem(currentItems, latestItem)),
    );
  }, []);

  const selectedId = useMemo(
    () => findSideMenuSelectedId(location.pathname, items),
    [location.pathname, items],
  );

  const handleToggleFavorite = useCallback((id: string) => {
    setItems((prev) => prev.map((item) => toggleFavoriteInTree(item, id)));
  }, []);

  return (
    <div className="mat-behaviour-layout">
      <div className="mat-behaviour-layout__side">
        <SideMenu
          className="mat-behaviour-layout__side-menu"
          pageTitle="Behaviour"
          items={items}
          selectedId={selectedId}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      <div className="mat-behaviour-layout__main">
        <BehaviourCategoryMappingProvider>
          <Outlet />
        </BehaviourCategoryMappingProvider>
      </div>
    </div>
  );
}
