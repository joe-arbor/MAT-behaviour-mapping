import React, { useState } from 'react';
import classnames from 'classnames';

// Import EXISTING design system components
// These are the ACTUAL Arbor components - adjust based on your needs!
import { Button } from 'Components/button/Button';
import { Heading } from 'Components/heading/Heading';
import { Section } from 'Components/section/Section';
import { FormField } from 'Components/formField/FormField';
import { Table } from 'Components/table/Table';
// Import more as needed: Card, Pill, Icon, Separator, Modal, etc.

// Import page-specific styles
import './pageName.scss';

/**
 * Props for the PAGE_NAME page
 */
export interface PAGE_NAMEProps {
  /**
   * Optional className for the page container
   */
  className?: string;

  /**
   * Initial data (if needed)
   */
  initialData?: unknown;

  /**
   * Callback functions (if needed)
   */
  onSubmit?: (data: unknown) => void;
  onCancel?: () => void;
}

/**
 * PAGE_NAME Page
 *
 * A bodacious page generated from Figma designs! AROOOOO! 🐺
 * This page COMPOSES existing Arbor design system components
 * to match the Figma layout.
 *
 * Components used:
 * - Heading (for all headings - not raw h1/h2!)
 * - Section (for sections - not raw <section>!)
 * - Button (for actions)
 * - FormField (self-contained field with label + input)
 * - Table (for data display)
 * - Card (for card layouts)
 */
export const PAGE_NAME: React.FC<PAGE_NAMEProps> = ({
  className,
  initialData,
  onSubmit,
  onCancel,
}) => {
  // State management for the page
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Event handlers
  const handleSubmit = () => {
    setIsLoading(true);
    setError(null);

    // Validate and submit
    try {
      onSubmit?.(formData);
    }
    catch {
      setError('Something went wrong!');
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={classnames('page-name', className)}>
      {/* Header Section - Use Heading component, not raw h1! */}
      <header className="page-name__header">
        <Heading level={1}>Page Title</Heading>
        <p className="page-name__subtitle">
          Describe what this page does
        </p>
      </header>

      {/* Main Content */}
      <main className="page-name__content">
        {/* Form Section - Use Section component! */}
        <Section
          title="Form Section"
          headingLevel={2}
        >
          {/* FormField is self-contained - includes label AND input */}
          <FormField
            label="Field 1"
            id="field1"
            inputType="text"
            errorText={error ?? undefined}
            inputProps={{
              value: formData.field1,
              onChange: e => handleFieldChange('field1', e.target.value),
              placeholder: 'Enter field 1',
            }}
          />

          <FormField
            label="Field 2"
            id="field2"
            inputType="text"
            inputProps={{
              value: formData.field2,
              onChange: e => handleFieldChange('field2', e.target.value),
              placeholder: 'Enter field 2',
            }}
          />
        </Section>

        {/* Data Section - Use Section component! */}
        <Section
          title="Data Section"
          headingLevel={2}
        >
          <Table
            data={initialData || []}
            columns={[
              { field: 'id', headerName: 'ID' },
              { field: 'name', headerName: 'Name' },
            ]}
          />
        </Section>
      </main>

      {/* Footer Section with Actions */}
      <footer className="page-name__footer">
        <Button
          variant="secondary"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </footer>
    </div>
  );
};

export default PAGE_NAME;
