# Figma-to-Storybook Component Mapping

| Figma Component | Status | Storybook Path | Last Parity Check | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Button / primary | Complete | Elements/➡️ Button | 2026-03-04 | 1:1 mapping verified manually |
| Special Primary Buttons / success | Complete | Elements/➡️ Button → Success | 2026-05-29 | hover + focused states added |
| Special Primary Buttons / warning | Complete | Elements/➡️ Button → Warning | 2026-05-29 | hover + focused states added |
| Special Primary Buttons / information | Complete | Elements/➡️ Button → Information | 2026-05-29 | hover + focused states added |
| Special Primary Buttons / destructive | Complete | Elements/➡️ Button → SpecialDestructive | 2026-05-29 | New variant (error), all 3 states |
| Sidebars | Complete | Components/🍺 Sidebar | 2026-10-26 | Replaced NavMenu; cell primitives, sections, variants 1 & 2, 4 themes |
| Dropdown / Menu | Superseded | Components/🔽 Dropdowns | 2026-10-27 | Earlier singular Dropdown stories removed; use Dropdowns |
| Dropdown / Selectors | Complete | Elements/🔤 Input → Input Dropdown | 2026-10-27 | Figma 2198:54679; merged into Input with 4 types and 5 states |
| fmdq-logo | Complete | Elements/🏛️ Logo | 2026-10-26 | Node 6769:1811; Default & DarkBG Card variants |
| Command shortcut | Complete | Components/🔽 Dropdowns → Elements / ⌘ Command Shortcut | 2026-10-27 | Figma 2327:77216; 2 variants (Type) |
| Dropdown / menu item headers | Complete | Components/🔽 Dropdowns → Elements / 🏷️ Menu Item Header | 2026-10-27 | Figma 2159:85848; 2 variants (borders) |
| Dropdown / menu item | Complete | Components/🔽 Dropdowns → Elements / 📋 Menu Item | 2026-10-27 | Figma 2159:51455; 15 variants (type × state); spacing/typography 1:1 |
| Dropdown / menu items section | Complete | Components/🔽 Dropdowns → Nested / 🧩 Menu Items Section | 2026-10-27 | Figma 2159:81118 |
| Dropdown / menu items | Complete | Components/🔽 Dropdowns → Nested / 🪟 Menu List | 2026-10-27 | Popover; added --shadow-dropdown-menu token |
| .Selector menu / menu item | Complete | Components/🔽 Dropdowns → Elements / 🔘 Selector Menu Item | 2026-10-27 | Figma 2459:70670; 32 variants (type × style × state); focused → DM Sans Medium |
| .Selector menu / menu list | Complete | Components/🔽 Dropdowns → Nested / 📃 Selector Menu List | 2026-10-27 | Shadow is an exact --shadow-normal-xsm match |
| Dropdown / Menu | Complete | Components/🔽 Dropdowns → Full / 🔽 Dropdowns Menu | 2026-10-27 | Figma 2190:52619; 12 variants (type × state × extended); added --radius-6 |
| Dropdown / Selectors | Complete | Components/🔽 Dropdowns → Full / 🔤 Dropdowns Selector | 2026-10-27 | Figma 2198:54679; 20 variants; composes Input size="lg" + foundations icons |
| Auth background / dotted shader | Implemented; motion under visual review | Layout/🌌 AuthBackground | 2026-10-27 (wrapper property parity 94/100) | Figma 10310:262840 (DRP); native Three.js GLSL background; extracted palette, mask and shader settings; no auth UI; proprietary shader reconstructed |
| 1.1 Sign in | Complete | Layout/🔐 SignIn | 2026-10-31 | Figma 10303:161102 (DRP Flow 1); composes AuthBackground, Logo, Input (lg), Button (lg primary & sm text), and foundations icons; added --shadow-auth-card token |
| 1.2 Sign in · incorrect details | Complete | Layout/🔐 SignIn (story: IncorrectDetails) | 2026-10-31 | Figma 10303:161172 (DRP Flow 1); composes SignIn with Toast banner (type="banners", state="error"), User ID / Password in state="error"; Paragraph/Small/Regular (14px) support note |
| Tabbed Buttons | Complete | Elements/🚥 Tabbed Buttons | 2026-10-27 | Figma 1543:6760; middle and more variants given full borders to match the code (borders checked by hand, not with figma_check_design_parity) |
| Breadcrumbs | Complete | Components/🍞 Breadcrumbs | 2026-10-31 | Figma 2031:39144 & 2031:39096; 4 variant states (default, hover, active, disabled) + demo trail, custom separator, icon swap; borders in Grey/200 (#E4E7EC) |
| Pagination | Complete | Components/📄 Pagination | 2026-10-27 | Figma 347:10062; rebuild from lowest base elements: PageNumber (2608:66376, 12 variants), TruncatedPages (2775:76546), PageIndicator (2609:67848), NavigationControls (2607:66246, 15 variants), PaginationList (2767:76342, 15 variants), full Pagination bar (2767:76362, 15 variants with 5 variations and 4 alignments) |
| DRP / Dashboard | Complete | Layout/📊 Dashboard | 2026-11-01 | Figma 10301:78467; full responsive desktop layout assembling Sidebar (v2, dark-blue), MetricsCard (×4), Approvals Table Card, Contributions ProgressBar Card, Recent Activity, and Quick Actions grid |
| 1.15 Welcome email | Complete | Layout/WelcomeEmail | 2026-11-01 | Figma 10306:12506; email envelope header, logo, salutation, summary box, CTA button, disclaimer, and automated footer |
| Flow 1 Prototype Orchestrator | Complete | Layout/Flow 1 - Prototype | 2026-11-01 | Figma 10303:161102 & 10306:12506; client-side interactive journey connecting Welcome Email → Password Setup → 2FA Setup → Sign In → 2FA OTP → DRP Dashboard, with reviewer controls toolbar |

## Reuse mapping — Pagination (2026-10-27)

| Figma element | Decision | Implementation |
| :--- | :--- | :--- |
| `page number` (`2608:66376`) | genuinely new primitive | `PageNumber` (`size="small" \| "large"`, `shape="square" \| "round"`, 4 states) |
| `truncated pages` (`2775:76546`) | genuinely new primitive | `TruncatedPages` (`size="small" \| "large"`, ellipsis `…`) |
| `page indicator` (`2609:67848`) | genuinely new primitive | `PageIndicator` (14px DM Sans SemiBold text) |
| `navigation controls` (`2607:66246`) | genuinely new primitive | `NavigationControls` (`type`: single, grouped, button, selector; 4 styles) |
| `pagination list` (`2767:76342`) | genuinely new composite | `PaginationList` (auto-truncation, 2px gap, optional single arrows) |
| `Dividers` (`2609:66656`) | existing component as-is | `Divider` (`type="default"`) |
| `Icons` (`chevron-left`, `chevron-right`, `arrow-left`, `arrow-right`) | existing icons as-is | `Icon` (`variant="linear"`, `size={16}`) |
| `Pagination` bar (`2767:76362`) | genuinely new composite | `Pagination` (5 variations, 4 orientations, divider rule, interactive states) |

## Reuse mapping — Dropdowns (rule §0, recorded before coding)

| Figma element | Decision | Component |
| :--- | :--- | :--- |
| Input Frame / Label / Helper Text | existing as-is | `Input` (`size="lg"`) — already h56, r12, 1px neutral-300, gap 12 |
| Avatars | existing as-is | `Avatar` (`type="Image"`, `size="xs"` items / `"sm"` trigger) |
| Toggle (`Type=Checkcircle`) | existing + scoped CSS override | `Toggle` (FormControl) — 16px not 24px; secondary-400 not fmdq-blue |
| `icon / hashtag`, `icon / heart`, chevron, dots | existing as-is | `Icon` (foundations, 418 icons) |
| menu item / header / shortcut / sections / popovers | genuinely new | `src/components/Dropdowns/` |

> **Note.** `Components/🔽 Dropdown` (singular) stories have been removed. `Components/🔽 Dropdowns` (plural) is the rebuild from the elements up and is the current reference.

## Reuse mapping — AuthBackground native shader (2026-10-27)

| Figma element | Decision | Implementation |
| :--- | :--- | :--- |
| Auth background / dotted shader | extend existing component | Replace iframe inside `src/layout/AuthBackground`; preserve optional children slot |
| Primary/900 surface | existing token as-is | `--color-primary-900` (#001633) |
| Dotted pattern vector mask | procedural GPU mask | Extracted rotated lattice: 18.3676 × 17.2058 px, dots 7.3471 × 6.8823 px |
| animated-shader SHADER fill | reuse earlier native Three.js shader approach | Apply extracted named parameters and four exact color tokens; native motion is a reconstruction, not proprietary Figma shader source |
| Focus vignette | scoped native shader | Extracted 1100 × 1000 bounds at (170, 12), navy RGB (0, .0941, .2), alpha .92/.75/0 at 0/.55/1 |

Figma REST token is expired and installed Bridge does not implement DEEP_GET_COMPONENT. Complete layer data and reference screenshot recovered through `figma_execute` (read-only) and `figma_capture_screenshot`. No design layers modified.

Validation: application TypeScript and component ESLint pass. Repository-wide ESLint has pre-existing errors outside AuthBackground. Automated `figma_check_design_parity` returns 403 (expired REST token); not marked parity-complete. Native canvas visually verified in Safari against the Desktop Bridge reference.

Motion refinement (2026-10-27): user-supplied multi-frame references supersede the earlier regular-ribbon interpretation. Replaced travelling sine stripes with continuously evolving 3D domain-warped fold contours, locally varying widths and brightness. Dot geometry, grain and Figma settings remain anchored. Prior 94/100 property parity checked only wrapper properties, not animated shape fidelity.

REST token was subsequently refreshed. Wrapper property parity succeeded at 94/100: only fixed Figma dimensions versus responsive viewport sizing differed. This property check does not validate the animated fold field.

Art-direction update (2026-10-27): gold now reads shared --color-fmdq-gold (#CC9933), motion multiplier is 0.7×, and broad overlapping Gaussian shoulders replace thresholded fold edges for feathered mesh-gradient illumination. These user-requested refinements supersede the original gold fill and edge interpretation.

Coverage refinement (2026-10-27): interpreted reduced gold mass as occasional approximately 90% blue / 10% gold frames. Independently varying fold width reduces coverage in sparse intervals, while a spatial mix of crisp crease cores and feathered shoulders restores fabric definition. Ratio is a visual target, not a measured pixel constraint.

Additional-reference refinement (2026-10-27): introduced occasional low-frequency draped arcs with a bright narrow hem and a one-sided feathered face. Existing small folds also shade asymmetrically. Larger sweeps are gated by coverage and combined using maximum rather than additive blending, preserving sparse intervals, brand gold and the 0.7× speed.

Curvature refinement (2026-10-31): reduced spatial frequency, domain-warp strength and high-frequency surface detail to open tight curls into larger-radius arcs. Narrowed scalar highlight widths proportionally to avoid increasing gold coverage. Crease/feather shading, brand gold and motion speed preserved.

## Reuse mapping — SignIn page (2026-10-31)

| Figma element (Node 10303:161102) | Decision | Implementation |
| :--- | :--- | :--- |
| Background (`10310:262845`) | existing component as-is | `<AuthBackground>` (Three.js GPU GLSL shader) |
| Logo (`10303:161104`) | existing component as-is | `<Logo variant="default" size="md" />` |
| Heading & Subtitle (`10303:161122`) | semantic markup | Card header (20px SemiBold title, 14px Regular subtitle) |
| User ID Input (`10303:161126`) | existing component as-is | `<Input size="lg" label="User ID" placeholder="e.g. USR-90412" leadingIcon={<Icon name="user" variant="bold" size={20} />} hasRightIcon={false} />` |
| Password Input (`10303:161144`) | existing component as-is | `<Input size="lg" label="Password" placeholder="Enter your password" leadingIcon={<Icon name="lock" variant="bold" size={20} />} trailingIcon={<button ...><Icon name="eye" / "eye-slash" variant="bold" size={20} /></button>} />` |
| Forgot password button (`10303:161164`) | existing component as-is | `<Button variant="text" size="sm" buttonType="primary">Forgot password?</Button>` |
| Sign in button (`10303:161167`) | existing component as-is | `<Button variant="primary" size="lg" className="fmdqui-signin__submit-btn">Sign in</Button>` |
| Support caption (`10303:161170`) | semantic markup | Caption with `mailto:support@fmdqgroup.com` |
| Regulatory copyright (`10303:161171`) | semantic markup | 12px neutral-400 SEC caption below card |
| Elevation effect | token addition | Added `--shadow-auth-card: 0px 0px 220px -35px rgba(223, 174, 77, 1);` |

## Reuse mapping — TwoStepVerification (2026-10-31)

| Figma element (Nodes 10303:161632, 10306:193869, 10308:210820, 10308:210896, 10306:12638) | Decision | Implementation |
| :--- | :--- | :--- |
| Background (`10310:262860`) | existing component as-is | `<AuthBackground>` (Three.js GPU GLSL shader) |
| Logo (`10303:161634`) | existing component as-is | `<Logo width={166} />` |
| Security badge (`10303:161665`) | composite from primitives | 56px circular container (`--color-primary-50`) + `<Icon name="shield-tick" variant="bold" size={28} color="#1D326D" />` |
| Step Badge (`10306:12678`) | existing component as-is | `<Badge color="blue" type="filled" size="md">Step 2 of 2</Badge>` |
| Heading & Subtitle (`10303:161668`) | semantic markup | 20px SemiBold title, 14px Regular subtitle |
| Attempt alert banners (`10308:210847`, `10308:210904`) | existing component as-is | `<Toast type="banners" state="warning" title="..." subtext="..." />` |
| 6-digit code input (`10303:161671`) | new component structure | 6 × `52×60px` digit boxes, auto-focus, paste distribution, error states |
| Inline error message (`10306:193912`) | semantic markup | 14px Regular `#BA110B` centered error text |
| Primary Action (`10303:161681`) | existing component as-is | `<Button variant="primary" size="lg" fullWidth>Verify and continue</Button>` |
| Resend link / countdown (`10303:161684`) | semantic markup | 12px Regular with countdown or underline button |
| Back to sign in (`10303:161685`) | existing component as-is | `<Button variant="text" size="sm" leadingIcon={<Icon name="arrow-left" variant="linear" size={16} />}>Back to sign in</Button>` |
| Regulatory copyright (`10303:161645`) | semantic markup | 12px neutral-400 SEC caption below card |

## Reuse mapping — ForgotPassword (2026-10-31)

| Figma element (Nodes 10303:161451, 10303:161517) | Decision | Implementation |
| :--- | :--- | :--- |
| Background (`10310:262865`, `10310:262870`) | existing component as-is | `<AuthBackground>` (Three.js GPU GLSL shader) |
| Logo (`10303:161453`, `10303:161519`) | existing component as-is | `<Logo variant="default" size="md" />` |
| Lock badge (`10303:161484`) | composite from primitives | 56px circular container (`--color-primary-50`) + `<Icon name="lock" variant="bold" size={28} color="#1D326D" />` |
| Mail-check badge (`10303:161550`) | composite from primitives | 56px circular container (`--color-primary-50`) + `<Icon name="mail-check" variant="bold" size={28} color="#1D326D" />` |
| Heading & Subtitle (`10303:161487`, `10303:161553`) | semantic markup | 20px SemiBold title, 14px Regular subtitle |
| User ID Input (`10303:161490`) | existing component as-is | `<Input size="lg" label="User ID" placeholder="e.g. USR-90412" leadingIcon={<Icon name="user" size={20} />} hasRightIcon={false} />` |
| Send reset link button (`10303:161508`) | existing component as-is | `<Button variant="primary" size="lg" fullWidth>Send reset link</Button>` |
| Back to sign in (mode 'request', `10303:161511`) | existing component as-is | `<Button variant="text" size="sm" iconStyle="leading icon" icon={<Icon name="arrow-left" size={16} />}>Back to sign in</Button>` |
| Back to sign in (mode 'sent', `10303:161556`) | existing component as-is | `<Button variant="secondary" size="lg" fullWidth>Back to sign in</Button>` |
| Resend link button (`10303:161560`) | existing component as-is | `<Button variant="text" size="sm">Resend link</Button>` |
| Regulatory copyright (`10303:161464`, `10303:161530`) | semantic markup | 12px neutral-400 SEC caption below card |

## Reuse mapping — SetPassword (2026-10-31)

| Figma element (Nodes 10303:161691, 10306:193920, 10306:12547, 10306:194016) | Decision | Implementation |
| :--- | :--- | :--- |
| Background (`10310:262875`) | existing component as-is | `<AuthBackground>` (Three.js GPU GLSL shader) |
| Logo (`10303:161693`) | existing component as-is | `<Logo variant="default" size="md" />` |
| Step Badge (`10306:12547`) | existing component as-is | `<Badge color="blue" type="filled" size="md">Step 1 of 2</Badge>` |
| Clock badge (`10306:194016`) | composite from primitives | 56px circular container (`--color-primary-50`) + `<Icon name="clock" variant="bold" size={28} color="#1D326D" />` |
| Heading & Subtitle (`10303:161724`) | semantic markup | 20px SemiBold title, 14px Regular subtitle |
| Password Inputs (`10303:161728`, `10303:161746`) | existing component as-is | `<Input size="lg" type="password" ... />` with eye toggle button |
| Password rules checklist (`10303:161765`) | composite from primitives | 4-point real-time validator with bold `check-circle` (`#04802E`) and `minus-circle` (`#98A2B3`) |
| Primary action (`10303:161783`) | existing component as-is | `<Button variant="primary" size="lg" fullWidth>` ("Update password" / "Continue" / "Request a new link") |
| Back to sign in | existing component as-is | `<Button variant="text" size="sm">Back to sign in</Button>` |
| Regulatory copyright (`10303:161704`) | semantic markup | 12px neutral-400 SEC caption below card |

## Reuse mapping — AccountLocked (2026-10-31)

| Figma element (Nodes 10303:161403, 10308:210995) | Decision | Implementation |
| :--- | :--- | :--- |
| Background (`10310:262855`) | existing component as-is | `<AuthBackground>` (Three.js GPU GLSL shader) |
| Logo (`10303:161405`) | existing component as-is | `<Logo variant="default" size="md" />` |
| Security Lock badge (`10303:161436`) | composite from primitives | 56px circular container (`--color-error-50`) + `<Icon name="lock" variant="bold" size={28} color="#CB1A14" />` |
| Heading & Subtitle (`10303:161439`) | semantic markup | 20px SemiBold title, 14px Regular subtitle |
| Email support button (`10303:161442`) | existing component as-is | `<Button variant="primary" size="lg" fullWidth>Email support@fmdqgroup.com</Button>` |
| Back to sign in (`10303:161445`) | existing component as-is | `<Button variant="text" size="sm" iconStyle="leading icon" icon={<Icon name="arrow-left" size={16} />}>Back to sign in</Button>` |
| Regulatory copyright (`10303:161416`) | semantic markup | 12px neutral-400 SEC caption below card |

## Reuse mapping — Breadcrumbs (2026-10-31)

| Figma element (Nodes 2031:39144, 2031:39096) | Decision | Implementation |
| :--- | :--- | :--- |
| `Breadcrumb` item | genuinely new component | `src/components/Breadcrumbs/BreadcrumbItem.tsx` |
| `Breadcrumbs` trail composite | genuinely new composite | `src/components/Breadcrumbs/Breadcrumbs.tsx` |
| Leading Icon (`Icon#3892:0`) | existing component as-is | `<Icon name={icon} size={20} />` from `src/foundations/icons` |
| Separator (`/`) | semantic text / node | 20×20px container centered in 14px medium |
| Top/Bottom Dividers (`has borders`) | CSS borders | 1px border-top and border-bottom in `--color-neutral-200` (`#E4E7EC`) |
| Typography | existing tokens | DM Sans Medium (500), 14px (`--font-size-p-sm`), 20.3px line-height, -0.56px letter-spacing |
| Default State | existing tokens | `--color-neutral-500` (`#667185`) label/icon, `--color-neutral-300` (`#D0D5DD`) separator |
| Hover State | existing tokens | `--color-primary-300` (`#3D89DF`) label/icon, `--color-neutral-400` (`#98A2B3`) separator |
| Active State | existing tokens | `--color-secondary-500` / gold (`#CC9933`) label, `--color-primary-500` (`#0D5EBA`) icon, `--color-neutral-400` (`#98A2B3`) separator |
| Disabled State | existing tokens | `--color-neutral-400` (`#98A2B3`) label/icon/separator |

## Reuse mapping — DRP / Dashboard (2026-11-01)

| Figma element (Node 10301:78467) | Decision | Implementation |
| :--- | :--- | :--- |
| Sidebar (`10301:78468`) | existing component as-is | `<Sidebar variant="2" theme="dark-blue">` (`src/components/Sidebar`) |
| Page header (`10301:79039`) | composite from existing | Title (24px DM Sans Bold), Subtitle (14px Regular), `<Button variant="secondary" size="sm">` + `<Button variant="primary" size="sm">` |
| Metrics Cards (`10301:79056`) | existing component as-is | 4 × `<MetricsCard orientation="left">` (`src/components/Metrics`) with gold (`#CC9933`) bold icons |
| Approvals Card & Table (`10301:79208`) | existing components as-is | `<Card>`, `<Table>`, `<TableRow>`, `<TableCell>` (`badge`, `text-stack`, `text`, `actions`), `<Badge color="blue">`, `<Button>` |
| Contributions Card (`10301:79209`) | existing components as-is | `<Card>`, 4 × `<ProgressBar size="lg" hasPercentages percentagePosition="bottom">`, `<Button>` |
| Recent Activity Card (`10301:81893`) | existing components as-is | `<Card>`, `<Badge color="success" \| "error" type="filled">`, typography |
| Quick Actions Card (`10301:81894`) | existing components as-is | `<Card>`, 2×2 grid with 4 × `<Button variant="secondary" size="sm">` using bold icons (`user-tick`, `coin-swap`, `calendar-tick`, `upload`) |
| Desktop Page Layout (`10301:78467`) | genuinely new composite | `src/layout/Dashboard/` (`Dashboard.tsx`, `Dashboard.css`, `Dashboard.stories.tsx`, `Dashboard.docs.mdx`) |

## Icon Variant Implementation Rule (`variant="bold"` vs `variant="linear"`)

- **Figma Design Pattern**: In Figma, all content icons and form field icons (e.g., `user`, `lock`, `eye`, `eye-slash`, `mail-check`, `shield-tick`, `clock`, `check-circle`) use the **bold** variant. Directional controls (`arrow-left`, `arrow-right`, `chevron-left`, `chevron-right`, `chevron-down`) and dismissal (`close`) use the **linear** variant.
- **Code Default Pitfall**: The `<Icon />` component in `src/foundations/icons/` defaults to `variant="linear"` when the `variant` prop is omitted.
- **Mandatory Practice**: Always check the Figma icon variant style. When implementing form inputs, cards, or status indicators where Figma uses bold icons, explicitly pass `variant="bold"` (e.g. `<Icon name="user" variant="bold" size={20} />`) to maintain 1:1 visual parity and prevent regression back to thin stroke icons.

---

# FMDQ Design System Global Engineering Guidelines
*(Auto-Layout, Spacing, Responsiveness & Visual Parity Standards)*

These rules apply universally across all components, patterns, and composite page layouts in the FMDQ Design System. They codify critical engineering corrections and prevent design drift during implementation.

---

### 1. Auto-Layout Intermediate Containers & Vertical Spacing

- **Figma Auto-Layout Hierarchy Must Be Preserved in DOM**:
  In Figma, vertical cards and compound components group related elements inside intermediate sub-frames (e.g. an internal `Metrics Container` holding a metric value and its subtext/badge with a 12px gap, placed 32px below the header).
- **The `justify-content: space-between` Anti-Pattern**:
  Never flatten intermediate sub-frames into direct siblings and apply CSS `justify-content: space-between`. When cards have fixed heights or flexible grid heights, `space-between` distributes remaining space equally among all children, causing values and badges to float away from each other and creating severe vertical drift (e.g., 15px top / 29px bottom instead of Figma's 32px top / 12px internal gap).
- **Mandatory Implementation Rule**:
  Always mirror Figma's sub-frame structure with semantic container elements:
  ```css
  /* Container maintains explicit Figma spacing tokens */
  .fmdqui-<component>__metrics-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12, 12px);
    margin-top: auto; /* Or exact margin-top: var(--spacing-32, 32px) matching Figma */
  }
  ```
  Only use `justify-content: space-between` if the Figma design inspect clearly shows the parent frame layout mode is set to "Space between" (`SPACE_BETWEEN`).

---

### 2. Cross-Axis Alignment & Unwanted Bottom Spacing

- **The Flex Stretch Pitfall (`align-items: stretch`)**:
  When placing cards side-by-side in flex or grid rows, CSS defaults to `align-items: stretch`. If one card expands because of multi-line wrapping, dynamic data, or taller content, the adjacent card stretches downwards to match its height. This creates empty, unstyled whitespace at the bottom of the shorter card (often misdiagnosed as unintended extra padding).
- **Mandatory Implementation Rule**:
  Row containers pairing asymmetric or independent content cards must explicitly set `align-items: flex-start;`. Shorter cards should specify `height: fit-content;`:
  ```css
  .fmdqui-<layout>__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-24, 24px);
    align-items: flex-start; /* Prevents shorter cards stretching artificially */
  }

  .fmdqui-<component>--compact {
    height: fit-content;
  }
  ```
  Never leave arbitrary gaps or allow flex stretch to create artificial whitespace at the bottom of card panels.

---

### 3. Multi-Breakpoint Responsive Strategy & Grid Degradation

High-density financial and administrative layouts require a structured, multi-tier degradation model rather than a simplistic two-state mobile/desktop switch.

| Breakpoint Tier | Viewport Width | Layout Behaviour & Transformations |
| :--- | :--- | :--- |
| **Wide Desktop** | `> 1360px` | Full 4-column metric grid (`repeat(4, 1fr)`). Split content rows (e.g. 2fr / 1fr). Parallel activity and action panels side-by-side. Navigation expanded (272px). |
| **Compact Desktop** | `961px – 1360px` | Metric cards switch to a balanced **2×2 grid** (`repeat(2, 1fr)`). Primary tables expand to 100% width. Secondary summary/progress cards stack underneath. Recent activity and quick action panels remain side-by-side (50/50) with clean text wrap. |
| **Tablet / Rail Collapse** | `681px – 960px` | Navigation sidebar collapses to an **82px icon rail** to preserve content canvas width. Activity and quick action cards stack into a **1×2 vertical column**. Action buttons in headers wrap below title rows before squishing. |
| **Mobile / Compact** | `≤ 680px` | Metric cards collapse to a **1×4 single-column stack** (`1fr`). Button groups expand to full-width touch targets. Container paddings adjust to compact tokens (`--spacing-16` / `--spacing-12`). |

- **Mandatory Implementation Rule**:
  Plan and test responsive degradation at each threshold. Ensure that every multi-column grid has an intermediate 2×2 or 2-column fallback before dropping to single-column mobile viewports.

---

### 4. Button Typography & Flex Integrity in Responsive Contexts

- **The Text Wrapping Defect**:
  In flex headers, toolbars, and search bars, browser flex algorithms will shrink action buttons before media queries trigger, causing button text to wrap into awkward multiple lines (e.g. `"Download\nsummary"` or `"Review\napprovals →"`).
- **Mandatory Implementation Rule**:
  All button components in `.fmdqui-button` must enforce:
  ```css
  .fmdqui-button {
    white-space: nowrap !important;
    flex-shrink: 0 !important;
  }
  ```
- **Header & Toolbar Wrapping Rule**:
  Containers holding buttons alongside titles or filter bars must set `display: flex; flex-wrap: wrap; gap: <px>; flex-shrink: 0;`. Set responsive breakpoints early enough (e.g. `@media (max-width: 800px)`) so that action groups cleanly wrap below the title block before any horizontal compression or clipping occurs.

---

### 5. Composite & Two-Tone Typography Parity (`getStyledTextSegments`)

- **Figma Design Pattern**:
  Figma frequently formats a single text layer with multiple styled text runs (e.g. an Activity row with `"Category · "` in Grey/500 Regular, followed by `"Item Name"` in Grey/900 Medium/Bold, and a timestamp in Grey/400).
- **The Flat Text Anti-Pattern**:
  Treating composite text as a single string and applying a uniform color loses the entire visual hierarchy designed in Figma.
- **Mandatory Implementation Rule**:
  Always inspect text nodes for styled segments using `getStyledTextSegments` in Figma MCP. When multi-color text runs are present, structure them in markup as distinct spans with exact semantic tokens:
  ```tsx
  <span className="fmdqui-activity-row__text">
    <span className="fmdqui-activity-row__category">{category} · </span>
    <span className="fmdqui-activity-row__detail">{detail}</span>
  </span>
  ```
  ```css
  .fmdqui-activity-row__category {
    color: var(--color-neutral-500, #667185);
  }
  .fmdqui-activity-row__detail {
    color: var(--color-neutral-900, #101928);
  }
  ```

---

### 6. Navigation Rails & Collapsed Item Centering

- **Centering Inside Collapsed Frames (82px Rail)**:
  When a navigation bar or sidebar collapses into an icon-only rail (82px width), child items (profile avatars, menu items, toggles) must be strictly centered.
- **The Align-Items Pitfall**:
  Setting `align-items: center` on the rail container is insufficient because child `<button>`, `<a>`, or `<div>` elements typically default to `width: 100%; display: flex; justify-content: flex-start;`. This pushes icons against the left edge with standard left padding.
- **Mandatory Implementation Rule**:
  In collapsed navigation states, explicitly center every child interactive element:
  ```css
  .fmdqui-sidebar--collapsed .fmdqui-sidebar__item-button,
  .fmdqui-sidebar--collapsed .fmdqui-sidebar__profile {
    width: 100%;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin: 0 auto !important;
  }
  ```
- **Ergonomics & Expand Affordance**:
  Collapsed navigation rails should allow clicking anywhere on the collapsed surface to re-expand the navigation, complemented by an explicit chevron affordance in brand gold (`--color-secondary-500` / `#CC9933`).

---

### 7. Sidebar Geometry & Corner Radius Asymmetry

- **Viewport Boundary Rule**:
  Navigation panels and structural sidebars docked to the edge of the viewport must **never** have uniform border-radius on all four corners. Corners touching the window or viewport edge must be `0px`.
- **Mandatory Implementation Rule**:
  For left-anchored sidebars, apply:
  ```css
  .fmdqui-sidebar {
    border-radius: 0 var(--radius-12, 12px) var(--radius-12, 12px) 0;
  }
  ```
  Top-left and bottom-left radii must remain `0px` to maintain seamless edge alignment with the screen.

---

### 8. Card Elevation & Hover State Synchronization

- **Unified Card Elevation Standards**:
  All card containers (standard content cards, metric cards, table wrappers) within the design system must follow consistent rest and hover elevation rules.
- **Elevation Tokens**:
  - **Rest / Default State**: Light soft elevation (`box-shadow: var(--shadow-soft-xsm, 0px 1px 2px 0px rgba(16, 24, 40, 0.05));`) with a subtle 1px border (`var(--color-neutral-200, #E4E7EC)`).
  - **Hover State**: Suppress the drop shadow (`box-shadow: none;`) and highlight the border (`border-color: var(--color-primary-600, #0D5EBA);`).
- **Mandatory Implementation Rule**:
  Never invert this pattern by leaving a card flat at rest and adding an abrupt shadow on hover, unless explicitly dictated by a unique modal/popover spec. All card components in a layout must share identical elevation tokens and hover dynamics.

---

### 9. Action Grids & Micro-Interactions

- **Exact Grid Gaps**:
  Matrices of action buttons (e.g. 2×2 quick action grids) must strictly match Figma's auto-layout gaps:
  ```css
  .fmdqui-action-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px; /* Exact 4px horizontal and vertical gap from Figma */
  }
  ```
- **Border Tokens on Tinted Buttons**:
  Secondary light-tinted buttons used in quick actions or toolbars must use the exact primary border token (`--color-primary-75` / `#C6DDF7`), rather than defaulting to generic neutral gray borders (`#E4E7EC`).

---

### 10. Icon Color Inheritance in Popovers & Dark Backgrounds

- **Explicit Icon Color Prop**:
  Icons inside flyout menus, account selectors, and contextual popovers must explicitly declare their token color via the `color` prop or targeted CSS rules, rather than relying on ambiguous text color cascades.
- **Mandatory Practice**:
  - Primary menu items: `color="var(--color-primary-700)"` (`#1D326D`).
  - Destructive / Log out actions: `color="var(--color-error-600)"` (`#D42620` / `#BA110B`).
  - Active navigation indicators: `color="var(--color-secondary-500)"` (`#CC9933`).



