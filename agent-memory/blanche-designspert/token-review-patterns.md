# Token Review Patterns

## Breadcrumb Link Colors
- WRONG: `color: var(--color-grey-600)` on `<a>` links
- RIGHT: `color: var(--type-body-hyperlink-color)` — this is the semantic token that maps to `--color-brand-700`
- Hover color should also align: consider `--color-brand-800` or leaving underline as the affordance
- The raw grey is not the design system's intended link color

## Page Background
- Pages should have `background-color: var(--page-color-background)` on the root element
- The token maps to `--color-grey-050` — a light wash that distinguishes page from white cards

## Assessment Row Separators
- The `Separator` component is already used in AssessmentsPage.tsx between items
- The SCSS `__assessment-item` block is empty — no border-bottom needed since Separator handles it
- BUT `__assessment-row` uses `padding: var(--spacing-medium) 0` which is fine for internal padding

## Hardcoded Values
- Always check for hardcoded `content: '/'` in pseudo-elements — this is acceptable for BEM separators (not a token)
- Hardcoded `flex: 1` is acceptable (not a design token concern)
- Hardcoded `white-space: nowrap` is acceptable

## Missing min-height / line-height
- Body text blocks benefit from `line-height: var(--line-height-default)` for readability
- Name fields (`__assessment-name`) in list rows should usually have line-height set

## Assessment List Row Spacing
- `padding: var(--spacing-medium) 0` on rows = 0.75rem top/bottom — confirm against Figma
- Gap between row elements `var(--spacing-medium)` = 0.75rem — consistent
