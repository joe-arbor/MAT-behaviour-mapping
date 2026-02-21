import React from 'react';
import './widgets.scss';

export interface CalendarEvent {
  id: string;
  time: string;
  title: string;
  location?: string;
}

export interface MyCalendarWidgetProps {
  /** Events for today. When empty, show "No events to display." */
  events?: CalendarEvent[];
  /** Optional date label (e.g. "Today", "19 Feb 2026") */
  dateLabel?: string;
  className?: string;
}

export const MyCalendarWidget: React.FC<MyCalendarWidgetProps> = ({
  events = [],
  dateLabel = 'Today',
  className,
}) => {
  return (
    <section className={`ds-widget ds-widget--calendar ${className ?? ''}`} aria-label="My Calendar">
      <header className="ds-widget__header">
        <h2 className="ds-widget__title">My Calendar</h2>
      </header>
      <div className="ds-widget__body">
        {events.length === 0 ? (
          <p className="ds-widget__empty">No events to display.</p>
        ) : (
          <ul className="ds-widget__events" role="list">
            {events.map((ev) => (
              <li key={ev.id} className="ds-widget__event">
                <span className="ds-widget__event-time">{ev.time}</span>
                <span className="ds-widget__event-title">{ev.title}</span>
                {ev.location && <span className="ds-widget__event-location">{ev.location}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
