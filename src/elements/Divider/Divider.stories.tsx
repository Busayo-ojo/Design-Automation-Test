import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Button } from '../Button';

const meta: Meta<typeof Divider> = {
  title: 'Elements/➖ Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: `
### FMDQ Design System - Divider (Matching Figma \`✤ Dividers\` 2200:56191)

Dividers create clear visual divisions between sections, content blocks, or elements:
- **Default**: Clean 1px horizontal rule.
- **With Icon**: Centered icon with 1px rule spanning across.
- **With Label**: 14px regular label on the left with 1px rule extending to the right.
- **With Title Only**: Centered 18px title with 1px rule spanning across.
- **With Button Only**: Centered action button (\`+ Label\`) with 1px rule spanning across.
- **With Title and Button**: 18px title on the left, 1px rule in the middle, action button (\`+ Label\`) on the right.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'default',
        'with icon',
        'with label',
        'with title only',
        'with button only',
        'with title and button',
      ],
      description: 'Divider variant matching Figma "type" property',
      table: { category: 'Variant' },
    },
    label: {
      control: 'text',
      description: 'Label / Button text (Figma: "Label" with "+" icon in button element)',
      table: { category: 'Content' },
    },
    title: {
      control: 'text',
      description: 'Title text for title variants (Figma: 18px Regular #101928)',
      table: { category: 'Content' },
    },
    button: {
      control: 'text',
      description: 'Custom button text or custom element override',
      table: { category: 'Content' },
    },
    hasButtonIcon: {
      control: 'boolean',
      description: 'Whether button element includes leading "+" icon (Figma: button-icon)',
      table: { category: 'Button' },
    },
    asButton: {
      control: 'boolean',
      description: 'Render label as an interactive button element (+ Label)',
      table: { category: 'Button' },
    },
    contentPosition: {
      control: 'radio',
      options: ['left', 'center'],
      description: 'Override content alignment position',
      table: { category: 'Layout' },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: { category: 'Layout' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ─── 1. Default Interactive Story (With Controls) ─────────────────────────────

export const Default: Story = {
  args: {
    type: 'with button only',
    label: 'Label',
    hasButtonIcon: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '640px', padding: '32px', background: '#FFFFFF', borderRadius: '12px' }}>
        <p style={{ margin: '0 0 16px', color: '#667185', fontSize: '14px' }}>Section or content block above</p>
        <Story />
        <p style={{ margin: '16px 0 0', color: '#667185', fontSize: '14px' }}>Section or content block below</p>
      </div>
    ),
  ],
};

// ─── 2. Button Element Pill Story (Matching User Screenshot) ──────────────────

export const ButtonElementPill: Story = {
  name: 'Button Element (+ Label)',
  args: {
    type: 'with button only',
    label: 'Label',
    hasButtonIcon: true,
  },
  render: (args) => (
    <div style={{ width: '640px', padding: '32px', background: '#FFFFFF', borderRadius: '12px' }}>
      <Divider {...args} />
    </div>
  ),
};

// ─── 3. Complete Figma Dividers Matrix (Matching Component Set 2200:56191) ────

export const FigmaVariantsMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
        width: '640px',
        padding: '36px',
        background: '#FFFFFF',
        border: '1px dashed #D0D5DD',
        borderRadius: '16px',
      }}
    >
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Type = Default (1px Line)
        </div>
        <Divider type="default" />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Type = With Icon (Centered)
        </div>
        <Divider type="with icon" />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Type = With Label (Left Label, Line to Right)
        </div>
        <Divider type="with label" label="Continue" />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Type = With Title Only (Centered 18px Title)
        </div>
        <Divider type="with title only" title="Continue" />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Type = With Button Only (Centered + Label Button Element)
        </div>
        <Divider type="with button only" label="Label" />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Type = With Title and Button (Left Title, Middle Line, Right + Label Button)
        </div>
        <Divider
          type="with title and button"
          title="Continue"
          label="Label"
        />
      </div>
    </div>
  ),
};

// ─── 4. Vertical Divider ──────────────────────────────────────────────────────

export const VerticalDivider: Story = {
  render: () => (
    <div style={{ display: 'inline-flex', alignItems: 'center', height: '40px', padding: '16px 24px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
      <Button variant="grey" size="sm">Action 1</Button>
      <Divider orientation="vertical" />
      <Button variant="grey" size="sm">Action 2</Button>
      <Divider orientation="vertical" />
      <Button variant="primary" size="sm">Submit</Button>
    </div>
  ),
};
