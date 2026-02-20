# PageShell

A shell layout for showcasing design system components in a **Storybook-like format**. Use it to build and prototype with a sidebar of sections and a main canvas.

## Layout

- **Sidebar**: Expandable categories (Foundations, Content, Input, Navigation, Surfaces). Each category contains component sections. Click a category to expand/collapse; click a section to show it.
- **Canvas**: Renders the selected section’s content.

## Categories

Components are grouped into five categories (folders):

| Category    | Use for |
|------------|---------|
| Foundations | Buttons, typography, spacing, tokens |
| Content    | Headings, text, lists, media |
| Input      | Form fields, checkboxes, selects, search |
| Navigation | Tabs, breadcrumbs, side nav, links |
| Surfaces   | Cards, modals, panels, toasts |

When you add a component, specify which **category** it belongs to.

## Adding components

Edit **`showcaseSections.tsx`** and add a new entry with a **category**:

```tsx
{
  id: 'my-component',
  name: 'My Component',
  category: 'Foundations',  // or Content, Input, Navigation, Surfaces
  description: 'Optional short description.',
  render: () => <MyComponent />,
},
```

- **id**: Unique key.
- **name**: Label in the sidebar.
- **category**: Which expandable folder (Foundations, Content, Input, Navigation, Surfaces).
- **description**: Optional; shown above the canvas.
- **render**: Function that returns the React node to show.

Import real design system components from `Components/*` in `render` when using the full design-system repo.

## Viewing in Storybook

The shell is registered as **Pages/PageShell**. Run Storybook and open that story to use the shell with fullscreen layout.

## Files

| File | Purpose |
|------|--------|
| `PageShell.tsx` | Shell component (sidebar + canvas). |
| `showcaseSections.tsx` | Registry of sections — add components here. |
| `pageShell.scss` | Layout styles for the shell. |
| `PageShell.stories.tsx` | Storybook entry for the shell. |
