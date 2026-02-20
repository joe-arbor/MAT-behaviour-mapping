import { useCallback, useState } from 'react';
import { GripVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import classnames from 'classnames';
import { Button } from '../button/Button';
import './gridList.scss';

export interface GridListItem {
  id: string;
  label: string;
}

export type GridListSortDirection = 'a-z' | 'z-a' | null;

/** Extract trailing or first number from label for numeric sort (e.g. "Item 10" -> 10). */
function getSortNumber(label: string): number | null {
  const match = label.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

export interface GridListProps {
  /** Title shown above the list */
  title?: string;
  /** List items (controlled) */
  items: GridListItem[];
  /** Called when items change (reorder, add, delete) */
  onItemsChange: (items: GridListItem[]) => void;
  /** Called when user clicks edit on an item */
  onEdit?: (item: GridListItem, index: number) => void;
  /** Called when user clicks delete on an item */
  onDelete?: (item: GridListItem, index: number) => void;
  /** Label for the "add another" button */
  addButtonLabel?: string;
  /** Show sort control (A-Z / Z-A) in the grid header */
  showSortInHeader?: boolean;
  /** Allow drag-and-drop reordering */
  allowReorder?: boolean;
  /** Allow edit action per row */
  allowEdit?: boolean;
  /** Allow delete action per row */
  allowDelete?: boolean;
  className?: string;
  id?: string;
}

export const GridList: React.FC<GridListProps> = ({
  title = 'Grid List',
  items,
  onItemsChange,
  onEdit,
  onDelete,
  addButtonLabel = 'Add another',
  showSortInHeader = false,
  allowReorder = true,
  allowEdit = true,
  allowDelete = true,
  className,
  id: idProp,
}) => {
  const [sortDirection, setSortDirection] = useState<GridListSortDirection>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleSort = useCallback(
    (direction: 'a-z' | 'z-a') => {
      const next = direction === sortDirection ? null : direction;
      setSortDirection(next);
      if (next) {
        const sorted = [...items].sort((a, b) => {
          const numA = getSortNumber(a.label);
          const numB = getSortNumber(b.label);
          if (numA !== null && numB !== null) {
            const cmp = numA - numB;
            return next === 'a-z' ? cmp : -cmp;
          }
          const cmp = a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
          return next === 'a-z' ? cmp : -cmp;
        });
        onItemsChange(sorted);
      }
    },
    [items, sortDirection, onItemsChange]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      if (!allowReorder) return;
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
      e.dataTransfer.setData('application/json', JSON.stringify({ index }));
    },
    [allowReorder]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      if (!allowReorder) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverIndex(index);
    },
    [allowReorder]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, toIndex: number) => {
      if (!allowReorder) return;
      e.preventDefault();
      setDragOverIndex(null);
      setDraggedIndex(null);
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
      if (Number.isNaN(fromIndex) || fromIndex === toIndex) return;
      const next = [...items];
      const [removed] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, removed);
      onItemsChange(next);
    },
    [items, allowReorder, onItemsChange]
  );

  const handleAdd = useCallback(() => {
    const nextId = `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    onItemsChange([...items, { id: nextId, label: `New item` }]);
  }, [items, onItemsChange]);

  const handleDelete = useCallback(
    (item: GridListItem, index: number) => {
      onDelete?.(item, index);
      onItemsChange(items.filter((_, i) => i !== index));
    },
    [items, onDelete, onItemsChange]
  );

  return (
    <div className={classnames('ds-grid-list', className)} id={idProp}>
      {title && <h3 className="ds-grid-list__title">{title}</h3>}

      <div className="ds-grid-list__table-wrap">
        {showSortInHeader && (
          <div className="ds-grid-list__header">
            <span className="ds-grid-list__header-label">Sort</span>
            <div className="ds-grid-list__sort" role="group" aria-label="Sort order">
              <label className="ds-grid-list__sort-option">
                <input
                  type="radio"
                  name="grid-list-sort"
                  checked={sortDirection === 'a-z'}
                  onChange={() => handleSort('a-z')}
                />
                <span>A-Z</span>
              </label>
              <label className="ds-grid-list__sort-option">
                <input
                  type="radio"
                  name="grid-list-sort"
                  checked={sortDirection === 'z-a'}
                  onChange={() => handleSort('z-a')}
                />
                <span>Z-A</span>
              </label>
            </div>
          </div>
        )}

        <ul className="ds-grid-list__list" role="list">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={classnames('ds-grid-list__row', {
                'ds-grid-list__row--dragging': draggedIndex === index,
                'ds-grid-list__row--drag-over': dragOverIndex === index,
              })}
              draggable={allowReorder}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, index)}
            >
              {allowReorder && (
                <span className="ds-grid-list__grip" aria-hidden>
                  <GripVertical size={18} strokeWidth={2} />
                </span>
              )}
              <span className="ds-grid-list__label">{item.label}</span>
              <div className="ds-grid-list__actions">
                {allowEdit && (
                  <button
                    type="button"
                    className="ds-grid-list__action"
                    onClick={() => onEdit?.(item, index)}
                    title="Edit"
                    aria-label={`Edit ${item.label}`}
                  >
                    <Pencil size={18} strokeWidth={2} />
                  </button>
                )}
                {allowDelete && (
                  <button
                    type="button"
                    className="ds-grid-list__action"
                    onClick={() => handleDelete(item, index)}
                    title="Delete"
                    aria-label={`Delete ${item.label}`}
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="ds-grid-list__add">
          <Button variant="tertiary" color="green" iconLeft={<Plus size={18} strokeWidth={2} />} onClick={handleAdd}>
            {addButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
