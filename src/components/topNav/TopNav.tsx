import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Sparkles, ChevronDown } from 'lucide-react';
import { GlobalSearchInput } from '../globalSearch';
import './topNav.scss';

const DEBUG_LOG = (data: Record<string, unknown>) => {
  const payload = { sessionId: '130f04', location: 'TopNav.tsx', message: 'TopNav layout', data, timestamp: Date.now() };
  fetch('http://127.0.0.1:7622/ingest/8c9a920c-e800-47b1-bcc4-72c12ff2d909', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '130f04' },
    body: JSON.stringify(payload),
  }).catch(() => {});
};

export interface TopNavMenuItem {
  id: string;
  label: string;
  /** Optional: links or actions for the dropdown. Omit for now to show chevron only. */
  children?: { label: string; href?: string; onClick?: () => void }[];
}

export interface TopNavProps {
  /** School logo: image URL or ReactNode (e.g. placeholder). */
  schoolLogo?: React.ReactNode;
  /** Main nav items (My Items, Students, School, Reporting, System). */
  menuItems?: TopNavMenuItem[];
  /** Search placeholder text. */
  searchPlaceholder?: string;
  /** Called when user submits search or focuses and presses Enter. */
  onSearch?: (value: string) => void;
  /** Called when "Ask Arbor" is clicked — use to open the AI slideover. */
  onAskArborClick?: () => void;
  /** Optional class for the root. */
  className?: string;
}

const defaultMenuItems: TopNavMenuItem[] = [
  { id: 'my-items', label: 'My Items' },
  { id: 'students', label: 'Students' },
  { id: 'school', label: 'School' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'system', label: 'System' },
];

/** Arbor wordmark + four-circles icon; links to home. */
function ArborLogo() {
  return (
    <Link to="/templates/home" className="ds-top-nav__arbor-logo" aria-label="Arbor home">
      <svg
        className="ds-top-nav__arbor-icon"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="10" cy="14" r="7" fill="var(--color-brand-400)" opacity="0.9" />
        <circle cx="18" cy="10" r="7" fill="var(--color-chart-colours-yellow-1)" opacity="0.9" />
        <circle cx="18" cy="18" r="7" fill="var(--color-chart-colours-orange-1)" opacity="0.9" />
        <circle cx="10" cy="10" r="7" fill="var(--color-brand-600)" opacity="0.9" />
      </svg>
      <span className="ds-top-nav__arbor-text">Arbor</span>
    </Link>
  );
}

/** Filler school logo: circular placeholder with sunburst-style graphic. */
function DefaultSchoolLogo() {
  return (
    <div className="ds-top-nav__school-logo-placeholder" aria-hidden>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="var(--color-chart-colours-orange-1)" />
        <path
          d="M20 4v6M20 30v6M4 20h6M30 20h6M8.5 8.5l4.2 4.2M27.3 27.3l-4.2-4.2M8.5 31.5l4.2-4.2M27.3 12.7l-4.2 4.2"
          stroke="var(--color-chart-colours-teal-1)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="20" cy="24" rx="8" ry="4" fill="var(--color-chart-colours-teal-2)" opacity="0.9" />
      </svg>
    </div>
  );
}

export const TopNav: React.FC<TopNavProps> = ({
  schoolLogo,
  menuItems = defaultMenuItems,
  searchPlaceholder = 'Search or ask...',
  onSearch,
  onAskArborClick,
  className,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenuId) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  // #region agent log
  useLayoutEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav) return;
      const inner = nav.querySelector('.ds-top-nav__inner') as HTMLElement | null;
      const start = nav.querySelector('.ds-top-nav__start') as HTMLElement | null;
      const right = nav.querySelector('.ds-top-nav__right') as HTMLElement | null;
      const searchEl = right?.querySelector('.ds-global-search') as HTMLElement | null;
      const askBtn = right?.querySelector('.ds-top-nav__ask-btn') as HTMLElement | null;
      const logoEl = right?.querySelector('.ds-top-nav__arbor-logo') as HTMLElement | null;
      const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
      const navR = nav.getBoundingClientRect();
      const innerR = inner?.getBoundingClientRect();
      const startR = start?.getBoundingClientRect();
      const rightR = right?.getBoundingClientRect();
      const searchR = searchEl?.getBoundingClientRect();
      const askR = askBtn?.getBoundingClientRect();
      const logoR = logoEl?.getBoundingClientRect();
      const rightGap = 10;
      const rightContentSum = (searchR?.width ?? 0) + rightGap + (askR?.width ?? 0) + rightGap + (logoR?.width ?? 0);
      DEBUG_LOG({
        hypothesisId: 'A',
        viewportWidth: vw,
        navWidth: navR.width,
        innerWidth: innerR?.width,
        startWidth: startR?.width,
        rightWidth: rightR?.width,
        rightContentSum,
        rightOverflows: (rightR?.width ?? 0) > (innerR?.width ?? 0) - (startR?.width ?? 0) - 10,
      });
      DEBUG_LOG({
        hypothesisId: 'B',
        startWidth: startR?.width,
        spaceForRight: (innerR?.width ?? 0) - (startR?.width ?? 0) - 10,
        rightNeeds: rightContentSum + 10,
        insufficientSpace: (innerR?.width ?? 0) - (startR?.width ?? 0) - 10 < rightContentSum + 10,
      });
      DEBUG_LOG({
        hypothesisId: 'C',
        searchWidth: searchR?.width,
        askWidth: askR?.width,
        logoWidth: logoR?.width,
        rightTotal: rightContentSum + 10,
      });
      DEBUG_LOG({
        hypothesisId: 'D',
        logoRight: logoR?.right,
        viewportWidth: vw,
        logoOffPage: (logoR?.right ?? 0) > vw,
        innerRight: innerR?.right,
        navRight: navR.right,
      });
      DEBUG_LOG({
        hypothesisId: 'E',
        rightFlexShrink: right ? getComputedStyle(right).flexShrink : null,
        askFlexShrink: askBtn ? getComputedStyle(askBtn).flexShrink : null,
        logoFlexShrink: logoEl ? getComputedStyle(logoEl).flexShrink : null,
        searchFlexShrink: searchEl ? getComputedStyle(searchEl).flexShrink : null,
      });
    };
    measure();
    const ro = typeof window !== 'undefined' && window.ResizeObserver ? new ResizeObserver(measure) : null;
    if (navRef.current && ro) ro.observe(navRef.current);
    return () => ro?.disconnect();
  }, []);
  // #endregion

  return (
    <nav
      ref={navRef}
      className={classnames('ds-top-nav', className)}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="ds-top-nav__inner">
        <div className="ds-top-nav__start">
          <div className="ds-top-nav__school-logo">
            {schoolLogo ?? <DefaultSchoolLogo />}
          </div>
          <ul className="ds-top-nav__menu" role="menubar">
            {menuItems.map((item) => {
              const isOpen = openMenuId === item.id;
              const hasDropdown = item.children && item.children.length > 0;
              return (
                <li key={item.id} className="ds-top-nav__menu-item" role="none">
                  <button
                    type="button"
                    className={classnames('ds-top-nav__menu-btn', { 'ds-top-nav__menu-btn--open': isOpen })}
                    onClick={() => setOpenMenuId(hasDropdown ? (isOpen ? null : item.id) : undefined)}
                    aria-haspopup={hasDropdown ? 'menu' : undefined}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    aria-current={isOpen ? 'true' : undefined}
                    role="menuitem"
                  >
                    {item.label}
                    <ChevronDown size={14} className="ds-top-nav__chevron" aria-hidden />
                  </button>
                  {hasDropdown && isOpen && item.children && (
                    <ul className="ds-top-nav__dropdown" role="menu">
                      {item.children.map((child, i) => (
                        <li key={i} role="none">
                          {child.href ? (
                            <a href={child.href} className="ds-top-nav__dropdown-link" role="menuitem">
                              {child.label}
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="ds-top-nav__dropdown-link"
                              onClick={() => {
                                child.onClick?.();
                                setOpenMenuId(null);
                              }}
                              role="menuitem"
                            >
                              {child.label}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="ds-top-nav__right">
          <GlobalSearchInput
            variant="topNav"
            placeholder={searchPlaceholder}
            onSearch={onSearch}
          />
          <button
            type="button"
            className="ds-top-nav__ask-btn"
            onClick={onAskArborClick}
            aria-label="Ask Arbor"
          >
            <Sparkles size={18} className="ds-top-nav__ask-icon" aria-hidden />
            <span>Ask Arbor</span>
          </button>
          <ArborLogo />
        </div>
      </div>
    </nav>
  );
};
