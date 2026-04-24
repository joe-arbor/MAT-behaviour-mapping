import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {
  Home,
  Star,
  Bell,
  HelpCircle,
  LogOut,
  LucideIcon,
} from 'lucide-react';
import './sidebar.scss';

export interface SidebarItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Shown in tooltip below the label on hover */
  description?: string;
  href?: string;
  onClick?: () => void;
}

const DEFAULT_ITEMS: SidebarItemConfig[] = [
  { id: 'home', label: 'Home', icon: Home, description: 'Go to Homepage', href: '/templates/home' },
  { id: 'favourites', label: 'Favourites', icon: Star, description: 'Quick access to saved pages' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Check your personal alerts' },
  { id: 'help', label: 'Help & Learn with Arbor', icon: HelpCircle, description: 'Arbor HQ, Help Centre, and training resource' },
  { id: 'sign-out', label: 'Sign Out', icon: LogOut, description: 'Sign out of your account' },
];

export interface SidebarProps {
  /** Override default items. Default: Home, Favourites, Notifications, Help & Learn with Arbor, Sign Out. */
  items?: SidebarItemConfig[];
  /** Optional class for the root. */
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items = DEFAULT_ITEMS, className }) => {
  return (
    <aside className={classnames('ds-sidebar', className)} aria-label="Primary navigation">
      <nav className="ds-sidebar__nav">
        <ul className="ds-sidebar__list" role="list">
          {items.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon size={24} className="ds-sidebar__icon" aria-hidden />
                <span className="ds-sidebar__label">{item.label}</span>
              </>
            );
            const ariaLabel = item.description ? `${item.label}. ${item.description}` : item.label;
            return (
              <li key={item.id} className="ds-sidebar__item">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="ds-sidebar__link"
                    onClick={item.onClick}
                    aria-label={ariaLabel}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="ds-sidebar__link"
                    onClick={item.onClick}
                    aria-label={ariaLabel}
                  >
                    {content}
                  </button>
                )}
                {(item.label || item.description) && (
                  <div
                    className="ds-sidebar__tooltip"
                    role="tooltip"
                    id={`sidebar-tooltip-${item.id}`}
                  >
                    <span className="ds-sidebar__tooltip-title">{item.label}</span>
                    {item.description && (
                      <span className="ds-sidebar__tooltip-description">{item.description}</span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
