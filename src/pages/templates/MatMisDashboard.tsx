import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Button } from '../../components/button/Button';
import { Combobox } from '../../components/combobox/Combobox';
import { KpiBox, type KpiBarSegment } from '../../components/kpiBox/KpiBox';
import { KpiBoxGrid } from '../../components/kpiBox/KpiBoxGrid';
import { Tab, TabList, Tabs } from '../../components/tabs/Tabs';
import {
  getDashboardView,
  type MatMisScope,
  type SchoolPerformanceMetrics,
  type TargetPair,
  clusterOptionsForScope,
  schoolOptionsFor,
} from './matMisDashboardData';
import type { KpiStatusVariant } from '../../components/kpiBox/KpiBox';
import './matMisDashboard.scss';

const TAB_ALL = 'all-schools';
const TAB_MY = 'my-schools';

const COLOR_ORANGE = 'var(--color-chart-colours-orange-1)';
const COLOR_TEAL = 'var(--color-chart-colours-teal-1)';

function fmtPct(n: number, decimals = 2): string {
  return `${n.toFixed(decimals)}%`;
}

function barsThisLastOrangeCyan(
  thisYear: number,
  lastYear: number
): { bars: KpiBarSegment[]; mainValue: string; valueVariant: KpiStatusVariant } {
  return {
    mainValue: fmtPct(thisYear),
    valueVariant: 'caution',
    bars: [
      {
        label: 'This year',
        value: thisYear,
        valueLabel: fmtPct(thisYear),
        color: COLOR_ORANGE,
      },
      {
        label: 'Last year',
        value: lastYear,
        valueLabel: fmtPct(lastYear),
        color: COLOR_TEAL,
      },
    ],
  };
}

function buildKs3Ks4(
  atAbove: TargetPair,
  below: TargetPair
): {
  at: { main: ReactNode; valueVariant: KpiStatusVariant; bars: KpiBarSegment[] };
  below: { main: ReactNode; valueVariant: KpiStatusVariant; bars: KpiBarSegment[] };
} {
  const atBars: KpiBarSegment[] = [
    {
      label: 'This year',
      value: atAbove.thisYear,
      valueLabel: fmtPct(atAbove.thisYear),
      color: COLOR_TEAL,
    },
    {
      label: 'Last year',
      value: atAbove.lastYear ?? 0,
      isUnavailable: atAbove.lastYear == null,
      valueLabel: atAbove.lastYear == null ? 'N/A' : fmtPct(atAbove.lastYear),
      color: 'var(--color-grey-300)',
    },
  ];
  const belBars: KpiBarSegment[] = [
    {
      label: 'This year',
      value: below.thisYear,
      valueLabel: fmtPct(below.thisYear),
      color: COLOR_TEAL,
    },
    {
      label: 'Last year',
      value: below.lastYear ?? 0,
      isUnavailable: below.lastYear == null,
      valueLabel: below.lastYear == null ? 'N/A' : fmtPct(below.lastYear),
      color: 'var(--color-grey-300)',
    },
  ];
  return {
    at: {
      main: fmtPct(atAbove.thisYear),
      valueVariant: 'default',
      bars: atBars,
    },
    below: {
      main: fmtPct(below.thisYear),
      valueVariant: 'default',
      bars: belBars,
    },
  };
}

function buildKs5(ks: SchoolPerformanceMetrics['ks5']): { at: { main: ReactNode; bars: KpiBarSegment[] }; bel: { main: ReactNode; bars: KpiBarSegment[] } } {
  const allNa: KpiBarSegment[] = [
    { label: 'This year', value: 0, isUnavailable: true, color: 'var(--color-grey-300)' },
    { label: 'Last year', value: 0, isUnavailable: true, color: 'var(--color-grey-300)' },
  ];
  return {
    at: {
      main: ks.atAbove.thisYear == null && ks.atAbove.lastYear == null ? 'N/A' : (ks.atAbove.thisYear != null ? fmtPct(ks.atAbove.thisYear) : 'N/A'),
      bars: allNa,
    },
    bel: {
      main: ks.below.thisYear == null && ks.below.lastYear == null ? 'N/A' : (ks.below.thisYear != null ? fmtPct(ks.below.thisYear) : 'N/A'),
      bars: allNa,
    },
  };
}

function scopeFromTabId(id: string): MatMisScope {
  return id === TAB_MY ? 'my-schools' : 'all-schools';
}

export function MatMisDashboard() {
  const [activeTab, setActiveTab] = useState(TAB_ALL);
  const [draftCluster, setDraftCluster] = useState('');
  const [draftSchool, setDraftSchool] = useState('');
  const [appliedCluster, setAppliedCluster] = useState<string | null>(null);
  const [appliedSchool, setAppliedSchool] = useState<string | null>(null);

  const scope: MatMisScope = useMemo(() => scopeFromTabId(activeTab), [activeTab]);

  const clusterOptions = useMemo(() => clusterOptionsForScope(scope), [scope]);
  const schoolOptions = useMemo(
    () => schoolOptionsFor(scope, draftCluster || null),
    [scope, draftCluster]
  );

  const view = useMemo(
    () => getDashboardView(scope, appliedCluster, appliedSchool),
    [scope, appliedCluster, appliedSchool]
  );
  const m = view.metrics;

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
    setDraftCluster('');
    setDraftSchool('');
    setAppliedCluster(null);
    setAppliedSchool(null);
  }, []);

  const handleClusterDraft = useCallback((v: string | string[]) => {
    const next = (Array.isArray(v) ? v[0] : v) ?? '';
    setDraftCluster(typeof next === 'string' ? next : '');
    setDraftSchool('');
  }, []);

  const handleApply = useCallback(() => {
    setAppliedCluster(draftCluster || null);
    setAppliedSchool(draftSchool || null);
  }, [draftCluster, draftSchool]);

  const handleClear = useCallback(() => {
    setDraftCluster('');
    setDraftSchool('');
    setAppliedCluster(null);
    setAppliedSchool(null);
  }, []);

  const a1 = barsThisLastOrangeCyan(m.attendance.wholeSchool.thisYear, m.attendance.wholeSchool.lastYear);
  const a2 = barsThisLastOrangeCyan(
    m.attendance.persistentAbsentees.thisYear,
    m.attendance.persistentAbsentees.lastYear
  );
  const ks1a = barsThisLastOrangeCyan(m.ks1.atAbove.thisYear, m.ks1.atAbove.lastYear);
  const ks1b = barsThisLastOrangeCyan(m.ks1.below.thisYear, m.ks1.below.lastYear);
  const ks2a = barsThisLastOrangeCyan(m.ks2.atAbove.thisYear, m.ks2.atAbove.lastYear);
  const ks2b = barsThisLastOrangeCyan(m.ks2.below.thisYear, m.ks2.below.lastYear);
  const k34 = buildKs3Ks4(m.ks3.atAbove, m.ks3.below);
  const k4 = buildKs3Ks4(m.ks4.atAbove, m.ks4.below);
  const k5 = buildKs5(m.ks5);

  return (
    <div className="mat-mis-dashboard">
      <Tabs className="mat-mis-dashboard__tabs" value={activeTab} onChange={handleTabChange}>
        <TabList>
          <Tab id={TAB_MY}>My Schools</Tab>
          <Tab id={TAB_ALL}>All Schools</Tab>
        </TabList>
      </Tabs>

      <p className="mat-mis-dashboard__showing" role="status">
        Showing: {view.showingText} ({view.schoolCount})
      </p>

      <div className="mat-mis-dashboard__filters" role="search" aria-label="Filter schools">
        <Combobox
          className="mat-mis-dashboard__combobox"
          id="mat-mis-cluster"
          options={clusterOptions}
          value={draftCluster}
          onChange={handleClusterDraft}
          placeholder="Search school clusters e.g. Cluster A"
        />
        <Combobox
          className="mat-mis-dashboard__combobox"
          id="mat-mis-school"
          options={schoolOptions}
          value={draftSchool}
          onChange={(v) => {
            const next = (Array.isArray(v) ? v[0] : v) ?? '';
            setDraftSchool(typeof next === 'string' ? next : '');
          }}
          placeholder="Search schools e.g. School A"
        />
        <div className="mat-mis-dashboard__filter-actions">
          <Button variant="primary" color="green" onClick={handleApply}>
            Apply filter
          </Button>
          <Button variant="secondary" color="grey" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      <div className="mat-mis-dashboard__grid" aria-label="Key performance indicators">
        <section className="mat-mis-dashboard__panel" aria-labelledby="mat-mis-att">
          <h2 id="mat-mis-att" className="mat-mis-dashboard__panel-title">
            Attendance
          </h2>
          <KpiBoxGrid className="mat-mis-dashboard__kpi-grid" columns={1}>
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Whole School Attendance"
              date=""
              variant="barChart"
              value={a1.mainValue}
              valueVariant={a1.valueVariant}
              bars={a1.bars}
            />
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Persistent Absentees (DfE)"
              date=""
              variant="barChart"
              value={a2.mainValue}
              valueVariant={a2.valueVariant}
              bars={a2.bars}
            />
          </KpiBoxGrid>
        </section>

        <section className="mat-mis-dashboard__panel" aria-labelledby="mat-mis-beh">
          <h2 id="mat-mis-beh" className="mat-mis-dashboard__panel-title">
            Behaviour
          </h2>
          <KpiBoxGrid className="mat-mis-dashboard__kpi-grid" columns={1}>
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Total Number of Suspensions"
              date=""
              variant="numberWithComparison"
              value={m.behaviour.suspensions}
            />
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Total Number of Permanent Exclusions"
              date=""
              variant="numberWithComparison"
              value={m.behaviour.exclusions}
            />
          </KpiBoxGrid>
        </section>

        <section className="mat-mis-dashboard__panel" aria-labelledby="mat-mis-ks1">
          <h2 id="mat-mis-ks1" className="mat-mis-dashboard__panel-title">
            Key Stage 1: Reading, Writing &amp; Maths
          </h2>
          <KpiBoxGrid className="mat-mis-dashboard__kpi-grid" columns={1}>
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="At/Above Target in all Assessments"
              date=""
              variant="barChart"
              value={ks1a.mainValue}
              valueVariant={ks1a.valueVariant}
              bars={ks1a.bars}
            />
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Below Target in any Assessment"
              date=""
              variant="barChart"
              value={ks1b.mainValue}
              valueVariant={ks1b.valueVariant}
              bars={ks1b.bars}
            />
          </KpiBoxGrid>
        </section>

        <section className="mat-mis-dashboard__panel" aria-labelledby="mat-mis-ks2">
          <h2 id="mat-mis-ks2" className="mat-mis-dashboard__panel-title">
            Key Stage 2: Reading, Writing &amp; Maths
          </h2>
          <KpiBoxGrid className="mat-mis-dashboard__kpi-grid" columns={1}>
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="At/Above Target in all Assessments"
              date=""
              variant="barChart"
              value={ks2a.mainValue}
              valueVariant={ks2a.valueVariant}
              bars={ks2a.bars}
            />
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Below Target in any Assessment"
              date=""
              variant="barChart"
              value={ks2b.mainValue}
              valueVariant={ks2b.valueVariant}
              bars={ks2b.bars}
            />
          </KpiBoxGrid>
        </section>

        <section className="mat-mis-dashboard__panel" aria-labelledby="mat-mis-ks3">
          <h2 id="mat-mis-ks3" className="mat-mis-dashboard__panel-title">
            Key Stage 3: Maths &amp; English
          </h2>
          <KpiBoxGrid className="mat-mis-dashboard__kpi-grid" columns={1}>
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="At/Above Target in all Assessments"
              date=""
              variant="barChart"
              value={k34.at.main}
              valueVariant={k34.at.valueVariant}
              bars={k34.at.bars}
            />
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Below Target in any Assessment"
              date=""
              variant="barChart"
              value={k34.below.main}
              valueVariant={k34.below.valueVariant}
              bars={k34.below.bars}
            />
          </KpiBoxGrid>
        </section>

        <section className="mat-mis-dashboard__panel" aria-labelledby="mat-mis-ks4">
          <h2 id="mat-mis-ks4" className="mat-mis-dashboard__panel-title">
            Key Stage 4: Maths &amp; English
          </h2>
          <KpiBoxGrid className="mat-mis-dashboard__kpi-grid" columns={1}>
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="At/Above Target in all Assessments"
              date=""
              variant="barChart"
              value={k4.at.main}
              valueVariant={k4.at.valueVariant}
              bars={k4.at.bars}
            />
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Below Target in any Assessment"
              date=""
              variant="barChart"
              value={k4.below.main}
              valueVariant={k4.below.valueVariant}
              bars={k4.below.bars}
            />
          </KpiBoxGrid>
        </section>

        <section className="mat-mis-dashboard__panel" aria-labelledby="mat-mis-ks5">
          <h2 id="mat-mis-ks5" className="mat-mis-dashboard__panel-title">
            Key Stage 5: Maths &amp; English
          </h2>
          <KpiBoxGrid className="mat-mis-dashboard__kpi-grid" columns={1}>
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="At/Above Target in all Assessments"
              date=""
              variant="barChart"
              value={k5.at.main}
              valueVariant="default"
              bars={k5.at.bars}
            />
            <KpiBox
              className="mat-mis-dashboard__kpi"
              title="Below Target in any Assessment"
              date=""
              variant="barChart"
              value={k5.bel.main}
              valueVariant="default"
              bars={k5.bel.bars}
            />
          </KpiBoxGrid>
        </section>
      </div>
    </div>
  );
}
