import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/📝 Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### FMDQ Design System - Textarea (Matching Figma \`✤ Textarea\` 10376:338931)

Multi-line text input supporting comprehensive design system states, sizes, labels, helper text, and character counters.
- **Sizes**: \`sm\` (88px frame), \`md\` (120px frame), \`lg\` (168px frame).
- **States**: \`default\`, \`hover\`, \`focused\`, \`typing\`, \`filled\`, \`error\`, \`success\`, \`disabled\`, \`read only\`.
- **Anatomy**: Label (with optional required indicator), rounded 12px frame, and a footer featuring helper text and character count.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Frame height size (sm: 88px, md: 120px, lg: 168px)',
      table: { category: 'Dimensions' },
    },
    state: {
      control: 'select',
      options: [
        'default',
        'hover',
        'focused',
        'typing',
        'filled',
        'error',
        'success',
        'disabled',
        'read only',
      ],
      description: 'Figma component state',
      table: { category: 'State' },
    },
    label: {
      control: 'text',
      description: 'Label displayed above textarea',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder prompt text',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Supporting explanatory text in footer',
      table: { category: 'Content' },
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Whether to show live character count in footer',
      table: { category: 'Footer' },
    },
    maxLength: {
      control: 'number',
      description: 'Maximum permitted characters',
      table: { category: 'Footer' },
    },
    required: {
      control: 'boolean',
      description: 'Marks field as required with red asterisk',
      table: { category: 'Validation' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to 100% parent width',
      table: { category: 'Dimensions' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    readOnly: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  args: {
    size: 'sm',
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    showCharacterCount: true,
    maxLength: 500,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ─── 1. Interactive Default Story ─────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '400px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
      <Textarea {...args} />
    </div>
  ),
};

// ─── 2. All 9 Figma States Matrix ─────────────────────────────────────────────

export const StatesMatrix: Story = {
  name: 'Figma States Matrix (All 9 States)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 360px)',
        gap: '28px',
        padding: '32px',
        background: '#F9FAFB',
        borderRadius: '16px',
      }}
    >
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          1. Default State
        </div>
        <Textarea label="Label" placeholder="Placeholder" helperText="Helper text" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          2. Hover State
        </div>
        <Textarea state="hover" label="Label" placeholder="Hovering over frame" helperText="Helper text" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          3. Focused State
        </div>
        <Textarea state="focused" label="Label" placeholder="Focus glow applied" helperText="Helper text" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          4. Typing State
        </div>
        <Textarea state="typing" label="Label" defaultValue="Entering trade settlement notes..." helperText="Helper text" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          5. Filled State
        </div>
        <Textarea state="filled" label="Label" defaultValue="Completed trade justification rationale for dual-control approval." helperText="Helper text" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          6. Error State
        </div>
        <Textarea state="error" label="Label" defaultValue="Invalid settlement remark" helperText="Please enter a valid justification (min. 10 chars)" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          7. Success State
        </div>
        <Textarea state="success" label="Label" defaultValue="Trade comments validated and approved by compliance engine." helperText="Verification passed" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          8. Disabled State
        </div>
        <Textarea state="disabled" label="Label" defaultValue="Editing is locked for this submission." helperText="Field is inactive" showCharacterCount maxLength={500} />
      </div>

      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', marginBottom: '8px' }}>
          9. Read Only State
        </div>
        <Textarea state="read only" label="Label" defaultValue="Archived trade record comment from 2026-10-24." helperText="Read only archive" showCharacterCount maxLength={500} />
      </div>
    </div>
  ),
};

// ─── 3. All 3 Sizes Showcase ──────────────────────────────────────────────────

export const SizesShowcase: Story = {
  name: 'Sizes Showcase (sm, md, lg)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '420px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#344054', marginBottom: '8px' }}>
          Size = SM (Frame Height: 88px)
        </div>
        <Textarea size="sm" label="Short Note" placeholder="Brief explanation..." showCharacterCount maxLength={200} fullWidth />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#344054', marginBottom: '8px' }}>
          Size = MD (Frame Height: 120px) — Standard
        </div>
        <Textarea size="md" label="Market Analysis Commentary" placeholder="Enter market commentary..." showCharacterCount maxLength={500} fullWidth />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#344054', marginBottom: '8px' }}>
          Size = LG (Frame Height: 168px) — Extended Form
        </div>
        <Textarea size="lg" label="Full Dual-Control Justification & Compliance Details" placeholder="Provide complete audit trail notes..." showCharacterCount maxLength={1000} fullWidth />
      </div>
    </div>
  ),
};
