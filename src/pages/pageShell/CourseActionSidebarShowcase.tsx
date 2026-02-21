import React from 'react';
import { CourseActionSidebar } from '../../components/courseActionSidebar';

export function CourseActionSidebarShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Course Action Sidebar</h2>
        <p style={{ margin: 0, color: 'var(--color-grey-600)', fontSize: 14 }}>
          Right column for the class/course page: Ask Arbor button, Attachments (upload), and action buttons (Download Student List, Communications, Browse Student Profiles, Delete Course).
        </p>
      </section>
      <div style={{ maxWidth: 320 }}>
        <CourseActionSidebar
          onAskArbor={() => window.alert('Ask Arbor')}
          showAttachments
          showActions
        />
      </div>
    </div>
  );
}
