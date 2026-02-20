# Dorothy-style fact-check: Standard popup vs design

## Design spec (from user + images)

- **Size:** 500×600px fixed; responsive = 80% viewport (80vw × 80vh).
- **Header:** Light grey (#F7F7F7 or similar), expand (left), title (centre), close (right). Small square light grey icon buttons.
- **Body:** White, scrollable; any page content.
- **Footer:** Sticky, same light grey as header; 0, 1, or 2 buttons (secondary + primary green), right-aligned.
- **Radius:** ~4–6px.

## Verification

### ✓ VERIFIED

- **Dimensions:** `width: 500px; height: 600px` in `.ds-standard-popup`; `--responsive` uses `80vw` / `80vh` with max 90vw/90vh.
- **Structure:** Header (expand, title, close) → body (flex:1, overflow-y: auto) → footer (flex-shrink: 0). Footer only rendered when `footerButtons.length > 0`.
- **Body:** White background (`--color-mono-white`), scrollable, padding from `--spacing-large`.
- **Border radius:** Uses `--modal-radius` (= `--corner-radius` = 4px); within 4–6px spec.
- **Exports:** `StandardPopup.tsx`, `standardPopup.scss`, `index.ts` exist; showcase registered under Surfaces as "Standard popup".
- **Footer buttons:** One button uses config variant; two buttons render secondary then primary (green).

### ✓ CHANGES MADE (to match design)

- **Header/footer background:** Switched from `--color-grey-100` (#efefef) to `--color-grey-050` (#f8f8f8) to align with design “light gray #F7F7F7”.
- **Header button icon colour:** Set to `--color-grey-700` for icon (from grey-800) for a slightly softer contrast on light grey.

### ⚠ NOTE

- No Figma file URL was provided; verification used the described design and image references. If you have a Figma link, add it via the Figma MCP (`add_figma_file`) and we can align exact sizes, spacing, and colours to the file.

## Bottom line

Implementation matches the described spec. Header and footer use grey-050 for the requested light grey; dimensions, scrollable body, sticky footer, and 0/1/2 button behaviour are correct.
