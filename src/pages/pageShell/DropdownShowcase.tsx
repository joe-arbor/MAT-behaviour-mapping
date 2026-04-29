import { useState } from 'react';
import { Dropdown } from '../../components/dropdown/Dropdown';
import './dropdownShowcase.scss';

const YEAR_GROUP_OPTIONS = [
  { value: 'p1', label: 'Page 1' },
  { value: 'p2', label: 'Page 2' },
  { value: 'p3', label: 'Page 3' },
  { value: 'p4', label: 'Page 4' },
];

const MENU_OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

export function DropdownShowcase() {
  const [yearGroup, setYearGroup] = useState('p1');
  const [menuValue, setMenuValue] = useState('');

  return (
    <div className="dropdown-showcase">
      <section className="dropdown-showcase__section">
        <h2 className="dropdown-showcase__heading">Dropdown</h2>
        <p className="dropdown-showcase__intro">
          Dropdown menu triggered by a button. Use a label for form-style context (e.g. Year group) or a standalone menu button.
        </p>

        <div className="dropdown-showcase__row">
          <Dropdown
            id="dropdown-year-group"
            label="Year group"
            options={YEAR_GROUP_OPTIONS}
            value={yearGroup}
            onChange={setYearGroup}
          />
        </div>

        <div className="dropdown-showcase__row">
          <Dropdown
            id="dropdown-menu-button"
            options={MENU_OPTIONS}
            value={menuValue}
            onChange={setMenuValue}
            placeholder="Menu Button"
          />
        </div>
      </section>
    </div>
  );
}
