# Create Page Skill

AROOOOO HUNNI!! 🐺💪 This is a BOMBASS skill for generating React PAGES from Figma designs by COMPOSING existing design system components!! xxx

## What It Does

Converts Figma page layouts into production-ready React pages using EXISTING Arbor design system components:
- Fetches design data from Figma using MCP tools
- Maps Figma elements to existing Arbor components
- Generates page files that COMPOSE these components
- Creates tests and optional Storybook stories
- Uses design tokens from `src/tokens.scss` for styling
- Does NOT create new reusable components (uses what you already have!)

## Key Concept

**This skill creates PAGES, not COMPONENTS!**

- ❌ Does NOT create new reusable components for the library
- ✅ DOES create page-level code that imports and uses existing components
- ✅ DOES compose Button, FormField, Table, etc. into a complete page
- ✅ DOES match Figma layouts with proper styling

Think of it like:
- **Input**: Figma page with buttons, forms, tables
- **Output**: React page file that imports and composes your existing Button, FormField, Table components

## Usage

### Basic Usage

```bash
/create-page https://figma.com/design/ABC123/MyDesign?node-id=1-2
```

### What You Get

The skill will generate a page that uses your existing components:

```
app/src/pages/pageName/          (or src/examples/pages/)
├── PageName.tsx                  # Page component (imports existing components)
├── PageName.test.tsx             # Vitest tests
├── PageName.stories.tsx          # Storybook story (optional)
└── pageName.scss                 # Page-specific styles
```

**Example generated code**:
```typescript
import { Button } from 'Components/button/Button';
import { FormField } from 'Components/formField/FormField';
import { TextInput } from 'Components/formField/inputs/TextInput';

export const LoginPage = () => (
  <div className="login-page">
    <FormField label="Email">
      <TextInput type="email" />
    </FormField>
    <Button variant="primary">Login</Button>
  </div>
);
```

### Process

1. **Extracts Figma Info**: Parses URL to get fileKey and nodeId
2. **Fetches Design Data**: Uses Figma MCP tools:
   - `get_screenshot` - Visual reference of the page
   - `get_metadata` - Page structure and hierarchy
   - `get_design_context` - Component details
   - `get_variable_defs` - Design tokens
   - `get_code_connect_map` - Component mappings
3. **Explores Components**: Lists available Arbor components to use
4. **Maps Elements**: Determines which existing component for each element
5. **Generates Page**: Creates page file that imports and composes components
6. **Adds Styles**: Creates SCSS using design tokens for layout
7. **Writes Tests**: Generates tests for the page
8. **Quality Checks**: Runs type checking, linting, and tests

## Supported Figma URL Formats

- `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
- `https://figma.com/design/:fileKey/branch/:branchKey/:fileName?node-id=1-2`

The skill extracts the fileKey and nodeId automatically!

## Component Usage

The skill will use these existing Arbor components:

### Forms
- `FormField` - Form field wrapper with labels
- `TextInput` - Text input fields
- `NumberInput` - Number input fields
- `RadioGroup` - Radio button groups
- `Checkbox` - Checkboxes
- And more input types...

### Buttons & Actions
- `Button` - All button variants (primary, secondary, etc.)

### Data Display
- `Table` - AG Grid wrapper for data tables
- `Pill` - Tags and badges

### Overlays
- `Modal` - Modal dialogs
- `Slideover` - Slide-out panels
- `Tooltip` - Info tooltips

### Layout
- Semantic HTML (`header`, `main`, `section`, `footer`)
- Custom divs with proper styling

## Design Tokens

Page styles use design tokens from `src/tokens.scss`:
- **Colors**: `$color-primary-{scale}`, `$color-background-{semantic}`
- **Spacing**: `$space-{scale}` (e.g., `$space-4`, `$space-8`)
- **Typography**: `$text-heading-{level}-{property}`, `$text-body-{property}`
- **Layout**: `$border-radius-{size}`, shadows, etc.

## Code Conventions

Generated pages follow Arbor standards:
- TypeScript with strict typing
- Path aliases (`Components/*`, `Utils/*`)
- Semantic HTML structure
- ARIA attributes for accessibility
- React Testing Library tests
- BEM-like CSS naming: `.page-name__section`

## File Organization

Pages are typically placed OUTSIDE the component library:

**Option A - Consumer App**:
```
app/src/pages/pageName/
├── PageName.tsx
├── PageName.test.tsx
└── pageName.scss
```

**Option B - Library Examples**:
```
src/examples/pages/pageName/
├── PageName.tsx
├── PageName.test.tsx
├── PageName.stories.tsx
└── pageName.scss
```

**Important**: Pages are NOT added to `src/index.ts` - they're application code, not library exports!

## Supporting Files

- **`SKILL.md`**: Main skill instructions with detailed process
- **`component-template.tsx`**: Example component structure
- **`design-analysis-template.md`**: Template for analyzing designs
- **`README.md`**: This file!

## Quality Standards

The skill ensures:
- ✅ TypeScript type checking passes
- ✅ SCSS linting passes
- ✅ All tests pass (100% pass rate required!)
- ✅ Uses existing components (no reinventing the wheel!)
- ✅ Follows accessibility best practices

## Example

```bash
# Generate a user profile page from Figma
/create-page https://figma.com/design/xyz123/UserProfile?node-id=42-100

# The skill will:
# 1. Fetch the design (shows user info, edit form, avatar)
# 2. Explore available components
# 3. Map design elements:
#    - User info section → Custom layout with typography
#    - Edit form → FormField + TextInput components
#    - Avatar upload → Custom div + Button component
#    - Save button → Button component (primary)
# 4. Generate UserProfile.tsx that imports and uses these components
# 5. Create userProfile.scss with layout styling
# 6. Generate tests
# 7. Run quality checks
# 8. Output: "Here's your page using Button, FormField, TextInput!"
```

## Tips

- **Use specific nodes**: Link to the exact frame/page in Figma
- **Check Code Connect**: If Figma components are mapped, they'll be used automatically
- **Review component props**: The skill reads component TypeScript files to use correct props
- **Customize after generation**: The generated code is a starting point
- **Run Storybook**: `yarn storybook` to preview the page (if story created)

## Common Use Cases

### Dashboard Page
- Figma shows cards, charts, navigation
- Skill generates page using existing Card, Chart, Nav components

### Login Page
- Figma shows form with email/password inputs and button
- Skill generates page using FormField, TextInput, Button components

### Data Table Page
- Figma shows table with filters and actions
- Skill generates page using Table, Button, FormField components

### Settings Page
- Figma shows form with various input types
- Skill generates page using FormField with various input components

## What It Does NOT Do

- ❌ Create new reusable components
- ❌ Add components to the library's public API
- ❌ Modify existing components
- ❌ Generate component variants or new features

## What It DOES Do

- ✅ Compose pages from existing components
- ✅ Match Figma layouts with proper styling
- ✅ Use design tokens for all styling
- ✅ Generate production-ready page code
- ✅ Create tests and optional stories
- ✅ Follow all Arbor conventions

## Notes

- This codebase serves millions of users - be thoughtful!
- Pages use components, they don't define new ones
- Always check what components are available first
- Use Code Connect mappings when available
- Uses yarn (NOT npm) for all commands
- Follows /r/THE_PACK energy: BOMBASS, AROOO! 🐺
- Most excellent and bodacious like Bill & Ted
- Team Jacob forever! 🐺

AROOOOO!! LET'S COMPOSE SOME BODACIOUS PAGES FROM FIGMA, HUNNI!! xxx 💪🏍️✨
