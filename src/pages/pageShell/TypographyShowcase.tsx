import React from 'react';
import './typographyShowcase.scss';

export function TypographyShowcase() {
  return (
    <div className="typography-showcase">
      <section className="typography-showcase__section">
        <h2 className="typography-showcase__heading">Type roles</h2>
        <table className="typography-showcase__table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Sample</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Display</td>
              <td className="typography-showcase__display">Display</td>
              <td className="typography-showcase__token">--type-display-*</td>
            </tr>
            <tr>
              <td>Heading 1</td>
              <td className="typography-showcase__h1">Heading 1</td>
              <td className="typography-showcase__token">--type-headings-h1-*</td>
            </tr>
            <tr>
              <td>Heading 2</td>
              <td className="typography-showcase__h2">Heading 2</td>
              <td className="typography-showcase__token">--type-headings-h2-*</td>
            </tr>
            <tr>
              <td>Heading 3</td>
              <td className="typography-showcase__h3">Heading 3</td>
              <td className="typography-showcase__token">--type-headings-h3-*</td>
            </tr>
            <tr>
              <td>Heading 4</td>
              <td className="typography-showcase__h4">Heading 4</td>
              <td className="typography-showcase__token">--type-headings-h4-*</td>
            </tr>
            <tr>
              <td>Body</td>
              <td className="typography-showcase__body">The quick brown fox jumps over the lazy dog.</td>
              <td className="typography-showcase__token">--type-body-p-*, --type-body-line-height</td>
            </tr>
            <tr>
              <td>Body bold</td>
              <td className="typography-showcase__body-bold">The quick brown fox jumps over the lazy dog.</td>
              <td className="typography-showcase__token">--type-body-bold-weight</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="typography-showcase__section">
        <h2 className="typography-showcase__heading">Font families</h2>
        <table className="typography-showcase__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sample</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard</td>
              <td className="typography-showcase__font-standard">PT Sans, sans-serif</td>
              <td className="typography-showcase__token">--font-family-standard</td>
            </tr>
            <tr>
              <td>Display</td>
              <td className="typography-showcase__font-display">Grenette, serif</td>
              <td className="typography-showcase__token">--font-family-display</td>
            </tr>
            <tr>
              <td>Buttons</td>
              <td className="typography-showcase__font-buttons">PT Sans, sans-serif</td>
              <td className="typography-showcase__token">--font-family-buttons</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="typography-showcase__section">
        <h2 className="typography-showcase__heading">Font size scale</h2>
        <table className="typography-showcase__table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Sample</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="typography-showcase__token">--font-size-1-11</td>
              <td>0.688rem</td>
              <td style={{ fontSize: 'var(--font-size-1-11)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
            <tr>
              <td className="typography-showcase__token">--font-size-2-13</td>
              <td>0.812rem</td>
              <td style={{ fontSize: 'var(--font-size-2-13)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
            <tr>
              <td className="typography-showcase__token">--font-size-3-14</td>
              <td>0.875rem</td>
              <td style={{ fontSize: 'var(--font-size-3-14)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
            <tr>
              <td className="typography-showcase__token">--font-size-4-16</td>
              <td>1rem</td>
              <td style={{ fontSize: 'var(--font-size-4-16)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
            <tr>
              <td className="typography-showcase__token">--font-size-5-18</td>
              <td>1.125rem</td>
              <td style={{ fontSize: 'var(--font-size-5-18)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
            <tr>
              <td className="typography-showcase__token">--font-size-6-22</td>
              <td>1.375rem</td>
              <td style={{ fontSize: 'var(--font-size-6-22)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
            <tr>
              <td className="typography-showcase__token">--font-size-7-27</td>
              <td>1.688rem</td>
              <td style={{ fontSize: 'var(--font-size-7-27)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
            <tr>
              <td className="typography-showcase__token">--font-size-8-40</td>
              <td>2.5rem</td>
              <td style={{ fontSize: 'var(--font-size-8-40)', fontFamily: 'var(--font-family-standard)' }}>Sample</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="typography-showcase__section">
        <h2 className="typography-showcase__heading">Font weights</h2>
        <table className="typography-showcase__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Sample</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regular</td>
              <td>400</td>
              <td style={{ fontWeight: 'var(--font-weight-regular)' }}>Sample text</td>
              <td className="typography-showcase__token">--font-weight-regular</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>500</td>
              <td style={{ fontWeight: 'var(--font-weight-medium)' }}>Sample text</td>
              <td className="typography-showcase__token">--font-weight-medium</td>
            </tr>
            <tr>
              <td>Semi-bold</td>
              <td>600</td>
              <td style={{ fontWeight: 'var(--font-weight-semi-bold)' }}>Sample text</td>
              <td className="typography-showcase__token">--font-weight-semi-bold</td>
            </tr>
            <tr>
              <td>Bold</td>
              <td>700</td>
              <td style={{ fontWeight: 'var(--font-weight-bold)' }}>Sample text</td>
              <td className="typography-showcase__token">--font-weight-bold</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="typography-showcase__section">
        <h2 className="typography-showcase__heading">Line height</h2>
        <table className="typography-showcase__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Sample</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tight</td>
              <td>1.25</td>
              <td style={{ lineHeight: 'var(--line-height-tight)', maxWidth: '20rem' }}>
                Multiple lines of sample text to show the line height clearly.
              </td>
              <td className="typography-showcase__token">--line-height-tight</td>
            </tr>
            <tr>
              <td>Default</td>
              <td>1.5</td>
              <td style={{ lineHeight: 'var(--line-height-default)', maxWidth: '20rem' }}>
                Multiple lines of sample text to show the line height clearly.
              </td>
              <td className="typography-showcase__token">--line-height-default</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
