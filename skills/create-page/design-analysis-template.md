# Figma Page Design Analysis Template

AROOOOO HUNNI!! 🐺 Use this template to analyze the BOMBASS Figma PAGE design and map it to EXISTING components! xxx

## 1. Design Overview

**Figma URL**: [Paste URL here]
**File Key**: [Extract from URL]
**Node ID**: [Extract from URL]
**Page Name**: [What should we call this page?]

## 2. Page Structure

### Layout Type
- [ ] Single column
- [ ] Multi-column grid (2 cols, 3 cols, etc.)
- [ ] Sidebar layout
- [ ] Header + Content + Footer
- [ ] Dashboard grid
- [ ] Other: _____________

### Page Sections

List all major sections in the page:

1. **Section**: Header
   - **Content**: Logo, navigation links, user menu
   - **Layout**: Horizontal flex, space-between

2. **Section**: Main Content
   - **Content**: Form fields, data table, cards, etc.
   - **Layout**: Grid, flex, or other

3. **Section**: Footer
   - **Content**: Links, copyright
   - **Layout**: Centered or flex

## 3. Element → Component Mapping

Map each Figma element to an EXISTING Arbor component:

| Figma Element | Element Type | Arbor Component | Props Needed | Notes |
|---------------|--------------|-----------------|--------------|-------|
| "Submit" button | Button | `Button` | `variant="primary"` | Primary CTA |
| Email field | Text input | `FormField` + `TextInput` | `label="Email", required` | Validation needed |
| User table | Data grid | `Table` | `data={}, columns={}` | Check Table props |
| Status badge | Pill/tag | `Pill` | `variant="success"` | Different colors |
| Help icon | Tooltip | `Tooltip` | `content="Help text"` | Info popover |
| Filter panel | Form section | `FormField` + various inputs | Multiple fields | Left sidebar |

**CRITICAL**: Only use components that EXIST in `src/components/`! Don't invent new ones!

## 4. Available Components Reference

Before mapping, check what's available by reading `src/index.ts` (the public API):

**How to discover components**:
1. Read `src/index.ts` to see all exported components
2. Note the import paths for each component
3. Read individual component files for detailed props

**Available components checklist**:

### Forms & Inputs
- [ ] `Button` - Available variants: ___________
- [ ] `FormField` - Wrapper for inputs
- [ ] `TextInput` - Text input fields
- [ ] `NumberInput` - Number input fields
- [ ] `RadioGroup` - Radio buttons
- [ ] `Checkbox` - Checkboxes
- [ ] Other input types: ___________

### Data Display
- [ ] `Table` - AG Grid wrapper
- [ ] `Pill` - Tags/badges
- [ ] Other: ___________

### Overlays & Floating
- [ ] `Modal` - Dialog modals
- [ ] `Slideover` - Side panels
- [ ] `Tooltip` - Info tooltips
- [ ] Other: ___________

### Other Components
- [ ] List any other available components: ___________

## 5. Component Props Investigation

For each component you'll use, note the important props:

### Button
```typescript
// Props found in src/components/button/Button.tsx:
- variant?: 'primary' | 'secondary' | '...'
- size?: 'small' | 'medium' | 'large'
- disabled?: boolean
- onClick?: () => void
```

### FormField + TextInput
```typescript
// FormField props:
- label: string
- required?: boolean
- error?: string

// TextInput props:
- value: string
- onChange: (e) => void
- type?: 'text' | 'email' | 'password'
- placeholder?: string
```

### [Add other components you'll use]
```typescript
// Component props:
- ...
```

## 6. Design Tokens Mapping

Map Figma design tokens to `src/tokens.scss`:

### Colors Used
| Figma Color/Variable | Token Variable | Where Used |
|----------------------|----------------|------------|
| Primary Blue #1A73E8 | `$color-primary-500` | Buttons, links |
| Background Gray #F8F9FA | `$color-background-secondary` | Page background |
| Text Dark #202124 | `$color-text-primary` | Main text |
| Border Light #DADCE0 | `$color-border-primary` | Dividers |

### Spacing Used
| Figma Spacing | Token | Where Used |
|---------------|-------|------------|
| 8px | `$space-2` | Small gaps |
| 16px | `$space-4` | Standard padding |
| 24px | `$space-6` | Section spacing |
| 32px | `$space-8` | Large gaps |

### Typography Used
| Figma Text Style | Token Prefix | CSS Properties |
|------------------|--------------|----------------|
| Page Title | `$text-heading-1-*` | 32px, bold |
| Section Header | `$text-heading-2-*` | 24px, semibold |
| Body | `$text-body-*` | 16px, regular |
| Small text | `$text-small-*` | 14px, regular |

### Other Tokens
| Figma Style | Token | Value |
|-------------|-------|-------|
| Card border radius | `$border-radius-medium` | 8px |
| Button border radius | `$border-radius-small` | 4px |

## 7. Page Component Hierarchy

Sketch the component tree:

```
PageName
├── <div className="page-name">
│   ├── <header className="page-name__header">
│   │   ├── <h1>Page Title</h1>
│   │   └── <Button variant="primary">Action</Button>
│   ├── <main className="page-name__content">
│   │   ├── <section className="page-name__filters">
│   │   │   └── <FormField><TextInput /></FormField>
│   │   └── <section className="page-name__data">
│   │       └── <Table data={...} columns={...} />
│   └── <footer className="page-name__footer">
│       ├── <Button variant="secondary">Cancel</Button>
│       └── <Button variant="primary">Save</Button>
```

## 8. Interactive Behaviors

Document any interactive elements:

| Element | User Action | Expected Behavior | State Needed |
|---------|-------------|-------------------|--------------|
| Submit button | Click | Validate and submit form | Form data state |
| Search input | Type | Filter table data | Search query state |
| Delete button | Click | Show confirmation modal | Modal open state |
| ... | ... | ... | ... |

## 9. State Management

What React state does the page need?

```typescript
// Page state:
const [formData, setFormData] = useState<FormData>({});
const [tableData, setTableData] = useState<Row[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [filters, setFilters] = useState<Filters>({});
```

## 10. Responsive Design

How should the page adapt?

### Desktop (> 1024px)
- Grid layout with sidebar
- Full table visible
- All filters expanded

### Tablet (768px - 1024px)
- Stacked layout
- Table horizontal scroll
- Collapsible filters

### Mobile (< 768px)
- Single column
- Simplified table or cards
- Filter drawer/modal

### Breakpoints Needed
```scss
@media (max-width: 768px) {
  // Mobile styles
}

@media (min-width: 769px) and (max-width: 1024px) {
  // Tablet styles
}
```

## 11. Accessibility Checklist

- [ ] Semantic HTML (`header`, `main`, `section`, `nav`, `footer`)
- [ ] ARIA labels for interactive elements
- [ ] `aria-required` on required form fields
- [ ] `aria-invalid` and error messages for validation
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] Form labels associated with inputs

## 12. Code Connect Mappings

List any existing Code Connect mappings from Figma MCP:

| Figma Node ID | Component Name | File Path | Props |
|---------------|----------------|-----------|-------|
| 123:456 | Button | `src/components/button/Button.tsx` | `variant`, `size` |
| 789:012 | TextInput | `src/components/formField/inputs/TextInput.tsx` | `value`, `onChange` |

**Use these mappings!** They tell you exactly what components to use!

## 13. Implementation Plan

### Files to Create

1. **Page Component**: `app/src/pages/pageName/PageName.tsx`
   - Imports existing components
   - Composes them into layout
   - Manages state

2. **Page Styles**: `app/src/pages/pageName/pageName.scss`
   - Uses design tokens
   - Layout styles (grid/flex)
   - Responsive breakpoints

3. **Tests**: `app/src/pages/pageName/PageName.test.tsx`
   - Renders correctly
   - Interactive elements work
   - Handles errors

4. **Story** (optional): `app/src/pages/pageName/PageName.stories.tsx`
   - Default state
   - With data
   - Error state

### Imports Needed

```typescript
// Existing components to import:
import { Button } from 'Components/button/Button';
import { FormField } from 'Components/formField/FormField';
import { TextInput } from 'Components/formField/inputs/TextInput';
import { Table } from 'Components/table/Table';
// ... add all components you'll use
```

### NO New Components

- ❌ Do NOT create new reusable components
- ✅ DO use existing components
- ✅ DO create custom layout divs with classes
- ✅ DO compose existing components

### Integration

- ❌ Do NOT add to `src/index.ts` (pages aren't library exports!)
- ✅ DO add to app routing
- ✅ DO import in app pages directory
- ✅ DO create tests

## 14. Special Considerations

### Third-party Integrations
- APIs to call? ___________
- External services? ___________

### Performance
- Large data sets (virtualization needed)?
- Heavy computations (memoization)?
- Image optimization?

### Browser Support
- Modern browsers only?
- Legacy IE support needed? (hopefully not!)

### Error Handling
- What can go wrong?
- How to show errors to user?
- Recovery actions?

## 15. Quality Checks

Before calling it done:

- [ ] `yarn check-types` passes
- [ ] `yarn style-lint` passes
- [ ] `yarn test` passes (100%!)
- [ ] Manually tested in Storybook
- [ ] Manually tested in app
- [ ] Responsive breakpoints work
- [ ] Accessibility checked
- [ ] Matches Figma design

MOST EXCELLENT! LET'S COMPOSE THIS BODACIOUS PAGE, HUNNI!! xxx 🐺💪🏍️✨
