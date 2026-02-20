# Sophia Componentspert Memory

See topic files for details:
- [components.md](./components.md) - Component APIs, gotchas, and patterns

## Key Project Facts
- Path aliases: `Components/*` → `src/components/*`, `Utils/*` → `src/utils/*`
- CSS prefix: `ds-` (e.g. `ds-button`, `ds-button--primary`)
- Package manager: yarn (NOT npm)
- Button prop is `variant` not `type` - common gotcha
- SearchBar component EXISTS at src/components/searchBar/SearchBar.tsx but is NOT exported from src/index.ts - cannot be used by consumers directly
