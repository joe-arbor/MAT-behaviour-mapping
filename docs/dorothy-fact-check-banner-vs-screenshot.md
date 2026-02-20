# [DOROTHY'S FACT-CHECK REPORT]
## Banner implementation vs design screenshot

*Let me explain this to you slowly. I compared the screenshot with what was actually built. Here's the verdict.*

---

## Claimed actions (from implementation)

- Banner component: four variants (system, info, warning, error), optional title, body (children), optional icon, optional actions (one or two buttons); not dismissible.
- BannerShowcase under Progress & Validation with all variants and combinations (empty, title only, title+icon+1 action, title+icon+2 actions; System has Ext.js example with chat icon).
- Button styling: System/Info = secondary grey; Warning = primary orange; Error = primary red.

---

## Verification results

### ✓ VERIFIED — Component API and structure

- **Banner.tsx:** Supports `variant` (system | info | warning | error), optional `title`, `children` (body), optional `icon`, optional `actions`. No close/dismiss button. Structure: icon (if present), content (title + body), actions (if present). Uses `ds-banner`, `ds-banner--{variant}`. Role and aria-label present.
- **banner.scss:** Four variants with correct tokens: `--color-grey-050` (system), `--color-semantic-info-050` (info), `--color-semantic-warning-050` (warning), `--color-semantic-destructive-050` (error). Flex layout with `__icon`, `__content`, `__title`, `__body`, `__actions`. No dismiss-button styles. Uses `--banner-radius`, `--banner-spacing-*` (tokens exist in tokens.scss).

### ✓ VERIFIED — Showcase coverage

- All four variants (System, Info, Warning, Error) have subheadings and multiple examples.
- For each variant: first block (simplest), then title+body, then title+icon+one action, then title+icon+two actions. System also has title+chat icon+two actions (Ext.js).
- Buttons: System and Info use `<Button variant="secondary" color="grey">`; Warning uses `variant="primary" color="orange"`; Error uses `variant="primary" color="red"`. Matches design (secondary grey for system/info, primary orange/red for warning/error).

### ✓ VERIFIED — Design rules

- Banners are not dismissible (no close icon in component or styles).
- Color determined by type (variant) — implemented via modifier classes and tokens.
- Description text in showcase states: accepts text and actions, color by type, not dismissible. (Design also mentions "HTML only" and "u-type primary/secondary" — see minor below.)

### ✗ PROBLEM — "The simplest X banner" content

- **Screenshot:** The design labels the first example of each variant as "The simplest [system/info/warning/error] banner" and shows **body text only** (e.g. "System banner with some body text") — no title, no icon, no actions.
- **Built:** The first block for each variant is `<Banner variant="system" />` (and same for info/warning/error) with **no children**, so the banner renders as an empty strip.
- **Fix:** The first example for each variant should show body-only content (e.g. "System banner with some body text") so the "simplest" case matches the design. Add children with descriptive body text; do not pass a title for that first example.

### ⚠ MINOR — Description copy

- Design Details say: "It accepts HTML only and preferably just text, and actions (buttons). Buttons can change their look just by adding property u-type='primary'/'secondary'."
- Our intro says: "It accepts text and actions (buttons). Color is determined by type. Banners are not dismissible." We omit "HTML" and the u-type note. Acceptable for a React DS (we use variant/color on Button, not u-type); optional to add "Accepts HTML (preferably text)" if you want verbatim match.

### ✓ Not in scope

- Design page has a "Details" dropdown with "Description" selected. Our showcase is a flat heading + intro paragraph; no dropdown. Acceptable — the component showcase doesn’t need to replicate the rulebook UI chrome.

---

## Test and quality

- No Banner-specific test file was in scope for this check. Linting/type-check not re-run as part of this report; recommend running `yarn check-types` and `yarn style-lint` if not already green.

---

## Bottom line

The Banner component and variants are implemented correctly and the showcase covers all variant/button combinations. The one fix needed: make the **first (simplest) example for each variant** show **body text only** (no title, no icon, no actions) instead of an empty banner, so it matches the design’s "The simplest [type] banner" example. Do that and we’re good. Picture it: Sicily, 1922… no, picture it: a grey strip with "System banner with some body text." That’s what belongs there.
