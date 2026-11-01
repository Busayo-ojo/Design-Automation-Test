# FMDQ Design System & Flow Screen Rules (design.md)

> **Purpose**: This document defines the engineering and design rules for creating, composing, and prototyping screens and UI flows on Figma for the **FMDQ Design System**. It captures the foundational design language, canvas architectural constraints, and all critical feedback, corrections, and learnings accumulated across implementations.

---

## 1. Core Principles & Source of Truth

1. **Figma is the Ultimate Source of Truth**:
   - The master Figma file is `"Design-Automation-Test"` (`key: Hq7luvf787VJlCj1d3YJYw`).
   - All production layouts, role flows, and interactive prototypes live on the **`DRP`** canvas page.
   - Component definitions and primitives live on their respective dedicated pages (e.g., `✤ Buttons`, `✤ Input`, `✤ Dropdowns`, `✤ Breadcrumbs`).

2. **Reuse First — Zero Reinvention**:
   - **Never draw ad-hoc shapes or raw frames** for elements that exist as design system components.
   - Always instantiate or clone existing design system master components: `<Sidebar>`, `<TopBar>`, `<Breadcrumbs>`, `<Button>`, `<Input>`, `<Badge>`, `<Toast>`, `<Table>`, `<Modal>`.
   - Maintain component instances and override properties rather than detaching or drawing flat vector approximations.

3. **No Guesswork / Work From Evidence**:
   - Every padding, margin, stroke, corner radius, text style, and color token must be derived from existing screens or tokens.
   - If a business requirement or screen interaction is not explicitly in the BRD/SSD or Figma, stop, document the question as `// TODO(design): <question>`, and clarify with the user.

---

## 2. Canvas Architecture & Flow Organisation

1. **Section Structure**:
   - All screens must reside inside their designated Figma **Section**:
     - `Flow 1 · Authentication & onboarding` (`10303:161101`)
     - `Flow 2 · Role dashboards` (`10310:229603`)
     - `Flow 3 · Approvals` (`10329:296023`)
     - `Flow 4 · Member contributions` (`10329:309750`)
     - `Prototype overlays` (`10326:289444`)
     - `Prototype audit` (`10329:314150`)
   - **Never place loose screens on the raw canvas** outside a named section.

2. **Screen Sizing & Alignment**:
   - **Standard Screen Viewport**: `1440 × 1024 px` (fixed width/height for standard enterprise desktop layouts).
   - **Horizontal Sequence**: Flow screens must be ordered chronologically from left to right with uniform horizontal spacing (minimum `160px` between screens).
   - **Captions Above Screens**:
     - Every flow screen must have a corresponding caption frame placed directly above it (`y = 23px` relative to section top).
     - Caption naming convention: `Caption · <Flow Number>.<Step> <Role> · <Screen Description>`.
     - Frame naming convention: `<Flow Number>.<Step> <Role> · <Screen Description>` (e.g., `4.3 Member authoriser · review contribution`).

---

## 3. Typography & Copy Standards

1. **Approved Typefaces Only**:
   - **DM Sans** (`--font-family-primary`): Used for all UI body text, form labels, buttons, navigation, table cells, captions, and headings.
   - **Rubik** (`--font-family-secondary`): Used strictly where numerical tabular legibility or secondary accents require it.
   - **Prohibited Fonts**: Never introduce unapproved fonts (e.g., *Clash Grotesk* is an obsolete artifact from older copies and must be replaced with *DM Sans* immediately).

2. **Font Scale Hierarchy**:
   - **Page Headings**: `20px` SemiBold (`fontWeight: 600`), line-height `24px`, letter-spacing `-1.2px`.
   - **Subtitles & Explanatory Copy**: Must strictly use **Paragraph/Small/Regular** (`14px` Regular, line-height `20.3px`, letter-spacing `-0.56px`, color `--color-neutral-600` `#475467`).
   - **Table Headers & Meta**: `12px` Medium (`fontWeight: 500`), letter-spacing `-0.48px`.
   - **Footers & SEC Captions**: `12px` Regular, color `--color-neutral-400` (`#98A2B3`).

3. **Financial Terminology & Acronyms**:
   - **Week Ending Convention**: Always use **`W/E`** (with a slash) for reporting week closure dates (e.g., `W/E 23 Oct`). Never write `WE 23` or ambiguous abbreviations that can be misread.
   - **Capitalization Rule**: Any text string that appears after a status badge must have its first letter capitalized across all cards and tables (e.g., `"W/E 23 Oct · Pending"`, never lowercase `"pending"`).

---

## 4. UI Components & Composition Rules

1. **Breadcrumbs & Back Navigation**:
   - **Sidebar Landing Pages Rule**: Landing pages reached directly by clicking a sidebar menu item (e.g., `Users` table, `Approvals` inbox, Role dashboards) **do NOT have breadcrumbs or back buttons** (`visible = false`). They display only the page title and subtitle.
   - **Breadcrumb Hierarchy**: Breadcrumb logic begins when a user navigates deeper into a sub-page or sub-flow within that module (e.g., `Users > Create user` or `Contributions > NIBOR > Enter rates`).
   - **Back Button Placement & Targeting**: Flow sub-screens feature a leading 36px back button inside `Frame 1` of the breadcrumb trail. The back button must always be prototyped to return to the specific screen the user originated from.
   - **Clickable Breadcrumb Items**: Every non-active ancestor item in the breadcrumb trail must have a prototype click reaction to its destination screen. If an ancestor module screen does not yet exist on canvas (e.g., an overarching "Contributions" hub), log it in the prototype audit backlog.
   - **Automated Text Targeting**: When modifying breadcrumbs programmatically via scripts or plugins, **always target the `Label` text layer**. Never overwrite the `Separator` text layer, which is fixed to a 20px width and will cause severe text overlapping and collapse.
   - Top and bottom borders: 1px solid `--color-neutral-200` (`#E4E7EC`) with a bounded height of `38px`.

2. **Form Fields & Inputs**:
   - **Border**: Exactly 1px border.
   - **Shadows**: **No drop shadows** on form fields.
   - **Color Ramps**:
     - Rest: `Grey/300` (`--color-neutral-300`, `#D0D5DD`).
     - Hover: `Primary/600` (`--color-primary-600`, `#1D326D`).
     - Focus: `Primary/600` plus a **4px focus ring** (`--color-focus-ring`, `#E7E8F1`).
     - Error: `Destructive/Light` (`--color-error-600`, `#CB1A14`) plus a 4px error glow (`rgba(226, 110, 106, 0.15)`).
   - **Border Radius**: Always use `var(--radius-12, 12px)` for default form field corners (including OTP verification digit boxes). Avoid one-off `10px` curves.
   - **Action Buttons in Cards**: Must stretch to **100% full-width** (`width: 100%`) across the card's inner content container (e.g., 400px inside auth/modal cards).

3. **Sidebars & Navigation**:
   - Instantiate `Sidebar` (`variant=2, theme=dark blue` for Member Inputters and Authorisers).
   - The active menu item must correspond exactly to the current flow (e.g., `To authorise` highlighted for screen 4.3).

4. **Toasts, Alerts & Feedback**:
   - **Semantic Icons**: Toast icon must match the state 1:1 (`shield-tick` or `check-circle` for success; `alert-circle` or `close-circle` for errors). Never substitute mismatched icons.
   - **Gradient & Feathering**: Banners and toasts must retain their full radial grain/feathered backdrop spread without clipping.

5. **Icon Variant Style Rules (Bold vs. Linear)**:
   - **Form Fields & Content Icons (`variant="bold"`)**: All leading and trailing icons inside form fields, cards, and status badges (e.g. `user`, `lock`, `eye`, `eye-slash`, `mail-check`, `shield-tick`, `clock`, `check-circle`) must use **`variant="bold"`**.
   - **Navigation & Directional Exceptions (`variant="linear"`)**: Only directional indicators and dismissal actions stay **`variant="linear"`** (specifically `arrow-left`, `arrow-right`, `chevron-left`, `chevron-right`, `chevron-down`, and `close`).
   - **React Implementation Guard**: Because the `<Icon />` primitive component in code defaults to `'linear'` when the prop is omitted, **you must always explicitly pass `variant="bold"`** to avoid regression back to thin stroke icons.

---

## 5. Prototyping & Interaction Rules

1. **Complete Action Paths**:
   - Every primary interactive CTA (e.g., `"Submit"`, `"Approve"`, `"Return for rework"`, `"Verify and continue"`) must have a functional prototype connection.
   - **Approval Flows**: Must lead to the confirmed decision screen or modal overlay (`4.4 Member authoriser · decision confirmed`).
   - **Return / Rework Flows**: Must lead to the correction state (`4.2 Money market contribution · returned, fix`) with rejection notes displayed.

2. **Prototype Audit Maintenance (MANDATORY)**:
   - The master prototype audit table lives at **`Prototype audit · dead ends`** (`10329:314151`) in section `Prototype audit` (`10329:314150`).
   - **Whenever new screens are created or flows are updated in Figma, you MUST update this audit table immediately**:
     1. Recalculate and update the total wired link count in the header text (e.g., `1 Nov 2026 · 422 links wired across the DRP flows`).
     2. Update the status column for the impacted flow (e.g., change `Flow 4 · next` to `Flow 4 · partially wired (4.1, 2.4e, 4.2, 4.3, 4.4 done)`).
     3. Remove resolved CTAs from the "CTAs that need it" column.

---

## 6. Verification & Parity Checklist

Before completing any Figma UI flow task, execute the following checks:
1. **Font Loading Check**: Did you load `DM Sans` (Regular, Medium, SemiBold) before mutating text nodes?
2. **Visual Inspection**: Capture a plugin screenshot (`figma_capture_screenshot`) to verify:
   - Auto-layout padding and gap alignment.
   - No jumbled text in breadcrumbs or tight badges.
   - Proper capitalization after badges.
   - Correct full-width button stretching.
3. **Prototype Reaction Count**: Run a reaction audit across the target section to verify that all primary CTAs are interactive.
4. **Audit Table Sync**: Confirm `Prototype audit · dead ends` reflects the latest screen count and remaining unwired CTAs.

