import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPassword } from './ForgotPassword';

const meta: Meta<typeof ForgotPassword> = {
  title: 'Layout/🔐 ForgotPassword',
  component: ForgotPassword,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Forgot password and check your email flow for the FMDQ Data Reporting Portal (DRP Flow 1, nodes 10303:161451 and 10303:161517). Supports requesting a password reset link by User ID, form validation, email sent confirmation state, and resend trigger.',
      },
    },
  },
  argTypes: {
    onRequestReset: { action: 'requestReset' },
    onBackToSignIn: { action: 'backToSignIn' },
    onResendLink: { action: 'resendLink' },
  },
};

export default meta;
type Story = StoryObj<typeof ForgotPassword>;

/** 1.5 Forgot password · default (Figma node 10303:161451). */
export const RequestReset: Story = {
  args: {
    mode: 'request',
    defaultUserId: '',
  },
};

/** 1.5 Forgot password with User ID filled. */
export const RequestResetFilled: Story = {
  args: {
    mode: 'request',
    defaultUserId: 'USR-90412',
  },
};

/** 1.5 Forgot password with field validation error. */
export const RequestResetError: Story = {
  args: {
    mode: 'request',
    defaultUserId: 'USR-INVALID',
    userIdError: 'No account found with this User ID. Please check and try again.',
  },
};

/** 1.6 Check your email (Figma node 10303:161517). */
export const CheckEmail: Story = {
  args: {
    mode: 'sent',
  },
};

/** Interactive flow transitioning from request form to email confirmation. */
export const Interactive: Story = {
  render: (args) => {
    const [mode, setMode] = useState<'request' | 'sent'>('request');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async (submittedId: string) => {
      if (!submittedId.trim()) {
        setError('User ID is required');
        return;
      }
      setError(undefined);
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      setLoading(false);
      setMode('sent');
    };

    return (
      <ForgotPassword
        {...args}
        mode={mode}
        userId={userId}
        onUserIdChange={(val) => {
          setUserId(val);
          if (error) setError(undefined);
        }}
        userIdError={error}
        loading={loading}
        onRequestReset={handleRequestReset}
        onBackToSignIn={() => setMode('request')}
        onResendLink={() => alert('Reset link resent to registered email!')}
      />
    );
  },
};

