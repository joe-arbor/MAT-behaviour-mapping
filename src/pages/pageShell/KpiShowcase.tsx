import { Section } from '../../components/section/Section';
import { KpiBox, KpiBoxGrid } from '../../components/kpiBox';
import type { KpiBarSegment } from '../../components/kpiBox';
import './kpiShowcase.scss';

// Dummy data for design system showcase. Replace with real data when wiring to APIs.

const statusBars: KpiBarSegment[] = [
  { label: 'You', value: 2.34, color: 'var(--color-chart-colours-blue-1)' },
  { label: 'Like You', value: 3.45, color: 'var(--color-chart-colours-green-1)' },
];

const statusBars2: KpiBarSegment[] = [
  { label: 'You', value: 2.34, color: 'var(--color-chart-colours-teal-1)' },
  { label: 'Like You', value: 1.45, color: 'var(--color-chart-colours-orange-1)' },
];

const divergingBars: KpiBarSegment[] = [
  { label: 'You', value: 2.34, color: 'var(--color-chart-colours-blue-1)', direction: 'right' },
  { label: 'Like You', value: 1.45, color: 'var(--color-chart-colours-green-1)', direction: 'left' },
  { label: 'Others', value: 0.56, color: 'var(--color-chart-colours-orange-1)', direction: 'right' },
];

const divergingBars2: KpiBarSegment[] = [
  { label: 'You', value: 2.34, direction: 'right', color: 'var(--color-chart-colours-blue-1)' },
  { label: 'Not Like You', value: 1.45, direction: 'left', color: 'var(--color-chart-colours-orange-1)' },
  { label: 'Like You', value: 3, direction: 'right', color: 'var(--color-chart-colours-green-1)' },
  { label: 'Others', value: 7, direction: 'left', color: 'var(--color-chart-colours-yellow-1)' },
];

export function KpiShowcase() {
  return (
    <div className="kpi-showcase">
      <section className="kpi-showcase__section">
        <h2 className="kpi-showcase__heading">KPI Panels</h2>
        <p className="kpi-showcase__intro">
          KpiBox is a single component with four variants: status (text with semantic colour), number with comparison (value + up/down/neutral line), simple bar chart, and diverging bar chart. KPIs sit within Sections; sections can be expandable. Use KpiBoxGrid for a configurable column layout. All values and comparison text are passed in as props; charts are CSS-only.
        </p>
      </section>

      <Section title="Kpi Panel 1" expandable defaultExpanded>
        <KpiBoxGrid columns={3}>
          <KpiBox variant="status" title="Kpi Box 1" date="Today" statusText="Developing" statusVariant="success" />
          <KpiBox variant="status" title="Kpi Box 2" date="Today" statusText="Developing" statusVariant="success" />
          <KpiBox variant="status" title="Kpi Box 3" date="Today" statusText="Developing" statusVariant="success" />
          <KpiBox variant="status" title="Kpi Box 4" date="Today" statusText="Developing" statusVariant="caution" />
          <KpiBox
            variant="status"
            title="Kpi Box 5"
            date="Today"
            statusText="Developing"
            statusVariant="warning"
            description="This KPI box has a 'description' property set."
          />
        </KpiBoxGrid>
      </Section>

      <Section title="Kpi Panel 2" expandable defaultExpanded>
        <KpiBoxGrid columns={3}>
          <KpiBox
            variant="numberWithComparison"
            title="Kpi Box 1"
            date="Today"
            value="123"
            comparisonText="No changes compared to last year"
            comparisonDirection="neutral"
          />
          <KpiBox
            variant="numberWithComparison"
            title="Kpi Box 2"
            date="Today"
            value="123"
            comparisonText="Up by 10% compared to last year"
            comparisonDirection="up"
          />
          <KpiBox
            variant="numberWithComparison"
            title="Kpi Box 3"
            date="Today"
            value="123"
            comparisonText="Down by 10% compared to last year"
            comparisonDirection="down"
          />
          <KpiBox
            variant="numberWithComparison"
            title="Kpi Box 4"
            date="Today"
            value="123"
            comparisonText="Up by 10% compared to last year"
            comparisonDirection="up"
          />
          <KpiBox
            variant="numberWithComparison"
            title="Kpi Box 5"
            date="Today"
            value="123"
            comparisonText="Down by 10% compared to last year"
            comparisonDirection="down"
          />
        </KpiBoxGrid>
      </Section>

      <Section title="Kpi Panel 3" expandable defaultExpanded>
        <KpiBoxGrid columns={3}>
          <KpiBox variant="barChart" title="Kpi Box 1" date="Yesterday" value="234" bars={statusBars} />
          <KpiBox variant="barChart" title="Kpi Box 2" date="Yesterday" value="234" bars={statusBars2} />
          <KpiBox
            variant="barChart"
            title="Kpi Box 3"
            date="Yesterday"
            value="234"
            bars={[
              { label: 'You', value: 1.2, color: 'var(--color-chart-colours-yellow-1)' },
              { label: 'Like You', value: 2.8, color: 'var(--color-chart-colours-purple-1)' },
            ]}
          />
          <KpiBox
            variant="barChart"
            title="Kpi Box 4"
            date="Yesterday"
            value="234"
            bars={[
              { label: 'You', value: 3.1, color: 'var(--color-chart-colours-orange-1)' },
              { label: 'Like You', value: 2.1, color: 'var(--color-chart-colours-teal-1)' },
            ]}
          />
          <KpiBox
            variant="barChart"
            title="Kpi Box 5"
            date="Yesterday"
            value="234"
            bars={statusBars}
            description="This KPI box has a 'description' property set."
          />
        </KpiBoxGrid>
      </Section>

      <Section title="Kpi Panel 4" expandable defaultExpanded>
        <KpiBoxGrid columns={3}>
          <KpiBox variant="barChartDiverging" title="Kpi Box 1" date="Yesterday" value="234" bars={divergingBars} />
          <KpiBox variant="barChartDiverging" title="Kpi Box 2" date="Yesterday" value="234" bars={divergingBars} />
          <KpiBox variant="barChartDiverging" title="Kpi Box 3" date="Yesterday" value="234" bars={divergingBars} />
          <KpiBox variant="barChartDiverging" title="Kpi Box 4" date="Yesterday" value="234" bars={divergingBars} />
          <KpiBox
            variant="barChartDiverging"
            title="Kpi Box 5"
            date="Yesterday"
            value="234"
            bars={divergingBars}
            description="This KPI box has a 'description' property set."
          />
        </KpiBoxGrid>
      </Section>

      <Section title="Kpi Panel 5" expandable defaultExpanded>
        <KpiBoxGrid columns={3}>
          <KpiBox variant="barChartDiverging" title="Kpi Box 1" date="Yesterday" value="234" bars={divergingBars2} />
          <KpiBox variant="barChartDiverging" title="Kpi Box 2" date="Yesterday" value="234" bars={divergingBars2} />
          <KpiBox variant="barChartDiverging" title="Kpi Box 3" date="Yesterday" value="234" bars={divergingBars2} />
          <KpiBox variant="barChartDiverging" title="Kpi Box 4" date="Yesterday" value="234" bars={divergingBars2} />
          <KpiBox
            variant="barChartDiverging"
            title="Kpi Box 5"
            date="Yesterday"
            value="234"
            bars={divergingBars2}
            description="This KPI box has a 'description' property set."
          />
        </KpiBoxGrid>
      </Section>
    </div>
  );
}
