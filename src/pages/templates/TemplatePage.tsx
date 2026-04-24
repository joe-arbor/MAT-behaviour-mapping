import React from 'react';
import { useParams } from 'react-router-dom';
import { TEMPLATE_ROUTES } from './templateRoutes';
import { MatMisTemplate } from './MatMisTemplate';

const TEMPLATE_COMPONENTS: Record<string, React.FC> = {
  'mat-mis': MatMisTemplate,
};

/** Normalise URL segment to template id (trim, lowercase) so /templates/MAT-MIS still resolves. */
function normalisePageId(pageId: string): string {
  return pageId.trim().toLowerCase().replace(/\s+/g, '-');
}

/**
 * Renders the correct template for /templates/:pageId.
 * Add new templates to TEMPLATE_ROUTES and TEMPLATE_COMPONENTS.
 */
export function TemplatePage() {
  const { pageId: rawPageId } = useParams<{ pageId: string }>();
  if (!rawPageId) return null;

  const pageId = normalisePageId(rawPageId);
  const route = TEMPLATE_ROUTES.find((r) => r.id === pageId);
  const TemplateComponent = TEMPLATE_COMPONENTS[pageId];

  if (!route || !TemplateComponent) {
    return (
      <div className="template-page">
        <div className="template-page__inner">
          <p>Template not found: {pageId}. Add it to templateRoutes and TEMPLATE_COMPONENTS.</p>
          <a href="/templates">Back to templates</a>
        </div>
      </div>
    );
  }

  return <TemplateComponent />;
}
