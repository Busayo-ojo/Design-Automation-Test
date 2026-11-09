import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SignIn } from './SignIn';

const meta: Meta<typeof SignIn> = {
  title: 'Layout/🔐 SignIn',
  component: SignIn,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sign in page component matching Figma frame 1.1 Sign in (node 10303:161102). Composes the AuthBackground shader, FMDQ Logo, standard Input components (with user and lock icons), text button for password reset, and primary submit action.',
      },
    },
  },
  args: {
    title: 'Sign in to the Data Reporting Portal',
    subtitle: 'Use the User ID and password issued to you.',
    supportEmail: 'support@fmdqgroup.com',
    copyrightText:
      '© 2026 FMDQ Group PLC. All rights reserved. Registered and regulated by the Securities and Exchange Commission, Nigeria.',
    pausedBackground: false,
    loading: false,
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    supportEmail: { control: 'text' },
    copyrightText: { control: 'text' },
    loading: { control: 'boolean' },
    pausedBackground: { control: 'boolean' },
    error: { control: 'text' },
    userIdError: { control: 'text' },
    passwordError: { control: 'text' },
    onSubmit: { action: 'submit' },
    onForgotPassword: { action: 'forgot-password' },
  },
};

export default meta;
type Story = StoryObj<typeof SignIn>;

/** Default pristine sign-in form ready for user input. */
export const Default: Story = {};

/** Form prefilled with valid sample credentials. */
export const Filled: Story = {
  args: {
    userId: 'USR-90412',
    password: 'SuperSecretPassword123!',
  },
};

/** Loading state during credential authentication. */
export const Loading: Story = {
  args: {
    userId: 'USR-90412',
    password: 'SuperSecretPassword123!',
    loading: true,
  },
};

/** 1.2 Sign in · incorrect details (Figma node 10303:161172). */
export const IncorrectDetails: Story = {
  args: {
    userId: 'USR-90412',
    password: '••••••••••••',
    userIdState: 'error',
    passwordState: 'error',
    alertTitle: "We couldn't sign you in",
    alertDescription:
      'Check your User ID and password and try again. Repeated failed attempts will lock your account.',
    alertState: 'error',
  },
};

/** 1.8 Sign in · password updated banner (Figma node 10303:161303). */
export const PasswordUpdated: Story = {
  args: {
    alertState: 'success',
    alertTitle: 'Your password has been updated',
    alertDescription: 'Sign in with your new password.',
  },
};

/** 1.9 Sign in · session timed out banner (Figma node 10303:161359). */
export const SessionTimedOut: Story = {
  args: {
    alertState: 'warning',
    alertTitle: 'You were signed out',
    alertDescription: 'Your session ended after a period of inactivity. Sign in again to continue.',
  },
};

/** 1.19 Sign in · logged out banner (Figma node 10326:288602). */
export const LoggedOut: Story = {
  args: {
    alertState: 'information',
    alertTitle: 'You’ve logged out',
    alertDescription: 'Sign in again to continue. On a shared computer, close the browser too.',
  },
};

/** Global top-level alert error banner. */
export const WithGlobalError: Story = {
  args: {
    error: 'Your account has been deactivated. Please contact support@fmdqgroup.com.',
  },
};

/** Field-level validation errors (e.g. required field enforcement). */
export const WithValidationErrors: Story = {
  args: {
    userIdError: 'User ID is required',
    passwordError: 'Password must be at least 8 characters',
  },
};

/** Static background state for automated visual testing and reduced motion. */
export const PausedBackground: Story = {
  args: {
    pausedBackground: true,
  },
};

/** Interactive playground allowing real typing, submission, and validation. */
export const Interactive: Story = {
  render: (args) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ userId?: string; password?: string; global?: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleSubmit = async (creds: { userId: string; password: string }) => {
      const newErrors: { userId?: string; password?: string; global?: string } = {};
      if (!creds.userId.trim()) {
        newErrors.userId = 'Please enter your User ID';
      }
      if (!creds.password) {
        newErrors.password = 'Please enter your password';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setSuccessMessage(false);
        return;
      }

      setErrors({});
      setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitting(false);

      if (creds.password === 'error') {
        setErrors({ global: 'Invalid User ID or password. Please try again.' });
      } else {
        setSuccessMessage(true);
      }
    };

    if (successMessage) {
      return (
        <SignIn
          {...args}
          title="Welcome Back!"
          subtitle={`Signed in as ${userId}. Redirecting to dashboard...`}
          userId={userId}
          password={password}
          loading={false}
        />
      );
    }

    return (
      <SignIn
        {...args}
        userId={userId}
        onUserIdChange={(val) => {
          setUserId(val);
          if (errors.userId) setErrors((prev) => ({ ...prev, userId: undefined }));
        }}
        password={password}
        onPasswordChange={(val) => {
          setPassword(val);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        userIdError={errors.userId}
        passwordError={errors.password}
        error={errors.global}
        loading={submitting}
        onSubmit={handleSubmit}
        onForgotPassword={() => alert('Forgot password flow initiated')}
      />
    );
  },
};
