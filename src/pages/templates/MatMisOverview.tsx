import { useOutletContext } from 'react-router-dom';
import { MatMisDashboard } from './MatMisDashboard';

export type MatMisOutletContext = { lastSearch: string | null };

export function MatMisOverview() {
  const { lastSearch } = useOutletContext<MatMisOutletContext>();

  return (
    <>
      <h1 className="template-page__title">MAT MIS Overview</h1>
      {lastSearch !== null && (
        <p className="mat-mis-template__search-hint" role="status">
          Last search: <strong>{lastSearch || '(empty)'}</strong>
        </p>
      )}
      <MatMisDashboard />
    </>
  );
}
