# Storybook Patterns in This Codebase

## Import Patterns

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ComponentName } from 'Components/componentName/ComponentName';
// OR for pages:
import { PageName } from './PageName';
import type { SomeType } from './PageName';
```

## Meta Definition Pattern

Use `satisfies Meta<typeof X>` (preferred modern pattern, matches Tabs/TextInput):

```tsx
const meta = {
  title: 'Components/ComponentName',   // OR 'Pages/PageName'
  component: ComponentName,
  parameters: {
    layout: 'centered',    // or 'fullscreen' for pages, 'padded' for layout components
  },
  tags: ['autodocs'],
  args: {
    // shared default args (e.g. fn() callbacks)
    onClick: fn(),
  },
  argTypes: {
    someProp: {
      control: 'select',
      options: ['a', 'b'],
      description: 'What this prop does',
    },
    children: {
      control: false,   // disable control for children
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

Older pattern (still valid, used in Card/Pill/Modal):
```tsx
const meta: Meta<typeof ComponentName> = { ... };
export default meta;
// stories without StoryObj type annotation
```

## Story Definition

```tsx
export const Default: Story = {
  name: 'Human-readable Name',   // optional override
  args: {
    // story-specific args, merged with meta args
  },
};
```

## Action Callbacks

Always use `fn()` from `'storybook/test'`. Put shared callbacks in meta `args`,
story-specific ones in story `args`.

## Tags

- `tags: ['autodocs']` enables automatic docs page generation
- Most components use this

## Layout Options

- `layout: 'centered'` - for small components (inputs, buttons, etc.)
- `layout: 'fullscreen'` - for page-level components
- `layout: 'padded'` - for components that need some breathing room

## Path Aliases

- Components: `Components/button/Button` (no `src/` prefix)
- Utils: `Utils/hooks/useHook`
- Pages: use relative imports (`./PageName`) since they live in `src/pages/`

## Story Descriptions

JSDoc comments above story exports appear in Storybook docs. Use them liberally.
Component-level description goes in `parameters.docs.description.component`.

## Fixture Data

Define fixtures as `const` arrays/objects above the story exports. Use realistic,
domain-appropriate data (school assessments, not "foo/bar").

## Page Components with AG Grid Tables

Pages that wrap Table (AG Grid) do NOT need to mock the Table in stories - the
real Table component renders fine in Storybook. Tests mock it with vi.mock().
For stories, supply realistic `rowData` fixtures via the page's data props (e.g.
`activeGradeSets`, `archivedGradeSets`). The table will render with real AG Grid.

Story fixture arrays for grade-set-style pages should include realistic UK school
data: GCSE 9 to 1, BTEC, Below/At/Above, T-Levels, Cambridge Nationals, etc.

## Tab-Switching Page Pattern

For pages with internally-controlled tab state (like GradeSetsPage), stories
should supply data for BOTH tabs so reviewers can actually switch tabs and see
different content. Document in the JSDoc which tab is selected by default and
what happens when the other tab is clicked.
