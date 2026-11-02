import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flow1Prototype } from './Flow1Prototype';

const meta: Meta<typeof Flow1Prototype> = {
  title: 'Layout/Flow 1 - Prototype',
  component: Flow1Prototype,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive prototype orchestrator connecting Figma Flow 1 ("New user set-up from email" and "Sign In · MSG Admin") starting from initial email invitation through onboarding password setup, 2FA setup, Sign In, 2FA OTP verification, into the live DRP Dashboard. Includes realistic error simulations (wrong credentials, lockout, OTP warnings) and a floating reviewer toolbar for instant jumping between screens.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flow1Prototype>;

/**
 * Complete end-to-end journey starting at 1.15 Welcome email invite (Figma node 10306:12506),
 * clicking 'Set up your account' to advance through password setup (10306:12547), 2FA setup,
 * Sign In, and landing on the live DRP Dashboard.
 */
export const CompleteJourney: Story = {
  args: {
    initialStep: 'welcome-email',
    showReviewerToolbar: true,
  },
};

/**
 * Starting directly from 1.1 Sign In (MSG Admin) with default credentials USR-90412.
 */
export const SignInStart: Story = {
  args: {
    initialStep: 'signin',
    showReviewerToolbar: true,
  },
};

/**
 * Direct entry to the DRP Dashboard with live working sidebar and account menu.
 */
export const DashboardLanding: Story = {
  args: {
    initialStep: 'dashboard',
    showReviewerToolbar: true,
  },
};

/**
 * Clean presentation of the full journey without the floating reviewer toolbar.
 */
export const CleanPresentation: Story = {
  args: {
    initialStep: 'welcome-email',
    showReviewerToolbar: false,
  },
};

