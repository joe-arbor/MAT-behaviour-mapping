import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArborDataTable } from '../../../components/arborDataTable';
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

interface BehaviourTypeMappingRow {
  behaviourType: string;
  schoolCount: number;
}

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

  const openMappingSlideover = useCallback((focusBehaviourType: string | null = null) => {
    setDraftBehaviourTypeMappings({ ...behaviourTypeMappings });
    setFocusedMappingBehaviourType(focusBehaviourType);
    setMappingSlideoverOpen(true);
  }, [behaviourTypeMappings]);

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

  const closeMappingSlideover = () => {
    setDraftBehaviourTypeMappings({ ...behaviourTypeMappings });
    setFocusedMappingBehaviourType(null);
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
    setDraftBehaviourTypeMappings({});
  };

  return (
    <div className="mat-behaviour-category-page">
      <div className="mat-behaviour-category-page__header">
        <h1 className="template-page__title">Category Mapping</h1>
        <Button
          type="button"
          variant="primary"
          color="green"
          onClick={() => openMappingSlideover()}
        >
          Map behaviour
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
          rowSelection={false}
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
          <div className="mat-behaviour-category-page__mapping-slideover-summary">
            <div>
              <p className="mat-behaviour-category-page__mapping-slideover-intro">
                Map school-defined behaviour types to Arbor behaviour categories.
              </p>
            </div>
          </div>
          <table className="mat-behaviour-category-page__mapping-slideover-table">
            <thead>
              <tr>
                <th scope="col">
                  <Tooltip content="School-defined behaviour types">Behaviour type</Tooltip>
                </th>
                <th scope="col">
                  <Tooltip content="Total schools using this behaviour type">
                    School count
                  </Tooltip>
                </th>
                <th scope="col">
                  <Tooltip content="Map to category">Behaviour category</Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {behaviourTypeMappingRows.map((row) => (
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
              ))}
            </tbody>
          </table>
          <div className="mat-behaviour-category-page__mapping-slideover-actions">
            <Button
              type="button"
              variant="secondary"
              color="grey"
              onClick={clearDraftMappingChanges}
              disabled={!hasDraftBehaviourTypeMappings}
            >
              Clear all mappings
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
