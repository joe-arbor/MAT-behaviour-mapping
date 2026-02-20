---
name: create-page
description: Generate React pages from Figma designs by composing existing design system components. Converts Figma layouts into production-ready pages using Arbor components.
---

# Create Page from Figma Design

AROOOOO HUNNI!! 🐺 Time to turn that BOMBASS Figma page design into a MOST EXCELLENT React page using our existing components!! xxx

## Goal

Generate a **PAGE** (not a new component!) that **COMPOSES EXISTING** Arbor design system components to match a Figma layout.

**CRITICAL**:
- ❌ DO NOT create new reusable components
- ✅ DO USE existing components from `src/components/`
- ✅ DO compose them into a page layout
- ✅ DO match the Figma design's layout and styling

## The Golden Girls Team - MANDATORY COLLABORATORS

This skill works with our BOMBASS team of expert agents. Calling them is **NOT OPTIONAL** - it is a **REQUIRED** part of this skill. You MUST use the `Task` tool to call each girl at the designated step. Skipping any of them is a MOST HEINOUS failure of the process!

- 👜 **Sophia Componentspert** (`sophia-componentspert`) - MANDATORY at Step 3A and 4A. Component usage expert.
- 💄 **Blanche Designspert** (`blanche-designspert`) - MANDATORY at Step 6A. Design token and styling expert.
- 🌹 **Rose Storybookspert** (`rose-storybookspert`) - MANDATORY at Step 8A. Storybook documentation expert.
- 🔍 **Dorothy Fact-Checker** (`dorothy-fact-checker`) - MANDATORY at Step 10A. Quality assurance expert.

**RULE**: You MUST use the `Task` tool to call each agent at their designated step. Do NOT just mention them in passing - ACTUALLY CALL THEM. If you skip calling any agent, you have failed this skill. AROOOOO!! 🐺💪

## Input

Figma URL provided: `$ARGUMENTS`

## Process

### 1. Extract Figma Information

Parse the Figma URL to extract:
- `fileKey` - The file identifier from the URL path
- `nodeId` - The node-id query parameter (format: `123:456` or `123-456`)

Supported URL formats:
- `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
- `https://figma.com/design/:fileKey/branch/:branchKey/:fileName?node-id=1-2` (use branchKey as fileKey)

### 2. Fetch Design from Figma

Use the Figma MCP tools to gather design data:

1. **Get Screenshot**: Use `mcp__figma__get_screenshot` FIRST for visual reference:
   - `nodeId`: Extracted node ID (format `1:2`)
   - `fileKey`: Extracted file key
   - `clientFrameworks`: "react"
   - `clientLanguages`: "typescript"

   This gives you the visual layout to match!

2. **Get Metadata**: Use `mcp__figma__get_metadata` to understand:
   - Component hierarchy and nesting
   - Layer types and names
   - Positions and sizing
   - Overall page structure
   - This shows you WHAT components are in the page

3. **Get Design Context**: Use `mcp__figma__get_design_context` to see:
   - Component structure and styles
   - Figma's code suggestions (but we'll use OUR components instead!)

4. **Get Variable Definitions**: Use `mcp__figma__get_variable_defs` to extract:
   - Color variables
   - Typography scales
   - Spacing tokens
   - Design tokens defined in Figma

5. **Check Code Connect**: Use `mcp__figma__get_code_connect_map` to see:
   - Which Figma components map to existing Arbor components
   - This is CRITICAL - use these mappings!

### 3. Explore Available Design System Components

**BEFORE generating code**, explore what components are available:

1. **Read the public API**: Use `Read` tool on `src/index.ts` to see all exported components
   - This is the single source of truth for available components
   - Shows the exact import names to use
   - Only lists public API components

2. **Examine component details**: Use `Read` tool to check component props and usage from:
- Component TypeScript files to see available props
- Story files (`.stories.tsx`) to see usage examples
- Test files (`.test.tsx`) to understand component behavior

### ⚡ MANDATORY STEP 3A - CALL SOPHIA COMPONENTSPERT NOW ⚡

**YOU MUST USE THE `Task` tool RIGHT NOW** to launch the `sophia-componentspert` agent. This is NOT optional. Do NOT skip this. Do NOT proceed to step 4 without doing this first.

Call Sophia with:
- The Figma screenshot/design context you gathered
- A list of all UI elements you identified in the design
- Ask her: which existing Arbor components should be used for each element, and what are their key props/APIs

```
Task tool: subagent_type="sophia-componentspert"
prompt: "I'm building a page from a Figma design. Here's what I see in the design: [describe elements]. Which existing Arbor components should I use for each? Please detail their props and any usage gotchas."
```

**WAIT for Sophia's response before continuing.** Her guidance shapes ALL subsequent decisions.

After Sophia responds, **SHARE HER WISDOM WITH THE USER** like this:

> 👜 **Sophia says:** _[relay Sophia's key component recommendations in her voice - she's warm, knowledgeable, a bit extra. e.g. "Oh hunni, for that search bar you'll definitely want `FormField` with `inputType="text"` - don't even think about a raw input! And for those badges? `Pill` is your girl! Here's what I'd use for each element..."]_

Then list the component decisions you're going with, so the user can see what Sophia recommended.

**Example workflow**:
```typescript
// 1. Read src/index.ts to see what's available:
export { Button } from './components/button/Button';
export { FormField } from './components/formField/FormField';
export { TextInput } from './components/formField/inputs/TextInput';
export { Table } from './components/table/Table';
// ... etc

// 2. Then read specific component files for props:
// Read src/components/button/Button.tsx to see ButtonProps
// Read src/components/formField/FormField.tsx to see FormFieldProps
```

**Available Arbor components** (from `src/index.ts`):
- `Heading` - ALL headings (use instead of `<h1>`, `<h2>`, etc.)
- `Section` - Page sections (use instead of raw `<section>`)
- `Button` - Buttons and CTAs
- `FormField` - Self-contained form fields (label + input together)
- `TextInput`, `NumberInput`, `TextArea` - Form inputs (used via FormField)
- `SelectDropdown`, `ColourPickerDropdown` - Dropdown inputs
- `RadioButtonInput` - Radio buttons
- `Fieldset` - Fieldset grouping with legend
- `Card` - Card containers
- `Table` - Data tables (AG Grid wrapper)
- `Modal`, `ModalManager` - Modal dialogs
- `Slideover`, `SlideoverManager` - Slide-out panels
- `Pill`, `Tag` - Tags and badges
- `Icon` - Icons
- `Tooltip`, `TooltipWrapper` - Tooltips
- `Tabs` - Tab navigation
- `Dropdown` - Dropdown menus
- `Separator` - Dividers

### 4. Map Figma Design to Existing Components

Create a mapping document in your analysis:

**For each Figma element, determine**:
1. What existing Arbor component to use
2. What props are needed
3. How to style/position it
4. What content it should have

### ⚡ MANDATORY STEP 4A - CALL SOPHIA AGAIN IF NEEDED ⚡

If you encounter ANY component you are unsure about during mapping, **USE THE `Task` tool AGAIN** to launch `sophia-componentspert`. Do NOT guess at component APIs. Do NOT proceed with incorrect usage. Ask Sophia first - she knows every component inside out.

```
Task tool: subagent_type="sophia-componentspert"
prompt: "I need to use [ComponentName] for [use case]. What are the correct props? Are there any usage patterns or gotchas I should know about?"
```

Then relay Sophia's answer to the user:

> 👜 **Sophia clarifies:** _[Sophia's prop guidance in her warm, knowledgeable voice]_

**Mapping Strategy**:
- Figma Button → `<Button variant="primary|secondary|..." />`
- Figma Heading/Title → `<Heading level={1|2|3|4}>` (NOT raw `<h1>`, `<h2>`)
- Figma Section/Container → `<Section title="..." headingLevel={2}>` (NOT raw `<section>`)
- Figma Text Input → `<FormField inputType="text" inputProps={{...}} />` (self-contained!)
- Figma Number Input → `<FormField inputType="number" inputProps={{...}} />`
- Figma Select/Dropdown → `<FormField inputType="selectDropdown" inputProps={{...}} />`
- Figma Card → `<Card>...</Card>`
- Figma Table → `<Table data={...} columns={...} />`
- Figma Tag/Badge → `<Pill>` or `<Tag>`
- Figma Icon → `<Icon name="..." size={24} />`
- Figma Modal → `<Modal>...</Modal>`
- Figma Divider → `<Separator />`
- Plain paragraph text → `<p>` (but use `<Heading>` for titles!)

**IMPORTANT**: If Code Connect mappings exist, USE THEM! Don't reinvent the wheel, hunni! 🐺

### 5. Generate Page File

Create a page component that's composed with EXISTING components.

**Reference**: See `page-template.tsx` in this skill directory for a complete example structure.

**Key Structure Elements**:
- Import existing design system components using path aliases
- Define page props interface (className, callbacks, initial data)
- State management for interactive elements (forms, loading, errors)
- Event handlers for user interactions
- Semantic HTML structure (header, main, footer)
- Compose existing components according to Figma layout

**Page File Requirements**:
- Import ALL components from existing design system using path aliases
- Use semantic HTML structure (`header`, `main`, `section`, `footer`)
- Add state management for interactive elements (forms, toggles, etc.)
- Use proper TypeScript types
- Add JSDoc comments explaining the page purpose
- Keep layout logic in the page, styling in SCSS

### 6. Generate Page Styles (SCSS)

Create styles that match the Figma layout using design tokens.

**Reference**: See `page-template.scss` in this skill directory for a complete example structure.

**Key Styling Elements**:
- Page container with max-width and centering
- Section styles using BEM naming (`.page-name__section`)
- Flexbox/Grid layouts matching Figma design
- Design tokens for all colors, spacing, typography
- Responsive breakpoints (@media queries)

**SCSS Requirements**:
- Import `../../tokens.scss` for design tokens
- Use design tokens for ALL styling (colors, spacing, typography)
- Use BEM-like naming: `.page-name__section--modifier`
- Match Figma layout with flexbox/grid
- Add responsive breakpoints if needed
- NO hardcoded colors/spacing - use tokens!

### ⚡ MANDATORY STEP 6A - CALL BLANCHE DESIGNSPERT NOW ⚡

**YOU MUST USE THE `Task` tool RIGHT NOW** to launch the `blanche-designspert` agent. This is NOT optional. Do NOT move to step 7 without doing this.

Blanche will ensure you're using the right tokens (component tokens > semantic tokens > base tokens) and following proper CSS class naming patterns. She will catch any hardcoded values, wrong token tiers, or naming convention violations.

```
Task tool: subagent_type="blanche-designspert"
prompt: "I've just created a SCSS file for a new page. Please review the styling for correct design token usage and CSS naming conventions. Here is the SCSS: [paste your generated SCSS]"
```

After Blanche responds, **SHARE HER VERDICT WITH THE USER** before making any corrections:

> 💄 **Blanche says:** _[relay Blanche's styling feedback in her voice - she's glamorous, exacting, and absolutely will not tolerate a hardcoded hex value. e.g. "Sugah, that `#ff0000` has GOT to go - use `--color-semantic-error-500` like the sophisticated design system we are! And darling, those spacing values? $space-4 and $space-8 are RIGHT THERE waiting for you..."]_

List any corrections you're making based on her feedback, then apply them.

**Apply ALL of Blanche's feedback before continuing.** Do NOT skip her corrections.

### 7. Generate Test File

Create tests for the page:

```typescript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { PageName } from './PageName';

describe('PageName', () => {
  it('renders the page title', () => {
    render(<PageName />);
    expect(screen.getByText('Page Title')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<PageName />);
    expect(screen.getByRole('button', { name: /action button/i })).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<PageName />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  // Add tests for interactions
  it('handles form submission', () => {
    // Test form logic
  });
});
```

**Test Requirements**:
- Use React Testing Library
- Import `@testing-library/jest-dom/vitest`
- Use accessible queries (`getByRole`, `getByLabelText`)
- Test page renders correctly
- Test interactive elements work
- Avoid testIds

### 8. Generate Storybook Story

### ⚡ MANDATORY STEP 8A - CALL ROSE STORYBOOKSPERT NOW ⚡

**YOU MUST USE THE `Task` tool RIGHT NOW** to launch the `rose-storybookspert` agent. Do NOT write the story file yourself. Rose is the expert here - let her do it!

```
Task tool: subagent_type="rose-storybookspert"
prompt: "I've created a new page component called [PageName]. Please create a comprehensive Storybook story file for it. Here is the component: [paste your generated TSX]. The file should go at [path/to/PageName.stories.tsx]."
```

After Rose responds, **SHARE A PREVIEW OF HER STORY WITH THE USER**:

> 🌹 **Rose says:** _[relay Rose's story rationale and highlights in her warm storytelling voice - she loves explaining WHY she chose each story variant, and she gets genuinely excited about good documentation. e.g. "Oh, this page has such a beautiful story to tell! I've written a Default story so you can see it in its natural state, a WithLoadingState story because every page deserves to be seen mid-journey, and a WithError story because even mistakes deserve to be documented with care..."]_

Then show the user the story file Rose has crafted before writing it to disk.

**Use Rose's output as the story file.** Do NOT just use the basic template below - that's just a reference.

Basic story structure (Rose will enhance this significantly):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { PageName } from './PageName';

const meta: Meta<typeof PageName> = {
  title: 'Pages/PageName',
  component: PageName,
  parameters: {
    layout: 'fullscreen', // Pages typically use fullscreen
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithData: Story = {
  args: {
    // Mock data if needed
  },
};
```

### 9. File Organization

**Where to put page files**:

Option A - In consumer app (NOT the component library):
```
app/src/pages/pageName/
├── PageName.tsx
├── PageName.test.tsx
├── PageName.stories.tsx
└── pageName.scss
```

Option B - In component library examples/demo:
```
src/examples/pages/pageName/
├── PageName.tsx
├── PageName.test.tsx
├── PageName.stories.tsx
└── pageName.scss
```

**IMPORTANT**: Pages are typically NOT added to the component library's public API (`src/index.ts`). They're application-level code that USES the library!

### 10. Quality Checks

Run these commands:

```bash
# Type check
yarn check-types

# Lint SCSS
yarn style-lint

# Run tests
yarn test

# View in Storybook (if story created)
yarn storybook
```

**CRITICAL**: All checks must pass! 100% test pass rate hunni!! 🐺

### ⚡ MANDATORY STEP 10A - CALL DOROTHY FACT-CHECKER NOW ⚡

**YOU MUST USE THE `Task` tool RIGHT NOW** to launch the `dorothy-fact-checker` agent. This is the FINAL quality gate. Do NOT tell the user the work is done without Dorothy's sign-off.

```
Task tool: subagent_type="dorothy-fact-checker"
prompt: "I've just finished creating a page from a Figma design. Please verify all the following: (1) all files actually exist on disk [list file paths], (2) tests pass with 100% pass rate, (3) tests are meaningful not placeholders, (4) components are used with correct props, (5) no 'any' types used, (6) styling follows token conventions."
```

Dorothy will check:
- Confirm all files were actually created (page, styles, tests, stories)
- Verify tests pass with 100% pass rate
- Check that tests are meaningful and not just placeholders
- Ensure components are used properly with correct props
- Validate that styling follows conventions
- Confirm no 'any' types are used
- Give you the HONEST truth about the quality of the work!

After Dorothy responds, **SHARE HER VERDICT WITH THE USER IN FULL**. Dorothy's honesty is a feature, not a bug - don't sanitise it:

> 🔍 **Dorothy says:** _[relay Dorothy's fact-check verdict in her no-nonsense, straight-talking voice - she has seen things. She doesn't sugarcoat. e.g. "Alright, I've checked the work. The page file EXISTS, which is a good start. The tests? Three of them are fine, but 'handles form submission' is just an empty shell and I won't pretend otherwise. The SCSS has one hardcoded value that Blanche apparently missed. Fix those two things and we're golden."]_

List every issue Dorothy raised, confirm which ones you're fixing, then fix them before presenting the final summary.

**Fix ALL issues Dorothy identifies before giving the final summary to the user.**

## Design Token Mapping

We don't use sass vars, we use css vars.
Map Figma variables to `src/tokens.scss`:

**Colors**:
We have base tokens for colours e.g.:
- Brand colors → `--color-brand-500`
- Semantic colors → `--color-semantic-{semantic}-500`
But we also have component specific tokens that should take priority:
- Component specific colors → `--{component}-{state}-color-{usage}`
  - e.g. text colour for form field text in an error state → `--form-field-text-error-color-text`
- Border colors → `--{component}-focus-color-border`

**Spacing**:
- Gaps/margins/padding → `$space-{scale}` (e.g., `$space-4`, `$space-8`)

**Typography**:
- Headings → `$text-heading-{level}-{property}`
- Body text → `$text-body-{property}`
- Font weights → `$text-{style}-weight`

**Layout**:
- Border radius → `$border-radius-{size}`
- Shadows → Check if shadow tokens exist

## Component Usage Tips

**CRITICAL**: Use Arbor components, NOT raw HTML elements!

### Headings - Use `Heading` component
```typescript
// DON'T use raw <h1>, <h2>, etc.
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection</Heading>
```

### Sections - Use `Section` component
```typescript
// DON'T use raw <section>
<Section
  title="Section Title"
  headingLevel={2}
  buttonText="Action"         // Optional button in header
  buttonOnClick={handleClick}
  collapsible={false}          // Optional collapsible
>
  {/* Section content */}
</Section>
```

### Forms - Use `FormField` (self-contained)
```typescript
// FormField includes BOTH label AND input!
<FormField
  label="Email"
  id="email"
  inputType="text"             // 'text' | 'textarea' | 'number' | 'colourPicker' | 'selectDropdown'
  errorText={error}            // Error message
  fieldDescription="Help text" // Optional description
  inputProps={{
    value: email,
    onChange: (e) => setEmail(e.target.value),
    placeholder: 'Enter email',
  }}
/>
```

### Buttons
```typescript
<Button
  variant="primary" // 'primary' | 'secondary' | 'tertiary' | 'primary-destructive' | 'secondary-destructive' | 'text-link' | 'dropdown'
  onClick={handleClick}
  disabled={isLoading}
>
  Click Me
</Button>
```

### Tables
```typescript
<Table
  data={rows}
  columns={columnDefs}
  // Check Table component for all props
/>
```

**ALWAYS check component prop types before using!** Use `Read` tool on `src/index.ts` to see available components, then read component files for props!

## Output Summary

After generation, provide:

1. ✅ **Page file created**: Path to PageName.tsx
2. ✅ **Components used**: List of all design system components imported
3. ✅ **Layout structure**: Brief description of page sections
4. ✅ **Design tokens**: Colors/spacing tokens used
5. ✅ **Tests created**: Path to test file
6. ✅ **Quality checks**: Results of type check, lint, tests
7. ✅ **Next steps**:
   - How to integrate into app
   - Where to add routing
   - Any manual tweaks needed
8. ✅ **Visual comparison**: Note any differences from Figma design

## Important Notes

- **DON'T create new components** - use existing ones! 🐺
- **DO explore components first** - read their props and examples
- **DO use Code Connect mappings** if available
- **DO use design tokens** for all styling
- **DO match Figma layout** with proper spacing/alignment
- **DON'T add pages to src/index.ts** - they're app-level, not library exports
- **DO keep it simple** - compose, don't reinvent
- This codebase serves millions of users - be careful!
- Use yarn (NOT npm)
- 100% test pass rate or we AROOOOO in protest!! 🐺💪

## Example Flow

1. User provides Figma URL
2. Fetch design → See it has a form with submit button and data table
3. Explore components → Find FormField, TextInput, Button, Table
4. Map design:
   - Form section → FormField + TextInput components
   - Submit button → Button component (primary variant)
   - Data table → Table component
5. Generate page that imports and uses these components
6. Style layout to match Figma using design tokens
7. Add tests, run quality checks
8. Output: "Here's your page that uses FormField, TextInput, Button, and Table!"

AROOOOO LET'S COMPOSE SOME BOMBASS PAGES HUNNI!! xxx 💪🏍️✨
