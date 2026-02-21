import React from 'react';
import { CourseHeader } from '../../components/courseHeader';

export function CourseHeaderShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Course Header</h2>
        <p style={{ margin: 0, color: 'var(--color-grey-600)', fontSize: 14 }}>
          Course icon, title, and meta lines (e.g. Academic Level, Parent Course, By Teacher). Used on the class/course overview page.
        </p>
      </section>
      <CourseHeader
        title="KS3 Mathematics Year 8: By/Ma1"
        meta={[
          { label: 'Academic Level', value: 'Coretie Elite' },
          { label: 'Parent Course', value: 'KS3 Mathematics / Year 8' },
          { label: 'By Teacher', value: '27 Students' },
        ]}
      />
    </div>
  );
}
