import { useState } from 'react';
import { HtmlEditor } from '../../components/htmlEditor/HtmlEditor';
import './htmlEditorShowcase.scss';

export function HtmlEditorShowcase() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  return (
    <div className="html-editor-showcase">
      <section className="html-editor-showcase__section">
        <h2 className="html-editor-showcase__heading">Html Editor</h2>
        <p className="html-editor-showcase__intro">
          Form Field Html has HTML as a value. It can optionally have a Form Merge Button, Snippet Button, Images, Links and a Word Counter. You can enable/disable formatting, advanced formatting, and foreground/background colors.
        </p>

        <div className="html-editor-showcase__block">
          <h3 className="html-editor-showcase__subheading">Example without image button</h3>
          <HtmlEditor
            id="html-editor-1"
            value={value1}
            onChange={setValue1}
            placeholder="html editor placeholder"
            toolbar="full"
            maxLength={250}
            showWordCount
            showPreviewButton
          />
        </div>

        <div className="html-editor-showcase__block">
          <h3 className="html-editor-showcase__subheading">Example with image button</h3>
          <HtmlEditor
            id="html-editor-2"
            value={value2}
            onChange={setValue2}
            placeholder="html editor placeholder"
            toolbar="withImage"
            maxLength={250}
            showWordCount
            showPreviewButton
          />
        </div>

        <div className="html-editor-showcase__block">
          <h3 className="html-editor-showcase__subheading">Example with page break button</h3>
          <HtmlEditor
            id="html-editor-3"
            value={value3}
            onChange={setValue3}
            placeholder="html editor placeholder"
            toolbar="withPageBreak"
            showWordCount
            showPreviewButton
          />
        </div>

        <div className="html-editor-showcase__block">
          <h3 className="html-editor-showcase__subheading">Example with no formatting or links</h3>
          <HtmlEditor
            id="html-editor-4"
            value={value4}
            onChange={setValue4}
            placeholder="html editor placeholder"
            toolbar="minimal"
            showPreviewButton
          />
        </div>
      </section>
    </div>
  );
}
