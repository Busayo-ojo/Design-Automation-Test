import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState, type EmptyStateType } from './EmptyState';
import { Button } from '../../elements/Button';

const ILLUSTRATION_TYPES: EmptyStateType[] = [
  'search-results',
  'notifications',
  'tasks',
  'templates',
  'dashboard',
  'file-manager',
  'calendar',
  'forms',
  'inbox',
  'invoice',
  'team',
  'shopping-cart',
  'media',
  'subscriptions',
  'survey',
  'favorites',
  'contacts',
  'inventory',
  'chat',
];

const meta: Meta<typeof EmptyState> = {
  title: 'Layout/📭 Empty State',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### FMDQ Design System - Empty State (Matching Figma \`✤ Empty States\` 5249:482)

The Empty State component displays helpful fallback content when data, search results, or user lists are empty.
Features all **19 official vector illustrations** from Figma with full support for:
- **Color Variant** (\`color: true\`): Rich, vibrant branded palette.
- **Monochrome Variant** (\`color: false\`): Subtle greyscale outline for minimal or compact UI contexts.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ILLUSTRATION_TYPES,
      description: 'Preset illustration matching Figma "Empty State" component set (5249:482)',
      table: { category: 'Illustration' },
    },
    color: {
      control: 'boolean',
      description: 'Whether to show the full-color illustration or greyscale monochrome',
      table: { category: 'Illustration' },
    },
    title: {
      control: 'text',
      description: 'Primary heading message',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Supporting explanatory description',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ─── 1. Interactive Default Story ─────────────────────────────────────────────

export const Default: Story = {
  args: {
    type: 'search-results',
    color: true,
    title: 'No Dealing Member Trades Found',
    description: 'We couldn’t find any transactions matching your filter criteria. Try adjusting the date range or ticker symbol.',
    action: <Button variant="primary" size="sm">Clear All Filters</Button>,
    secondaryAction: <Button variant="secondary" size="sm">Submit New Trade</Button>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── 2. Monochrome Variant ───────────────────────────────────────────────────

export const Monochrome: Story = {
  name: 'Monochrome (Color = False)',
  args: {
    type: 'search-results',
    color: false,
    title: 'No Records Available',
    description: 'This table currently has no historical entries. Once trades are processed, they will appear here.',
    action: <Button variant="secondary" size="sm">Refresh Table</Button>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── 3. Dashboard Empty State ─────────────────────────────────────────────────

export const EmptyDashboard: Story = {
  args: {
    type: 'dashboard',
    color: true,
    title: 'No Market Metrics Yet',
    description: 'Configure your custom trading widgets and market tickers to view real-time market data.',
    action: <Button variant="primary" size="sm">Customize Dashboard</Button>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── 4. Notifications Empty State ────────────────────────────────────────────

export const NoNotifications: Story = {
  args: {
    type: 'notifications',
    color: true,
    title: 'No New Notifications',
    description: 'You are completely caught up on daily fixing bulletins, circulars, and dealing member communications.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── 5. Tasks & Approvals Empty State ─────────────────────────────────────────

export const NoPendingApprovals: Story = {
  args: {
    type: 'tasks',
    color: true,
    title: 'All Dual-Control Submissions Approved',
    description: 'The maker-checker authorization queue is completely clear for the current trading session.',
    action: <Button variant="secondary" size="sm">View Audit Trail</Button>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── 6. Full Figma Illustration Gallery ───────────────────────────────────────

export const FigmaIllustrationGallery: Story = {
  name: 'Figma Illustrations Gallery',
  render: () => (
    <div style={{ maxWidth: '960px', padding: '24px', background: '#F9FAFB', borderRadius: '16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px', color: '#101928' }}>
          Official Figma Illustrations Gallery (5249:482)
        </h2>
        <p style={{ fontSize: '14px', color: '#667185', margin: 0 }}>
          All 19 illustration themes rendered in both full color and monochrome variants.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {ILLUSTRATION_TYPES.map((t) => (
          <div
            key={t}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E7EC',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#344054', textTransform: 'capitalize', marginBottom: '12px' }}>
              {t.replace('-', ' ')}
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <EmptyState
                  type={t}
                  color={true}
                  title=""
                  style={{ padding: '0' }}
                />
                <span style={{ fontSize: '11px', color: '#98A2B3' }}>Color</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <EmptyState
                  type={t}
                  color={false}
                  title=""
                  style={{ padding: '0' }}
                />
                <span style={{ fontSize: '11px', color: '#98A2B3' }}>Mono</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
