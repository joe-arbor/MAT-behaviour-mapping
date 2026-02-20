import { useState } from 'react';
import { GridList, GridListItem } from '../../components/gridList/GridList';
import './gridListShowcase.scss';

const INITIAL_ITEMS: GridListItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `item-${i + 1}`,
  label: `Item ${i + 1}`,
}));

export function GridListShowcase() {
  const [items, setItems] = useState<GridListItem[]>(INITIAL_ITEMS);
  const [detailsOpen, setDetailsOpen] = useState(true);

  return (
    <div className="grid-list-showcase">
      <h1 className="grid-list-showcase__page-title">Grid List</h1>

      <section className="grid-list-showcase__details">
        <h2 className="grid-list-showcase__details-heading">Details</h2>
        <button
          type="button"
          className="grid-list-showcase__description-toggle"
          onClick={() => setDetailsOpen((o) => !o)}
          aria-expanded={detailsOpen}
        >
          Description
          <span className="grid-list-showcase__chevron" aria-hidden>
            {detailsOpen ? '▼' : '▶'}
          </span>
        </button>
        {detailsOpen && (
          <p className="grid-list-showcase__description">
            Grid List is a Component, which is used to display data with edit and delete actions. New items can be added
            to the grid using the button at the bottom. Items can be reordered by dragging and dropping them into new
            positions, or by enabling the optional sort button in the grid header.
          </p>
        )}
      </section>

      <section className="grid-list-showcase__demo">
        <h2 className="grid-list-showcase__demo-heading">Grid List</h2>
        <GridList
          title="Grid List"
          items={items}
          onItemsChange={setItems}
          onEdit={(item) => window.alert(`Edit: ${item.label}`)}
          showSortInHeader
          allowReorder
          allowEdit
          allowDelete
          addButtonLabel="Add another"
        />
      </section>
    </div>
  );
}
