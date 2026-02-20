# Rose's Storybookspert Memory

See `patterns.md` for full details on codebase conventions.

## Quick Reference

- Meta/StoryObj import: `from '@storybook/react-vite'`
- fn() import: `from 'storybook/test'` (NOT `@storybook/test`)
- Meta pattern: `satisfies Meta<typeof ComponentName>` with `export default meta`
- Story type: `type Story = StoryObj<typeof meta>`
- Storybook version: v9 (storybook package) with `@storybook/react-vite` ^9.1.8
- Page-level stories: use `layout: 'fullscreen'` in parameters
- Pages live in `src/pages/` not `src/components/`
- Story files use `.stories.tsx` extension (not `.story.tsx` for new files)
- tsconfig excludes `*.story.tsx` but includes `*.stories.tsx` and `*.test.tsx`

## Known Pre-existing Issues

- `src/pages/assessmentsPage/AssessmentsPage.test.tsx` has TS errors for Vitest globals
  (vi, describe, it, expect) - these are pre-existing, not caused by story files.
  The tsconfig `types` array is missing `vitest/globals` for the pages directory.
- `src/pages/assessmentsPage/AssessmentsPage.tsx` has a TS error for the SCSS module import.
  Both are pre-existing issues unrelated to story authoring.
