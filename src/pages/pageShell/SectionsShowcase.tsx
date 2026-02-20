import {
  Section,
  SectionRow,
  SectionPropertyRow,
} from '../../components/section/Section';
import { Button } from '../../components/button/Button';
import './sectionsShowcase.scss';

export function SectionsShowcase() {
  return (
    <div className="sections-showcase">
      <section className="sections-showcase__section">
        <h2 className="sections-showcase__heading">Sections</h2>
        <p className="sections-showcase__intro">
          Sections are the main containers used throughout Arbor MIS. Shown below: plain (empty and with content), subsections, warning/important highlights, expandable, create action, collapsible rows, and property rows.
        </p>

        {/* 1. Plain and empty */}
        <h3 className="sections-showcase__subheading">Plain (empty)</h3>
        <Section title="Plain" />

        {/* 2. Plain with a child (text) */}
        <h3 className="sections-showcase__subheading">Plain with a child</h3>
        <Section title="Plain with a child">
          <p className="sections-showcase__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Section>

        {/* 3. Section with two subsections */}
        <h3 className="sections-showcase__subheading">Section with subsections</h3>
        <Section title="Section">
          <Section title="Sub Section" isSubsection>
            <p className="sections-showcase__text">
              Subsection content. (Table or other content could go here.)
            </p>
          </Section>
          <Section title="Sub Section 2" isSubsection>
            <p className="sections-showcase__text">Simple text.</p>
          </Section>
        </Section>

        {/* 4. Warning and Important (orange / red highlight) */}
        <h3 className="sections-showcase__subheading">Warning and important</h3>
        <Section title="Warning" variant="warning" />
        <Section title="Important" variant="important" />

        {/* 5. Expanded expandable section (interactive) */}
        <h3 className="sections-showcase__subheading">Expandable section</h3>
        <Section
          title="Expanded"
          expandable
          defaultExpanded
        />

        {/* 6. Create section (button top right) */}
        <h3 className="sections-showcase__subheading">Create action</h3>
        <Section
          title="Create Action"
          headerAction={
            <Button variant="tertiary" color="green" size="small" iconLeft="+">
              Add
            </Button>
          }
        />

        {/* 7. Section with rows (collapsible) */}
        <h3 className="sections-showcase__subheading">Section with rows (collapsible)</h3>
        <Section title="Section with Rows">
          <SectionRow collapsible defaultOpen label="Row 1 (collapsible item)">
            Content for row 1.
          </SectionRow>
          <SectionRow collapsible defaultOpen label="Row 2 (collapsible item)">
            <p className="sections-showcase__text">Item B</p>
            <p className="sections-showcase__text">Row 2.2</p>
          </SectionRow>
          <SectionRow collapsible defaultOpen={false} label="Row 3 (collapsible closed)">
            Content for row 3.
          </SectionRow>
        </Section>

        {/* 8. Section with property rows (label left, interactive right) */}
        <h3 className="sections-showcase__subheading">Section with property rows</h3>
        <Section title="Section with Property Rows">
          <SectionPropertyRow label="Row 1" value="Field Place Action" />
          <SectionPropertyRow label="Row 2" value="To Action" />
          <SectionPropertyRow value="Value with no label" />
          <SectionPropertyRow label="Label with no value" />
        </Section>
      </section>
    </div>
  );
}
