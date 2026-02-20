import { useCallback } from 'react';
import { ArborDataTable } from '../../components/arborDataTable';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import './tableShowcase.scss';

/** Row shape for Upcoming detention sessions demo (Rowmantic / Blanche-aligned). */
interface DetentionRow {
  id: string;
  detentionType: string;
  startDate: Date;
  endDate: Date;
  room: string;
  capacity: number;
  staff: string;
  students: number;
}

/** Format date as "Day, DD Mon YYYY, HH:MM" (24h) per Rowmantic D) date-time. */
function formatDateTime(d: Date): string {
  const day = d.toLocaleDateString('en-GB', { weekday: 'short' });
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${day}, ${date}, ${time}`;
}

/** Link cell renderer: underlined text, non-colour affordance (Rowmantic I), keyboard focusable. */
function LinkCell(params: ICellRendererParams<DetentionRow>) {
  const value = params.value ?? '';
  return (
    <a
      href="#"
      className="table-showcase__link-cell"
      onClick={(e) => e.preventDefault()}
    >
      {value}
    </a>
  );
}

/** Generate 52 demo rows for "Showing 52 results" / 100 per page. */
function buildDemoRows(): DetentionRow[] {
  const types: string[] = [
    'Year 10 Lunchtime Detention',
    'Year 7 Lunchtime Detention',
    'Year 10 After School Detention',
    'Year 8 Lunchtime Detention',
    'Year 9 After School Detention',
  ];
  const rooms: string[] = ['Isolation Room 1', 'Isolation Room 2', 'Isolation Room 3', 'Isolation Room 4', 'Hall A'];
  const staffSingle: string[] = ['Charlotte Bailey', 'Selina Allen', 'James Wilson', 'Emma Davis', 'Oliver Brown'];
  const staffPair: string[] = [
    'Charlotte Bailey and Selina Allen',
    'James Wilson and Emma Davis',
    'Selina Allen and Oliver Brown',
    'Charlotte Bailey and James Wilson',
    'Emma Davis and Oliver Brown',
  ];
  const rows: DetentionRow[] = [];
  const base = new Date(2026, 1, 20, 12, 40);
  for (let i = 0; i < 52; i++) {
    const start = new Date(base);
    start.setDate(start.getDate() + Math.floor(i / 5));
    start.setMinutes(start.getMinutes() + i * 15);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);
    end.setMinutes(end.getMinutes() + 20);
    const usePair = i % 3 === 0;
    rows.push({
      id: `det-${i + 1}`,
      detentionType: types[i % types.length] ?? '',
      startDate: start,
      endDate: end,
      room: rooms[i % rooms.length] ?? '',
      capacity: 25,
      staff: usePair ? staffPair[i % staffPair.length] ?? '' : staffSingle[i % staffSingle.length] ?? '',
      students: i % 4 === 0 ? 0 : (i % 12) + 1,
    });
  }
  return rows;
}

const DEMO_ROWS = buildDemoRows();

const columnDefs: ColDef<DetentionRow>[] = [
  {
    field: 'detentionType',
    headerName: 'Detention Type',
    flex: 1,
    minWidth: 140,
    cellRenderer: LinkCell,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 200,
    valueFormatter: (p) => (p.value ? formatDateTime(p.value as Date) : ''),
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 200,
    valueFormatter: (p) => (p.value ? formatDateTime(p.value as Date) : ''),
  },
  { field: 'room', headerName: 'Room', width: 100 },
  {
    field: 'capacity',
    headerName: 'Capacity',
    width: 100,
    cellClass: 'ag-right-aligned-cell',
    type: 'rightAligned',
  },
  { field: 'staff', headerName: 'Staff', width: 120 },
  {
    field: 'students',
    headerName: 'Students',
    width: 100,
    cellClass: 'ag-right-aligned-cell',
    type: 'rightAligned',
  },
];

export function TableShowcase() {
  const handleExpand = useCallback(() => {
    window.open('#', '_blank');
  }, []);

  return (
    <div className="table-showcase">
      <section className="table-showcase__section">
        <h2 className="table-showcase__heading">Data Table</h2>
        <p className="table-showcase__intro">
          ArborDataTable (AG Grid): collapsible section, toolbar (Hide columns, Search, Download, icon cluster), pagination, and footer with status and Expand table. This demo matches the &quot;Upcoming detention sessions&quot; pattern. Rowmantic checklist and Blanche design tokens apply.
        </p>
      </section>

      <ArborDataTable<DetentionRow>
        tableId="table-showcase-upcoming-detentions"
        title="Upcoming detention sessions"
        collapsible
        defaultCollapsed={false}
        rowData={DEMO_ROWS}
        getRowId={(row) => row.id}
        columnDefs={columnDefs}
        rowSelection={false}
        downloads={[
          {
            id: 'csv',
            label: 'Download CSV',
            handler: (api) => api?.exportDataAsCsv(),
          },
        ]}
        showToolbar
        showHideColumns
        showSearch
        showExpandButton
        defaultPageSize={100}
        onExpandTable={handleExpand}
        className="table--column-borders"
      />
    </div>
  );
}
