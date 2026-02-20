import { useState } from 'react';
import { ErrorModal } from '../../components/modal';
import { StandardPopup } from '../../components/standardPopup';
import {
  TextField,
  NumberField,
  CurrencyField,
  DurationField,
  Checkbox,
  CheckboxGroup,
} from '../../components/formField';
import { Button } from '../../components/button/Button';
import './modalShowcase.scss';

const sampleErrorId = '89ecb6a4-0e50-11f1-8bfa-0ab83eba8f87';

const checkboxOptions = [
  { value: '1', label: 'Checkbox 1' },
  { value: '2', label: 'Checkbox 2' },
  { value: '3', label: 'Checkbox 3' },
  { value: '4', label: 'Checkbox 4' },
];

function FormFieldsPopupContent() {
  const [textValue, setTextValue] = useState('Value');
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
  return (
    <div className="modal-showcase__form">
      <TextField label="Label Value" value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Value" />
      <TextField label="Text Value" value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Value" />
      <DurationField label="Duration hh:mm" placeholder="hh:mm" />
      <NumberField label="Number Placeholder" placeholder="Placeholder" />
      <NumberField label="Number 5.d.p 12.12345" decimalPlaces={5} defaultValue="12.12345" />
      <CurrencyField label="Currency £ Placeholder" placeholder="Placeholder" />
      <TextField label="Password Placeholder" type="password" placeholder="Placeholder" />
      <Checkbox label="Checkbox" />
      <CheckboxGroup label="Checkbox Group" options={checkboxOptions} value={checkboxValue} onChange={setCheckboxValue} columns={1} />
    </div>
  );
}

export function ModalShowcase() {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [openNoButtons, setOpenNoButtons] = useState(false);
  const [openOneButton, setOpenOneButton] = useState(false);
  const [openTwoButtons, setOpenTwoButtons] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);

  return (
    <div className="modal-showcase">
      <h1 className="modal-showcase__title">Modal</h1>
      <p className="modal-showcase__intro">
        Modal dialogs for errors and other overlays. Error handling modal for failures; standard modal (600×500px or 80% viewport) with header (expand, title, close), scrollable body, and sticky footer with 0, 1, or 2 buttons. Use Escape or overlay click to close.
      </p>

      <section className="modal-showcase__section">
        <h2 className="modal-showcase__heading">Error handling modal</h2>
        <p className="modal-showcase__desc">
          Use when something goes wrong: title, red icon, body copy with support options and error
          ID, Close and Refresh page buttons.
        </p>
        <div className="modal-showcase__row">
          <Button variant="primary" color="red" onClick={() => setErrorModalOpen(true)}>
            Open error modal
          </Button>
        </div>
      </section>

      <section className="modal-showcase__section">
        <h2 className="modal-showcase__heading">Standard modal</h2>
        <p className="modal-showcase__desc">
          600×500px by default. Header (expand, title, close) and footer (0, 1, or 2 buttons) on white. Body is scrollable. Responsive variant uses 80% of viewport.
        </p>
        <div className="modal-showcase__row">
          <Button variant="primary" color="green" onClick={() => setOpenNoButtons(true)}>
            No footer buttons
          </Button>
          <Button variant="primary" color="green" onClick={() => setOpenOneButton(true)}>
            One button
          </Button>
          <Button variant="primary" color="green" onClick={() => setOpenTwoButtons(true)}>
            Two buttons
          </Button>
          <Button variant="secondary" color="green" onClick={() => setOpenResponsive(true)}>
            Responsive (80% viewport)
          </Button>
        </div>
      </section>

      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        onRefresh={() => {
          setErrorModalOpen(false);
          window.alert('Refresh page clicked (in showcase we just close)');
        }}
        errorId={sampleErrorId}
        supportLinkHref="#"
        supportLinkLabel="Press here"
      />

      <StandardPopup open={openNoButtons} onClose={() => setOpenNoButtons(false)} title="Form Fields" footerButtons={[]}>
        <FormFieldsPopupContent />
      </StandardPopup>

      <StandardPopup
        open={openOneButton}
        onClose={() => setOpenOneButton(false)}
        title="Title Case"
        footerButtons={[{ label: 'Button Text', variant: 'primary', onClick: () => setOpenOneButton(false) }]}
      >
        <p>Any content that can be on a page can be within the modal. This one has a single primary button in the footer.</p>
      </StandardPopup>

      <StandardPopup
        open={openTwoButtons}
        onClose={() => setOpenTwoButtons(false)}
        title="Title Case"
        footerButtons={[
          { label: 'Button Text', variant: 'secondary', onClick: () => setOpenTwoButtons(false) },
          { label: 'Button Text', variant: 'primary', onClick: () => setOpenTwoButtons(false) },
        ]}
      >
        <p>Content area is scrollable. Footer stays sticky at the bottom with secondary (left) and primary (right) buttons.</p>
      </StandardPopup>

      <StandardPopup
        open={openResponsive}
        onClose={() => setOpenResponsive(false)}
        title="Form Fields"
        responsive
        footerButtons={[
          { label: 'Cancel', variant: 'secondary', onClick: () => setOpenResponsive(false) },
          { label: 'Save', variant: 'primary', onClick: () => setOpenResponsive(false) },
        ]}
      >
        <FormFieldsPopupContent />
      </StandardPopup>
    </div>
  );
}
