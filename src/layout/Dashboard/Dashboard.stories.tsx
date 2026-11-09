import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dashboard } from './Dashboard';
import defaultAvatar from '../../assets/avatar-marvin.png';

const meta: Meta<typeof Dashboard> = {
  title: 'Layout/📊 Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'DRP Market Service Group (MSG Admin) Dashboard page matching Figma frame "DRP / Dashboard" (node 10301:78467). Assembles the full-height Sidebar (variant 2, dark-blue theme), 4-column Metrics row, Awaiting Approval table card, Today\'s Contributions progress card, Recent Activity log, and Quick Actions grid into a responsive desktop layout.',
      },
    },
  },
  args: {
    user: {
      name: 'Marvin Marvin Ogah',
      email: 'MSG Admin',
      avatarSrc: defaultAvatar,
    },
    dateText: 'Monday, 26 October 2026 · Market Service Group',
    activeMenuId: 'dashboard',
  },
  argTypes: {
    dateText: { control: 'text' },
    activeMenuId: { control: 'text' },
    onDownloadSummary: { action: 'download-summary' },
    onReviewApprovals: { action: 'review-approvals' },
    onViewAllApprovals: { action: 'view-all-approvals' },
    onViewContributions: { action: 'view-contributions' },
    onReviewItem: { action: 'review-item' },
    onQuickAction: { action: 'quick-action' },
    onMenuSelect: { action: 'menu-select' },
  },
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

/**
 * Standard DRP Dashboard matching Figma frame 10301:78467 1:1.
 */
export const Default: Story = {};

/**
 * Clean Queue state where all approvals and submissions are processed.
 */
export const QueueClear: Story = {
  args: {
    metrics: {
      awaitingApproval: {
        value: 0,
        subtext: 'All items reviewed',
      },
      contributionsReceived: {
        value: '60 of 60',
        percentage: '100%',
        subtext: 'All modules submitted',
      },
      weeklyReturns: {
        value: 0,
        weekEnding: 'W/E 23 Oct',
        subtext: 'All members submitted',
      },
      rejectedThisWeek: {
        value: 0,
        subtext: 'No rejected items',
      },
    },
    approvals: [],
    recentActivity: [
      {
        id: 'act-1',
        status: 'Approved',
        description: 'All pending items confirmed · Queue clear',
        timestamp: 'Just now',
      },
    ],
  },
};
