import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TwoStepVerification } from './TwoStepVerification';

const meta: Meta<typeof TwoStepVerification> = {
  title: 'Flows/Authentication/TwoStepVerification',
  component: TwoStepVerification,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Two-step verification screen for the FMDQ Data Reporting Portal (DRP Flow 1). Supports 6-digit OTP entry with auto-advance, paste distribution, backspace navigation, warning banners for attempt thresholds, error states, and onboarding step 2 of 2.',
      },
    },
  },
  argTypes: {
    onCodeChange: { action: 'codeChange' },
    onComplete: { action: 'complete' },
    onSubmit: { action: 'submit' },
    onResend: { action: 'resend' },
    onBackToSignIn: { action: 'backToSignIn' },
  },
};

export default meta;
type Story = StoryObj<typeof TwoStepVerification>;

/** 1.4 Two-step verification · default (Figma node 10303:161632). */
export const Default: Story = {
  args: {
    resendSeconds: 45,
  },
};

/** 1.4 Two-step verification with 6 digits filled. */
export const Filled: Story = {
  args: {
    defaultCode: '482619',
    resendSeconds: 30,
  },
};

/** 1.4a Two-step verification · incorrect code (Figma node 10306:193869). */
export const IncorrectCode: Story = {
  args: {
    defaultCode: '482103',
    error: 'That code isn’t right. Check the latest email from FMDQ and try again.',
    resendSeconds: 12,
  },
};

/** 1.4b Two-step verification · warning after 3 wrong codes (Figma node 10308:210820). */
export const WarningAttempts: Story = {
  args: {
    defaultCode: '482103',
    alertState: 'warning',
    alertTitle: '2 tries left',
    alertDescription:
      'After 5 incorrect codes your account locks, and the Market Service Group will need to unlock it.',
    resendSeconds: 12,
  },
};

/** 1.4c Two-step verification · last try (Figma node 10308:210896). */
export const LastTry: Story = {
  args: {
    defaultCode: '482103',
    alertState: 'warning',
    alertTitle: 'Last try before your account locks',
    alertDescription:
      'If this code might have expired, request a new one first. Resending doesn’t reset your tries.',
    resendSeconds: 0, // cooldown expired -> shows "Resend it now."
  },
};

/** 1.17 Set up account · two-step verification (Figma node 10306:12638). */
export const OnboardingStep2: Story = {
  args: {
    badgeLabel: 'Step 2 of 2',
    title: 'Turn on two-step verification',
    subtitle:
      "Enter the 6-digit code we sent to adaeze.okafor@accessbankplc.com. You'll use a code like this each time you sign in.",
    primaryButtonLabel: 'Finish setup',
    resendSeconds: 45,
    resendNote: "After setup you'll go to your NIBOR dashboard.",
    showBackToSignIn: false,
  },
};

/** Interactive verification flow with live validation and submission. */
export const Interactive: Story = {
  render: (args) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (submittedCode: string) => {
      setLoading(true);
      setError(undefined);
      await new Promise((r) => setTimeout(r, 1000));
      setLoading(false);

      if (submittedCode === '123456') {
        setSuccess(true);
      } else {
        setError('That code isn’t right. Check the latest email from FMDQ and try again.');
      }
    };

    if (success) {
      return (
        <TwoStepVerification
          {...args}
          title="Code verified!"
          subtitle="Your two-step verification succeeded. Redirecting to dashboard..."
          defaultCode={code}
          primaryButtonLabel="Continue"
          showBackToSignIn={false}
        />
      );
    }

    return (
      <TwoStepVerification
        {...args}
        code={code}
        onCodeChange={(val) => {
          setCode(val);
          if (error) setError(undefined);
        }}
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
      />
    );
  },
};
