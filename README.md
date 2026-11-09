# @fmdq/ui

FMDQ Reusable UI Component Library — a standardized React component system designed to ensure consistency, scalability, and efficiency across FMDQ digital platforms.

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/WebMaster0-1/Design-Automation-Test.git
cd Design-Automation-Test
npm install
```

### 2. Run the Design System Portal

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to browse all components, docs, and interactive playgrounds.

### 3. Use as a Library

```tsx
import { Button, Input } from '@fmdq/ui';
import '@fmdq/ui/style.css';

export default function CustomForm() {
  return (
    <form>
      <Input placeholder="Enter trade quantity..." />
      <Button variant="primary">Submit Data</Button>
    </form>
  );
}
```

---

## Component Inventory

|Everything below is exported from `@fmdq/ui`. The source of truth is [`src/index.ts`](src/index.ts); open Storybook for live examples and props.
 
| Category | Components |
|----------|-----------|
| **Form controls** | Button, ButtonGroup, Input, InputDropdown, Textarea, Checkbox, Radio, Checkcircle, Switch, Toggle, Calendar, FileUpload |
| **Data display** | Table, ColumnMenu, Badge, Chip, Avatar, Typography, Divider, Logo |
| **Data visualization** | LineChart, MultiSeriesLineChart, BarChart, StackedBarChart, PieChart, DonutChart, RadarChart, MetricsCard, MetricsCardStatus, MetricsComplianceCard |
| **Navigation** | Sidebar, Tabs, Breadcrumbs, Pagination, Dropdowns |
| **Feedback & overlays** | Modal, Toast, Tooltip, ProgressBar |
| **Utilities** | Scrollbar, MiscIcon and the icon set |
| **Layout** | AppLayout, TopBar, PageHeader, EmptyState, Dashboard |
| **Page templates** | AuthBackground, SignIn, TwoStepVerification, ForgotPassword, SetPassword, AccountLocked, WelcomeEmail, Flow1Prototype |
 
### Deprecated
 
| Component | Use instead |
|-----------|-------------|
| `Dropdown` | `Dropdowns` |
| `NavMenu` | `Sidebar` |
 
See the Migration Guide in Storybook for upgrade steps.

---

## Figma-to-Code Pipeline

This project includes an automated pipeline to sync design tokens and component specs directly from Figma into the codebase.

### Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials:
   - `FIGMA_ACCESS_TOKEN` — Generate at [Figma Account Settings](https://www.figma.com/settings) → Personal Access Tokens
   - `FIGMA_FILE_KEY` — The key from your Figma file URL (`https://www.figma.com/file/<KEY>/...`)

### Pipeline Commands

| Command | Description |
|---------|------------|
| `npm run figma:sync` | Full sync — extract tokens + components from Figma |
| `npm run figma:tokens` | Extract tokens only (colors, typography, effects) |
| `npm run figma:dry-run` | Preview what would be extracted without writing files |
| `npm run sync:git` | Validate TypeScript, commit, and push changes |
| `npm run sync:git:dry` | Dry-run the git sync (show what would happen) |
| `npm run typecheck` | Run TypeScript validation (`tsc --noEmit`) |

### Pipeline Architecture

```
 ┌──────────┐     ┌────────────────────┐     ┌──────────────┐
 │  Figma   │────▶│ figma-extractor.mjs│────▶│ tokens.css   │
 │  API     │     │ (scripts/)         │     │ tokens.json  │
 └──────────┘     └────────────────────┘     └──────────────┘
                           │                         │
                           ▼                         ▼
                  ┌────────────────────┐     ┌──────────────┐
                  │  React Components  │────▶│  Storybook   │
                  │  (src/components/) │     │  localhost    │
                  └────────────────────┘     └──────────────┘
                           │
                           ▼
                  ┌────────────────────┐
                  │  git-sync.mjs      │────▶ GitHub Push
                  │  (scripts/)        │
                  └────────────────────┘
```

### MCP Servers

The project exposes two MCP (Model Context Protocol) servers for AI-assisted development:

| Server | File | Purpose |
|--------|------|---------|
| **Storybook** | `mcp/storybook.mjs` | Health checks, entry listing, story inspection |
| **Figma** | `mcp/figma.mjs` | Style extraction, component listing, token diff |

---

## Development

```bash
npm run dev          # Start Vite dev server
npm run build        # Build library (UMD + ES modules)
npm run storybook    # Start Storybook dev server
npm run typecheck    # TypeScript validation
npm run lint         # ESLint check
```

## Features

- **Brand Accurate**: Built explicitly mimicking the internal FMDQ Figma design language.
- **Enterprise Scale**: Includes layouts (TopBar, AppLayout, PageHeader) to rapidly scaffold complex SaaS applications.
- **Figma Automation**: Automated pipeline to keep tokens and components in sync with the design source of truth.
- **Vite & TS Setup**: Fully bundled via Vite with comprehensive TypeScript definitions emitted.
- **MCP Integration**: AI-agent-ready inspection servers for both Storybook and Figma.
- **Accessible & Tested**: (Ongoing) Storybook integrated testing and coverage.
