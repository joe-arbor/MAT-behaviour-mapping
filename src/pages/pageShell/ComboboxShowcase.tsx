import { useState } from 'react';
import { Combobox } from '../../components/combobox/Combobox';
import './comboboxShowcase.scss';

const LOCAL_OPTIONS = [
  { value: 'a1', label: 'A1' },
  { value: 'a2', label: 'A2' },
  { value: 'a3', label: 'A3' },
  { value: 'b1', label: 'B1' },
  { value: 'b2', label: 'B2' },
];

const YEAR_OPTIONS = [
  { value: '2024', label: '2023/24' },
  { value: '2025', label: '2024/25' },
  { value: '2026', label: '2025/26' },
];

const NAME_OPTIONS = [
  { value: 'melissa', label: 'Melissa Baker' },
  { value: 'stephanie', label: 'Stephanie Allen' },
  { value: 'james', label: 'James Wilson' },
];

export function ComboboxShowcase() {
  const [single, setSingle] = useState('a3');
  const [multi, setMulti] = useState<string[]>(['a3']);
  const [multiNames, setMultiNames] = useState<string[]>(['melissa', 'stephanie']);
  const [year, setYear] = useState<string>('');
  const [yearGroup, setYearGroup] = useState<string>('');
  const [singleName, setSingleName] = useState<string>('');

  return (
    <div className="combobox-showcase">
      <section className="combobox-showcase__section">
        <h2 className="combobox-showcase__heading">Form Field Combobox</h2>
        <p className="combobox-showcase__intro">
          Input with dropdown list. Single or multi-select, type to filter options. Local options shown below; remote store can be wired via props.
        </p>

        <h3 className="combobox-showcase__subheading">Local options store</h3>
        <div className="combobox-showcase__row">
          <Combobox
            label="Single select with option pre-selected"
            options={LOCAL_OPTIONS}
            value={single}
            onChange={(v) => setSingle(v as string)}
            placeholder="Select option"
          />
        </div>
        <div className="combobox-showcase__row">
          <Combobox
            label="Multiselect"
            options={LOCAL_OPTIONS}
            multiple
            value={multi}
            onChange={(v) => setMulti(v as string[])}
            placeholder="Select options"
          />
        </div>

        <h3 className="combobox-showcase__subheading">None pre-selected</h3>
        <div className="combobox-showcase__row">
          <Combobox
            label="Academic year"
            options={YEAR_OPTIONS}
            value={year}
            onChange={(v) => setYear(v as string)}
            placeholder="Select academic year"
          />
        </div>
        <div className="combobox-showcase__row">
          <Combobox
            label="Year group"
            options={LOCAL_OPTIONS}
            value={yearGroup}
            onChange={(v) => setYearGroup(v as string)}
            placeholder="Select year group"
          />
        </div>

        <h3 className="combobox-showcase__subheading">Local collection (chips)</h3>
        <div className="combobox-showcase__row">
          <Combobox
            label="Single select (chip style value)"
            options={NAME_OPTIONS}
            value={singleName}
            onChange={(v) => setSingleName(v as string)}
            placeholder="Select person"
          />
        </div>
        <div className="combobox-showcase__row">
          <Combobox
            label="Multiselect (chips)"
            options={NAME_OPTIONS}
            multiple
            value={multiNames}
            onChange={(value) => setMultiNames(Array.isArray(value) ? value : [value])}
            placeholder="Select people"
          />
        </div>

        <h3 className="combobox-showcase__subheading">States</h3>
        <div className="combobox-showcase__row">
          <Combobox
            label="Disabled"
            options={LOCAL_OPTIONS}
            placeholder="Placeholder text"
            disabled
          />
        </div>
      </section>
    </div>
  );
}
