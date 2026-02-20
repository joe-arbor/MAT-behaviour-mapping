# Blanche Designspert - Persistent Memory

## Key File Locations
- Design tokens: `src/tokens.scss` (CSS custom properties, NOT Sass vars - globally available, never import)
- Component public API: `src/index.ts`
- Styles entry: `src/index.scss`
- Pages live under: `src/pages/{pageName}/`

## Token Conventions (confirmed from src/tokens.scss)
- Spacing tokens: `--spacing-xsmall` (0.25rem), `--spacing-small` (0.5rem), `--spacing-medium` (0.75rem), `--spacing-large` (1rem), `--spacing-xlarge` (1.5rem), `--spacing-xxlarge` (2rem), `--spacing-xxxlarge` (4rem)
- Grey scale: `--color-grey-050` through `--color-grey-900` (050, 100, 200, 300, 400, 500, 600, 700, 800, 900)
- Mono: `--color-mono-black` (#202020), `--color-mono-white` (#ffffff)
- Font sizes: `--font-size-1-11` through `--font-size-8-40` (no `--font-size-5-18` listed on line 9-16 but IS defined at line 16)
- Font weights: `--font-weight-regular`, `--font-weight-medium`, `--font-weight-semi-bold`, `--font-weight-bold`
- Border radius: `--border-radius-xsmall` (4px), `--border-radius-small` (8px), `--border-radius-large` (16px), `--border-radius-round` (99px)
- Line heights: `--line-height-tight` (1.25), `--line-height-default` (1.5)

## Semantic / Component Tokens (use over base tokens)
- Hyperlink color: `--type-body-hyperlink-color` (maps to `--color-brand-700`) - use for link text
- Hyperlink weight: `--type-body-hyperlink-weight` (maps to `--font-weight-medium`)
- Body text size: `--type-body-p-size` (maps to `--font-size-2-13`)
- Page background: `--page-color-background` (maps to `--color-grey-050`)
- Page border: `--page-base-color-border` (maps to `--color-grey-050`)
- Page heading text: `--page-heading-color-text` (maps to `--color-mono-black`)
- Page heading gap: `--page-heading-spacing-gap` (maps to `--spacing-small`)
- Default icon color: `--icons-icon-default` (maps to `--color-grey-900`)
- Focus color: `--focus-color-focus` (maps to `--color-brand-500`)

## CSS Naming Conventions
- Prefix: `ds-` (all design system classes)
- BEM: `ds-{block}`, `ds-{block}__{element}`, `ds-{block}--{modifier}`
- SCSS file: camelCase matching directory name (e.g. `assessmentsPage.scss`)
- Use `classnames` library for conditional classes

## Typography Color Patterns (for body text in pages)
- Primary / heading text: `--color-grey-900` or `--color-mono-black`
- Secondary / supporting text: `--color-grey-600` or `--color-grey-500`
- Muted / disabled: `--color-grey-400`
- Links: use breadcrumb component tokens when in breadcrumbs (NOT raw `--type-body-hyperlink-color` or `--color-grey-600`)
- Current breadcrumb text: `--breadcrumbs-breadcrumb-link-active-color-text` (maps to `--color-grey-900`)

## Breadcrumb Component Tokens (verified from tokens.scss lines 1119-1139)
- List gap: `--breadcrumbs-spacing-gap-horizontal` (maps to `--spacing-small`)
- Divider color: `--breadcrumbs-divider-default-color` (maps to `--color-grey-600`)
- Link default color: `--breadcrumbs-breadcrumb-link-default-color-text` (maps to `--color-grey-600`)
- Link hover color: `--breadcrumbs-breadcrumb-link-hover-color-text` (maps to `--color-brand-600`)
- Link active/current color: `--breadcrumbs-breadcrumb-link-active-color-text` (maps to `--color-grey-900`)
- Link hover icon color: `--breadcrumbs-breadcrumb-link-hover-color-icon` (maps to `--color-brand-600`)
- Link default icon color: `--breadcrumbs-breadcrumb-link-default-color-icon` (maps to `--color-grey-600`)
- No breadcrumb-specific font-weight token exists; use `--type-body-hyperlink-weight` for link weight

## Design Token Hierarchy to Enforce
1. Component tokens (e.g. `--breadcrumbs-breadcrumb-link-default-color-text`) - most specific, prefer always
2. Semantic tokens (e.g. `--type-body-hyperlink-color`, `--page-color-background`)
3. Base tokens (e.g. `--color-grey-600`) - only if no semantic equivalent

## Known Issues / Patterns
- Breadcrumb implementations commonly use `--color-grey-600` or `--type-body-hyperlink-color` when dedicated `--breadcrumbs-*` component tokens exist and should be used instead
- Breadcrumb hover state commonly missing color change; `--breadcrumbs-breadcrumb-link-hover-color-text` should be applied on hover alongside text-decoration
- `--type-body-bold-weight` does NOT exist in tokens.scss - phantom token, devs commonly reach for it. Use `--font-weight-semi-bold` (base token) directly for bold/current emphasis.
- Do NOT use breadcrumb component tokens (e.g. `--breadcrumbs-breadcrumb-link-default-color-text`) for non-breadcrumb elements like table row counts. Use `--color-grey-600` for secondary/supporting body text when no semantic token exists.
