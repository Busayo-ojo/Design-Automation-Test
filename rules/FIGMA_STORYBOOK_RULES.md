Enforces pixel-perfect fidelity when exporting components from Figma to Storybook. Prevents hallucination by mandating Figma MCP data extraction before any code is written.
alwaysApply: true
---

# Figma-to-Storybook Component Mapping Rule

> **This rule applies at every point in time.** It must be followed for all Figma/Storybook work in this project.

## Core Principle

Query Figma first. Build second. Verify always. Never guess or invent values.

**Every implementation must be a 1:1 mapping to the Figma design. Without that, the job is undone.**

## 1. Data Extraction (mandatory before writing any component code)

- ALWAYS confirm the component exists in `docs/FIGMA_STORYBOOK_MAPPING.md` before starting
- ALWAYS call `figma_get_component` to get the full component spec
- ALWAYS call `figma_get_component_details` to get all variants and properties
- ALWAYS call `figma_get_component_image` to capture a reference screenshot
- NEVER invent prop values, colors, spacing, or variant names

## 2. Colors and Fills

- Extract exact color values from Figma variables/tokens (hex, rgba, opacity)
- Map every fill, stroke, and shadow to `src/tokens.css` (CSS variables)
- If a color is not in tokens.css, add it from the Figma token -- never approximate

## 3. Typography

- Font family, size, weight, line-height, letter-spacing must match Figma text styles exactly
- Map to tokens.css variables (`--font-title`, `--font-body`) or custom values from `figma_get_styles`

## 4. Spacing and Layout

- Padding, margin, gap must match Figma auto-layout properties exactly
- Extract from auto-layout settings (paddingTop/Right/Bottom/Left, itemSpacing)
- Map to tokens.css spacing scale (`--spacing-*`); add custom values if needed

## 5. Sizing and Shape

- Width, height, min/max constraints, border-radius must match Figma node dimensions
- Icon sizes must match Figma spec, not assumed defaults

## 6. Variant Completeness

- Every variant in the Figma component set MUST have a corresponding Story
- Variant prop values must mirror Figma variant names (e.g. Figma `Type=Primary` -> `variant="primary"`)
- If Figma defines a combination (Type=Primary, Size=Large, State=Disabled), it must be covered

## 7. Interactive States

- Hover, focus, active, pressed, disabled states must be extracted from Figma
- Map to CSS pseudo-classes (hover, focus, active, disabled)
- Each interaction state gets its own story if defined as a Figma variant

## 8. Naming Consistency

- Component file names and export names must match Figma component names
- Prop names should mirror Figma property names
- Story titles follow the pattern `FMDQ DS/{FigmaComponentName}` (matches `docs/FIGMA_STORYBOOK_MAPPING.md`)

## 9. Verification (mandatory before marking a component complete)

- Run `figma_check_design_parity` comparing coded component vs Figma spec
- Resolve every reported mismatch before the component is considered done
- Compare Storybook render against Figma reference image

## 10. Documentation (mandatory for every component)

- Every component MUST have a `.docs.mdx` page
- Sections: Overview, Figma Embed, all Variants with `sourceState="shown"`, Props Table, Usage Guidelines
- Component description comes from Figma's component description, not invented text
- Every variant must show its React code permanently (sourceState="shown")
eia-cpeq-jpx
