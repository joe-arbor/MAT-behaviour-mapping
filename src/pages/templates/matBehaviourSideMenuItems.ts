import type { TopNavMenuChild } from '../../components/topNav';
import type { SideMenuItem } from '../../components/sideMenu';
import { matMisTopNavMenuItems } from './matMisTopNavMenuItems';

function mapTopNavToSideMenu(node: TopNavMenuChild): SideMenuItem {
  return {
    id: node.id ?? node.label.replace(/\s+/g, '-').toLowerCase(),
    label: node.label,
    href: node.href,
    children: node.children?.map(mapTopNavToSideMenu),
    isFavorite: node.id === 'mat-behaviour-dashboard',
  };
}

/** Behaviour subtree under Analytics — same source as the MAT MIS top nav so routes stay in sync. */
export function buildMatBehaviourSideMenuItems(): SideMenuItem[] {
  const analytics = matMisTopNavMenuItems.find((m) => m.id === 'analytics');
  const behaviour = analytics?.children?.find((c) => c.id === 'mat-analytics-behaviour');
  return (behaviour?.children ?? []).map(mapTopNavToSideMenu);
}

/** Resolve which nav row is selected from the current path (leaf items with real app hrefs). */
export function findSideMenuSelectedId(pathname: string, items: SideMenuItem[]): string | null {
  for (const item of items) {
    if (item.href && item.href === pathname) {
      return item.id;
    }
    if (item.children?.length) {
      const nested = findSideMenuSelectedId(pathname, item.children);
      if (nested) return nested;
    }
  }
  return null;
}
