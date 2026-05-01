import { useCallback, useMemo, useState } from 'react';
import { Info } from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ArborDataTable } from '../../../components/arborDataTable';
import { Banner } from '../../../components/banner/Banner';
import { Button } from '../../../components/button/Button';
import { Combobox } from '../../../components/combobox/Combobox';
import { TextareaField, TextField } from '../../../components/formField';
import { Modal } from '../../../components/modal/Modal';
import { Slideover } from '../../../components/slideover';
import './matBehaviourCategory.scss';
import { useBehaviourCategoryMapping } from './BehaviourCategoryMappingContext';
import { buildCategorySetupRows } from './categorySetupDummyData';
import {
  aggregateCategoryUsage,
  applyBehaviourTypeMappings,
} from './categoryMappingDerived';
import { DUMMY_CATEGORY_MAPPING_ROWS } from './categoryMappingDummyData';
import {
  CATEGORY_SETUP_TABLE_ID,
  buildCategorySetupColumnDefs,
  type CategorySetupRow,
  type CategoryStatus,
} from './categorySetupTable';
import { buildMatBehaviourCategoryBreadcrumbs } from './matBehaviourCategoryBreadcrumbs';

const CATEGORY_SETUP_BREADCRUMBS =
  buildMatBehaviourCategoryBreadcrumbs('Manage Categories');

interface CategoryDraft {
  category: string;
  sentiment: string;
  description: string;
}

const EMPTY_CATEGORY_DRAFT: CategoryDraft = {
  category: '',
  sentiment: 'Positive',
  description: '',
};

const SENTIMENT_OPTIONS = [
  { value: 'Positive', label: 'Positive' },
  { value: 'Negative', label: 'Negative' },
];

function slugify(s: string): string {
  const slug = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || 'category';
}

function getTodayDisplayDate(): string {
  return new Intl.DateTimeFormat('en-GB').format(new Date());
}

export function MatBehaviourCategorySetup() {
  const { mappings } = useBehaviourCategoryMapping();
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [categoryDraft, setCategoryDraft] = useState<CategoryDraft>(EMPTY_CATEGORY_DRAFT);
  const [categoryNameError, setCategoryNameError] = useState('');
  const [customCategoryRows, setCustomCategoryRows] = useState<CategorySetupRow[]>([]);
  const [statusByRowId, setStatusByRowId] = useState<Record<string, CategoryStatus>>({});
  const [inactiveBlockedModalOpen, setInactiveBlockedModalOpen] = useState(false);

  const mappedRows = useMemo(
    () => applyBehaviourTypeMappings(DUMMY_CATEGORY_MAPPING_ROWS, mappings),
    [mappings],
  );

  const usageByCategory = useMemo(
    () => aggregateCategoryUsage(mappedRows),
    [mappedRows],
  );

  const rowData = useMemo(() => {
    const defaults = buildCategorySetupRows(usageByCategory).map((row) => ({
      ...row,
      status: statusByRowId[row.id] ?? row.status,
    }));
    const customs = customCategoryRows.map((row) => ({
      ...row,
      status: statusByRowId[row.id] ?? row.status,
    }));
    return [...defaults, ...customs];
  }, [customCategoryRows, statusByRowId, usageByCategory]);

  const handleStatusChange = useCallback((row: CategorySetupRow, next: CategoryStatus) => {
    if (next === 'Inactive' && row.status === 'Active' && row.behaviourTypesMapped > 0) {
      setInactiveBlockedModalOpen(true);
      return;
    }
    setStatusByRowId((prev) => ({ ...prev, [row.id]: next }));
  }, []);

  const columnDefs = useMemo(
    () => buildCategorySetupColumnDefs({ onStatusChange: handleStatusChange }),
    [handleStatusChange],
  );

  const openAddCategorySlideover = () => {
    setCategoryDraft(EMPTY_CATEGORY_DRAFT);
    setCategoryNameError('');
    setAddCategoryOpen(true);
  };

  const closeAddCategorySlideover = () => {
    setAddCategoryOpen(false);
    setCategoryNameError('');
  };

  const saveCategory = () => {
    const category = categoryDraft.category.trim();

    if (!category) {
      setCategoryNameError('Enter a category name.');
      return;
    }

    const now = Date.now();
    setCustomCategoryRows((current) => [
      ...current,
      {
        id: `custom-${slugify(category)}-${now}`,
        category,
        sentiment: categoryDraft.sentiment,
        description: categoryDraft.description.trim(),
        source: 'Custom',
        status: 'Active',
        schoolsUsing: 0,
        behaviourTypesMapped: 0,
        lastUpdated: getTodayDisplayDate(),
        lastUpdatedBy: 'Joe Carter',
      },
    ]);
    setAddCategoryOpen(false);
    setCategoryDraft(EMPTY_CATEGORY_DRAFT);
    setCategoryNameError('');
  };

  return (
    <div className="mat-behaviour-category-page">
      <Breadcrumbs
        className="mat-behaviour-category-page__breadcrumbs"
        items={CATEGORY_SETUP_BREADCRUMBS}
      />
      <div className="mat-behaviour-category-page__header">
        <h1 className="template-page__title">Manage Categories</h1>
        <Button type="button" variant="primary" color="green" onClick={openAddCategorySlideover}>
          Add behaviour category
        </Button>
      </div>
      <Banner
        variant="info"
        icon={<Info size={24} aria-hidden />}
        className="mat-behaviour-category-page__info-banner"
      >
        Manage the behaviour categories used to group school behaviour types.
      </Banner>
      <div className="mat-behaviour-category-page__setup-table">
        <ArborDataTable<CategorySetupRow>
          tableId={CATEGORY_SETUP_TABLE_ID}
          rowData={rowData}
          getRowId={(row) => row.id}
          columnDefs={columnDefs}
          rowSelection={false}
        />
      </div>

      <Modal
        open={inactiveBlockedModalOpen}
        onClose={() => setInactiveBlockedModalOpen(false)}
        title="Cannot mark this category as inactive yet"
        footer={
          <Button
            type="button"
            variant="primary"
            color="green"
            onClick={() => setInactiveBlockedModalOpen(false)}
          >
            Close
          </Button>
        }
      >
        <p>
          Disconnect all behaviour types from this category first (change their mappings on the
          behaviour mapping page). After no behaviour types are linked to this category, you can
          mark it as inactive.
        </p>
      </Modal>

      <Slideover
        open={addCategoryOpen}
        onClose={closeAddCategorySlideover}
        title="Add behaviour category"
        width={520}
        className="mat-behaviour-category-page__setup-slideover"
        footerButtons={[
          { label: 'Cancel', onClick: closeAddCategorySlideover },
          { label: 'Save', onClick: saveCategory },
        ]}
      >
        <div className="mat-behaviour-category-page__setup-slideover-content">
          <p className="mat-behaviour-category-page__setup-slideover-intro">
            Add a custom category that can be used when mapping school behaviour types.
          </p>
          <div className="mat-behaviour-category-page__setup-slideover-fields">
            <TextField
              label="Category name"
              value={categoryDraft.category}
              onChange={(e) => {
                setCategoryDraft((current) => ({ ...current, category: e.target.value }));
                if (categoryNameError) setCategoryNameError('');
              }}
              placeholder="e.g. Excellent teamwork"
              error={categoryNameError}
            />
            <Combobox
              label="Sentiment"
              options={SENTIMENT_OPTIONS}
              value={categoryDraft.sentiment}
              onChange={(value) =>
                setCategoryDraft((current) => ({
                  ...current,
                  sentiment: Array.isArray(value) ? current.sentiment : value,
                }))
              }
              placeholder="Select sentiment"
            />
            <TextareaField
              label="Description"
              value={categoryDraft.description}
              onChange={(e) =>
                setCategoryDraft((current) => ({ ...current, description: e.target.value }))
              }
              placeholder="Describe when this category should be used."
              rows={4}
            />
          </div>
        </div>
      </Slideover>
    </div>
  );
}
