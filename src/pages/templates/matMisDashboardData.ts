/**
 * Dummy data and helpers for the MAT MIS school performance dashboard (prototype).
 */

export type MatMisScope = 'all-schools' | 'my-schools';

export interface MatMisCluster {
  id: string;
  label: string;
}

export interface MatMisSchool {
  id: string;
  label: string;
  clusterId: string;
  /** Part of the “My schools” scope (4 schools). */
  isMine: boolean;
}

export interface AttendancePair {
  thisYear: number;
  lastYear: number;
}

export interface TargetPair {
  thisYear: number;
  lastYear: number | null;
}

export interface Ks5Pair {
  thisYear: number | null;
  lastYear: number | null;
}

export interface SchoolPerformanceMetrics {
  attendance: {
    wholeSchool: AttendancePair;
    persistentAbsentees: AttendancePair;
  };
  behaviour: { suspensions: number; exclusions: number };
  ks1: { atAbove: AttendancePair; below: AttendancePair };
  ks2: { atAbove: AttendancePair; below: AttendancePair };
  ks3: { atAbove: TargetPair; below: TargetPair };
  ks4: { atAbove: TargetPair; below: TargetPair };
  ks5: { atAbove: Ks5Pair; below: Ks5Pair };
}

export const MAT_MIS_CLUSTERS: MatMisCluster[] = [
  { id: 'cluster-a', label: 'Cluster A' },
  { id: 'cluster-b', label: 'Cluster B' },
  { id: 'cluster-c', label: 'Cluster C' },
  { id: 'cluster-d', label: 'Cluster D' },
];

export const MAT_MIS_SCHOOLS: MatMisSchool[] = [
  { id: 'school-a', label: 'School A', clusterId: 'cluster-a', isMine: true },
  { id: 'school-b', label: 'School B', clusterId: 'cluster-a', isMine: false },
  { id: 'school-c', label: 'School C', clusterId: 'cluster-a', isMine: false },
  { id: 'school-d', label: 'School D', clusterId: 'cluster-b', isMine: true },
  { id: 'school-e', label: 'School E', clusterId: 'cluster-b', isMine: false },
  { id: 'school-f', label: 'School F', clusterId: 'cluster-b', isMine: false },
  { id: 'school-g', label: 'School G', clusterId: 'cluster-c', isMine: true },
  { id: 'school-h', label: 'School H', clusterId: 'cluster-c', isMine: false },
  { id: 'school-i', label: 'School I', clusterId: 'cluster-d', isMine: true },
  { id: 'school-j', label: 'School J', clusterId: 'cluster-d', isMine: false },
];

/** All schools (10) — values aligned to design reference. */
const METRICS_ALL_SCHOOLS: SchoolPerformanceMetrics = {
  attendance: {
    wholeSchool: { thisYear: 90.5, lastYear: 91.5 },
    persistentAbsentees: { thisYear: 44.11, lastYear: 34.14 },
  },
  behaviour: { suspensions: 29, exclusions: 7 },
  ks1: {
    atAbove: { thisYear: 35.4, lastYear: 99.1 },
    below: { thisYear: 64.6, lastYear: 0.9 },
  },
  ks2: {
    atAbove: { thisYear: 37.3, lastYear: 77.2 },
    below: { thisYear: 62.7, lastYear: 22.8 },
  },
  ks3: {
    atAbove: { thisYear: 13.3, lastYear: null },
    below: { thisYear: 86.7, lastYear: null },
  },
  ks4: {
    atAbove: { thisYear: 15.7, lastYear: null },
    below: { thisYear: 84.3, lastYear: null },
  },
  ks5: {
    atAbove: { thisYear: null, lastYear: null },
    below: { thisYear: null, lastYear: null },
  },
};

/** My schools (4) — distinct aggregate. */
const METRICS_MY_SCHOOLS: SchoolPerformanceMetrics = {
  attendance: {
    wholeSchool: { thisYear: 88.2, lastYear: 90.1 },
    persistentAbsentees: { thisYear: 38.4, lastYear: 32.0 },
  },
  behaviour: { suspensions: 12, exclusions: 3 },
  ks1: {
    atAbove: { thisYear: 41.2, lastYear: 95.0 },
    below: { thisYear: 58.8, lastYear: 5.0 },
  },
  ks2: {
    atAbove: { thisYear: 40.1, lastYear: 80.0 },
    below: { thisYear: 59.9, lastYear: 20.0 },
  },
  ks3: {
    atAbove: { thisYear: 16.0, lastYear: null },
    below: { thisYear: 84.0, lastYear: null },
  },
  ks4: {
    atAbove: { thisYear: 18.0, lastYear: null },
    below: { thisYear: 82.0, lastYear: null },
  },
  ks5: {
    atAbove: { thisYear: null, lastYear: null },
    below: { thisYear: null, lastYear: null },
  },
};

const METRICS_BY_CLUSTER: Record<string, SchoolPerformanceMetrics> = {
  'cluster-a': {
    attendance: {
      wholeSchool: { thisYear: 89.0, lastYear: 90.2 },
      persistentAbsentees: { thisYear: 40.0, lastYear: 35.0 },
    },
    behaviour: { suspensions: 8, exclusions: 2 },
    ks1: {
      atAbove: { thisYear: 38.0, lastYear: 98.0 },
      below: { thisYear: 62.0, lastYear: 2.0 },
    },
    ks2: {
      atAbove: { thisYear: 36.0, lastYear: 78.0 },
      below: { thisYear: 64.0, lastYear: 22.0 },
    },
    ks3: {
      atAbove: { thisYear: 14.0, lastYear: null },
      below: { thisYear: 86.0, lastYear: null },
    },
    ks4: {
      atAbove: { thisYear: 14.0, lastYear: null },
      below: { thisYear: 86.0, lastYear: null },
    },
    ks5: {
      atAbove: { thisYear: null, lastYear: null },
      below: { thisYear: null, lastYear: null },
    },
  },
  'cluster-b': {
    attendance: {
      wholeSchool: { thisYear: 91.0, lastYear: 92.0 },
      persistentAbsentees: { thisYear: 46.0, lastYear: 33.0 },
    },
    behaviour: { suspensions: 9, exclusions: 3 },
    ks1: {
      atAbove: { thisYear: 33.0, lastYear: 100.0 },
      below: { thisYear: 67.0, lastYear: 0.0 },
    },
    ks2: {
      atAbove: { thisYear: 35.0, lastYear: 75.0 },
      below: { thisYear: 65.0, lastYear: 25.0 },
    },
    ks3: {
      atAbove: { thisYear: 12.0, lastYear: null },
      below: { thisYear: 88.0, lastYear: null },
    },
    ks4: {
      atAbove: { thisYear: 16.0, lastYear: null },
      below: { thisYear: 84.0, lastYear: null },
    },
    ks5: {
      atAbove: { thisYear: null, lastYear: null },
      below: { thisYear: null, lastYear: null },
    },
  },
  'cluster-c': {
    attendance: {
      wholeSchool: { thisYear: 92.0, lastYear: 91.0 },
      persistentAbsentees: { thisYear: 50.0, lastYear: 40.0 },
    },
    behaviour: { suspensions: 5, exclusions: 1 },
    ks1: {
      atAbove: { thisYear: 36.0, lastYear: 98.0 },
      below: { thisYear: 64.0, lastYear: 2.0 },
    },
    ks2: {
      atAbove: { thisYear: 39.0, lastYear: 76.0 },
      below: { thisYear: 61.0, lastYear: 24.0 },
    },
    ks3: {
      atAbove: { thisYear: 15.0, lastYear: null },
      below: { thisYear: 85.0, lastYear: null },
    },
    ks4: {
      atAbove: { thisYear: 17.0, lastYear: null },
      below: { thisYear: 83.0, lastYear: null },
    },
    ks5: {
      atAbove: { thisYear: null, lastYear: null },
      below: { thisYear: null, lastYear: null },
    },
  },
  'cluster-d': {
    attendance: {
      wholeSchool: { thisYear: 90.0, lastYear: 91.0 },
      persistentAbsentees: { thisYear: 42.0, lastYear: 32.0 },
    },
    behaviour: { suspensions: 7, exclusions: 1 },
    ks1: {
      atAbove: { thisYear: 34.0, lastYear: 99.0 },
      below: { thisYear: 66.0, lastYear: 1.0 },
    },
    ks2: {
      atAbove: { thisYear: 38.0, lastYear: 78.0 },
      below: { thisYear: 62.0, lastYear: 22.0 },
    },
    ks3: {
      atAbove: { thisYear: 13.0, lastYear: null },
      below: { thisYear: 87.0, lastYear: null },
    },
    ks4: {
      atAbove: { thisYear: 16.0, lastYear: null },
      below: { thisYear: 84.0, lastYear: null },
    },
    ks5: {
      atAbove: { thisYear: null, lastYear: null },
      below: { thisYear: null, lastYear: null },
    },
  },
};

const METRICS_BY_SCHOOL: Record<string, SchoolPerformanceMetrics> = {
  'school-a': {
    ...METRICS_BY_CLUSTER['cluster-a'],
    attendance: {
      wholeSchool: { thisYear: 91.0, lastYear: 90.0 },
      persistentAbsentees: { thisYear: 35.0, lastYear: 30.0 },
    },
  } as SchoolPerformanceMetrics,
  'school-b': {
    ...METRICS_BY_CLUSTER['cluster-a'],
    behaviour: { suspensions: 2, exclusions: 1 },
  } as SchoolPerformanceMetrics,
  'school-c': { ...METRICS_BY_CLUSTER['cluster-a'] } as SchoolPerformanceMetrics,
  'school-d': {
    ...METRICS_BY_CLUSTER['cluster-b'],
    behaviour: { suspensions: 3, exclusions: 1 },
  } as SchoolPerformanceMetrics,
  'school-e': { ...METRICS_BY_CLUSTER['cluster-b'] } as SchoolPerformanceMetrics,
  'school-f': { ...METRICS_BY_CLUSTER['cluster-b'] } as SchoolPerformanceMetrics,
  'school-g': { ...METRICS_BY_CLUSTER['cluster-c'] } as SchoolPerformanceMetrics,
  'school-h': { ...METRICS_BY_CLUSTER['cluster-c'] } as SchoolPerformanceMetrics,
  'school-i': { ...METRICS_BY_CLUSTER['cluster-d'] } as SchoolPerformanceMetrics,
  'school-j': { ...METRICS_BY_CLUSTER['cluster-d'] } as SchoolPerformanceMetrics,
};

export const MY_SCHOOLS_COUNT = MAT_MIS_SCHOOLS.filter((s) => s.isMine).length;
export const ALL_SCHOOLS_COUNT = MAT_MIS_SCHOOLS.length;

function schoolsInScope(scope: MatMisScope): MatMisSchool[] {
  if (scope === 'my-schools') {
    return MAT_MIS_SCHOOLS.filter((s) => s.isMine);
  }
  return MAT_MIS_SCHOOLS;
}

export function clusterOptionsForScope(_scope: MatMisScope): { value: string; label: string }[] {
  return MAT_MIS_CLUSTERS.map((c) => ({ value: c.id, label: c.label }));
}

export function schoolOptionsFor(
  scope: MatMisScope,
  clusterId: string | null
): { value: string; label: string }[] {
  let list = schoolsInScope(scope);
  if (clusterId) {
    list = list.filter((s) => s.clusterId === clusterId);
  }
  return list.map((s) => ({ value: s.id, label: s.label }));
}

export interface MatMisDashboardView {
  metrics: SchoolPerformanceMetrics;
  /** Line after “Showing:” */
  showingText: string;
  /** How many schools the current slice represents. */
  schoolCount: number;
}

/**
 * Resolves metrics and a human “Showing:” string from scope and applied filters.
 * `clusterId` / `schoolId` of `null` means not filtered.
 */
export function getDashboardView(
  scope: MatMisScope,
  appliedClusterId: string | null,
  appliedSchoolId: string | null
): MatMisDashboardView {
  if (appliedSchoolId) {
    const school = MAT_MIS_SCHOOLS.find((s) => s.id === appliedSchoolId);
    if (!school || !METRICS_BY_SCHOOL[appliedSchoolId]) {
      return fallbackView(scope);
    }
    if (scope === 'my-schools' && !school.isMine) {
      return fallbackView(scope);
    }
    return {
      metrics: METRICS_BY_SCHOOL[appliedSchoolId],
      showingText: school.label,
      schoolCount: 1,
    };
  }

  if (appliedClusterId) {
    const cluster = MAT_MIS_CLUSTERS.find((c) => c.id === appliedClusterId);
    const m = METRICS_BY_CLUSTER[appliedClusterId];
    if (!cluster || !m) {
      return fallbackView(scope);
    }
    const inScope = schoolsInScope(scope).filter((s) => s.clusterId === appliedClusterId);
    if (inScope.length === 0) {
      return fallbackView(scope);
    }
    if (inScope.length === 1) {
      const only = inScope[0]!;
      return {
        metrics: METRICS_BY_SCHOOL[only.id] ?? m,
        showingText: only.label,
        schoolCount: 1,
      };
    }
    return {
      metrics: m,
      showingText: cluster.label,
      schoolCount: inScope.length,
    };
  }

  if (scope === 'my-schools') {
    return {
      metrics: METRICS_MY_SCHOOLS,
      showingText: 'My schools',
      schoolCount: MY_SCHOOLS_COUNT,
    };
  }

  return {
    metrics: METRICS_ALL_SCHOOLS,
    showingText: 'All schools',
    schoolCount: ALL_SCHOOLS_COUNT,
  };
}

function fallbackView(scope: MatMisScope): MatMisDashboardView {
  if (scope === 'my-schools') {
    return {
      metrics: METRICS_MY_SCHOOLS,
      showingText: 'My schools',
      schoolCount: MY_SCHOOLS_COUNT,
    };
  }
  return {
    metrics: METRICS_ALL_SCHOOLS,
    showingText: 'All schools',
    schoolCount: ALL_SCHOOLS_COUNT,
  };
}
