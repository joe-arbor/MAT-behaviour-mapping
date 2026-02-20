import React from 'react';
import { Combobox } from '../combobox/Combobox';
import type { ComboboxOption } from '../combobox/Combobox';
import './filterFieldStaff.scss';

export interface FilterFieldStaffProps {
  /** Label above the field (default: "Staff who are...") */
  label?: React.ReactNode;
  /** Selected values */
  value?: string[];
  /** Called when selection changes */
  onChange?: (value: string[]) => void;
  /** Options for the multi-select */
  options?: ComboboxOption[];
  /** Placeholder when empty */
  placeholder?: string;
  /** Show "+ and who also are" link to add another filter clause */
  showAddClause?: boolean;
  /** Called when "+ and who also are" is clicked */
  onAddClause?: () => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Bespoke filter field for filtering by staff.
 * Use as a child of Filter Panel when the target component is filtered by staff criteria.
 */
export const FilterFieldStaff: React.FC<FilterFieldStaffProps> = ({
  label = 'Staff who are...',
  value = [],
  onChange,
  options = [],
  placeholder = 'Select…',
  showAddClause = false,
  onAddClause,
  disabled = false,
  id: idProp,
  className,
}) => {
  return (
    <div className={className}>
      <Combobox
        options={options}
        multiple
        value={value}
        onChange={(v) => onChange?.(v as string[])}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        id={idProp}
      />
      {showAddClause && (
        <button
          type="button"
          className="ds-filter-field-staff__add-clause"
          onClick={onAddClause}
          disabled={disabled}
        >
          + and who also are
        </button>
      )}
    </div>
  );
};

export default FilterFieldStaff;
