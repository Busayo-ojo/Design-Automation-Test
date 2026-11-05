import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipTrigger } from './Tooltip';
import { TOOLTIP_POINTER_POSITIONS, type TooltipTheme } from './tooltipUtils';
import { Button } from '../../elements/Button';
import { Icon } from '../../foundations/icons';

/* ───────────────────────────────────────────────────────────────────────────
   Figma: page "✤ Tooltip ⚜️" — COMPONENT_SET 6237:23991 (24 variants)
   `pointer position` (12) × `theme` (2), plus 5 BOOLEAN properties.
   ─────────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Tooltip> = {
  title: 'Components/💬 Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Per the Figma documentation frame, tooltips are "small, informative overlays or pop-up windows that appear when users hover over an element… used to provide additional context, explanations, or brief descriptions of interface elements." Composes the existing Button element for its CTAs.',
      },
    },
  },
  argTypes: {
    pointerPosition: {
      control: 'select',
      options: TOOLTIP_POINTER_POSITIONS,
      description: 'Figma `pointer position` variant — edge + alignment',
      table: { category: 'Variant' },
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Figma `theme` variant',
      table: { category: 'Variant' },
    },
    hasTitle: { control: 'boolean', description: 'Figma `has title`', table: { category: 'Boolean Controls' } },
    hasCloseButton: { control: 'boolean', description: 'Figma `has close button`', table: { category: 'Boolean Controls' } },
    hasButtons: { control: 'boolean', description: 'Figma `has buttons`', table: { category: 'Boolean Controls' } },
    hasSecondaryCta: { control: 'boolean', description: 'Figma `has secondary CTA`', table: { category: 'Boolean Controls' } },
    hasPrimaryCta: { control: 'boolean', description: 'Figma `has primary CTA`', table: { category: 'Boolean Controls' } },
    hasPointer: { control: 'boolean', description: 'Hide the arrow (not a Figma variant)', table: { category: 'Boolean Controls' } },
    title: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    secondaryLabel: { control: 'text', table: { category: 'Content' } },
    primaryLabel: { control: 'text', table: { category: 'Content' } },
  },
};
export default meta;

// ─── Local presentation helpers (stories only) ─────────────────────────────

const Wrap: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title, note, children,
}) => (
  <section style={{ marginBottom: 48, fontFamily: 'DM Sans, sans-serif' }}>
    <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: 'var(--color-neutral-900)' }}>{title}</h3>
    {note && <p style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-500)' }}>{note}</p>}
    <div style={{ marginTop: 16 }}>{children}</div>
  </section>
);

const Cell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{label}</code>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   1 · ALL FIGMA VARIANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const matrix = (theme: TooltipTheme) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 40, justifyContent: 'start' }}>
    {TOOLTIP_POINTER_POSITIONS.map((pos) => (
      <Cell key={pos} label={`pointer position=${pos}`}>
        <Tooltip pointerPosition={pos} theme={theme} />
      </Cell>
    ))}
  </div>
);

export const AllVariants: StoryObj = {
  name: 'All 24 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'The complete `pointer position` × `theme` matrix. Figma names the two axes differently on each axis pair: `top-left` means the pointer sits on the **top edge, at the left**, while `left-top` means the **left edge, at the top** — so the second token is an alignment, not an edge.',
      },
    },
  },
  render: () => (
    <div>
      <Wrap title="theme=light" note="Figma 6237:23991 · 12 pointer positions">{matrix('light')}</Wrap>
      <Wrap title="theme=dark" note="primary-900 surface, white title, neutral-300 body, 4px ring">
        {matrix('dark')}
      </Wrap>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   2 · BOOLEAN PROPERTIES
   ═══════════════════════════════════════════════════════════════════════════ */

export const BooleanProperties: StoryObj = {
  name: 'Boolean properties',
  parameters: {
    docs: {
      description: {
        story:
          'The five Figma BOOLEAN properties. `has buttons` gates the whole CTA row; the two CTA booleans gate each button individually. With a single CTA, Figma\'s space-between layout leaves it at the start.',
      },
    },
  },
  render: () => (
    <Wrap title="Figma boolean properties" note="has title · has close button · has buttons · has primary CTA · has secondary CTA">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 40, justifyContent: 'start' }}>
        <Cell label="all on (default)"><Tooltip /></Cell>
        <Cell label="has title=false"><Tooltip hasTitle={false} /></Cell>
        <Cell label="has close button=false"><Tooltip hasCloseButton={false} /></Cell>
        <Cell label="has buttons=false"><Tooltip hasButtons={false} /></Cell>
        <Cell label="has secondary CTA=false"><Tooltip hasSecondaryCta={false} /></Cell>
        <Cell label="has primary CTA=false"><Tooltip hasPrimaryCta={false} /></Cell>
        <Cell label="text only"><Tooltip hasTitle={false} hasCloseButton={false} hasButtons={false} /></Cell>
        <Cell label="no pointer"><Tooltip hasPointer={false} /></Cell>
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   3 · INTERACTIVE
   ═══════════════════════════════════════════════════════════════════════════ */

export const Interactive: StoryObj = {
  name: 'Interactive / Hover to show',
  parameters: {
    docs: {
      description: {
        story:
          'Hover a trigger and pause — the tooltip appears after a short delay. Move the mouse briefly away and back and it stays; move away properly and it dismisses after a grace period; scroll and it hides immediately. All four behaviours come straight from the Figma Best Practices frame, which also notes that tooltips do not receive input focus.',
      },
    },
  },
  render: () => (
    <Wrap
      title="Hover behaviour"
      note="openDelay 400ms · closeDelay 200ms · hides on scroll"
    >
      <div style={{ display: 'flex', gap: 120, alignItems: 'flex-start', padding: '8px 0 220px' }}>
        <TooltipTrigger pointerPosition="top-left" title="Hover me" hasButtons={false}>
          <Button variant="secondary" size="sm">Hover for a tooltip</Button>
        </TooltipTrigger>

        <TooltipTrigger
          pointerPosition="top-center"
          theme="dark"
          title="Dark theme"
          description="The dark theme uses the primary-900 surface with a white title."
        >
          <Button variant="primary" size="sm">Dark tooltip</Button>
        </TooltipTrigger>

        <TooltipTrigger
          pointerPosition="left-top"
          title="Icon help"
          description="Tooltips help users understand the meaning or purpose of icons."
          hasButtons={false}
        >
          <span style={{ display: 'inline-flex', cursor: 'help', color: 'var(--color-neutral-500)' }}>
            <Icon name="info-circle" variant="bold" size={20} />
          </span>
        </TooltipTrigger>
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   4 · PLAYGROUND
   ═══════════════════════════════════════════════════════════════════════════ */

export const Playground: StoryObj<typeof Tooltip> = {
  args: {
    pointerPosition: 'top-left',
    theme: 'light',
    hasTitle: true,
    hasCloseButton: true,
    hasButtons: true,
    hasSecondaryCta: true,
    hasPrimaryCta: true,
    hasPointer: true,
    title: 'This is a tooltip',
    description:
      'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function.',
    secondaryLabel: 'Secondary CTA',
    primaryLabel: 'Primary CTA',
  },
};
