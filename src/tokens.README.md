# Design tokens

Design tokens live in **`src/tokens.scss`** as CSS custom properties on `:root`. They are loaded once in `src/main.tsx` before global and component styles.

## Using tokens when building components

- **Always use `var(--token-name)`** in your component SCSS (or CSS). Do not hardcode colours, font sizes, or spacing.
- **Font:** `var(--font-family-standard)` (Inter), `var(--font-family-display)` (Grenette)
- **Font sizes:** `var(--font-size-1-11)` … `var(--font-size-8-40)`; or type roles: `var(--type-headings-h1-size)`, `var(--type-body-p-size)`, etc.
- **Font weights:** `var(--font-weight-regular)`, `var(--font-weight-medium)`, `var(--font-weight-semi-bold)`, `var(--font-weight-bold)`
- **Spacing:** `var(--spacing-xsmall)` … `var(--spacing-xxxlarge)`
- **Colours:** `var(--color-grey-900)`, `var(--color-brand-600)`, `var(--color-semantic-success-500)`, etc.
- **Borders:** `var(--border-weight)`, `var(--border-radius-small)`, `var(--border-radius-round)`, etc.
- **Component tokens:** Buttons, cards, tabs, form fields, etc. have their own tokens (e.g. `--button-small-primary-default-color-background`). Use those in the matching component styles.

## Adding or changing tokens

Edit `src/tokens.scss`. Keep new tokens inside the `:root { }` block. Use existing tokens for values where possible (e.g. `--new-thing-color: var(--color-brand-600);`).
