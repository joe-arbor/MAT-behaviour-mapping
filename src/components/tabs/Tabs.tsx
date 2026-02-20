import React, { createContext, useContext, useState } from 'react';
import classnames from 'classnames';
import './tabs.scss';

export type TabsAlignment = 'left' | 'center' | 'right';
export type TabsSize = 'big' | 'medium' | 'small';

interface TabsContextValue {
  activeId: string;
  setActiveId: (id: string) => void;
  size: TabsSize;
  alignment: TabsAlignment;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab/TabList/TabPanel must be used inside Tabs');
  return ctx;
}

export interface TabsProps {
  /** Controlled active tab id */
  value?: string;
  /** Uncontrolled default active tab id */
  defaultValue?: string;
  /** Called when active tab changes */
  onChange?: (id: string) => void;
  /** Tab and panel size */
  size?: TabsSize;
  /** Tab list alignment */
  alignment?: TabsAlignment;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  size = 'medium',
  alignment = 'left',
  children,
  className,
  id: rootId,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const activeId = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const setActiveId = (id: string) => {
    if (controlledValue === undefined) setUncontrolledValue(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider
      value={{
        activeId,
        setActiveId,
        size,
        alignment,
      }}
    >
      <div className={classnames('ds-tabs', className)} id={rootId}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabList: React.FC<TabListProps> = ({ children, className }) => {
  const { size, alignment } = useTabsContext();
  return (
    <div
      className={classnames(
        'ds-tabs__list',
        `ds-tabs__list--${alignment}`,
        `ds-tabs__list--${size}`,
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  );
};

export interface TabProps {
  id: string;
  /** Optional icon (e.g. ⓘ) shown left of label when this tab is active */
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ id, icon, children, className }) => {
  const { activeId, setActiveId, size } = useTabsContext();
  const isActive = activeId === id;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={id ? `panel-${id}` : undefined}
      id={id ? `tab-${id}` : undefined}
      className={classnames(
        'ds-tabs__tab',
        `ds-tabs__tab--${size}`,
        { 'ds-tabs__tab--active': isActive },
        className
      )}
      onClick={() => setActiveId(id)}
    >
      {isActive && icon != null && (
        <span className="ds-tabs__tab-icon" aria-hidden>
          {icon}
        </span>
      )}
      <span className="ds-tabs__tab-label">{children}</span>
    </button>
  );
};

export interface TabPanelProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({ id, children, className }) => {
  const { activeId, size } = useTabsContext();
  const isActive = activeId === id;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={classnames(
        'ds-tabs__panel',
        `ds-tabs__panel--${size}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tabs;
