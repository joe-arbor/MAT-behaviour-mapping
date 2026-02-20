# Dorothy Fact-Checker Memory

## Agent File Locations
- Agent definitions (all four): `.claude/agents/{blanche-designspert,dorothy-fact-checker,rose-storybookspert,sophia-componentspert}.md`
- Agent memory directories: `.claude/agent-memory/{agent-name}/`
- These files use relative paths (from project root) for portability across developer machines
- Frontmatter `name` field must match the filename (without .md extension)

## The Golden Girls Team
- blanche-designspert: model sonnet, color purple, design tokens & styling
- dorothy-fact-checker: model opus, color blue, QA & fact-checking
- rose-storybookspert: model sonnet, color pink, Storybook stories
- sophia-componentspert: model sonnet, color gold, component guidance
- Emojis: blanche=lipstick, dorothy=magnifying glass, rose=rose, sophia=purse

## Create-Page Skill Integration
- Skill at `.claude/skills/create-page/SKILL.md` calls agents at steps 3/4 (Sophia), 6 (Blanche), 8 (Rose), 10 (Dorothy)
- Agent names in backtick code refs are what matter for resolution, not the heading text

## Verification Patterns
- When checking agent file changes, compare against what was loaded into the system prompt (which reflects the pre-change state) since these files may be untracked and have no git history to diff against
- The Grep tool and memory system resolve relative paths against the project working directory
- Claude Code injects absolute paths at runtime even when files use relative paths -- this is expected behavior

## Common Issues to Watch For
- Absolute paths leaking into config files (especially `/Users/{username}/...` patterns)
- Files claimed to be committed but actually untracked (check `git ls-files` and `git status`)
- Agent memory directories may be empty (no MEMORY.md) until agents run for the first time -- this is by design

## Project Structure Notes
- `src/pages/` is a new directory added for page-level components (not in original architecture)
- No `Pages/*` path alias exists in tsconfig.json -- only `Components/*` and `Utils/*`
- Therefore page exports in `src/index.ts` must use relative paths (`./pages/...`) not aliases
- ESLint catches stylistic issues that `check-types` and `style-lint` do not -- always run all three

## Common Hallucination Patterns
- Agents may claim "all quality checks passed" but only run check-types and style-lint, missing ESLint errors
- ESLint stylistic rules (@stylistic/arrow-parens, @stylistic/brace-style, @stylistic/operator-linebreak, @stylistic/jsx-one-expression-per-line) are frequently violated in generated code
- The `yarn eslint` command is not listed in CLAUDE.md's common commands but is critical for quality
- **NEW PAGE REGISTRATION**: Agents frequently create page component files but forget to register them in `src/index.ts` (export) and `src/index.scss` (@use). The existing pattern (see AssessmentsPage) requires BOTH. Without these, the SCSS is dead code and the component is not part of the library's public API
- Icon name grep: allowedIcons file is `.tsx` not `.ts` -- use correct extension when searching

## Pill Component API
- `onclick` prop (lowercase c) accepts `(checked: boolean) => void`
- Uses `useEffect` to fire onclick on checked state change, including on mount
- State setters from `useState` are stable references, so passing them directly as onclick is safe

## Test Quality Benchmarks
- Tests should use accessible queries (getByRole, getByLabelText) over getByText/getByTestId
- userEvent is preferred over fireEvent for user interactions
- Tests should verify callback arguments, not just that callbacks were called
- Edge cases (empty state, no data) should be covered
