import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastProvider, useToast } from './index';
import { Button } from '../../elements/Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/🍞 Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FMDQ Design System `Alert / Toast / Notification` component. Supports 2 layout types (`toasts` for compact floating toasts, `banners` for in-flow alerts with action CTAs), 4 semantic states (`information`, `success`, `warning`, `error`), and booleans for toggling titles, subtexts, icons, CTAs, and close buttons.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['toasts', 'banners'],
      description: 'Layout type: compact toast (390px) or broad banner (568px)',
    },
    state: {
      control: 'select',
      options: ['information', 'success', 'warning', 'error'],
      description: 'Semantic state matching Figma',
    },
    title: {
      control: 'text',
      description: 'Alert heading title',
    },
    hasTitle: {
      control: 'boolean',
      description: 'Show/hide title (Figma: has title)',
    },
    subtext: {
      control: 'text',
      description: 'Description/subtext message',
    },
    hasSubtext: {
      control: 'boolean',
      description: 'Show/hide subtext (Figma: has subtexts)',
    },
    hasIcon: {
      control: 'boolean',
      description: 'Show/hide leading icon badge (Figma: has icon)',
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Show/hide close button (Figma: has close button)',
    },
    hasCTA: {
      control: 'boolean',
      description: 'Show/hide action CTA buttons row in banners (Figma: has CTA)',
    },
    hasPrimaryCTA: {
      control: 'boolean',
      description: 'Show/hide primary action button (Figma: has primary CTA)',
    },
    hasSecondaryCTA: {
      control: 'boolean',
      description: 'Show/hide secondary action button (Figma: has secondary CTA)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ── 1. Toast Variants ──

export const ToastInformation: Story = {
  name: 'Toast / Information',
  args: {
    type: 'toasts',
    state: 'information',
    title: 'Here’s the alert info title',
    subtext: 'The alert & notifications component',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCloseButton: true,
  },
};

export const ToastSuccess: Story = {
  name: 'Toast / Success',
  args: {
    type: 'toasts',
    state: 'success',
    title: 'Trade Executed Successfully',
    subtext: 'Your FGN 10-Yr Benchmark order has settled.',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCloseButton: true,
  },
};

export const ToastWarning: Story = {
  name: 'Toast / Warning',
  args: {
    type: 'toasts',
    state: 'warning',
    title: 'Approaching Trading Limit',
    subtext: 'You have utilized 90% of your daily allocated threshold.',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCloseButton: true,
  },
};

export const ToastError: Story = {
  name: 'Toast / Error',
  args: {
    type: 'toasts',
    state: 'error',
    title: 'Connection Gateway Disrupted',
    subtext: 'Unable to synchronise with FMDQ depository.',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCloseButton: true,
  },
};

// ── 2. Banner Variants ──

export const BannerInformation: Story = {
  name: 'Banner / Information',
  args: {
    type: 'banners',
    state: 'information',
    title: 'System Maintenance Scheduled',
    subtext: 'The clearing exchange platform will undergo scheduled upgrades on Sunday from 01:00 to 04:00 UTC.',
    primaryCTALabel: 'View Schedule',
    secondaryCTALabel: 'Dismiss',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCTA: true,
    hasPrimaryCTA: true,
    hasSecondaryCTA: true,
    hasCloseButton: true,
  },
};

export const BannerSuccess: Story = {
  name: 'Banner / Success',
  args: {
    type: 'banners',
    state: 'success',
    title: 'Portfolio Rebalanced',
    subtext: 'All targeted bond maturities and repo contracts were executed according to policy specifications.',
    primaryCTALabel: 'Download Report',
    secondaryCTALabel: 'View Assets',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCTA: true,
    hasPrimaryCTA: true,
    hasSecondaryCTA: true,
    hasCloseButton: true,
  },
};

export const BannerWarning: Story = {
  name: 'Banner / Warning',
  args: {
    type: 'banners',
    state: 'warning',
    title: 'Margin Coverage Warning',
    subtext: 'Collateral valuations have dropped below the initial margin requirement. Please deposit additional liquidity.',
    primaryCTALabel: 'Deposit Collateral',
    secondaryCTALabel: 'Review Positions',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCTA: true,
    hasPrimaryCTA: true,
    hasSecondaryCTA: true,
    hasCloseButton: true,
  },
};

export const BannerError: Story = {
  name: 'Banner / Error',
  args: {
    type: 'banners',
    state: 'error',
    title: 'Submission Rejected',
    subtext: 'Counterparty identifier failed KYC compliance check. Transactions for this entity are temporarily frozen.',
    primaryCTALabel: 'Retry Verification',
    secondaryCTALabel: 'Contact Compliance',
    hasTitle: true,
    hasSubtext: true,
    hasIcon: true,
    hasCTA: true,
    hasPrimaryCTA: true,
    hasSecondaryCTA: true,
    hasCloseButton: true,
  },
};

// ── 3. Visual Galleries (4 States Side-by-Side) ──

export const AllToastsGallery: Story = {
  name: 'Gallery / All Toasts (4 States)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '390px' }}>
      <Toast
        type="toasts"
        state="information"
        title="Information Notification"
        subtext="FMDQ core market data feeds refreshed."
      />
      <Toast
        type="toasts"
        state="success"
        title="Operation Successful"
        subtext="Contract terms accepted by both brokers."
      />
      <Toast
        type="toasts"
        state="warning"
        title="Market Volatility Advisory"
        subtext="Spread widening detected in short-term bills."
      />
      <Toast
        type="toasts"
        state="error"
        title="Authentication Expired"
        subtext="Your token has timed out. Please authenticate."
      />
    </div>
  ),
};

export const AllBannersGallery: Story = {
  name: 'Gallery / All Banners (4 States)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '568px' }}>
      <Toast
        type="banners"
        state="information"
        title="Information Banner"
        subtext="New quarterly financial disclosures are now available."
        primaryCTALabel="Read Disclosure"
        secondaryCTALabel="Remind Later"
      />
      <Toast
        type="banners"
        state="success"
        title="Settlement Confirmed"
        subtext="Funds transferred to custodial accounts successfully."
        primaryCTALabel="View Receipt"
        secondaryCTALabel="Dashboard"
      />
      <Toast
        type="banners"
        state="warning"
        title="Liquidity Threshold Alert"
        subtext="Daily volume cap reached 85%. Automated throttles active."
        primaryCTALabel="Adjust Limits"
        secondaryCTALabel="Audit Log"
      />
      <Toast
        type="banners"
        state="error"
        title="Execution Error"
        subtext="Order was rejected by matching engine due to stale price tick."
        primaryCTALabel="Re-quote Order"
        secondaryCTALabel="Cancel Order"
      />
    </div>
  ),
};

// ── 4. Live Trigger Demo (Imperative hook) ──

const InteractiveDemo = () => {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <p style={{ color: '#667185', fontSize: '14px', margin: 0 }}>
        Click any button to trigger live floating toast notifications via <code>useToast()</code>:
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          label="Trigger Info Toast"
          variant="primary"
          onClick={() =>
            toast({
              state: 'information',
              title: 'Market Feed Connected',
              description: 'Streaming prices from FMDQ securities exchange.',
            })
          }
        />
        <Button
          label="Trigger Success Toast"
          variant="success"
          onClick={() =>
            toast({
              state: 'success',
              title: 'Trade Executed',
              description: '$5,000,000 FGN Bond transaction verified.',
            })
          }
        />
        <Button
          label="Trigger Warning Toast"
          variant="warning"
          onClick={() =>
            toast({
              state: 'warning',
              title: 'High Slippage Risk',
              description: 'Current volatility is above historical average.',
            })
          }
        />
        <Button
          label="Trigger Error Toast"
          variant="destructive"
          onClick={() =>
            toast({
              state: 'error',
              title: 'Order Rejected',
              description: 'Transaction exceeds current credit allotment.',
            })
          }
        />
      </div>
    </div>
  );
};

export const LiveInteractiveTrigger: Story = {
  name: 'Interactive / Floating Toast Portal',
  decorators: [
    (Story) => (
      <ToastProvider>
        <div style={{ padding: '40px' }}>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
  render: () => <InteractiveDemo />,
};
