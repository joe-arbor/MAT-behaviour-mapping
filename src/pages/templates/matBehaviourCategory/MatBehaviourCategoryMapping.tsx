import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ArborDataTable } from '../../../components/arborDataTable';
import { Banner } from '../../../components/banner/Banner';
import { Button } from '../../../components/button/Button';
import { Combobox } from '../../../components/combobox/Combobox';
import { Slideover } from '../../../components/slideover';
import { Toast } from '../../../components/toast/Toast';
import { Tooltip } from '../../../components/tooltip/Tooltip';
import './matBehaviourCategory.scss';
import {
  CATEGORY_MAPPING_TABLE_ID,
  buildCategoryMappingColumnDefs,
  type CategoryMappingRow,
} from './categoryMappingTable';
import { DUMMY_CATEGORY_MAPPING_ROWS } from './categoryMappingDummyData';
import { BEHAVIOUR_CATEGORY_OPTIONS } from './behaviourCategoryOptions';
import { CategoryMappingFilterBar } from './CategoryMappingFilterBar';
import {
  applyCategoryMappingFilters,
  EMPTY_CATEGORY_MAPPING_FILTERS,
  type CategoryMappingFiltersState,
} from './categoryMappingFilterUtils';
import {
  applyBehaviourTypeMappings,
  type BehaviourTypeMappings,
} from './categoryMappingDerived';
import { useBehaviourCategoryMapping } from './BehaviourCategoryMappingContext';
import { buildMatBehaviourCategoryBreadcrumbs } from './matBehaviourCategoryBreadcrumbs';
import type { BulkActionSpec } from '../../../components/arborDataTable/arborDataTableTypes';

const CATEGORY_MAPPING_BREADCRUMBS =
  buildMatBehaviourCategoryBreadcrumbs('Map Behaviour Types');

interface BehaviourTypeMappingRow {
  behaviourType: string;
  schoolCount: number;
}

type MappingSlideoverScope =
  | { mode: 'full' }
  | {
      mode: 'scoped';
      behaviourTypes: string[];
      schoolCount: number;
      affectedSchoolCount: number;
    };

function buildBehaviourTypeMappingRows(rows: CategoryMappingRow[]): BehaviourTypeMappingRow[] {
  const schoolsByBehaviourType = new Map<string, Set<string>>();

  rows.forEach((row) => {
    const schoolSet = schoolsByBehaviourType.get(row.behaviourType) ?? new Set<string>();
    schoolSet.add(row.school);
    schoolsByBehaviourType.set(row.behaviourType, schoolSet);
  });

  return [...schoolsByBehaviourType.entries()]
    .map(([behaviourType, schools]) => ({
      behaviourType,
      schoolCount: schools.size,
    }))
    .sort((a, b) => a.behaviourType.localeCompare(b.behaviourType));
}

export function MatBehaviourCategoryMapping() {
  const { mappings: behaviourTypeMappings, setMappings: setBehaviourTypeMappings } =
    useBehaviourCategoryMapping();
  const mappingComboboxRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [appliedFilters, setAppliedFilters] = useState<CategoryMappingFiltersState>(
    EMPTY_CATEGORY_MAPPING_FILTERS,
  );
  const [mappingSlideoverOpen, setMappingSlideoverOpen] = useState(false);
  const [draftBehaviourTypeMappings, setDraftBehaviourTypeMappings] =
    useState<BehaviourTypeMappings>({});
  const [focusedMappingBehaviourType, setFocusedMappingBehaviourType] = useState<string | null>(
    null,
  );
  const [mappingSlideoverScope, setMappingSlideoverScope] = useState<MappingSlideoverScope>({
    mode: 'full',
  });
  const [mappingToastMessage, setMappingToastMessage] = useState<string | null>(null);

  const dismissMappingToast = useCallback(() => {
    setMappingToastMessage(null);
  }, []);

  const mappedRows = useMemo(
    () => applyBehaviourTypeMappings(DUMMY_CATEGORY_MAPPING_ROWS, behaviourTypeMappings),
    [behaviourTypeMappings],
  );

  const behaviourTypeMappingRows = useMemo(
    () => buildBehaviourTypeMappingRows(DUMMY_CATEGORY_MAPPING_ROWS),
    [],
  );

  const filteredRows = useMemo(
    () => applyCategoryMappingFilters(mappedRows, appliedFilters),
    [appliedFilters, mappedRows],
  );

  const hasDraftBehaviourTypeMappings = useMemo(
    () => Object.values(draftBehaviourTypeMappings).some(Boolean),
    [draftBehaviourTypeMappings],
  );

  const openMappingSlideover = useCallback(
    (focusBehaviourType: string | null = null) => {
      setDraftBehaviourTypeMappings({ ...behaviourTypeMappings });
      setFocusedMappingBehaviourType(focusBehaviourType);
      setMappingSlideoverScope({ mode: 'full' });
      setMappingSlideoverOpen(true);
    },
    [behaviourTypeMappings],
  );

  const openScopedMappingSlideover = useCallback(
    (selectedRows: CategoryMappingRow[]) => {
      if (selectedRows.length === 0) return;

      const behaviourTypes = [...new Set(selectedRows.map((row) => row.behaviourType))].sort(
        (a, b) => a.localeCompare(b),
      );
      const behaviourTypeSet = new Set(behaviourTypes);
      const schoolCount = new Set(selectedRows.map((row) => row.school)).size;
      const affectedSchoolCount = new Set(
        DUMMY_CATEGORY_MAPPING_ROWS.filter((row) => behaviourTypeSet.has(row.behaviourType)).map(
          (row) => row.school,
        ),
      ).size;

      setDraftBehaviourTypeMappings({ ...behaviourTypeMappings });
      setFocusedMappingBehaviourType(null);
      setMappingSlideoverScope({
        mode: 'scoped',
        behaviourTypes,
        schoolCount,
        affectedSchoolCount,
      });
      setMappingSlideoverOpen(true);
    },
    [behaviourTypeMappings],
  );

  const handleAddCategory = useCallback(
    (row: CategoryMappingRow) => {
      openMappingSlideover(row.behaviourType);
    },
    [openMappingSlideover],
  );

  const columnDefs = useMemo(
    () => buildCategoryMappingColumnDefs({ onAddCategory: handleAddCategory }),
    [handleAddCategory],
  );

  const visibleBehaviourTypeMappingRows = useMemo(() => {
    if (mappingSlideoverScope.mode === 'full') return behaviourTypeMappingRows;

    const scopedBehaviourTypes = new Set(mappingSlideoverScope.behaviourTypes);
    return behaviourTypeMappingRows.filter((row) => scopedBehaviourTypes.has(row.behaviourType));
  }, [behaviourTypeMappingRows, mappingSlideoverScope]);

  const scopedBulkCategoryValue = useMemo(() => {
    if (mappingSlideoverScope.mode !== 'scoped' || visibleBehaviourTypeMappingRows.length === 0) {
      return '';
    }

    const values = visibleBehaviourTypeMappingRows.map(
      (row) => draftBehaviourTypeMappings[row.behaviourType] ?? '',
    );
    const firstValue = values[0] ?? '';
    return firstValue !== '' && values.every((value) => value === firstValue) ? firstValue : '';
  }, [draftBehaviourTypeMappings, mappingSlideoverScope.mode, visibleBehaviourTypeMappingRows]);

  const hasVisibleDraftBehaviourTypeMappings = useMemo(() => {
    if (mappingSlideoverScope.mode === 'full') return hasDraftBehaviourTypeMappings;

    return visibleBehaviourTypeMappingRows.some(
      (row) => draftBehaviourTypeMappings[row.behaviourType],
    );
  }, [
    draftBehaviourTypeMappings,
    hasDraftBehaviourTypeMappings,
    mappingSlideoverScope.mode,
    visibleBehaviourTypeMappingRows,
  ]);

  const setScopedBulkCategory = useCallback(
    (value: string | string[]) => {
      if (mappingSlideoverScope.mode !== 'scoped') return;

      const nextValue = Array.isArray(value) ? '' : value;
      setDraftBehaviourTypeMappings((current) => {
        const next = { ...current };
        visibleBehaviourTypeMappingRows.forEach((row) => {
          next[row.behaviourType] = nextValue;
        });
        return next;
      });
    },
    [mappingSlideoverScope.mode, visibleBehaviourTypeMappingRows],
  );

  const bulkActions = useMemo<BulkActionSpec[]>(
    () => [
      {
        id: 'assign-behaviour-category',
        label: 'Assign behaviour category',
        handler: (selectedRows) =>
          openScopedMappingSlideover(selectedRows as CategoryMappingRow[]),
      },
    ],
    [openScopedMappingSlideover],
  );

  const closeMappingSlideover = () => {
    setDraftBehaviourTypeMappings({ ...behaviourTypeMappings });
    setFocusedMappingBehaviourType(null);
    setMappingSlideoverScope({ mode: 'full' });
    setMappingSlideoverOpen(false);
  };

  useEffect(() => {
    if (!mappingSlideoverOpen || focusedMappingBehaviourType == null) return;

    const frame = window.requestAnimationFrame(() => {
      const input = mappingComboboxRefs.current[focusedMappingBehaviourType];
      input?.scrollIntoView({ block: 'center', inline: 'nearest' });
      input?.focus();
      setFocusedMappingBehaviourType(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusedMappingBehaviourType, mappingSlideoverOpen]);

  const applyMappingChanges = () => {
    const nextMappings = Object.fromEntries(
      Object.entries(draftBehaviourTypeMappings).filter(([, category]) => category),
    ) as BehaviourTypeMappings;
    setBehaviourTypeMappings(nextMappings);
    setMappingSlideoverOpen(false);

    if (mappingSlideoverScope.mode === 'scoped') {
      const mappedTypeCount = mappingSlideoverScope.behaviourTypes.filter(
        (behaviourType) => nextMappings[behaviourType],
      ).length;
      setMappingToastMessage(
        mappedTypeCount > 0
          ? `${mappedTypeCount} selected behaviour type${mappedTypeCount === 1 ? '' : 's'} mapped`
          : 'Selected behaviour type mappings cleared',
      );
      setMappingSlideoverScope({ mode: 'full' });
      return;
    }

    const typeCount = Object.keys(nextMappings).length;
    if (typeCount > 0) {
      const categoryCount = new Set(Object.values(nextMappings)).size;
      setMappingToastMessage(
        `${categoryCount} behaviour categories assigned to ${typeCount} behaviour types`,
      );
    } else {
      setMappingToastMessage(null);
    }
  };

  const clearDraftMappingChanges = () => {
    if (mappingSlideoverScope.mode === 'full') {
      setDraftBehaviourTypeMappings({});
      return;
    }

    setDraftBehaviourTypeMappings((current) => {
      const next = { ...current };
      visibleBehaviourTypeMappingRows.forEach((row) => {
        next[row.behaviourType] = '';
      });
      return next;
    });
  };

  const scopedMappingCopy =
    mappingSlideoverScope.mode === 'scoped'
      ? (() => {
          const affectedSchoolLabel =
            mappingSlideoverScope.affectedSchoolCount === 1 ? 'school' : 'schools';
          const behaviourTypeCopy =
            mappingSlideoverScope.behaviourTypes.length === 1
              ? `"${mappingSlideoverScope.behaviourTypes[0]}"`
              : 'these behaviour types';
          const outsideSelectionCopy =
            mappingSlideoverScope.affectedSchoolCount > mappingSlideoverScope.schoolCount
              ? ', including schools outside your selection'
              : '';

          return {
            impactMessage: `Behaviour types use one category across schools. The category you choose will apply to ${behaviourTypeCopy} in ${mappingSlideoverScope.affectedSchoolCount} ${affectedSchoolLabel}${outsideSelectionCopy}.`,
          };
        })()
      : null;

  return (
    <div className="mat-behaviour-category-page">
      <Breadcrumbs
        className="mat-behaviour-category-page__breadcrumbs"
        items={CATEGORY_MAPPING_BREADCRUMBS}
      />
      <div className="mat-behaviour-category-page__header">
        <h1 className="template-page__title">Map Behaviour Types</h1>
        <Button
          type="button"
          variant="primary"
          color="green"
          onClick={() => openMappingSlideover()}
        >
          Map behaviour types
        </Button>
      </div>
      <CategoryMappingFilterBar
        allRows={mappedRows}
        applied={appliedFilters}
        onAppliedChange={setAppliedFilters}
      />
      <div className="mat-behaviour-category-page__mapping-table">
        <ArborDataTable<CategoryMappingRow>
          tableId={CATEGORY_MAPPING_TABLE_ID}
          rowData={filteredRows}
          getRowId={(row) => row.id}
          columnDefs={columnDefs}
          bulkActions={bulkActions}
          rowSelection={true}
        />
      </div>
      <Slideover
        open={mappingSlideoverOpen}
        onClose={closeMappingSlideover}
        title="Map behaviour"
        width={520}
        className="mat-behaviour-category-page__mapping-slideover"
        footerButtons={[
          { label: 'Cancel', onClick: closeMappingSlideover },
          { label: 'Apply mapping', onClick: applyMappingChanges },
        ]}
      >
        <div className="mat-behaviour-category-page__mapping-slideover-content">
          {mappingSlideoverScope.mode === 'full' && (
            <div className="mat-behaviour-category-page__mapping-slideover-summary">
              <div>
                <p className="mat-behaviour-category-page__mapping-slideover-intro">
                  Map school-defined behaviour types to Arbor behaviour categories.
                </p>
              </div>
            </div>
          )}
          {scopedMappingCopy != null && (
            <Banner
              variant="info"
              className="mat-behaviour-category-page__mapping-slideover-impact"
            >
              {scopedMappingCopy.impactMessage}
            </Banner>
          )}
          <table className="mat-behaviour-category-page__mapping-slideover-table">
            <thead>
              <tr>
                <th scope="col">
                  <Tooltip content="School-defined behaviour types">Behaviour type</Tooltip>
                </th>
                <th scope="col">
                  <Tooltip
                    content={
                      mappingSlideoverScope.mode === 'scoped'
                        ? 'Schools selected for this bulk action'
                        : 'Total schools using this behaviour type'
                    }
                  >
                    {mappingSlideoverScope.mode === 'scoped' ? 'Selected schools' : 'School count'}
                  </Tooltip>
                </th>
                <th scope="col">
                  <Tooltip content="Map to category">Behaviour category</Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {mappingSlideoverScope.mode === 'scoped' ? (
                <tr>
                  <td>{mappingSlideoverScope.behaviourTypes.join(', ')}</td>
                  <td>{mappingSlideoverScope.schoolCount}</td>
                  <td>
                    <Combobox
                      id="mapping-category-selected-behaviour-types"
                      options={BEHAVIOUR_CATEGORY_OPTIONS}
                      value={scopedBulkCategoryValue}
                      onChange={setScopedBulkCategory}
                      placeholder="Select category"
                    />
                  </td>
                </tr>
              ) : (
                visibleBehaviourTypeMappingRows.map((row) => (
                  <tr key={row.behaviourType}>
                    <td>{row.behaviourType}</td>
                    <td>{row.schoolCount}</td>
                    <td>
                      <Combobox
                        id={`mapping-category-${row.behaviourType
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')}`}
                        inputRef={(node) => {
                          mappingComboboxRefs.current[row.behaviourType] = node;
                        }}
                        options={BEHAVIOUR_CATEGORY_OPTIONS}
                        value={draftBehaviourTypeMappings[row.behaviourType] ?? ''}
                        onChange={(value) =>
                          setDraftBehaviourTypeMappings((current: BehaviourTypeMappings) => ({
                            ...current,
                            [row.behaviourType]: Array.isArray(value) ? '' : value,
                          }))
                        }
                        placeholder="Select category"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mat-behaviour-category-page__mapping-slideover-actions">
            <Button
              type="button"
              variant="secondary"
              color="grey"
              onClick={clearDraftMappingChanges}
              disabled={!hasVisibleDraftBehaviourTypeMappings}
            >
              {mappingSlideoverScope.mode === 'scoped'
                ? 'Clear selected mappings'
                : 'Clear all mappings'}
            </Button>
          </div>
        </div>
      </Slideover>
      {mappingToastMessage != null && (
        <div
          className="mat-behaviour-category-page__toast-region"
          aria-live="polite"
          aria-atomic="true"
        >
          <Toast variant="success" onClose={dismissMappingToast} autoDismissMs={4000}>
            {mappingToastMessage}
          </Toast>
        </div>
      )}
    </div>
  );
}
