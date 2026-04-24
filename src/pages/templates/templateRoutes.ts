/**
 * Registry of MIS template pages.
 * Add a new entry here and create the corresponding page component to add a template.
 */
export interface TemplateRoute {
  id: string;
  name: string;
  description?: string;
}

export const TEMPLATE_ROUTES: TemplateRoute[] = [
  {
    id: 'mat-mis',
    name: 'MAT MIS',
    description: 'Multi-Academy Trust MIS template.',
  },
];
