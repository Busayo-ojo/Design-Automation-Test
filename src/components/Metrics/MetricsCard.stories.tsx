import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricsCard } from './MetricsCard';

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
    <path d="M12 13.3333V6.66667M8 13.3333V2.66667M4 13.3333V9.33333" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BankIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
    <path d="M2 13.3333H14M2.66667 6.66667H13.3333M8 2.66667L2 6.66667V13.3333H14V6.66667L8 2.66667Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
    <circle cx="8" cy="8" r="6" strokeWidth="1.5" />
    <path d="M8 5V8L10 10" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
    <path d="M8 2.66667L3.33333 4.66667V8C3.33333 11.3333 8 13.3333 8 13.3333C8 13.3333 12.6667 11.3333 12.6667 8V4.66667L8 2.66667Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof MetricsCard> = {
  title: 'Components/📈 Metrics',
  component: MetricsCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    type: {
      control: 'radio',
      options: ['data only', 'data + CTA'],
    },
    orientation: {
      control: 'radio',
      options: ['left', 'center'],
    },
    hasIcon: { control: 'boolean' },
    hasBadge: { control: 'boolean' },
    hasSubtext: { control: 'boolean' },
    ctaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MetricsCard>;

export const Default: Story = {
  args: {
    title: 'Total Monthly Trade Turnover',
    value: '₦1.84 Trillion',
    icon: <ChartIcon />,
    badge: { label: '+12.4%', color: 'success' },
    subtext: 'vs last month (₦1.63T)',
    type: 'data + CTA',
    ctaLabel: 'View Detailed Turnover Report',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const PortalKpiGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        width: '900px',
      }}
    >
      <MetricsCard
        title="Active Dealing Members"
        value="48 Institutions"
        icon={<BankIcon />}
        badge={{ label: '100% Active', color: 'blue' }}
        subtext="All licensed commercial & merchant banks"
        type="data + CTA"
        ctaLabel="Manage Dealing Members"
      />

      <MetricsCard
        title="Pending Authorisations"
        value="6 Submissions"
        icon={<ClockIcon />}
        badge={{ label: 'Action Required', color: 'warning' }}
        subtext="2 NIBOR, 3 FGN Bonds, 1 FX Spot"
        type="data + CTA"
        ctaLabel="Open Approval Queue"
      />

      <MetricsCard
        title="Market Surveillance"
        value="99.4% Compliant"
        icon={<ShieldIcon />}
        badge={{ label: '0 Infractions', color: 'success' }}
        subtext="October 2026 reporting cycle"
        type="data + CTA"
        ctaLabel="View Surveillance Log"
      />
    </div>
  ),
};
