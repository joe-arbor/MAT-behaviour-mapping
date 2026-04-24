import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { ChevronRight } from 'lucide-react';
import './floatingNav.scss';

export interface FloatingNavItem {
  /** Unique key for the item */
  id?: string;
  label: string;
  href?: string;
  onClick?: () => void;
  /** Show right-pointing arrow for submenu or expand */
  hasSubmenu?: boolean;
}

export interface FloatingNavProps {
  /** Whether the panel is visible */
  open: boolean;
  /** Called when the panel should close (e.g. click outside, escape) */
  onClose: () => void;
  /** List of items (links or buttons) */
  items: FloatingNavItem[];
  /** Optional id for the panel (for aria-labelledby etc.) */
  id?: string;
  /** Optional label for the panel (e.g. "My Items menu") */
  ariaLabel?: string;
  className?: string;
  /** Ref to the trigger element; panel is positioned below it. If not provided, parent must position. */
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  open,
  onClose,
  items,
  id,
  ariaLabel,
  className,
  anchorRef,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        anchorRef?.current?.contains(target)
      ) return;
      onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id={id}
      className={classnames('ds-floating-nav', className)}
      role="menu"
      aria-label={ariaLabel}
    >
      <div className="ds-floating-nav__body">
        <ul className="ds-floating-nav__list" role="none">
          {items.map((item, i) => (
            <li key={item.id ?? i} className="ds-floating-nav__item" role="none">
              {item.href != null ? (
                (() => {
                  const isInternal = item.href.startsWith('/') && !item.href.startsWith('//');
                  const linkContent = (
                    <>
                      <span className="ds-floating-nav__label">{item.label}</span>
                      {item.hasSubmenu && (
                        <ChevronRight size={14} className="ds-floating-nav__chevron" aria-hidden />
                      )}
                    </>
                  );
                  return isInternal ? (
                    <Link
                      to={item.href}
                      className="ds-floating-nav__link"
                      role="menuitem"
                      onClick={onClose}
                    >
                      {linkContent}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="ds-floating-nav__link"
                      role="menuitem"
                    >
                      {linkContent}
                    </a>
                  );
                })()
              ) : (
                <button
                  type="button"
                  className="ds-floating-nav__link"
                  role="menuitem"
                  onClick={() => {
                    item.onClick?.();
                    onClose();
                  }}
                >
                  <span className="ds-floating-nav__label">{item.label}</span>
                  {item.hasSubmenu && (
                    <ChevronRight size={14} className="ds-floating-nav__chevron" aria-hidden />
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
