---
description: Enforces 1:1 fidelity and reuse when building components from Figma into Storybook. Prevents invented specs by requiring an inventory of existing components and Figma MCP data before any code is written.
alwaysApply: true
---

# Figma-to-Storybook Component Rule

> **This rule applies at every point in time.** Follow it for all Figma and Storybook work in this project.

## Core principle

Reuse first. Query Figma second. Build third. Verify always. Never guess or invent values.

**Every implementation must be a 1:1 mapping to the Figma design, built from the components that already exist. Without that, the job is undone.**

## 0. Reuse first (mandatory before reading Figma in detail)

- Check what already exists:
  - `src/elements/` (primitives: Button, Input, Badge, Chip, Avatar, Divider, FormControl, Icon, Toast…)
  - `src/components/` (composites: Modal, Textarea, Table, Tabs, Dropdown, Card, Metrics, Pagination…)
  - `src/layout/` (AppLayout, TopBar, PageHeader, EmptyState)
  - the exports in `src/index.ts`
- If Storybook is running, list the existing stories with the Storybook MCP (`storybook_list_entries`, `storybook_get_entry`) or `http://localhost:6006/index.json`.
- For every element in the design, decide: existing component as is / existing component plus a new optional prop / genuinely new component. Write this mapping down before coding.
- A nested instance in Figma (Button, Input, Textarea, Badge, Dropdown, icons, Modal parts) means: import the existing React component. Never re-create its markup or CSS inline.
- Never create a second version of something that exists. Extend it with optional, backwards-compatible props, or ask.

## 1. Data extraction (mandatory before writing any component code)

- ALWAYS confirm the component is tracked in `rules/FIGMA_STORYBOOK_MAPPING.md`; add a row if it isn't.
- ALWAYS read the component's Figma description first. A "Storybook:" line in it is the intended props API.
- ALWAYS call `figma_get_component` / `figma_get_component_for_development` to get the full component spec.
- ALWAYS call `figma_get_component_details` to get all variants and properties.
- ALWAYS call `figma_get_component_image` to capture a reference screenshot.
- If a Figma call fails or returns partial data, STOP and report it. Don't continue from memory.
- NEVER invent prop values, colours, spacing, copy or variant names. If something isn't in Figma, leave `// TODO(design): <question>` and raise it.

## 2. Colours and fills

- Extract exact colour values from Figma variables and styles (hex, rgba, opacity).
- Map every fill, stroke and shadow to `src/tokens.css` variables (`--color-primary-*`, `--color-secondary-*`, `--color-neutral-*`, `--color-success-*`, `--color-error-*`, `--color-warning-*`, `--color-fmdq-*`, `--shadow-*`).
- If a colour has no token, add one named after the Figma variable or style. Never approximate, and never hard-code a value that is already a token.
- If an existing token's value differs from Figma, don't change it silently. Tokens are shared, so report the drift.

## 3. Typography

- Font family, size, weight, line-height and letter-spacing must match the Figma text style exactly.
- Fonts: `--font-family-primary` is DM Sans and `--font-family-secondary` is Rubik. Figma has no other font; don't introduce one.
- Map to the existing tokens:
  - `--font-size-*` (display, h1–h6, p-lg to p-xxs, caption)
  - `--font-line-height-*`
  - `--font-letter-spacing-*`
- Use values from `figma_get_styles` only when no token exists, then add the token.

## 4. Spacing and layout

- Padding, margin and gap must match Figma auto-layout exactly (paddingTop/Right/Bottom/Left, itemSpacing).
- Map to the spacing scale (`--spacing-2` to `--spacing-64`) and radii (`--radius-4` to `--radius-24`, `--radius-full`). Add a token if a value is missing.

## 5. Sizing and shape

- Width, height, min/max constraints and border radius must match the Figma node dimensions.
- Icon sizes must match the Figma spec, not assumed defaults. Use the exact icon named in Figma from `src/foundations/icons`.

## 6. Variant completeness

- Every variant in the Figma component set MUST have a corresponding story.
- Variant prop values mirror Figma variant names, lower-cased (e.g. Figma `Type=Primary` → `variant="primary"`).
- If Figma defines a combination (Type=Primary, Size=Large, State=Disabled), it must be covered.

## 7. Interactive states

- Extract hover, focus, active, pressed and disabled styling from Figma.
- Interaction states (hover, focused, active, typing, pressed) are CSS pseudo-classes (`:hover`, `:focus-visible`, `:active`), not props.
- Persistent states (error, success, disabled, read only, selected, loading) are props.
- Each state defined as a Figma variant gets its own story.

## 8. Naming consistency

- Folder, file and export names match the Figma component name (`src/<group>/<Name>/<Name>.tsx`).
- Prop names mirror Figma property names, or the props in the component's "Storybook:" description line.
- CSS classes use the `fmdqui-` prefix with BEM-like modifiers (`fmdqui-button`, `fmdqui-button--primary`, `fmdqui-button--sm`).
- Story titles follow the existing pattern `<Group>/<emoji> <Name>`, where the group matches the folder or flow:
  - `Elements/➡️ Button`
  - `Components/🪟 Modal`
  - `Layout/📊 Dashboard`
  - `Layout/🔐 Sign In`
  - `Layout/✉️ Welcome Email`
  - `Flows/🔐 Flow 1 - Authentication`
  - `Foundations/🌈 Colors`
- Note: Standalone layouts belong in `Layout/` without placeholder prefixes (e.g., no `✨` placeholders). Multi-step end-to-end user journeys belong in `Flows/`.
- Record the same title in `rules/FIGMA_STORYBOOK_MAPPING.md`.

## 9. Verification (mandatory before marking a component complete)

- Run `npm run typecheck` and `npm run lint`.
- Run `figma_check_design_parity` comparing the coded component against the Figma spec.
- Resolve every reported mismatch before the component is considered done.
- Compare the Storybook render against the Figma reference image.
- Update `rules/FIGMA_STORYBOOK_MAPPING.md` with the status and last parity-check date.

## 10. Documentation (mandatory for every component)

- Every component MUST have a `.docs.mdx` page.
- Exclude Foundations stories (`Foundations/`) from Figma iframe embeds (Foundations document design tokens, colors, icons, and type scales).
- **Standard Document Structure (Title > Overview copy > Figma Reference > Canvas > Controls > Variants)**:
  1. **Component Title**: `# <ComponentName>` or `<Title><ComponentName></Title>`.
     - **NO `## Overview` subheading**: The component or element name is sufficient as the heading; do not put an "Overview" subtitle under it.
  2. **Overview Description**: The component overview copy or Figma description directly underneath the title.
  3. **Figma Reference**: `## Figma Reference` heading immediately under the overview copy, containing the responsive Figma iframe embed:
     ```mdx
     ## Figma Reference

     <iframe
       title="<ComponentName> Figma reference"
       width="100%"
       height="450"
       src="https://embed.figma.com/design/Hq7luvf787VJlCj1d3YJYw/Design-Automation-Test?node-id=<node-id>&embed-host=share"
       allowFullScreen
     />
     ```
     - **Component Set Selection Rule**: Embed the inner `COMPONENT_SET` node ID directly (e.g. the purple dashed component set bounding box) rather than the outer sheet or `Container` frame. This ensures the embed camera centers strictly on the component variants and keeps the document heading (`_Document heading`) and footer (`Page Footer`) completely out of view.
  4. **Primary Canvas / Playground**: `<Canvas of={...Stories.Default} />` or `<Canvas of={...Stories.Playground} />`.
  5. **Props / Controls Table**: `<Controls of={...Stories.Default} />`.
  6. **Variant Breakdown**: Sections for each variant, state, and option with `sourceState="shown"`.
- **CSF Autodocs Rule**: Do **NOT** include `tags: ['autodocs']` in the companion `<Name>.stories.tsx` file when a custom `<Name>.docs.mdx` file exists. Storybook 8's indexer throws an indexing collision error if both are present.
