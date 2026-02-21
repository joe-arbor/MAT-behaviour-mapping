import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Info } from 'lucide-react';
import { Section } from '../section/Section';
import './widgets.scss';

export interface FavouriteItem {
  id: string;
  label: string;
  href: string;
  /** When on a page and user hits favourite icon, item is added to this list. */
}

export interface FavouritesWidgetProps {
  /** List of favourited pages/items. When user favourites from another page, add here. */
  items?: FavouriteItem[];
  /** Optional callback when info icon next to title is clicked (e.g. tooltip). */
  onInfoClick?: () => void;
  className?: string;
}

export const FavouritesWidget: React.FC<FavouritesWidgetProps> = ({
  items = DEFAULT_FAVOURITES,
  onInfoClick,
  className,
}) => {
  const infoButton = (
    <button
      type="button"
      className="ds-widget__info"
      onClick={onInfoClick}
      aria-label="More information about Favourites"
    >
      <Info size={16} aria-hidden />
    </button>
  );

  return (
    <Section
      title="Favourites"
      headerAction={infoButton}
      className={`ds-widget ds-widget--favourites ${className ?? ''}`}
    >
      <ul className="ds-widget__list" role="list">
        {items.map((item) => {
          const content = (
            <>
              <Star size={16} className="ds-widget__star" aria-hidden />
              <span className="ds-widget__link-text">{item.label}</span>
            </>
          );
          return (
            <li key={item.id} className="ds-widget__item">
              {item.href.startsWith('/') ? (
                <Link to={item.href} className="ds-widget__link">
                  {content}
                </Link>
              ) : (
                <a href={item.href} className="ds-widget__link">
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

const DEFAULT_FAVOURITES: FavouriteItem[] = [
  { id: '1', label: 'All School Communications', href: '#' },
  { id: '2', label: 'Attendance', href: '/templates/daily-attendance' },
  { id: '3', label: 'Behavioural Incidents Reporting', href: '#' },
  { id: '4', label: 'Browse Staff', href: '#' },
  { id: '5', label: 'Browse Students', href: '#' },
  { id: '6', label: 'Canvas', href: '#' },
  { id: '7', label: 'Create ad hoc intervention', href: '#' },
  { id: '8', label: 'Create assignment', href: '#' },
  { id: '9', label: 'Create event', href: '#' },
  { id: '10', label: 'Create intervention', href: '#' },
  { id: '11', label: 'Daily Attendance', href: '/templates/daily-attendance' },
  { id: '12', label: 'KS3 Mathematics: Year 8: 8y/Ma1', href: '/templates/class' },
];
