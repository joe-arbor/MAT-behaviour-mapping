import React, { useEffect, useRef, useState } from 'react';
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
  /** Nested flyout items (second/third columns) */
  children?: FloatingNavItem[];
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

function hasFlyoutChildren(item: FloatingNavItem): boolean {
  return Boolean(item.children?.length);
}

function FlyoutRowTrigger({
  label,
  expanded,
  onOpen,
}: {
  label: string;
  expanded: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={classnames('ds-floating-nav__link', { 'ds-floating-nav__link--expanded': expanded })}
      role="menuitem"
      aria-expanded={expanded}
      onClick={onOpen}
      onMouseEnter={onOpen}
      onFocus={onOpen}
    >
      <span className="ds-floating-nav__label">{label}</span>
      <ChevronRight size={14} className="ds-floating-nav__chevron" aria-hidden />
    </button>
  );
}

function renderLeafLink(item: FloatingNavItem, onClose: () => void, key: string | number) {
  const showChevronOnly = Boolean(item.hasSubmenu) && !hasFlyoutChildren(item);
  const linkContent = (
    <>
      <span className="ds-floating-nav__label">{item.label}</span>
      {showChevronOnly && <ChevronRight size={14} className="ds-floating-nav__chevron" aria-hidden />}
    </>
  );
  if (item.href == null) {
    return (
      <button
        key={key}
        type="button"
        className="ds-floating-nav__link"
        role="menuitem"
        onClick={() => {
          item.onClick?.();
          onClose();
        }}
      >
        {linkContent}
      </button>
    );
  }
  const isInternal = item.href.startsWith('/') && !item.href.startsWith('//');
  if (isInternal) {
    return (
      <Link
        key={key}
        to={item.href}
        className="ds-floating-nav__link"
        role="menuitem"
        onClick={onClose}
      >
        {linkContent}
      </Link>
    );
  }
  return (
    <a key={key} href={item.href} className="ds-floating-nav__link" role="menuitem">
      {linkContent}
    </a>
  );
}

function FloatingNavColumn({
  items,
  onClose,
  activeFlyoutId,
  onOpenFlyout,
  onHoverLeaf,
}: {
  items: FloatingNavItem[];
  onClose: () => void;
  /** Which item with `children` is active (highlight + drives next column) */
  activeFlyoutId?: string;
  onOpenFlyout: (item: FloatingNavItem) => void;
  /** Called when pointer focuses a leaf row so deeper columns hide */
  onHoverLeaf?: () => void;
}) {
  return (
    <div className="ds-floating-nav__column" role="none">
      <ul className="ds-floating-nav__list" role="none">
        {items.map((item, i) => {
          const key = item.id ?? i;
          if (hasFlyoutChildren(item)) {
            const expanded = activeFlyoutId === item.id;
            return (
              <li key={key} className="ds-floating-nav__item" role="none">
                <FlyoutRowTrigger
                  label={item.label}
                  expanded={expanded}
                  onOpen={() => {
                    onOpenFlyout(item);
                  }}
                />
              </li>
            );
          }
          return (
            <li
              key={key}
              className="ds-floating-nav__item"
              role="none"
              onMouseEnter={onHoverLeaf}
              onFocus={onHoverLeaf}
            >
              {renderLeafLink(item, onClose, key)}
            </li>
          );
        })}
      </ul>
    </div>
  );
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
  const [tier2Item, setTier2Item] = useState<FloatingNavItem | null>(null);
  const [tier3Item, setTier3Item] = useState<FloatingNavItem | null>(null);

  useEffect(() => {
    if (!open) {
      setTier2Item(null);
      setTier3Item(null);
    }
  }, [open]);

  useEffect(() => {
    setTier3Item(null);
  }, [tier2Item]);

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

  const showTier2 = tier2Item?.children?.length;
  const showTier3 = tier3Item?.children?.length;

  return (
    <div
      ref={panelRef}
      id={id}
      className={classnames('ds-floating-nav', className)}
      role="menu"
      aria-label={ariaLabel}
      onMouseLeave={() => {
        setTier2Item(null);
        setTier3Item(null);
      }}
    >
      <div className="ds-floating-nav__columns">
        <FloatingNavColumn
          items={items}
          onClose={onClose}
          activeFlyoutId={tier2Item?.id}
          onOpenFlyout={(item) => {
            setTier2Item(item);
          }}
          onHoverLeaf={() => {
            setTier2Item(null);
            setTier3Item(null);
          }}
        />
        {showTier2 ? (
          <FloatingNavColumn
            items={tier2Item!.children!}
            onClose={onClose}
            activeFlyoutId={tier3Item?.id}
            onOpenFlyout={(item) => {
              setTier3Item(item);
            }}
            onHoverLeaf={() => {
              setTier3Item(null);
            }}
          />
        ) : null}
        {showTier3 ? (
          <div className="ds-floating-nav__column" role="none">
            <ul className="ds-floating-nav__list" role="none">
              {tier3Item!.children!.map((item, i) => {
                const key = item.id ?? i;
                return (
                  <li key={key} className="ds-floating-nav__item" role="none">
                    {renderLeafLink(item, onClose, key)}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};
