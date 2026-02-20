import { useState } from 'react';
import { Slideover } from '../../components/slideover';
import { Section, SectionPropertyRow } from '../../components/section/Section';
import { TextField, NumberField, Checkbox, CheckboxGroup } from '../../components/formField';
import { Button } from '../../components/button/Button';
import './slideoverShowcase.scss';

const exampleCheckboxOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

function SlideoverWithSectionsContent() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="slideover-showcase__sections">
      <Section title="Details">
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        <NumberField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
        <SectionPropertyRow label="Status" value="Draft" />
      </Section>
      <Section title="Options">
        <CheckboxGroup label="Choose options" options={exampleCheckboxOptions} value={selected} onChange={setSelected} columns={1} />
      </Section>
      <Section title="Summary">
        <Checkbox label="I agree to the terms" />
      </Section>
    </div>
  );
}

export function SlideoverShowcase() {
  const [openNoFooter, setOpenNoFooter] = useState(false);
  const [openOneButton, setOpenOneButton] = useState(false);
  const [openTwoButtons, setOpenTwoButtons] = useState(false);
  const [openWithSections, setOpenWithSections] = useState(false);

  return (
    <div className="slideover-showcase">
      <h1 className="slideover-showcase__title">Slideover</h1>
      <p className="slideover-showcase__intro">
        Panel that enters from the right, full height, with an overlay. Header has Back button and title; body is scrollable. Footer is optional—no buttons, one button, or two buttons. Same UI as modal: white background with a single border.
      </p>

      <section className="slideover-showcase__section">
        <h2 className="slideover-showcase__heading">Variants</h2>
        <div className="slideover-showcase__row">
          <Button variant="primary" color="green" onClick={() => setOpenNoFooter(true)}>
            Open slideover (no footer)
          </Button>
          <Button variant="primary" color="green" onClick={() => setOpenOneButton(true)}>
            Open slideover (one button)
          </Button>
          <Button variant="primary" color="green" onClick={() => setOpenTwoButtons(true)}>
            Open slideover (two buttons)
          </Button>
          <Button variant="primary" color="green" onClick={() => setOpenWithSections(true)}>
            Open slideover (sections with components)
          </Button>
        </div>
      </section>

      <Slideover open={openNoFooter} onClose={() => setOpenNoFooter(false)} title="Title Case">
        <p>This slideover has no footer. Content area is scrollable when content overflows.</p>
      </Slideover>

      <Slideover
        open={openOneButton}
        onClose={() => setOpenOneButton(false)}
        title="Title Case"
        footerButtons={[{ label: 'Button Text', variant: 'primary', onClick: () => setOpenOneButton(false) }]}
      >
        <p>Footer with a single primary button.</p>
      </Slideover>

      <Slideover
        open={openTwoButtons}
        onClose={() => setOpenTwoButtons(false)}
        title="Title Case"
        footerButtons={[
          { label: 'Cancel', variant: 'secondary', onClick: () => setOpenTwoButtons(false) },
          { label: 'Save', variant: 'primary', onClick: () => setOpenTwoButtons(false) },
        ]}
      >
        <p>Footer with secondary and primary buttons.</p>
      </Slideover>

      <Slideover
        open={openWithSections}
        onClose={() => setOpenWithSections(false)}
        title="Edit item"
        footerButtons={[
          { label: 'Cancel', variant: 'secondary', onClick: () => setOpenWithSections(false) },
          { label: 'Save', variant: 'primary', onClick: () => setOpenWithSections(false) },
        ]}
      >
        <SlideoverWithSectionsContent />
      </Slideover>
    </div>
  );
}
