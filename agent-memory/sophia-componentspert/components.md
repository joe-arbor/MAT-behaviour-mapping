# Component API Reference Notes

## Button
- File: `src/components/button/Button.tsx`
- Uses `forwardRef`, exposes `HTMLButtonElement` ref
- Prop is `variant` (NOT `type`!) - ButtonVariant: 'primary' | 'secondary' | 'tertiary' | 'primary-destructive' | 'secondary-destructive' | 'text-link' | 'dropdown'
- `size`: 'M' | 'S' (default 'M')
- `iconLeftName`, `iconRightName`: IconName
- `iconLeftScreenReaderText`, `iconRightScreenReaderText`: string
- `borderless`: boolean
- `hasHorizontalPadding`: boolean (default true)
- `error`: boolean
- Icon-only mode auto-detected when no children + icon provided (adds `ds-button--icon-only`)

## Pill
- File: `src/components/pill/Pill.tsx`
- UNCONTROLLED - uses internal useState, no controlled value prop
- Props: `text`, `initialValue` (bool, default false), `checkbox` (bool), `onclick(checked: boolean)`
- NOT suitable for mutually-exclusive filter groups without external coordination hacks
- For mutually-exclusive filters: use Tabs/Tabs.Item instead

## Tabs / Tabs.Item
- Files: `src/components/tabs/Tabs.tsx`, `src/components/tabs/TabsItem.tsx`
- `Tabs` renders a `<ul role="tablist">` - accepts HTMLAttributes<HTMLUListElement>
- `Tabs.Item` is the compound component access pattern
- TabsItem props: `active` (bool, CONTROLLED), `iconName` (IconName), `tabElement` ('button'|'link'), `tabElementProps`
- TabsItem renders `<li role="presentation">` containing `<button role="tab" aria-selected={active}>`
- FULLY CONTROLLED active state - perfect for mutually-exclusive filters

## SearchBar
- File: `src/components/searchBar/SearchBar.tsx`
- VERIFY export status before recommending - may not be in src/index.ts
- Has TWO states: collapsed (shows search icon button) and expanded (shows input with icon + clear)
- Props: `searchValue`, `setSearchValue`, `placeholderText`
- Has built-in search icon left of input when expanded
- NOT a FormField wrapper - standalone component
- If not exported: use TextInput + wrapper div with Icon for inline icon pattern

## TextInput
- File: `src/components/formField/inputs/text/TextInput.tsx`
- Props: `size` ('M'|'S'), `hasError` (bool), spreads InputHTMLAttributes
- No icon support built in
- For icon-in-input: wrap in a div, position icon absolutely, add padding-left to input

## Section
- File: `src/components/section/Section.tsx`
- Props: `title`, `headingLevel` (1-4), `collapsible`, `collapsed` (initial value), `buttonText`, `buttonOnClick`, `buttonVariant`, `buttonSize`, `titleIconName`, `titleIconColor`, `titleIconScreenReaderText`
- `collapsible=true` adds chevron-up/down toggle button with aria-expanded
- `collapsed` is INITIAL value only (uncontrolled after mount) - internal useState
- Has ONE optional button in the header area (buttonText + buttonOnClick)
- NOT suitable for list rows - designed for page sections with headings
- **Nested Sections work well** — do not raise concerns about designs that nest Section inside Section. There is a "nested sections" story confirming this is a supported and tested pattern.

## Heading
- File: `src/components/heading/Heading.tsx`
- Props: `level` (1-4, default 1), spreads HTMLProps<HTMLHeadingElement>
- Compound: `Heading.InnerContainer` renders a `<span class="ds-heading__inner-container">`
- Renders h1-h4 with `ds-heading` class
- Use TWO `Heading.InnerContainer` children to get left/right floating layout within a heading (one for left content, one for right content). Do NOT suggest a new div with flex styling for this — `Heading.InnerContainer` is the correct pattern:
```tsx
<Heading level={2}>
  <Heading.InnerContainer>Left title text</Heading.InnerContainer>
  <Heading.InnerContainer><Button>Right action</Button></Heading.InnerContainer>
</Heading>
```

## Tag
- File: `src/components/tag/Tag.tsx`
- Colors: orange, blue, green, purple, teal, salmon, yellow

## Card
- File: `src/components/card/Card.tsx`
- Props: `title` (string), `paragraph` (string), `icon` (IconName, left icon), `iconColor`, `iconScreenReaderText`, `disabled`, `tagText`, `tagColor`, `onClick`, `onKeyDown`
- NO children prop - all content via title/paragraph/icon/tagText props
- When `onClick` is provided AND `disabled` is false: auto-adds `ds-card__container--clickable` class, tabIndex=0, and renders BOTH a chevron-right AND arrow-right icon on the right edge (arrow-right shown on hover via CSS, chevron-right shown default)
- Renders as `<article>` - NOT an `<a>` or `<button>` - for navigation use router's navigate() in onClick callback
- title renders as `<h4 class="ds-card__title">` internally - do NOT wrap in Heading component
- paragraph renders as `<p class="ds-card__paragraph">` internally
- `aria-label="Card"` is hardcoded - consider this limitation for screen readers
- Card SCSS already uses `--card-*` tokens (card-default-color-background, card-default-color-border, card-radius, card-spacing-vertical/horizontal, card-spacing-gap-vertical/horizontal)

## Table
- File: `src/components/table/Table.tsx`
- AG Grid Enterprise wrapper. `setAgGridLicenseKey()` is called internally at module level - NO need to call it in page components.
- Key props (on top of all AgGridReactProps): `rowData`, `columnDefs`, `defaultColDef`, `headerContent` (ReactNode), `footerContent` (ReactNode), `hasSearch` (bool, default true - shows SearchBar in header), `wrapperClassName`, `domLayout`, `data-testid`, `footerTestId`, `headerTestId`
- `headerContent` + `footerContent` are arbitrary ReactNode slots rendered in `<TableHeader>` / `<TableFooter>` wrappers
- Built-in search: pass `hasSearch={false}` on `headerContent` to suppress the SearchBar that appears below children in the header
- DSDefaultColDef: already merged in by Table - DO NOT spread it manually; pass custom additions via `defaultColDef` prop (they are merged `{ ...DSDefaultColDef, ...defaultColDef }`)
- `tableTheme`: pass `'tidy'` for tidyTheme, else default theme with spacing/borders applied
- TABLE_SPACING enum: XS | S | M | L - controls row density
- **Tidy theme is still a full AG Grid table** — it still has columns, column headers, cells, sorting, etc. It is just a more compact/minimal visual theme. See the tidy table story for reference.
- **Custom inputs in cells**: use AG Grid `cellRenderer` on a `ColDef` to render any React component (e.g. `SelectDropdown`, `CheckboxInput`, `Button`) inside a cell. Do NOT suggest custom grid layout HTML when AG Grid cell renderers cover the use case. See `Table.ButtonCellRenderer` for existing example; build more as needed.
- **Row reordering**: AG Grid handles drag-and-drop row reordering natively via `rowDragManaged` + `rowDrag: true` on a ColDef. Do NOT suggest a third-party drag library (e.g. `dnd-kit`) — this is already covered by AG Grid.

### Table Compound Sub-components (static properties)
- `Table.BulkActionsDropdown` - takes `actions: { displayName, callback(api), disabled? }[]` - renders a Dropdown.Trigger Button with "Actions (N)" label. USES GridApiContext internally.
- `Table.HideColumnsDropdown` - takes optional `columns`, `onSelectionChanged`, `overrideColumnHiding`. Auto-reads from GridApiContext. Renders a SelectDropdown multi-select.
- `Table.RowCountInfo` - takes optional `totalRows`. Reads from GridApiContext. Renders "Showing N results" or "Showing N of M results". Must be inside Table (needs GridApiContext).
- `Table.PaginationPanel`, `Table.PageSizeSelector`, `Table.PaginationControls` - pagination sub-components.
- `Table.ButtonCellRenderer` - cell renderer for buttons.
- `Table.DefaultValueFormatter` - valueFormatter for cells wrapping `{ value: string }` objects. Apply per colDef for grouped columns (AG Grid bug workaround).

### Column Definitions (AG Grid ColDef)
- Standard AG Grid ColDef: `{ field, headerName, sortable, resizable, flex, minWidth, cellRenderer, valueFormatter, editable }`
- Row data values should be plain primitives OR `{ value: string, backgroundColor?, foregroundColor?, semanticColor? }` objects (DSDefaultColDef valueGetter/formatter handle the unwrapping)
- When using column groups (ColGroupDef), apply `valueFormatter: Table.DefaultValueFormatter` explicitly on the group due to AG Grid bug

### Wrapping Tables in Section
When a page contains a Table, wrap it in `<Section>` (not a raw `<div>` or `<main>`). Section provides white card background, border-radius, and padding via design tokens — no need to style those manually on a wrapper.

For `headerContent` / `footerContent` passed to Table, use plain fragments (no custom wrapper divs with page-level classes). The Table's own `ds-table__header` / `ds-table__footer` already apply `display: flex; justify-content: space-between` — fragment children become direct flex items automatically:
```tsx
<Section className="ds-my-page__content">  {/* className for spacing only, e.g. margin-top */}
  <Table
    headerContent={<><Button variant="dropdown" size="S">Actions (0)</Button><Button variant="dropdown" size="S">Hide</Button></>}
    footerContent={<><span>Showing {count} results</span><Button variant="secondary" size="S">Expand Table</Button></>}
  />
</Section>
```
Do NOT add page-level classes like `ds-my-page__table-toolbar` to wrapper divs inside headerContent/footerContent — it breaks the flex layout and is unnecessary given the Table's built-in flex styling.

### Toolbar Pattern (header with Actions + HideColumns + Undo/Redo)
Pass `headerContent` as an array/fragment of JSX. Pattern from stories:
```tsx
headerContent={[
  <div key="left" style={{ display: 'flex', gap: '0.5rem' }}>
    <Table.BulkActionsDropdown actions={bulkActions} />
    <Button variant="secondary" size="S">Undo</Button>
    <Button variant="secondary" size="S">Redo</Button>
  </div>,
  <div key="right" style={{ display: 'flex', gap: '1rem' }}>
    <Table.HideColumnsDropdown />
  </div>,
]}
```

## SearchBar Export Status (CONFIRMED)
- `SearchBar` EXISTS at `src/components/searchBar/SearchBar.tsx`
- CONFIRMED NOT EXPORTED from `src/index.ts` as of 2026-02-18
- Consuming apps cannot import it. If needed, it must be exported first, OR use TextInput + Icon wrapper
- The "always visible" search design (top nav, contextual panels) maps to `placeholderText` prop which shows inactive state with placeholder text

## Pill - Confirmed Use Cases
- `Pill` with `checkbox={true}` is the correct component for filterable "pill-checkbox" filter lists (wrappable flex pill grids where multiple can be selected)
- `onclick` prop (lowercase - non-standard!) is the callback for state changes
- `initialValue` sets initial checked state

## Drag-and-Drop Row Reordering
- For TABLE rows (AG Grid): ALWAYS use AG Grid's built-in DnD. Set `rowDragManaged={true}` on `Table` and `rowDrag: true` on the ColDef. Do NOT suggest dnd-kit. We own AG Grid Enterprise — use it.
- If rows are externally managed state, use `onRowDragEnd` + `api.getDisplayedRowAtIndex()` to read the new order.
- For GENUINELY custom list rows (no columns, no headers, not a table structure at all): only then consider dnd-kit.
- CRITICAL LESSON (learned the hard way): If something in a design has rows, columns, and headers — it IS a table. Use Table + AG Grid. Do not reach for a custom HTML layout or a separate DnD library. AG Grid cell renderers handle checkbox cells, SelectDropdown cells, button cells, and more. Always ask: "Does this look like a table?" before suggesting anything else.

## Breadcrumbs
- NO Breadcrumbs component exists in the library (confirmed 2026-02-18)
- Can be composed: text links + separator text + bold current page + Icon copy button
- Worth a library ticket if needed broadly

## Analysis Guidelines

### Verifying design elements before suggesting new components
Before recommending a NEW component or extension during a design gap analysis, **verify the element actually exists in the design** using the Figma tools. Do not invent components for elements you are uncertain about — it is better to say "I could not identify this element clearly" than to hallucinate a gap that doesn't exist.

### Prefer existing composition over new flex wrappers
When a design shows a heading with left + right content, use `Heading.InnerContainer` (two of them) — NOT a new div with custom flex styling.

When a design shows inputs inside table cells, use AG Grid `cellRenderer` on a `ColDef` — NOT a custom HTML grid layout.

## Common Patterns

### Mutually Exclusive Filters (e.g. All Active / Draft / Archived)
Use Tabs/Tabs.Item with controlled state in parent:
```tsx
const [activeFilter, setActiveFilter] = useState<'all' | 'draft' | 'archived'>('all');

<Tabs>
  <Tabs.Item active={activeFilter === 'all'} tabElementProps={{ onClick: () => setActiveFilter('all') }}>
    All Active
  </Tabs.Item>
  <Tabs.Item active={activeFilter === 'draft'} tabElementProps={{ onClick: () => setActiveFilter('draft') }}>
    Draft
  </Tabs.Item>
  <Tabs.Item active={activeFilter === 'archived'} tabElementProps={{ onClick: () => setActiveFilter('archived') }}>
    Archived
  </Tabs.Item>
</Tabs>
```

### Search Input with Left Icon (when SearchBar not available/suitable)
```tsx
<div className="my-search-wrapper">
  <Icon name="search" size={16} />
  <TextInput placeholder="Search Marksheets" value={search} onChange={...} />
</div>
```

### Expandable List Rows
Use semantic `<ul>/<li>` with Button for chevron. Section is NOT appropriate here - it's for page-level sections, not list items.

### Navigation Card Groups (e.g. Settings page with grouped nav cards)
When Figma shows NO visual container around a group of cards - just an H2 + cards below it - do NOT use Section (it adds background-color, padding, border-radius). Use a raw `<section>` with `aria-labelledby` pointing at the H2, or a plain `<div>`. Use Heading for the H2. Cards use onClick with router navigate.
```tsx
<section aria-labelledby="basic-heading">
  <Heading level={2} id="basic-heading">Basic</Heading>
  <Card title="Grade Sets" paragraph="..." onClick={() => navigate('/grade-sets')} />
  <Card title="Subjects" paragraph="..." onClick={() => navigate('/subjects')} />
</section>
```
