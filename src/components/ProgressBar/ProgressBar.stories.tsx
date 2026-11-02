import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import { ProgressCircle } from './ProgressCircle';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/📊 Progress Indicators',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: `
### FMDQ Loading & Progress Indicators (Matching Figma \`✤ Loading & Progress Indicators ⚜️\`)

The design system provides both linear **Progress Bar** (nodes \`6276:147211\`) and **Progress Circles** (nodes \`6092:2083\`):
- **Progress Bar**: Available in \`lg\` (12px height) and \`sm\` (8px height) with label, pill track, bottom metadata (\`meta data • meta data\`), and percentage indicator.
- **Progress Circle**: Available in 5 calibrated sizes (\`xs\` 48px, \`sm\` 56px, \`md\` 72px, \`lg\` 90px, \`xl\` 120px) featuring Figma's exact \`innerRadius: 0.8\` geometry and centered percentage typography.
        `,
      },
    },
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Progress value from 0 to 100%',
      table: { category: 'Variant' },
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
      description: 'Size variant — sm (8px) | lg (12px)',
      table: { category: 'Variant' },
    },
    color: {
      control: 'select',
      options: ['primary', 'blue', 'success', 'warning', 'error'],
      description: 'Status color theme of the fill bar',
      table: { category: 'Style' },
    },
    label: {
      control: 'text',
      description: 'Heading label above the track (Figma: "Label")',
      table: { category: 'Content' },
    },
    hasLabel: {
      control: 'boolean',
      description: 'Controls label visibility (Figma: "has label")',
      table: { category: 'Visibility' },
    },
    metadata: {
      control: 'object',
      description: 'Metadata string or array separated by bullets (Figma: "meta data")',
      table: { category: 'Content' },
    },
    hasMetadata: {
      control: 'boolean',
      description: 'Controls metadata visibility (Figma: "has meta data")',
      table: { category: 'Visibility' },
    },
    hasPercentages: {
      control: 'boolean',
      description: 'Controls percentage text visibility (Figma: "has percentages")',
      table: { category: 'Visibility' },
    },
    hasDescription: {
      control: 'boolean',
      description: 'Controls bottom footer row visibility (Figma: "has description")',
      table: { category: 'Visibility' },
    },
    percentagePosition: {
      control: 'radio',
      options: ['bottom', 'top'],
      table: { category: 'Layout' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// ─── 1. Default Interactive Linear Bar (Controls Preserved) ───────────────────

export const Default: Story = {
  args: {
    progress: 50,
    size: 'lg',
    color: 'primary',
    label: 'Label',
    hasLabel: true,
    metadata: ['meta data', 'meta data'],
    hasMetadata: true,
    hasPercentages: true,
    hasDescription: true,
    percentagePosition: 'bottom',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '420px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── 2. Complete Figma Progress Bars Matrix (Matching Uploaded Screenshot) ────

export const ProgressBarsFigmaMatrix: Story = {
  name: 'Figma Progress Bars Matrix',
  render: () => {
    const steps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 375px) minmax(320px, 375px)',
          gap: '24px 48px',
          padding: '32px',
          background: '#FFFFFF',
          border: '1px dashed #D0D5DD',
          borderRadius: '16px',
        }}
      >
        {/* Column 1: Size LG (12px) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Size = LG (12px Track)
          </div>
          {steps.map((pct) => (
            <ProgressBar
              key={`lg-${pct}`}
              progress={pct}
              size="lg"
              label="Label"
              metadata={['meta data', 'meta data']}
            />
          ))}
        </div>

        {/* Column 2: Size SM (8px) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Size = SM (8px Track)
          </div>
          {steps.map((pct) => (
            <ProgressBar
              key={`sm-${pct}`}
              progress={pct}
              size="sm"
              label="Label"
              metadata={['meta data', 'meta data']}
            />
          ))}
        </div>
      </div>
    );
  },
};

// ─── 3. Progress Circles Interactive (With Controls) ──────────────────────────

export const ProgressCircleInteractive: StoryObj<typeof ProgressCircle> = {
  render: (args) => (
    <div style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ProgressCircle {...args} />
    </div>
  ),
  args: {
    progress: 50,
    size: 'md',
    color: 'primary',
    hasText: true,
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Progress value from 0 to 100%',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Circle diameter: xs (48px) | sm (56px) | md (72px) | lg (90px) | xl (120px)',
    },
    color: {
      control: 'select',
      options: ['primary', 'navy', 'success', 'warning', 'error'],
      description: 'Color variant of the progress arc',
    },
    hasText: {
      control: 'boolean',
      description: 'Controls visibility of centered percentage text (Figma: "has text")',
    },
    strokeLinecap: {
      control: 'radio',
      options: ['butt', 'round'],
      description: 'Stroke cap style (Figma arc uses butt)',
    },
  },
};

// ─── 4. Complete Figma Progress Circles Matrix (Matching Uploaded Screenshot) ─

export const ProgressCirclesFigmaMatrix: Story = {
  name: 'Figma Progress Circles Matrix',
  render: () => {
    const percentages = [0, 25, 50, 75, 100];
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          padding: '40px',
          background: '#FFFFFF',
          border: '1px dashed #D0D5DD',
          borderRadius: '16px',
          width: 'fit-content',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#667185', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Figma Progress Circles Component Set (6092:2083) — 5 Sizes × 5 Values
        </div>

        <table style={{ borderCollapse: 'separate', borderSpacing: '24px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: '#98A2B3', fontWeight: 600 }}>Size</th>
              {percentages.map((p) => (
                <th key={p} style={{ fontSize: '12px', color: '#667185', fontWeight: 600, textAlign: 'center' }}>
                  {p}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s}>
                <td style={{ fontSize: '12px', fontWeight: 600, color: '#667185', textTransform: 'uppercase' }}>
                  {s}
                </td>
                {percentages.map((p) => (
                  <td key={p} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <ProgressCircle
                      size={s}
                      progress={p}
                      color="primary"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ─── 5. Status Color Variations ───────────────────────────────────────────────

export const StatusColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '420px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#667185', marginBottom: '12px' }}>
          LINEAR PROGRESS BAR COLORS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressBar progress={100} color="primary" label="FMDQ Deep Navy (Default)" />
          <ProgressBar progress={85} color="blue" label="FMDQ Bright Blue" />
          <ProgressBar progress={95} color="success" label="Success / Verified" />
          <ProgressBar progress={45} color="warning" label="Warning / Action Required" />
          <ProgressBar progress={15} color="error" label="Error / Breached Limit" />
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E4E7EC', paddingTop: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#667185', marginBottom: '16px' }}>
          PROGRESS CIRCLE COLORS
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
          <ProgressCircle progress={75} size="md" color="primary" />
          <ProgressCircle progress={75} size="md" color="navy" />
          <ProgressCircle progress={100} size="md" color="success" />
          <ProgressCircle progress={50} size="md" color="warning" />
          <ProgressCircle progress={25} size="md" color="error" />
        </div>
      </div>
    </div>
  ),
};
