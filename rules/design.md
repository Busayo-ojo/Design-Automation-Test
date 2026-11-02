# FMDQ Design System & Flow Screen Rules (design.md)

> **Purpose**: This document defines the engineering, visual, and architectural rules for designing, composing, and prototyping screens and UI flows in Figma for the **FMDQ Design System**. It captures the foundational design language, canvas architectural constraints, and all critical feedback, reviews, and corrections accumulated across implementations.
> 
> *Scope*: These rules apply universally to all enterprise applications, portals, back-office workflows, and customer journeys built on the FMDQ Design System.

---

## 1. Core Principles & Zero Reinvention

1. **Figma Master File as Source of Truth**:
   - Master Figma File: `"Design-Automation-Test"` (`key: Hq7luvf787VJlCj1d3YJYw`).
   - Component definitions, primitives, and symbols live strictly on their designated foundation and atom pages:
     - Primitives: `✤ Buttons`, `✤ Input`, `✤ Textarea`, `✤ Dropdowns`, `✤ Badges`, `✤ Tabs`, `✤ Tabbed Buttons`, `✤ Avatar`
     - Composites: `✤ Sidebars`, `✤ Tables`, `✤ Breadcrumbs`, `✤ Metrics ⚜️`, `✤ Modals`, `✤ Alerts & Notification ⚜️`, `✤ Pagination`
   - Flow sequences and interactive prototypes live in dedicated sections on production canvas pages.

2. **Reuse First — Zero Reinvention**:
   - **Never draw ad-hoc shapes or raw frames** for elements that exist as design system components.
   - Always instantiate or clone existing design system master components: `<Sidebar>`, `<TopBar>`, `<Breadcrumbs>`, `<Button>`, `<Input>`, `<Badge>`, `<Toast>`, `<Table>`, `<Pagination>`, `<Metrics Card>`, `<Modal>`, `<Alert>`.
   - Maintain component instances and override properties rather than detaching or drawing flat vector approximations.
   - If a composite element (such as a metrics summary card, submission audit box, or alert banner) is needed, search existing atom/composite pages first.

3. **No Guesswork / Work From Evidence**:
   - Every padding, margin, stroke, corner radius, text style, and color token must be derived from existing tokens or master components.
   - If a business requirement or screen interaction is not explicitly documented, leave a `// TODO(design): <question>` and clarify with stakeholders rather than inventing arbitrary visual patterns.

---

## 2. Typography Standards & Anti-Rogue Rules

1. **Approved Typefaces Only**:
   - **DM Sans** (`--font-family-primary`): Used for **all** UI body text, form labels, buttons, navigation, table cells, captions, and headings.
   - **Rubik** (`--font-family-secondary`): Used strictly where tabular financial figures, dense numerical rate grids, or secondary data accents require high tabular legibility.
   - **Prohibited Fonts**: Absolutely NO unapproved fonts (e.g., *Inter*, *Roboto*, *Arial*, or legacy artifacts like *Clash Grotesk*). If any rogue font appears in a cloned instance or layer, it must be replaced with *DM Sans* immediately.

2. **Tokenized Type Ramp (No Ad-Hoc Font Sizes)**:
   - Every text node must match the established design system typographic scale. **Never assign arbitrary font sizes** (e.g., `11px`, `13px`, `15px`, `22px`, `26px`).
   - Standard scale:
     - **Display Large**: `56px` (Regular, Medium, SemiBold, Bold)
     - **Display Small**: `48px` (Regular, Medium, SemiBold, Bold)
     - **Heading 1 (H1)**: `40px` (Regular, Medium, SemiBold, Bold)
     - **Heading 2 (H2)**: `36px` (Regular, Medium, SemiBold, Bold)
     - **Heading 3 (H3)**: `32px` (Regular, Medium, SemiBold, Bold)
     - **Heading 4 (H4)**: `28px` (Regular, Medium, SemiBold, Bold)
     - **Heading 5 (H5)**: `24px` (Regular, Medium, SemiBold, Bold)
     - **Heading 6 (H6 / Page Titles)**: `20px` SemiBold (`fontWeight: 600`), line-height `24px`, letter-spacing `-1.2px`
     - **Paragraph Large**: `18px` (Regular, Medium, SemiBold)
     - **Paragraph Medium**: `16px` (Regular, Medium, SemiBold)
     - **Paragraph Small (Subtitles, Body, Form Labels, Table Cells)**: `14px` (Regular, Medium, SemiBold), line-height `20.3px`, letter-spacing `-0.56px`
     - **Paragraph XSmall (Table Headers, Meta, Helper Text, Badges)**: `12px` (Regular, Medium, SemiBold), letter-spacing `-0.48px`
     - **Paragraph XXSmall (Micro Tags, Sub-counters)**: `10px` (Regular, Medium, SemiBold)

3. **Text Style Linking**:
   - Always bind text layers to Figma Local Text Styles (e.g. `Heading/H6/Semibold`, `Paragraph/Small/Regular`, `Paragraph/XSmall/Medium`) rather than setting detached raw properties.

4. **Programmatic Font Pre-Loading**:
   - In Figma plugin automation or scripts, always preload all design system font weights in parallel via `Promise.all` (`DM Sans` Regular, Medium, SemiBold, Bold) before modifying text nodes. Never call `loadFontAsync` sequentially inside loops.

---

## 3. Navigation Hierarchy & Tab Composition

1. **Two-Tier Navigation Pattern (Never Stack Two Segmented Button Groups)**:
   - **Anti-Pattern**: Never stack two identical `Tabbed Buttons` components on top of each other. Stacking two segmented pill bars creates visual clutter and breaks information hierarchy.
   - **Correct Two-Tier Pattern**:
     - **Tier 1 (Primary Category / Domain Switcher)**: Use **`<Tabbed Buttons>`** (`✤ Tabbed Buttons`, `1267:13413`) with `style: first | middle | last` and `state: focused | regular`. Use this to switch between high-level modules, asset classes, or market instruments.
     - **Tier 2 (Secondary Sub-Filtering / Status Views)**: Use **`<Tab>` (`Style=Line`)** (`✤ Tabs`, `1697:24969`) with `State: active | default`. This displays an underline active border indicator (`2px solid Primary/700`) and built-in number counter badges (`has number tag = true`). Use this for lifecycle statuses (`Pending Approval`, `Approved`, `Rejected`, `Fixing Calculation`) or table filters.

2. **Line Tab Specifications**:
   - Height: `37px` (bounded within a `38px` horizontal container with a 1px solid `#E4E7EC` bottom border).
   - Layout: Auto Layout Horizontal, `itemSpacing: 24px`, padding `0`.
   - Active Indicator: Bottom border rendered via `Border` sub-frame (`#1D326D`).
   - Inactive Tabs: Gray text (`#475467`) without bottom border line.

3. **Breadcrumbs & Back Navigation**:
   - **Sidebar Landing Pages Rule**: Landing pages reached directly by clicking a sidebar menu item (e.g. main module tables, inboxes, role dashboards) **do NOT have breadcrumbs or back buttons** (`visible = false`). They display only the page title and subtitle.
   - **Breadcrumb Hierarchy**: Breadcrumbs begin when navigating deeper into a sub-page or sub-flow within that module (e.g. `Module > Sub-Page > Item Detail`).
   - **Back Button Placement**: Sub-screens feature a leading 36px back button inside `Frame 1` of the breadcrumb trail. The back button must always return to the origin screen.
   - **Automated Text Targeting**: When modifying breadcrumbs programmatically, **always target the `Label` text layer**. Never overwrite the `Separator` text layer, which is fixed to a 20px width and will cause severe text overlapping and collapse.

---

## 4. Auto Layout, Component Instances & Sizing Integrity

1. **Sidebar Menu Items & Counter Badges**:
   - Standard Sidebar Item Height: Strictly **`44px`**.
   - **Preventing Double Badges on Selection**: When setting a `<Sidebar / menu item>` instance to `state = "selected"`, the master component variant exposes its own default badge (e.g., `"10"`). If the item already has a custom badge (e.g., `"12"`), **you must explicitly hide the master's default badge** (`badge.visible = false`) so only one badge remains visible.
   - **Single-Line Text Enforcement**: Never let navigation menu labels wrap onto two lines (which expands item height to 64px and breaks the sidebar grid). Always set `textAutoResize = "WIDTH_AND_HEIGHT"` on the label text node so the text auto-fits on a single line.

2. **Step Lists / Process Flows / "What Happens Next"**:
   - **Numbering Circles**: Circular number badges/avatars are reserved **strictly for single index digits** (`1`, `2`, `3`, `4`).
   - **No Sentences in Circles**: Never write descriptive sentences or titles into the `Number` circle frame.
   - **Text Frame Structure**:
     - Step Title: 14px SemiBold (`Paragraph/Small/Semibold`) inside `Text` frame.
     - Step Description: 12px Regular (`Paragraph/XSmall/Regular`) or 14px Regular (`Paragraph/Small/Regular`) inside `Text` frame.

3. **Metrics & Summary Cards**:
   - Always instantiate the design system master component **`<Metrics Card>`** (`✤ Metrics ⚜️`, `6291:1886`, `variation=2, type=data only, orientation=left aligned`) rather than drawing raw frames.
   - Card dimensions: Width `264px`, height `160px` (or flexible fill in a 4-column container with 16px gaps spanning 1104px content width).
   - Content mapping:
     - `Text`: Metric Title (e.g., "Spot (Call)")
     - `Data`: Primary Value / Rate (e.g., "26.2125%")
     - `Badge`: Secondary Trend / Delta (e.g., "+0.05%")
     - `Secondary Text`: Context / Meta (e.g., "11 quotes included · 4 trimmed")

4. **Form Fields & Inputs**:
   - **Border**: Exactly 1px solid.
   - **Shadows**: **No drop shadows** on form fields.
   - **Corner Radius**: Always use `var(--radius-12, 12px)` for standard form field corners.
   - **Color Ramps**:
     - Rest: `Grey/300` (`--color-neutral-300`, `#D0D5DD`)
     - Hover: `Primary/600` (`--color-primary-600`, `#1D326D`)
     - Focus: `Primary/600` plus a **4px focus ring** (`--color-focus-ring`, `#E7E8F1`)
     - Error: `Destructive/Light` (`--color-error-600`, `#CB1A14`) plus a 4px error glow (`rgba(226, 110, 106, 0.15)`)
   - **Full-Width Action Buttons**: Action buttons in auth cards, modal footers, and dialogs must stretch to **100% full-width** (`width: 100%`) across the card's inner content container.

---

## 5. Spacing, Layout Grids & Canvas Architecture

1. **Strict 8pt / 4pt Spacing Scale**:
   - All padding, margins, and gaps must strictly follow the design system scale: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`.
   - **Page Container (`Main`)**:
     - Padding: Exactly `32px` on all sides (`top: 32, right: 32, bottom: 32, left: 32`).
     - Vertical Layout Gap: `itemSpacing = 24px`.
     - Content Width: Fixed `1104px` within a standard `1168px` main column.
   - **Tables**:
     - Header Row Height: `44px`.
     - Data Row Height: `54px`.
     - Pagination Bar Height: `61px`.
   - **Filter Bars**:
     - Height: `40px` to `44px`, horizontal gap `16px`.

2. **Canvas Flow & Section Structure**:
   - **Screen Viewport**: Fixed standard enterprise desktop layout of **`1440 × 1024 px`**.
   - **Section Placement**:
     - Every screen must live inside a named Figma **Section**.
     - Sections must be arranged in clean chronological order with a uniform vertical gap of **`400px`** between sections.
   - **Horizontal Sequence**:
     - Flow screens must be ordered chronologically from left to right with uniform horizontal spacing (minimum `120px` to `160px` between screens).
   - **Captions Above Screens**:
     - Every flow screen must have a corresponding caption frame placed directly above it at **`y = 23px`** relative to section top (`x = screen.x`, width `1440px`, height `45px`).
     - Caption naming: `Caption · <Flow Number>.<Step> <Role> · <Screen Description>`.
     - Screen naming: `<Flow Number>.<Step> <Role> · <Screen Description>`.

---

## 6. Color Harmony & Palette Tokens

1. **Brand Palette**:
   - **FMDQ Primary Blue**: `--color-primary-700` / `--color-fmdq-blue` (`#1D326D`).
   - **Primary Dark / Hover / Selected**: `--color-primary-800` (`#012657` / `#001633`).
   - **FMDQ Secondary Gold**: `--color-secondary-500` / `--color-fmdq-gold` (`#CC9933`).
   - Never use raw unlinked hex values for brand colors.

2. **Neutrals & Surfaces**:
   - Page / Screen Background: `#FFFFFF` or `#F9FAFB` (`--color-neutral-50`).
   - Card Background: `#FFFFFF` with 1px border `#E4E7EC` (`--color-neutral-200`) or `#F8F9FC`.
   - Primary Headings & High-Emphasis Text: `#101828` (`--color-neutral-900`).
   - Body & Form Input Text: `#344054` (`--color-neutral-700`).
   - Secondary Text, Subtitles & Explanatory Copy: `#475467` (`--color-neutral-600`) or `#667085` (`--color-neutral-500`).
   - Disabled / Placeholder Text: `#98A2B3` (`--color-neutral-400`).
   - Dividers & Outlines: `#E4E7EC` (`--color-neutral-200`).

3. **Status & Feedback Badges**:
   - **Badges**: Filled style with `8px` horizontal padding, corner radius `12px` (or pill), typography `12px Medium`.
   - **Success / Approved / Active**: Background `#ECFDF3`, Text/Border `#027A48`.
   - **Warning / Pending Review**: Background `#FFFAEB`, Text/Border `#B54708`.
   - **Error / Rejected / Locked**: Background `#FEF3F2`, Text/Border `#B42318`.
   - **Neutral / Draft / Inactive**: Background `#F2F4F7`, Text/Border `#344054`.
   - **Capitalization Rule**: Any text string appearing after a status badge must have its first letter capitalized (e.g., `"W/E 23 Oct · Pending"`, never lowercase `"pending"`).

4. **Financial Copy & Nomenclature**:
   - **Week Ending Convention**: Always use **`W/E`** (with a slash) for reporting week closure dates (e.g., `W/E 23 Oct`). Never write `WE 23` or ambiguous abbreviations.

---

## 7. Prototyping & Interaction Rules

1. **Complete Action Paths**:
   - Every primary interactive CTA (e.g. `"Submit"`, `"Approve"`, `"Return for rework"`, `"Setup date"`, `"Publish"`, `"Save"`) must have a functional prototype connection.
   - Tab switchers must connect to their corresponding view states (e.g., Line Tab `NIBOR Fixing` connects to Fixing calculation screen; `Pending Approval` connects back to overview).
   - Breadcrumb ancestor labels and back buttons must connect to origin screens.
   - Role sidebars must wire major module links across all screens.

2. **Prototype Audit Maintenance (MANDATORY)**:
   - The master prototype audit table lives at **`Prototype audit · dead ends`** in the `Prototype audit` section.
   - **Whenever new screens are created or flows are updated in Figma, you MUST update this audit table immediately**:
     1. Recalculate and update total wired link count in header text.
     2. Update the status column for the impacted flow.
     3. Remove resolved CTAs from the "CTAs that need it" column.

---

## 8. Verification & Quality Checklist

Before completing any Figma UI design or flow creation task, execute this checklist:

1. [ ] **Zero Reinvention Check**: Did you use existing `<Sidebar>`, `<Metrics Card>`, `<Tab>`, `<Tabbed Buttons>`, `<Breadcrumb>`, `<Table>`, `<Pagination>`, `<Alert>` components instead of drawing ad-hoc frames?
2. [ ] **Typography Audit**: Are 100% of text nodes bound to **DM Sans** (or Rubik for financial numbers)? Are rogue fonts (Inter, Arial, Roboto) and ad-hoc sizes (11px, 22px) completely eliminated?
3. [ ] **Two-Tier Navigation Check**: If secondary tabs exist, did you use `<Tab>` (`Style=Line`) rather than stacking two identical `<Tabbed Buttons>`?
4. [ ] **Sidebar Badges & Layout**: Does the selected sidebar menu item have strictly **one** visible badge? Does label text sit on a single line with item height fixed at **44px**?
5. [ ] **Process List Numbering**: Are numbering circles in step cards/panels containing strictly single digits (`1`, `2`, `3`) with sentences placed in the adjacent text container?
6. [ ] **Spacing & Auto Layout**: Do all screens have `1440 × 1024 px` viewports, `32px` page padding, `24px` vertical gaps, and uniform `120px-160px` horizontal screen spacing?
7. [ ] **Captions Aligned**: Does every screen have its `Caption` frame positioned at `y = 23px` relative to the section top?
8. [ ] **Action Path Prototyping**: Are primary CTAs, tabs, back buttons, and sidebar items interactive?
9. [ ] **Audit Table Sync**: Is `Prototype audit · dead ends` updated with the new link count and resolved CTAs?
