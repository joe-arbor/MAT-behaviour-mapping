# Figma Design Feasibility Assessment
## Design: Node 7154:58899 — The Marksheet Column Builder Thing
**Written by:** Sophia Petrillo, Componentspert, age none-of-your-business
**Date:** 2026-02-18

---

## What Is This Thing, Anyway?

Picture it: Sicily, 1961. My Aunt Galina needed a new kitchen. She had tiles, she had grout, she had a good oven. What she didn't have was someone to tell her honestly what she was missing and what would take three weeks to build from scratch. She ended up with half a kitchen for six months because nobody did the assessment properly.

That is not happening here. I read the whole Figma. Every last pixel. And here is what I found.

The design (Figma node 7154:58899, titled "3.1" - very descriptive, thank you designers) is a **marksheet column configuration builder** - a tool that lets users configure columns in a marksheet: what data they collect, who can see them, whether they're editable, and how they're formatted. The full page layout includes:

1. A **top navigation bar** - school logo, nav items with chevrons, global search, an avatar, and the Arbor logo. You know, the usual shell stuff.
2. A **sidebar / side navigation** - icon-only nav with a little red notification badge. Very cute.
3. **Breadcrumbs** with a copy icon, because someone always wants to copy the URL.
4. A **page H1 heading** with a primary green action button.
5. A **tab bar** - seven tabs. One active. Very normal.
6. A **main content area** with a column builder table - rows, columns, headers, draggable rows. More on that later. Much more.
7. A **contextual right-hand panel** at roughly 382px wide - a sidebar within the page that contains a search bar, a dropdown button, and a stack of collapsible filter sections with pill-checkbox option lists and "load more" buttons.

Alright. Let's get into it.

---

## Section 1: What We Already Have — Use These As-Is, Don't Reinvent Them

### Button (`src/components/button/Button.tsx`)

Oh, Button. My Button. The workhorse of this library.

The design uses three variants and I am pleased to report we support all of them:

- **Primary** (`variant="primary"`, green background) - the big page-heading call-to-action
- **Secondary** (`variant="secondary"`, white with border) - the "menu button" in the contextual panel
- **Tertiary** (`variant="tertiary"`, grey background) - the little "load more" buttons at the bottom of each widget section

Button also supports `iconLeftName` and `iconRightName` for icon placement, and `size="S"` vs `size="M"` for the two button sizes you see in this design. The pill-area "load more" buttons are small (S), the page heading button is medium (M).

One reminder since I know someone is going to do this: the prop is **`variant`**, not `type`. `type` is what you pass to a `<button>` HTML element. We are not animals. Use `variant`.

### Tabs + Tabs.Item (`src/components/tabs/Tabs.tsx`, `src/components/tabs/TabsItem.tsx`)

Seven tabs. One active with a green underline. Six inactive in grey text. This is a textbook `Tabs` + `Tabs.Item` situation.

`Tabs` renders a `<ul role="tablist">`. `Tabs.Item` renders the individual tabs with `active` prop (controlled - YOU manage which one is active, not the component, which is how it should be). The active tab gets the green underline via `ds-tabs-item__tab--active`. Clean. Correct. No drama.

```tsx
<Tabs>
  <Tabs.Item active={activeTab === 'settings'} tabElementProps={{ onClick: () => setActiveTab('settings') }}>
    Settings
  </Tabs.Item>
  <Tabs.Item active={activeTab === 'other'} tabElementProps={{ onClick: () => setActiveTab('other') }}>
    Other
  </Tabs.Item>
</Tabs>
```

### Section (`src/components/section/Section.tsx`)

The contextual panel on the right side is full of these little collapsible widget blocks - an H3 heading with a chevron, a sub-heading, a pile of pill-checkboxes, a "load more" button. That is `Section` with `collapsible={true}`. It already handles the expand/collapse chevron internally, it already takes a `buttonText` for the heading area, it already takes `headingLevel`.

```tsx
<Section
  title="Demographics"
  headingLevel={3}
  collapsible
/>
```

Put your pill-checkboxes in the children. Put your "load more" button in the children too - the `buttonText` prop on Section puts a button in the *heading* area, so for a button centered below the pill list, just drop a `<Button variant="tertiary">` in the children. No modifications needed.

One thing worth knowing: `Section`'s `collapsed` prop is an **initial value**, not a controlled prop. The component goes uncontrolled after mount. If you need to programmatically collapse all sections from a parent button, that's currently not supported. File a ticket if it comes up.

### Heading (`src/components/heading/Heading.tsx`)

The page H1, the H3 widget headings, the H4 sub-headings. All map to `Heading` with `level` prop set to 1, 3, or 4 respectively. Use `Heading.InnerContainer` for left/right layout within a heading. You're welcome.

### Pill (`src/components/pill/Pill.tsx`)

Picture it: a filter panel in Sicily. Actually no, there were no filter panels in Sicily. But IF there had been, they would have looked exactly like these pill-checkboxes. Little rounded things you can click, with a checkbox inside, that toggle between selected (green border, green text) and unselected (white background, grey border).

This is `Pill` with `checkbox={true}`. The component handles its own checked/unchecked state internally, fires an `onclick` callback when state changes, and accepts `initialValue` to start checked. Green selected state maps to `ds-pill__checked`, white unselected maps to `ds-pill__unchecked`. It is an exact match.

```tsx
<Pill text="SEN Monitoring" checkbox onclick={(checked) => handleFilterChange('sen', checked)} />
<Pill text="PP" checkbox onclick={(checked) => handleFilterChange('pp', checked)} />
```

One mild annoyance: the callback prop is `onclick` with a lowercase 'c', which is not how React normally does things. It's not wrong, it just looks wrong. Don't lose sleep over it, but maybe file a consistency cleanup ticket when you have five minutes.

### SelectDropdown (`src/components/formField/inputs/selectDropdown/SelectDropdown.tsx`)

The "Data Collection" and "Visibility" columns in the column builder are select dropdowns. `SelectDropdown` takes `options` (array of `{value, label}` objects), `onSelectionChange`, `placeholder`, and optionally `multiple`. Exactly what you need.

```tsx
<SelectDropdown
  placeholder="Select"
  options={[{ value: 'teacher', label: 'Teacher' }, { value: 'admin', label: 'Admin' }]}
  onSelectionChange={(values) => handleVisibilityChange(rowId, values)}
/>
```

### CheckboxInput (`src/components/formField/inputs/checkbox/CheckboxInput.tsx`)

Used in two places in this design:

1. **Inside Pill** - you don't touch this directly, Pill handles it
2. **The "Editable" column** in the builder table - just a standalone checkbox per row
3. **The bulk-select header checkbox** - the one next to "Marksheet Columns" with a little chevron-down for "select all" options

For the bulk-select header, use `CheckboxInput` with `indeterminate` prop - this handles the partial-selection state (some but not all rows selected). Combine it with a `Dropdown` for the "select all / select none" chevron options.

### Dropdown (`src/components/dropdown/Dropdown.tsx`)

The contextual panel's "menu button" (secondary button with text and an expand icon) triggers a dropdown. `Dropdown` is a Radix UI wrapper. You need `Dropdown.Trigger` wrapping a `Button`, `Dropdown.Content`, and as many `Dropdown.Item` children as you have menu options.

### Icon (`src/components/icon/Icon.tsx`)

The design is full of icons. Let me check them off:

- `chevron-down`, `chevron-up` - yes, we have these (ChevronDown, ChevronUp from Lucide)
- `search` - yes
- `grip-vertical` - yes (GripVertical) - this is your drag handle icon
- `list`, `layout-list` - yes (List, LayoutList)
- `info` - yes
- `copy` - yes - for the breadcrumb copy button
- `x` - yes - for the search clear button

The bespoke navigation icons (side menu hamburger, the star/favourite, calendar, notification bell, emergency alert triangle, help circle) that live in the side nav are Figma design assets specific to the Arbor app shell. They are NOT our icon library's problem. The consuming application handles those.

### Table + AG Grid (`src/components/table/Table.tsx`)

I owe you an apology and a correction in the same breath, so here it is.

The column builder table in the main content area — rows, columns, headers, a drag handle, checkboxes in cells, select dropdowns in cells — that is a table. It looks like a table. It walks like a table. It has a header row and data rows. It IS a table. Use our `Table` component, which wraps AG Grid Enterprise.

My earlier draft said to build a custom list with `dnd-kit`. That was wrong. I was embarrassed. I got over it. Here is the correct answer:

**Use `Table` with:**

1. **AG Grid row dragging** - no third-party DnD library needed. AG Grid handles this natively. Set `rowDragManaged={true}` on the `Table`, and add `rowDrag: true` to the "Marksheet Columns" column definition. The `GripVertical` icon in the design is just the drag handle affordance — AG Grid renders this automatically when row drag is configured. Done. No `dnd-kit`. No drama.

2. **A custom theme** - the builder table has a different visual style from a standard data table (white card background, tighter custom row layout, no standard AG Grid chrome). Pass a custom theme via the `tableTheme` prop, or build a new Sass theme alongside the existing `defaultTheme` and `tidyTheme` in `src/components/table/theme/`.

3. **Custom cell renderers** for every non-standard column:
   - **Marksheet Columns cell**: a `cellRenderer` that renders a text label. AG Grid handles the row drag handle icon automatically when `rowDrag: true` is on this column.
   - **Data Collection + Visibility cells**: a `cellRenderer` wrapping `SelectDropdown` — the pattern is already established with `Table.SelectDropdownCellRenderer` in `src/components/table/cellRenderers/SelectDropdownCellRenderer.tsx`. Use or extend that.
   - **Editable cell**: a `cellRenderer` wrapping `CheckboxInput`. Build a small `CheckboxCellRenderer` component in `src/components/table/cellRenderers/` — this is a tiny file, ten lines.
   - **Formatting cell**: a `cellRenderer` placeholder for the future formatting picker. Render a disabled button or empty cell for now.
   - **Delete cell**: a `cellRenderer` wrapping a `Button` — `Table.ButtonCellRenderer` already exists for exactly this pattern.

4. **The header row bulk-select checkbox**: use AG Grid's built-in `headerCheckboxSelection` on the Marksheet Columns column definition, plus `checkboxSelection: true` on the same column. AG Grid gives you indeterminate state for free. You do NOT need to wire up `CheckboxInput` + `Dropdown` manually for this — AG Grid's header checkbox handles it. If you want the chevron-dropdown "select all / select none" options next to it, that is a custom `headerComponent` on the column definition.

The column structure maps to AG Grid `columnDefs` like so:

```tsx
const columnDefs = [
  {
    field: 'name',
    headerName: 'Marksheet Columns',
    width: 238,
    rowDrag: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    cellRenderer: MarksheetColumnCellRenderer,
  },
  {
    field: 'dataCollection',
    headerName: 'Data Collection',
    flex: 1,
    cellRenderer: Table.SelectDropdownCellRenderer, // or extend it
  },
  {
    field: 'visibility',
    headerName: 'Visibility',
    flex: 1,
    cellRenderer: Table.SelectDropdownCellRenderer,
  },
  {
    field: 'editable',
    headerName: 'Editable',
    width: 60,
    cellRenderer: CheckboxCellRenderer, // new, tiny, build it
  },
  {
    field: 'formatting',
    headerName: 'Formatting',
    width: 111,
    cellRenderer: FormattingCellRenderer, // placeholder for now
  },
  {
    field: 'actions',
    headerName: '',
    cellRenderer: Table.ButtonCellRenderer,
  },
];

<Table
  rowData={columnData}
  columnDefs={columnDefs}
  rowDragManaged
  hasSearch={false}
  tableTheme="builder" // custom theme you'll need to create
/>
```

This is application-level work, but it is structured application-level work using tools we already have. The effort is **Medium**, not High, and it is not reinventing anything.

---

## Section 2: Almost There — Minor Issues or Gotchas

### SearchBar (`src/components/searchBar/SearchBar.tsx`)

Here is the situation, and it is mildly annoying: `SearchBar` EXISTS. It is a real file. It does exactly what this design needs - there is one in the top navigation and one in the contextual panel. But somebody forgot to put it in `src/index.ts`.

It is not exported. Consumers cannot use it.

**The fix:** Add one line to `src/index.ts`. That is it. Someone do this, it is five minutes of work.

```ts
export { SearchBar } from 'Components/searchBar/SearchBar';
```

**One behavioral note:** The Figma shows the contextual panel search bar always visible - not the "click the icon to expand" pattern. `SearchBar` in its current form starts collapsed unless you pass `searchValue`. In the "inactive with placeholder" state, you pass `placeholderText` to get a button that looks like a search field. This is close enough but may need minor styling work to match the design exactly.

### Section — It Has Only One Header Button Slot

`Section` supports one button in the heading area via `buttonText`. The design uses this appropriately for the most part. But some widget sections have a sub-heading row (like "Demographics" in bold at 13px) that sits below the main collapsible heading and above the pill list.

That sub-heading is just content inside `children`. Compose it yourself:

```tsx
<Section title="Filters" headingLevel={3} collapsible>
  <p className="my-widget-sub-heading">Demographics</p>
  <div className="my-pill-list">
    <Pill text="SEN Monitoring" checkbox />
    {/* ... */}
  </div>
  <Button variant="tertiary" size="S">Load More</Button>
</Section>
```

No library changes needed. Just compose it.

### Section — Controlled Collapse Not Supported

The `collapsed` prop on `Section` sets the initial state. After that, the component is uncontrolled. If the consuming page needs a "collapse all" or "expand all" control, the current API does not support it. This may or may not matter for this design - assess with the product team. If it matters, it needs a library ticket and a new `isCollapsed` controlled prop.

---

## Section 3: Build It From Scratch — These Don't Exist Yet

### App Shell Navigation (Top Nav + Side Nav)

I'll keep this short because it doesn't need much: the top navigation bar and the icon-only side navigation are the Arbor application shell. They live in the consuming application. They are not the component library's job. Move on.

### Breadcrumbs

Picture it: Sicily, 1954. My mother would leave a trail of breadcrumbs across the kitchen floor so she could remember where she'd been. We called this "making a mess." In the digital world, they call it UX. Same thing.

There is no `Breadcrumbs` component in this library. The design shows the classic pattern: one or more ancestor links (grey text), a " /" separator, the current page label (bold, dark), and a copy-to-clipboard icon button.

**To build:** It is not complicated. Compose from:
- Anchor tags or `Button` with `variant="text-link"` for the ancestor links
- A plain `<span>` with " /" for the separator
- Bold text for the current page
- `Button` with an icon for the copy action

If breadcrumbs are needed in multiple places across the product, scaffold a proper `Breadcrumbs` component with `yarn create-component Breadcrumbs`. If it is only needed here, inline it. Effort: **Low to Medium**.

### Formatting Column Picker

The "Formatting" column in the builder table shows a placeholder (`visible=non-existant` is literally what the Figma node says, bless). This appears to be a future feature for configuring number formatting, percentages, etc. It is highly domain-specific to marksheets. Build it in the application when the requirements are clear. Not a library concern.

### Contextual Panel Container

The right-hand contextual panel is a fixed-width (~382px) sidebar that sits to the right of the main content. It has:
- A sticky/scrollable container with padding
- A search bar + dropdown button at the top
- A stack of collapsible `Section` widgets below

There is no "ContextualPanel" or "SidebarPanel" component in the library. The **contents** are all existing components. The **container** is layout CSS that the consuming page provides.

This is low complexity. It is a `div` with `position: fixed` or similar, a defined width, overflow-y scroll, and the right background color. The `Section`, `Pill`, `Button`, and `SearchBar` components do all the work inside it. Effort: **Low**.

### Notification Badge

The notifications icon in the side nav shows a little red badge with the number 6. There is no `Badge` component in this library. This is an application shell concern, not a library concern. If a `Badge` is eventually needed broadly, scaffold one. For now, it is the consuming app's problem.

---

## Section 4: Tricky Bits — Pay Attention Here

### 1. Drag-and-Drop Row Ordering

The column builder rows have a `GripVertical` icon (grab handle). Users can drag rows to reorder columns.

Good news: this is handled entirely by AG Grid. Set `rowDragManaged={true}` on the `Table` and `rowDrag: true` on the Marksheet Columns `ColDef`. AG Grid renders the drag handle, manages the drag interaction, and fires `onRowDragEnd` with the new row order when the user drops. No third-party DnD library. No `dnd-kit`. We already own AG Grid Enterprise — use what we paid for.

The one thing to watch: `rowDragManaged` works well when the row data lives in AG Grid's internal state. If your row data is managed externally (e.g., in a server-synced state store), use `onRowDragEnd` to read `api.getDisplayedRowAtIndex()` for the new order and update your external state accordingly.

### 2. Pill Filter State Management

Each contextual widget section shows some pill-checkboxes. The `Pill` component is uncontrolled - it manages its own checked state. This is fine when pills act independently. But if you need to:
- Reset all filters
- Reflect server-side state
- Drive selections from URL params

...then you have a problem. `Pill`'s `initialValue` only sets the initial state, not controlled state. You may need to use `key` prop tricks to force re-initialization, or manage state externally and use a custom pill-like element built from `CheckboxInput`. Assess your requirements before you commit.

### 3. Bulk-Select Header Checkbox

The "Marksheet Columns" header has a checkbox with indeterminate state (some rows selected, not all) and a chevron-down for "select all / select none" options.

The checkbox itself: use AG Grid's `headerCheckboxSelection: true` on the column definition. AG Grid gives you checked, unchecked, and indeterminate states for free, wired to the row selection model. Do NOT manually build this with `CheckboxInput` — AG Grid already does it.

The chevron dropdown next to it: this is a custom `headerComponent` on the column definition. You can render a `Dropdown` with `Dropdown.Trigger` / `Dropdown.Content` inside the custom header. It is a small amount of custom code but it is clean and isolated.

### 4. Programmatic Expand/Collapse of Sections

If the design ever needs a "collapse all" or "expand all" control for the contextual panel widgets, `Section` currently does not support this. The `collapsed` prop is initial-value-only. If this comes up in user testing or requirements refinement, file a ticket for a controlled `isCollapsed` prop on `Section`.

### 5. Always-Visible Search in Contextual Panel

`SearchBar` starts in a collapsed/inactive state and expands when clicked. The Figma shows the contextual panel search always expanded. Using `SearchBar` here works if you accept the expand-on-first-click behavior, or you can use a `TextInput` with a `search` icon wrapper if you need it always open. Clarify with design which behavior is intended.

---

## Section 5: The Verdict

Picture it: Sicily, 1967. An architect came to our village and told us we needed to tear down half the buildings to build the community center we wanted. My mother looked at him and said, "Sir, we have everything we need already. We just need someone to put it together properly and also build that one new room in the back." He was very embarrassed.

That is this design.

### Is It Buildable With Our Existing Components?

**Yes. Absolutely yes. High confidence.**

The individual UI elements are almost entirely covered by what we already have:

| Design Element | Library Component | Status |
|---|---|---|
| Primary / Secondary / Tertiary buttons | `Button` (variant prop) | Ready |
| Tab bar with active green underline | `Tabs` + `Tabs.Item` | Ready |
| Collapsible widget sections | `Section` (collapsible mode) | Ready |
| Page / widget / sub headings | `Heading` (levels 1, 3, 4) | Ready |
| Pill-checkbox filter options | `Pill` (checkbox={true}) | Ready |
| Column builder table structure | `Table` (AG Grid) | Ready — needs custom theme + cell renderers |
| Row drag-and-drop reordering | `Table` with `rowDragManaged` | Ready — AG Grid built-in, no extra library |
| Data Collection + Visibility cells | `Table.SelectDropdownCellRenderer` (extend) | Ready |
| Editable column cell | New `CheckboxCellRenderer` (tiny) | Needs building |
| Delete column cell | `Table.ButtonCellRenderer` | Ready |
| Bulk-select header checkbox | AG Grid `headerCheckboxSelection` | Ready — AG Grid built-in |
| Search (contextual panel + top nav) | `SearchBar` | Exists, just not exported |
| Dropdown menus | `Dropdown` | Ready |
| All design system icons | `Icon` | Ready |
| App shell navigation | Not library scope | N/A |

### What Actually Needs Work

| Item | Where It Lives | Effort |
|---|---|---|
| Export `SearchBar` from `src/index.ts` | Library | Trivial (one line) |
| Breadcrumbs component | Library (new) or app inline | Low-Medium |
| Contextual panel layout container | Consuming application | Low |
| Column builder table (custom theme + cell renderers) | Application + light library work | Medium |
| `CheckboxCellRenderer` for Editable column | Library (`src/components/table/cellRenderers/`) | Low (tiny component) |
| Formatting column picker | Consuming application | High (domain-specific, future feature) |
| Notification badge on nav icon | Consuming app (shell) | Low |

### Summary Verdict

The library is in excellent shape for this design. The component-level gaps are minimal: one missing export (`SearchBar`), one potentially new `Breadcrumbs` component, and one tiny new cell renderer (`CheckboxCellRenderer`). Everything else is already here.

The column builder table — which I originally and wrongly wrote off as a custom DnD list requiring a separate library — is properly an AG Grid table using our existing `Table` component. Row dragging is built into AG Grid. Cell renderers for the select dropdowns are already partially established. The remaining work is a custom theme and a handful of cell renderer components, which is **Medium effort**, not High.

The contextual panel is all existing components in a layout container. The state management for filter selections and section collapse is application logic, not library gaps.

This is a feature build with a well-stocked toolbox. Unlike Rocco with the gate — we have the materials AND we know what bus to take.

Go build it. But not without reading Section 4 first.

---

## Appendix: Files Referenced in This Assessment

Every file I looked at before forming these opinions:

- `/Users/angusfraser/Projects/design-system.components/src/components/button/Button.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/tabs/Tabs.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/tabs/TabsItem.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/section/Section.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/heading/Heading.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/pill/Pill.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/formField/inputs/selectDropdown/SelectDropdown.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/formField/inputs/checkbox/CheckboxInput.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/searchBar/SearchBar.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/dropdown/Dropdown.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/components/icon/allowedIcons.tsx`
- `/Users/angusfraser/Projects/design-system.components/src/index.ts`
