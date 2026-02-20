import type { TableState } from './arborDataTableTypes';

const STORAGE_PREFIX = 'arbor-datatable-';

function storageKey(tableId: string): string {
  return `${STORAGE_PREFIX}${tableId}`;
}

export function loadTableState(tableId: string): Partial<TableState> | null {
  try {
    const raw = localStorage.getItem(storageKey(tableId));
    if (!raw) return null;
    return JSON.parse(raw) as Partial<TableState>;
  } catch {
    return null;
  }
}

export function saveTableState(tableId: string, state: Partial<TableState>): void {
  try {
    localStorage.setItem(storageKey(tableId), JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function clearTableState(tableId: string): void {
  try {
    localStorage.removeItem(storageKey(tableId));
  } catch {
    // ignore
  }
}
