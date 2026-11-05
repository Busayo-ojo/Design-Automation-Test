import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SetPassword } from './SetPassword';

const meta: Meta<typeof SetPassword> = {
  title: 'Flows/Authentication/SetPassword',
  component: SetPassword,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Set a new password flow for the FMDQ Data Reporting Portal (DRP Flow 1, nodes 10303:161691, 10306:193920, 10306:12547, 10306:194016). Features real-time 4-point rule verification (8+ chars, upper/lower, number, special char), mismatch validation, onboarding step 1 of 2 badge, and expired link recovery.',
      },
    },
  },
  argTypes: {
    pausedBackground: { control: 'boolean' },
    onSubmit: { action: 'submit' },
    onRequestNewLink: { action: 'requestNewLink' },
    onBackToSignIn: { action: 'backToSignIn' },
  },
};

export default meta;
type Story = StoryObj<typeof SetPassword>;

/** 1.7 Set a new password · default (Figma node 10303:161691). */
export const Default: Story = {
  args: {
    mode: 'setPassword',
  },
};

/** 1.7 Set a new password with all 4 criteria satisfied. */
export const FilledValid: Story = {
  args: {
    mode: 'setPassword',
    defaultPassword: 'Password123!',
    defaultConfirmPassword: 'Password123!',
  },
};

/** 1.7a Set a new password · passwords don’t match (Figma node 10306:193920). */
export const PasswordsMismatch: Story = {
  args: {
    mode: 'setPassword',
    defaultPassword: 'Password123!',
    defaultConfirmPassword: 'Password999!',
    confirmPasswordError: 'Passwords don’t match. Check both fields and try again.',
  },
};

/** 1.16 Set up account · password (Figma node 10306:12547). */
export const OnboardingStep1: Story = {
  args: {
    mode: 'setPassword',
    badgeLabel: 'Step 1 of 2',
    title: 'Welcome, Adaeze',
    subtitle: 'Set a password to activate your account for Access Bank PLC (NIBOR Inputter).',
    primaryButtonLabel: 'Continue',
  },
};

/** 1.16a Set up account · link expired (Figma node 10306:194016). */
export const LinkExpired: Story = {
  args: {
    mode: 'expired',
    title: 'This set-up link has expired',
    subtitle:
      'For security, set-up links work once and expire after 72 hours. Request a new one and we’ll ask the Market Service Group to resend it.',
    primaryButtonLabel: 'Request a new link',
  },
};

/** Interactive password entry with real-time rule checklist and mismatch check. */
export const Interactive: Story = {
  render: (args) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
      if (values.password !== values.confirmPassword) {
        setConfirmError('Passwords don’t match. Check both fields and try again.');
        return;
      }
      setConfirmError(undefined);
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
      setSuccess(true);
    };

    if (success) {
      return (
        <SetPassword
          {...args}
          title="Password updated!"
          subtitle="Your password has been changed. You can now sign in with your new credentials."
          mode="expired"
          primaryButtonLabel="Go to sign in"
          onRequestNewLink={() => setSuccess(false)}
        />
      );
    }

    return (
      <SetPassword
        {...args}
        password={password}
        confirmPassword={confirmPassword}
        onPasswordChange={(val) => {
          setPassword(val);
          if (confirmError) setConfirmError(undefined);
        }}
        onConfirmPasswordChange={(val) => {
          setConfirmPassword(val);
          if (confirmError) setConfirmError(undefined);
        }}
        confirmPasswordError={confirmError}
        loading={loading}
        onSubmit={handleSubmit}
      />
    );
  },
};

