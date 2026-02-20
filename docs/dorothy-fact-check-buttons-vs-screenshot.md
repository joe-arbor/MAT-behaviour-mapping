# [DOROTHY'S FACT-CHECK REPORT]
## Buttons implementation vs original Live Rulebook screenshot

*Let me explain this to you slowly. I compared the screenshot description with what was actually built. Here’s the verdict.*

---

## Claimed actions (from implementation)

- Button component: variant (primary/secondary), color (grey/green/orange/red), size, disabled, menu (▾), iconLeft, iconRight, segment, legacy, active.
- ButtonGroup with segmented option (conjoined, outer corners only rounded).
- ButtonsShowcase page with sections: Active, Disabled, Icon, Menu, Grouped, Segmented, Combinations, Secondary V2, Ext.js Legacy.
- All styling via design tokens (no hardcoded hex).

---

## Verification results

### ✓ VERIFIED — Section coverage

| Screenshot section | Built section | Match |
|--------------------|---------------|--------|
| Active buttons (primary grey, orange, green, red + secondary same) | "Active buttons" with same four primary and four secondary | ✓ |
| Disabled buttons (primary + secondary) | "Disabled buttons" with primary grey/green, secondary grey/green | ✓ |
| Icon buttons (primary +, ✓, ⊙, ✗ + secondary disabled) | "Icon buttons" same icons and labels; secondary disabled grey + green | ✓ |
| Menu buttons (primary with ▾, secondary disabled with ▾) | "Menu buttons" same; secondary disabled grey + green | ✓ |
| Grouped buttons | "Grouped buttons" — Grouped Button, Grouped Button (confirmation) | ✓ |
| Segmented (Left active, Center, Right) | "Segmented buttons" with active on Left button | ✓ |
| Combinations (Icon, Icon + Tooltip, Menu with Icon + tooltip; disabled) | "Buttons with combinations of states" | ✓ (see discrepancy below) |
| Secondary V2 (Tooltip, Icon, Colour, Menu, Arbor AI, Disabled) | "Secondary buttons (V2)" — all six | ✓ |
| Ext.js Legacy (sharp corners) | "Ext.js buttons (Legacy)" with `legacy` prop | ✓ |

### ✓ VERIFIED — Implementation details

- **Design tokens:** `button.scss` uses `var(--...)` for colors, spacing, radius, font. No hardcoded hex for button colors.
- **Primary/secondary + grey/green/orange/red:** All 8 combinations present and mapped to tokens (grey-800, brand-600, warning-500, destructive-500 and their 050/100 for secondary).
- **Legacy:** `border-radius: 0` applied when `legacy` is true.
- **Segmented:** `ButtonGroup--segmented` sets first-child left radius only, last-child right radius only, `margin-left: -1px` for middle buttons. Correct.
- **Active state:** `.ds-button--active` with secondary grey uses `--color-grey-100` background and `--color-grey-500` border. Implemented.
- **Component API:** Button has iconLeft, iconRight, menu, segment, legacy, active; ButtonGroup has segmented. Matches screenshot needs.
- **ds- prefix:** Button and ButtonGroup use `ds-button` and `ds-button-group`. Conventions followed.

### ⚠ DISCREPANCY — Combinations disabled row

- **Screenshot:** "Buttons with combinations of states" — **Disabled:** "Faded versions of the above" (i.e. all three: Icon, Icon + Tooltip, Menu with Icon + tooltip).
- **Built:** Disabled row has only two buttons: "Icon" (disabled) and "Menu with Icon + tooltip" (disabled). **Missing:** disabled "Icon + Tooltip".
- **Recommendation:** Add a disabled "Icon + Tooltip" button in the second row of the Combinations section so all three combination types have a disabled example.

### ✓ Minor (acceptable)

- **Icon buttons secondary disabled:** Screenshot says "Examples include faded versions" and shows secondary icon buttons disabled; we show two (grey, green). Showing two is sufficient; adding orange/red would be optional.
- **Icon glyphs:** Secondary V2 uses 📄 and 🌿 as stand-ins for "calendar/doc" and "Arbor AI / plant". Acceptable placeholder until real icons are in the system.
- **2px in SCSS:** `.ds-button__icon--left { margin-right: 2px; }` (and right) — only non-token value in button.scss. Could be `var(--spacing-xsmall)` for consistency; low priority.

---

## Summary

- **Coverage:** All nine screenshot sections are present and match intent. One small gap: the Combinations section is missing the disabled "Icon + Tooltip" button.
- **Implementation:** Tokens used correctly, no hex for button colors, segment/active/legacy and ButtonGroup segmented behave as described. No hallucinations; file and API claims hold up.
- **Fix:** Add one button to the Combinations disabled row:  
  `<Button variant="secondary" color="grey" disabled iconLeft={<IconCheck />}>Icon + Tooltip</Button>`  
  so the built UI fully matches the original screenshot.

*Well, I’ll be. It’s actually solid work — just add that one disabled combo button and we’re square.*
