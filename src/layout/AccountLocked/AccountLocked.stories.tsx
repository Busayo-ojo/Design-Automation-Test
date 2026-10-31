import type { Meta, StoryObj } from '@storybook/react';
import { AccountLocked } from './AccountLocked';

const meta: Meta<typeof AccountLocked> = {
  title: 'Layout/🔐 AccountLocked',
  component: AccountLocked,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Account locked screen for the FMDQ Data Reporting Portal (DRP Flow 1, nodes 10303:161403 and 10308:210995). Displayed when an account is locked due to repeated incorrect password attempts or 5 failed verification codes.',
      },
    },
  },
  argTypes: {
    onEmailSupport: { action: 'emailSupport' },
    onBackToSignIn: { action: 'backToSignIn' },
  },
};

export default meta;
type Story = StoryObj<typeof AccountLocked>;

/** 1.3 Account locked · failed password attempts (Figma node 10303:161403). */
export const PasswordAttempts: Story = {
  args: {
    reason: 'password',
  },
};

/** 1.4d Account locked · 5 wrong codes (Figma node 10308:210995). */
export const VerificationAttempts: Story = {
  args: {
    reason: 'verification',
  },
};

/** Account locked with custom institutional support routing. */
export const CustomSupportRouting: Story = {
  args: {
    reason: 'password',
    supportEmail: 'drp-servicedesk@fmdqgroup.com',
  },
};

