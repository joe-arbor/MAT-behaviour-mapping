# E2E tests (Playwright)

Tests check the **Buttons** component against the reference CSS and a screenshot baseline.

## Run tests

```bash
# Start the app (if not already running)
npm run dev
# In another terminal:
npm run test:e2e
```

Or let Playwright start the dev server (it will reuse `http://localhost:5173` if already in use):

```bash
npm run test:e2e
```

## What’s covered

- **buttons.spec.ts**
  - **Reference CSS:** First row of primary buttons (grey, orange, green, red) — `display`, `cursor`, `max-width`, `border-radius`, `background-color`, `color` match arbor-btn / tokens.
  - **Not rounded:** `border-radius: 0px`.
  - **Disabled:** `opacity: 0.5`, `cursor: not-allowed`.
  - **Screenshot:** First row is compared to `e2e/buttons.spec.ts-snapshots/buttons-active-primary-row-chromium.png` (created on first run).

## Update screenshot baseline

After intentional UI changes:

```bash
npx playwright test e2e/buttons.spec.ts --update-snapshots
```
