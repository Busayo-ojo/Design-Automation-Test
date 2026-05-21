# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run storybook        # Start Storybook dev server (port 6006) — also generates changelog
npm run dev              # Start Vite dev server
npm run build            # Build library (tsc + vite → UMD + ES modules in dist/)
npm run typecheck        # TypeScript validation (tsc --noEmit)
npm run lint             # ESLint check

npm run figma:sync       # Full Figma → codebase sync (tokens + components)
npm run figma:tokens     # Extract design tokens only
npm run figma:dry-run    # Preview Figma extraction without writing files

npm run sync:git         # Typecheck, commit, and push changes
npm run sync:git:dry     # Dry-run git sync
```

The `storybook` script always runs `scripts/generate-changelog.mjs` first, which parses git history and writes `src/docs/changelog-data.json`. Never import this JSON directly — it is auto-generated on every Storybook start.

## Architecture

### Source structure

```
src/
  tokens.css              # Single source of truth for all design tokens (colors, spacing, typography, shadows)
  index.ts                # Library entry point — all public exports
  elements/               # Atomic UI primitives (Button, Input, Badge, Chip, Toggle, Toast, Avatar, ButtonGroup)
  components/             # Composite components (Typography, Table, Tabs, Modal, Drawer, Dropdown, NavMenu, Card, Textarea)
  layout/                 # Full-page structural components (AppLayout, TopBar, PageHeader)
  docs/                   # Storybook MDX pages and the ChangelogComponent
```

Each component lives in its own folder with: `ComponentName.tsx`, `ComponentName.css`, `ComponentName.stories.tsx`, and (for documented elements) `ComponentName.docs.mdx`.

### CSS conventions

- All class names use the `fmdqui-` prefix with BEM-like modifiers: `fmdqui-button`, `fmdqui-button--primary`, `fmdqui-button--sm`.
- All colors, spacing, typography, and shadow values **must** come from `src/tokens.css` CSS variables. Never hardcode design values that are already tokenized.
- Component CSS files are vanilla CSS, co-located with the component and imported directly in the `.tsx` file.

### Design token system

`src/tokens.css` defines all tokens under `:root`. Key token groups:
- Colors: `--color-primary-*`, `--color-secondary-*`, `--color-neutral-*`, semantic states (`success`, `error`, `warning`, `info`), brand colors (`--color-fmdq-blue`, `--color-fmdq-gold`)
- Typography: `--font-family-primary` and `--font-family-secondary` are both `'DM Sans', sans-serif`
- Spacing, shadows, gradients

### Storybook setup

- **Framework**: Storybook 8 + `@storybook/react-vite`
- **Manager customizations** (sidebar, search bar): `.storybook/manager-head.html` — uses a `MutationObserver`-based script to inject CSS *after* Emotion's dynamic style injection, since Emotion re-injects on every render and wins over static `!important` rules when they share equal specificity.
- **Preview frame customizations** (story canvas): `.storybook/preview-head.html` — applies `* { font-family: "DM Sans" !important }` to override Storybook's default docs fonts.
- **Theme**: `.storybook/fmdqTheme.ts` — Storybook manager theme (colors, fonts, brand).
- **Preview wrapper**: `.storybook/preview.tsx` — wraps all stories in `<BrowserRouter>`.
- Story titles follow the pattern `FMDQ DS/{ComponentName}` (e.g. `FMDQ DS/Button`).
- Story sort order is configured in `preview.tsx`/`preview.ts` via `storySort`.

### Figma-to-code pipeline

`scripts/figma-extractor.mjs` reads from the Figma API (requires `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY` in `.env`) and writes to `src/tokens.css` and component files. See `rules/FIGMA_STORYBOOK_RULES.md` for the mandatory workflow when building components from Figma specs.

### MCP servers

Two MCP servers are available for AI-assisted development:
- `mcp/storybook.mjs` (`npm run mcp:storybook`) — story inspection and health checks
- `mcp/figma.mjs` — style extraction, component listing, token diffing

## Figma → Storybook component rules

When implementing any component from Figma (see `rules/FIGMA_STORYBOOK_RULES.md`):

1. Confirm the component is tracked in `rules/FIGMA_STORYBOOK_MAPPING.md` before starting.
2. Extract the full spec from Figma via MCP tools (`figma_get_component`, `figma_get_component_details`, `figma_get_component_image`) — never guess or invent values.
3. Map all colors to `tokens.css` variables; add new tokens if needed rather than hardcoding.
4. Every Figma variant must have a corresponding Storybook story. Variant prop names must mirror Figma property names exactly.
5. Run `figma_check_design_parity` before marking a component complete.
6. Every component requires a `.docs.mdx` with: Overview, Figma embed, all variants with `sourceState="shown"`, Props Table, and Usage Guidelines.
7. Update `rules/FIGMA_STORYBOOK_MAPPING.md` with the status and last parity check date.
