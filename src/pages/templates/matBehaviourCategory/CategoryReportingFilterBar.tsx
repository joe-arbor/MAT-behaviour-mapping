import { useMemo, useState } from 'react';
import { Filter, Pencil } from 'lucide-react';
import { Button } from '../../../components/button/Button';
import { Combobox } from '../../../components/combobox/Combobox';
import { DatePicker } from '../../../components/datePicker/DatePicker';
import { Modal } from '../../../components/modal/Modal';
import type { CategoryMappingRow } from './categoryMappingTable';
import {
  EMPTY_CATEGORY_REPORTING_FILTERS,
  buildCategoryReportingFilterPreview,
  cloneCategoryReportingFilters,
  type CategoryReportingFiltersState,
} from './categoryReportingFilterUtils';

function buildOptions(values: string[]) {
  return [...new Set(values)]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((value) => ({ value, label: value }));
}

export interface CategoryReportingFilterBarProps {
  allRows: CategoryMappingRow[];
  applied: CategoryReportingFiltersState;
  onAppliedChange: (next: CategoryReportingFiltersState) => void;
}

export function CategoryReportingFilterBar({
  allRows,
  applied,
  onAppliedChange,
}: CategoryReportingFilterBarProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<CategoryReportingFiltersState>(() =>
    cloneCategoryReportingFilters(applied),
  );

  const schoolOptions = useMemo(
    () => buildOptions(allRows.map((row) => row.school)),
    [allRows],
  );
  const categoryOptions = useMemo(
    () => buildOptions(allRows.map((row) => row.behaviourCategory)),
    [allRows],
  );
  const yearGroupOptions = useMemo(
    () =>
      buildOptions(allRows.flatMap((row) => row.reportingSlices.map((slice) => slice.yearGroup))),
    [allRows],
  );
  const studentGroupOptions = useMemo(
    () =>
      buildOptions(allRows.flatMap((row) => row.reportingSlices.map((slice) => slice.studentGroup))),
    [allRows],
  );

  const previewText = buildCategoryReportingFilterPreview(applied);

  const openModal = () => {
    setDraft(cloneCategoryReportingFilters(applied));
    setOpen(true);
  };

  const handleClose = () => {
    setDraft(cloneCategoryReportingFilters(applied));
    setOpen(false);
  };

  const handleApply = () => {
    onAppliedChange(cloneCategoryReportingFilters(draft));
    setOpen(false);
  };

  const handleClearAll = () => {
    setDraft(cloneCategoryReportingFilters(EMPTY_CATEGORY_REPORTING_FILTERS));
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
        className="mat-behaviour-category-page__filter-modal mat-behaviour-category-page__reporting-filter-modal"
        open={open}
        onClose={handleClose}
        title="Filter category reporting"
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
          <div className="mat-behaviour-category-page__filter-modal-date-row">
            <DatePicker
              label="Date range from"
              value={draft.dateFrom}
              onChange={(dateFrom) => setDraft((current) => ({ ...current, dateFrom }))}
              placeholder="From"
            />
            <DatePicker
              label="Date range to"
              value={draft.dateTo}
              onChange={(dateTo) => setDraft((current) => ({ ...current, dateTo }))}
              placeholder="To"
            />
          </div>
          <Combobox
            label="School"
            multiple
            options={schoolOptions}
            value={draft.schoolValues}
            onChange={(value) =>
              setDraft((current) => ({
                ...current,
                schoolValues: Array.isArray(value) ? value : [],
              }))
            }
            placeholder="Select schools"
          />
          <Combobox
            label="Category"
            multiple
            options={categoryOptions}
            value={draft.categoryValues}
            onChange={(value) =>
              setDraft((current) => ({
                ...current,
                categoryValues: Array.isArray(value) ? value : [],
              }))
            }
            placeholder="Select categories"
          />
          <Combobox
            label="Year group"
            multiple
            options={yearGroupOptions}
            value={draft.yearGroupValues}
            onChange={(value) =>
              setDraft((current) => ({
                ...current,
                yearGroupValues: Array.isArray(value) ? value : [],
              }))
            }
            placeholder="Select year groups"
          />
          <Combobox
            label="Student group"
            multiple
            options={studentGroupOptions}
            value={draft.studentGroupValues}
            onChange={(value) =>
              setDraft((current) => ({
                ...current,
                studentGroupValues: Array.isArray(value) ? value : [],
              }))
            }
            placeholder="Select student groups"
          />
        </div>
      </Modal>
    </>
  );
}

