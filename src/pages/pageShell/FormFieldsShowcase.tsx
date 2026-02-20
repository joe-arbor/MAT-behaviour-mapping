import { useState, useEffect } from 'react';
import {
  TextField,
  NumberField,
  CurrencyField,
  DurationField,
  TimeField,
  TextareaField,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  FileUploadField,
  ColorPickerField,
} from '../../components/formField';
import { DatePicker } from '../../components/datePicker/DatePicker';
import { HtmlEditor } from '../../components/htmlEditor/HtmlEditor';
import { Button } from '../../components/button/Button';
import './formFieldsShowcase.scss';

export function FormFieldsShowcase() {
  const [textValue, setTextValue] = useState('Value');
  const [radioValue, setRadioValue] = useState('radio1');
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>([]);
  const [colorValue, setColorValue] = useState('#3cad51');
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [htmlValue, setHtmlValue] = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const checkboxOptions = Array.from({ length: 9 }, (_, i) => ({
    value: `opt${i + 1}`,
    label: `Checkbox ${i + 1}`,
  }));

  const radioOptions = [
    { value: 'radio1', label: 'Radio Button 1 (has tooltip)', tooltip: 'Tooltip for option 1' },
    { value: 'radio2', label: 'Radio Button 2' },
    { value: 'radio3', label: 'Radio Button 3 (disabled because of XYZ. Tooltip doesn\'t work when disabled)', disabled: true },
    { value: 'radio4', label: 'Radio Button 4' },
    { value: 'radio5', label: 'Radio Button 5' },
  ];

  return (
    <div className="form-fields-showcase">
      <h1 className="form-fields-showcase__page-title">Form Fields On Page</h1>

      <section className="form-fields-showcase__section">
        <h2 className="form-fields-showcase__heading">Form Fields</h2>

        <div className="form-fields-showcase__grid">
          <TextField label="Label" value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Value" />
          <TextField label="Text" value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Value" />
          <DurationField label="Duration" placeholder="hh:mm" />
          <NumberField label="Number" placeholder="Placeholder" />
          <NumberField label="Number 5.d.p" decimalPlaces={5} defaultValue="12.12345" />
          <CurrencyField label="Currency" placeholder="Placeholder" />
          <TextField label="Password" type="password" placeholder="Placeholder" />
        </div>

        <h3 className="form-fields-showcase__subheading">Single Checkbox</h3>
        <div className="form-fields-showcase__row">
          <Checkbox label="Checkbox" />
        </div>

        <h3 className="form-fields-showcase__subheading">Checkbox Group</h3>
        <div className="form-fields-showcase__row">
          <CheckboxGroup
            label="Options"
            options={checkboxOptions}
            value={checkboxGroupValue}
            onChange={setCheckboxGroupValue}
            columns={2}
          />
        </div>

        <h3 className="form-fields-showcase__subheading">Radio Button Group</h3>
        <div className="form-fields-showcase__row">
          <RadioGroup
            label="Choose one"
            options={radioOptions}
            value={radioValue}
            onChange={setRadioValue}
          />
        </div>

        <h3 className="form-fields-showcase__subheading">Date / Time</h3>
        <div className="form-fields-showcase__grid form-fields-showcase__grid--3">
          <DatePicker label="Date" value={dateValue} onChange={setDateValue} placeholder="Select date" />
          <TimeField label="Time" defaultValue="12:00" />
          <div className="form-fields-showcase__inline-row">
            <DatePicker label="Datetime" value={dateValue} onChange={setDateValue} placeholder="Date" />
            <TimeField placeholder="12:00" />
          </div>
        </div>

        <h3 className="form-fields-showcase__subheading">File Upload</h3>
        <div className="form-fields-showcase__row">
          <FileUploadField label="File" browseLabel="Browse..." onChange={() => {}} />
        </div>

        <h3 className="form-fields-showcase__subheading">Textarea</h3>
        <div className="form-fields-showcase__row">
          <TextareaField label="Textarea" placeholder="Placeholder" />
        </div>

        <h3 className="form-fields-showcase__subheading">HTML Editor</h3>
        <div className="form-fields-showcase__row">
          {mounted && (
            <HtmlEditor
              label="Rich text"
              value={htmlValue}
              onChange={setHtmlValue}
              placeholder="html editor placeholder"
              toolbar="full"
              showWordCount
              maxLength={250}
            />
          )}
        </div>

        <h3 className="form-fields-showcase__subheading">Colour picker</h3>
        <div className="form-fields-showcase__row">
          <ColorPickerField label="Colour" value={colorValue} onChange={setColorValue} />
        </div>
      </section>

      <div className="form-fields-showcase__actions">
        <Button variant="secondary" color="grey">
          Cancel
        </Button>
        <Button variant="primary" color="green">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
