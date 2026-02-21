import React from 'react';
import { Coffee } from 'lucide-react';
import { Section } from '../section/Section';
import './homePanels.scss';

export interface PanelItem {
  id: string;
  title: string;
  /** Optional date/time string (e.g. "16 January, 11:09") */
  meta?: string;
  href?: string;
}

export interface HomePanelsProps {
  /** To Do list items (e.g. pending absence records, duplicate emails) */
  toDoItems?: PanelItem[];
  /** Alert items; when empty, can show "All clear!" message */
  alertItems?: PanelItem[];
  /** School notices */
  noticeItems?: PanelItem[];
  /** Link for "Find out how alerts work" etc. */
  alertsHelpHref?: string;
  className?: string;
}

export const HomePanels: React.FC<HomePanelsProps> = ({
  toDoItems = DEFAULT_TODO,
  alertItems = [],
  noticeItems = DEFAULT_NOTICES,
  alertsHelpHref = '#',
  className,
}) => {
  return (
    <div className={`ds-home-panels ${className ?? ''}`} role="region" aria-label="To do, alerts, and notices">
      <Section title={`To Do (${toDoItems.length})`} className="ds-home-panels__panel" id="home-panel-todo">
        <ul className="ds-home-panels__list" role="list">
          {toDoItems.map((item) => (
            <li key={item.id} className="ds-home-panels__item">
              {item.href ? (
                <a href={item.href} className="ds-home-panels__link">
                  <span className="ds-home-panels__item-title">{item.title}</span>
                  {item.meta && <span className="ds-home-panels__meta">{item.meta}</span>}
                </a>
              ) : (
                <>
                  <span className="ds-home-panels__item-title">{item.title}</span>
                  {item.meta && <span className="ds-home-panels__meta">{item.meta}</span>}
                </>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={`Alerts (${alertItems.length})`} className="ds-home-panels__panel" id="home-panel-alerts">
        <div className="ds-home-panels__body">
          {alertItems.length === 0 ? (
            <div className="ds-home-panels__empty-state">
              <Coffee size={48} className="ds-home-panels__empty-icon" aria-hidden />
              <p className="ds-home-panels__empty">
                All clear! There are no alerts for you right now.{' '}
                <a href={alertsHelpHref} className="ds-home-panels__help-link">
                  Find out how alerts work here.
                </a>
              </p>
            </div>
          ) : (
            <ul className="ds-home-panels__list" role="list">
              {alertItems.map((item) => (
                <li key={item.id} className="ds-home-panels__item">
                  <span className="ds-home-panels__item-title">{item.title}</span>
                  {item.meta && <span className="ds-home-panels__meta">{item.meta}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section title={`School Notices (${noticeItems.length})`} className="ds-home-panels__panel" id="home-panel-notices">
        <ul className="ds-home-panels__list" role="list">
          {noticeItems.map((item) => (
            <li key={item.id} className="ds-home-panels__item">
              {item.href ? (
                <a href={item.href} className="ds-home-panels__link">
                  <span className="ds-home-panels__item-title">{item.title}</span>
                  {item.meta && <span className="ds-home-panels__meta">{item.meta}</span>}
                </a>
              ) : (
                <>
                  <span className="ds-home-panels__item-title">{item.title}</span>
                  {item.meta && <span className="ds-home-panels__meta">{item.meta}</span>}
                </>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

const DEFAULT_TODO: PanelItem[] = [
  { id: '1', title: '2 pending student absence records to review', meta: '16 January, 11:09' },
  { id: '2', title: '1 staff affected by duplicate email addresses', meta: undefined },
  { id: '3', title: '1 intervention requires approval', meta: '15 January, 14:22' },
];

const DEFAULT_NOTICES: PanelItem[] = [
  { id: '1', title: 'Reminder: Year 10 Parents Evening is 27th March.', meta: '5 January 08:30' },
  { id: '2', title: 'Please can all staff ensure they have signed the...', meta: '26 August, 15:49' },
];
