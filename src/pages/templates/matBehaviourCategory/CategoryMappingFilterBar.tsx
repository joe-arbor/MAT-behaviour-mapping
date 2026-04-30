import { useMemo, useState } from 'react';
import { Filter, Pencil } from 'lucide-react';
import { Modal } from '../../../components/modal/Modal';
import { Button } from '../../../components/button/Button';
import { Combobox } from '../../../components/combobox/Combobox';
import { DatePicker } from '../../../components/datePicker/DatePicker';
import type { CategoryMappingRow } from './categoryMappingTable';
import {
  type CategoryMappingFiltersState,
  EMPTY_CATEGORY_MAPPING_FILTERS,
  buildCategoryMappingFilterPreview,
} from './categoryMappingFilterUtils';

function cloneFilters(f: CategoryMappingFiltersState): CategoryMappingFiltersState {
  return {
    ...f,
    schoolValues: [...f.schoolValues],
    lastUpdatedFrom: f.lastUpdatedFrom ? new Date(f.lastUpdatedFrom.getTime()) : null,
    lastUpdatedTo: f.lastUpdatedTo ? new Date(f.lastUpdatedTo.getTime()) : null,
  };
}

export interface CategoryMappingFilterBarProps {
  allRows: CategoryMappingRow[];
  applied: CategoryMappingFiltersState;
  onAppliedChange: (next: CategoryMappingFiltersState) => void;
}

export function CategoryMappingFilterBar({
  allRows,
  applied,
  onAppliedChange,
}: CategoryMappingFilterBarProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<CategoryMappingFiltersState>(() => cloneFilters(applied));

  const schoolOptions = useMemo(() => {
    const set = new Set<string>();
    allRows.forEach((r) => set.add(r.school));
    return [...set].sort((a, b) => a.localeCompare(b)).map((s) => ({ value: s, label: s }));
  }, [allRows]);

  const staffOptions = useMemo(() => {
    const set = new Set<string>();
    allRows.forEach((r) => set.add(r.lastUpdatedBy));
    return [...set].sort((a, b) => a.localeCompare(b)).map((s) => ({ value: s, label: s }));
  }, [allRows]);

  const updatedByOptions = useMemo(() => staffOptions, [staffOptions]);

  const previewText = buildCategoryMappingFilterPreview(applied);

  const openModal = () => {
    setDraft(cloneFilters(applied));
    setOpen(true);
  };

  const handleClose = () => {
    setDraft(cloneFilters(applied));
    setOpen(false);
  };

  const handleApply = () => {
    onAppliedChange(cloneFilters(draft));
    setOpen(false);
  };

  const handleClearAll = () => {
    setDraft(cloneFilters(EMPTY_CATEGORY_MAPPING_FILTERS));
  };

  return (
    <>
      <div className="mat-behaviour-category-page__filter-bar" role="region" aria-label="Filters">
        <button
          type="button"
          className="mat-behaviour-category-page__filter-bar-trigger"
          onClick={openModal}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Filter
            size={18}
            strokeWidth={2}
            className="mat-behaviour-category-page__filter-bar-icon"
            aria-hidden
          />
          <span className="mat-behaviour-category-page__filter-bar-preview">{previewText}</span>
          <span className="mat-behaviour-category-page__filter-bar-change">
            <Pencil size={16} strokeWidth={2} aria-hidden />
            Change
          </span>
        </button>
      </div>

      <Modal
        className="mat-behaviour-category-page__filter-modal"
        open={open}
        onClose={handleClose}
        title="Filter map behaviour types"
        footer={
          <>
            <Button type="button" variant="secondaryV1" color="grey" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" variant="secondary" color="grey" onClick={handleClearAll}>
              Clear all
            </Button>
            <Button
              type="button"
              variant="primary"
              color="green"
              onClick={handleApply}
              iconLeft={<Pencil size={16} strokeWidth={2} />}
            >
              Apply filters
            </Button>
          </>
        }
      >
        <div className="mat-behaviour-category-page__filter-modal-fields">
          <Combobox
            label="School"
            multiple
            options={schoolOptions}
            value={draft.schoolValues}
            onChange={(v) =>
              setDraft((d) => ({ ...d, schoolValues: Array.isArray(v) ? v : [] }))
            }
            placeholder="Select schools"
          />
          <div className="mat-behaviour-category-page__filter-modal-date-row">
            <DatePicker
              label="Last updated from"
              value={draft.lastUpdatedFrom}
              onChange={(lastUpdatedFrom) => setDraft((d) => ({ ...d, lastUpdatedFrom }))}
              placeholder="From"
            />
            <DatePicker
              label="Last updated to"
              value={draft.lastUpdatedTo}
              onChange={(lastUpdatedTo) => setDraft((d) => ({ ...d, lastUpdatedTo }))}
              placeholder="To"
            />
          </div>
          <Combobox
            label="Updated by"
            options={updatedByOptions}
            value={draft.updatedBy}
            onChange={(v) =>
              setDraft((d) => ({
                ...d,
                updatedBy: typeof v === 'string' ? v : v[0] ?? '',
              }))
            }
            placeholder="Select…"
          />
        </div>
      </Modal>
    </>
  );
}
