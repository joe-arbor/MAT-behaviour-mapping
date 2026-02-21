import React, { useState } from 'react';
import {
  Home,
  Star,
  Bell,
  Calendar,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { TopNav } from '../../components/topNav';
import { Sidebar } from '../../components/sidebar';
import { FavouritesWidget, MyCalendarWidget, HomePanels } from '../../components/widgets';
import { Section } from '../../components/section/Section';
import { KpiBox, KpiBoxGrid } from '../../components/kpiBox';
import type { KpiBarSegment } from '../../components/kpiBox';
import { Slideover } from '../../components/slideover';
import './templatePage.scss';
import './homeTemplate.scss';

// Homepage KPI dummy data (Attendance, Behaviour, Attainment)
const attendanceBars: KpiBarSegment[] = [
  { label: 'Last 7d', value: 90.4, color: 'var(--color-chart-colours-green-1)' },
  { label: 'This year', value: 90.7, color: 'var(--color-chart-colours-teal-1)' },
  { label: 'National Average', value: 91.7, color: 'var(--color-grey-400)' },
];

const HOME_SIDEBAR_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, href: '/templates/home' },
  { id: 'favourites', label: 'Favourites', icon: Star },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'my-calendar', label: 'My Calendar', icon: Calendar },
  { id: 'help', label: 'Help & Learn with Arbor', icon: HelpCircle },
  { id: 'sign-out', label: 'Sign Out', icon: LogOut },
];

export function HomeTemplate() {
  const [askArborOpen, setAskArborOpen] = useState(false);

  return (
    <div className="template-page template-page--with-nav template-page--home">
      <TopNav
        searchPlaceholder="Search or ask..."
        onSearch={(q) => console.log('Search', q)}
        onAskArborClick={() => setAskArborOpen(true)}
      />

      <div className="template-page__body">
        <Sidebar className="template-page__sidebar" items={HOME_SIDEBAR_ITEMS} />

        <aside className="template-page__widget-column" aria-label="Widgets">
          <FavouritesWidget />
          <MyCalendarWidget />
        </aside>

        <main className="template-page__content">
          <div className="template-page__content-inner">
            <HomePanels />

            <div className="home-kpi">
              <header className="home-kpi__header">
                <span className="home-kpi__showing">Showing: All students (1476)</span>
                <select className="home-kpi__view" aria-label="View">
                  <option>All</option>
                </select>
              </header>

              <Section title="Attendance" expandable defaultExpanded>
                <KpiBoxGrid columns={3}>
                  <KpiBox variant="numberWithComparison" title="Current Enrolment" date="Today" value="1476" comparisonText="No changes" comparisonDirection="neutral" />
                  <KpiBox variant="barChart" title="Whole School Attendance" date="Last 7d" value="90.4%" bars={attendanceBars} />
                  <KpiBox variant="barChart" title="Statutory Attendance" date="Last 7d" value="90.3%" bars={attendanceBars} />
                  <KpiBox variant="barChart" title="Authorised Absent" date="Last 7d" value="5.8%" bars={attendanceBars} />
                  <KpiBox variant="barChart" title="Unauthorised Absent" date="Last 7d" value="3.8%" bars={attendanceBars} />
                  <KpiBox variant="barChart" title="Late" date="Last 7d" value="2.8%" bars={attendanceBars} />
                  <KpiBox variant="barChart" title="Persistent Absentees (DfE Whole Year)" date="This year" value="44.1%" bars={[{ label: 'Last 7d', value: 24.1, color: 'var(--color-chart-colours-orange-1)' }, { label: 'This year', value: 44.1, color: 'var(--color-chart-colours-orange-1)' }, { label: 'National Average', value: 15, color: 'var(--color-grey-400)' }]} />
                </KpiBoxGrid>
              </Section>

              <Section title="Behaviour" expandable defaultExpanded>
                <KpiBoxGrid columns={3}>
                  <KpiBox variant="numberWithComparison" title="Level 5 Negative Incidents Per Week" date="Last 7d" value="30" comparisonText="This year: 31" comparisonDirection="down" />
                  <KpiBox variant="numberWithComparison" title="Level 4 Negative Incidents Per Week" date="Last 7d" value="65" comparisonText="This year: 63" comparisonDirection="up" />
                  <KpiBox variant="numberWithComparison" title="Level 3 Negative Incidents Per Week" date="Last 7d" value="103" comparisonText="This year: 100" comparisonDirection="up" />
                  <KpiBox variant="numberWithComparison" title="Level 2 Negative Incidents Per Week" date="Last 7d" value="130" comparisonText="This year: 129" comparisonDirection="up" />
                  <KpiBox variant="numberWithComparison" title="Level 1 Negative Incidents Per Week" date="Last 7d" value="266" comparisonText="This year: 259" comparisonDirection="up" />
                  <KpiBox variant="numberWithComparison" title="Days Lost to Suspensions" date="YTD" value="11.5" comparisonText="Prev YTD: 5.0" comparisonDirection="up" />
                  <KpiBox variant="numberWithComparison" title="Permanent Exclusions" date="YTD" value="2" comparisonText="Prev YTD: 0" comparisonDirection="up" />
                  <KpiBox variant="numberWithComparison" title="Behaviour Points Per Week" date="Last 7d" value="438" comparisonText="This year: 155" comparisonDirection="up" />
                </KpiBoxGrid>
              </Section>

              <Section title="Attainment" expandable defaultExpanded>
                <KpiBoxGrid columns={3}>
                  <KpiBox variant="barChart" title="Above Target" date="This year" value="28%" bars={[{ label: 'This year', value: 28, color: 'var(--color-chart-colours-green-1)' }, { label: 'Last year', value: 27, color: 'var(--color-grey-300)' }]} />
                  <KpiBox variant="barChart" title="At Target" date="This year" value="18%" bars={[{ label: 'This year', value: 18, color: 'var(--color-chart-colours-teal-1)' }, { label: 'Last year', value: 40, color: 'var(--color-grey-300)' }]} />
                  <KpiBox variant="barChart" title="Below Target" date="This year" value="54%" bars={[{ label: 'This year', value: 54, color: 'var(--color-chart-colours-orange-1)' }, { label: 'Last year', value: 33, color: 'var(--color-grey-300)' }]} />
                </KpiBoxGrid>
              </Section>

              <Section title="Lesson Grade Per Week" expandable defaultExpanded>
                <KpiBoxGrid columns={1}>
                  <KpiBox variant="numberWithComparison" title="Lesson Grade Per Week" date="Last 7d" value="33881" comparisonText="This year: 34605" comparisonDirection="down" />
                </KpiBoxGrid>
              </Section>
            </div>
          </div>
        </main>
      </div>

      <Slideover open={askArborOpen} onClose={() => setAskArborOpen(false)} title="Ask Arbor">
        <p>Start a conversation with the AI-powered tool here.</p>
      </Slideover>
    </div>
  );
}
