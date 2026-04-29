import { FavouritesWidget, MyCalendarWidget, HomePanels } from '../../components/widgets';
import './widgetsShowcase.scss';

export function WidgetsShowcase() {
  return (
    <div className="widgets-showcase">
      <section className="widgets-showcase__section">
        <h2 className="widgets-showcase__heading">Widgets</h2>
        <p className="widgets-showcase__intro">
          Homepage widgets: Favourites (list of links; items are added when you favourite from a page),
          My Calendar (today’s events), and the horizontal To Do / Alerts / School Notices panels.
        </p>
      </section>

      <section className="widgets-showcase__section">
        <h3 className="widgets-showcase__subheading">Favourites</h3>
        <div className="widgets-showcase__widget-demo">
          <FavouritesWidget />
        </div>
      </section>

      <section className="widgets-showcase__section">
        <h3 className="widgets-showcase__subheading">My Calendar</h3>
        <div className="widgets-showcase__widget-demo">
          <MyCalendarWidget />
        </div>
      </section>

      <section className="widgets-showcase__section">
        <h3 className="widgets-showcase__subheading">To Do, Alerts, School Notices</h3>
        <p className="widgets-showcase__intro">
          Horizontal collection of three panels at the top of the homepage.
        </p>
        <HomePanels />
      </section>
    </div>
  );
}
