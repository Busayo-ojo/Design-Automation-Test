import React, { useState } from 'react';
import { AuthBackground } from '../AuthBackground';
import { Logo } from '../../elements/Logo';
import { Input } from '../../elements/Input';
import type { InputState } from '../../elements/Input';
import { Button } from '../../elements/Button';
import { Toast } from '../../components/Toast';
import type { ToastState } from '../../components/Toast';
import { Icon } from '../../foundations/icons';
import './SignIn.css';

export interface SignInProps {
  /** Value of the User ID field */
  userId?: string;
  /** Callback when User ID changes */
  onUserIdChange?: (value: string) => void;
  /** Value of the password field */
  password?: string;
  /** Callback when password changes */
  onPasswordChange?: (value: string) => void;
  /** Form submission handler */
  onSubmit?: (credentials: { userId: string; password: string }) => void | Promise<void>;
  /** Callback when "Forgot password?" is clicked */
  onForgotPassword?: () => void;
  /** Whether the sign-in request is in-flight */
  loading?: boolean;
  /** Simple error string (fallback alert description) */
  error?: string;
  /** Heading title for the alert banner (e.g. "We couldn't sign you in") */
  alertTitle?: string;
  /** Subtext/body for the alert banner */
  alertDescription?: string;
  /** Alert banner state: 'error' | 'warning' | 'information' | 'success' */
  alertState?: ToastState;
  /** Custom alert component override */
  alert?: React.ReactNode;
  /** Field-level validation error message for User ID */
  userIdError?: string;
  /** Visual state override for User ID input */
  userIdState?: InputState;
  /** Field-level validation error message for password */
  passwordError?: string;
  /** Visual state override for password input */
  passwordState?: InputState;
  /** Support contact email */
  supportEmail?: string;
  /** SEC regulatory copyright notice below card */
  copyrightText?: string;
  /** Card heading title */
  title?: string;
  /** Card heading subtitle */
  subtitle?: string;
  /** Pause the dotted halftone shader animation in the background */
  pausedBackground?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
}

/**
 * Sign In page component matching Figma frames:
 * - 1.1 Sign in (node 10303:161102)
 * - 1.2 Sign in · incorrect details (node 10303:161172)
 *
 * Composes AuthBackground, Logo, Toast (banners), Input, Button and icons from the FMDQ Design System.
 */
export const SignIn: React.FC<SignInProps> = ({
  userId: controlledUserId,
  onUserIdChange,
  password: controlledPassword,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  loading = false,
  error,
  alertTitle,
  alertDescription,
  alertState = 'error',
  alert,
  userIdError,
  userIdState,
  passwordError,
  passwordState,
  supportEmail = 'support@fmdqgroup.com',
  copyrightText = '© 2026 FMDQ Group PLC. All rights reserved. Registered and regulated by the Securities and Exchange Commission, Nigeria.',
  title = 'Sign in to the Data Reporting Portal',
  subtitle = 'Use the User ID and password issued to you.',
  pausedBackground = false,
  className = '',
  style,
}) => {
  const [internalUserId, setInternalUserId] = useState('');
  const [internalPassword, setInternalPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const userId = controlledUserId !== undefined ? controlledUserId : internalUserId;
  const password = controlledPassword !== undefined ? controlledPassword : internalPassword;

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledUserId === undefined) {
      setInternalUserId(val);
    }
    onUserIdChange?.(val);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledPassword === undefined) {
      setInternalPassword(val);
    }
    onPasswordChange?.(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onSubmit?.({ userId, password });
  };

  // Derive alert content
  const resolvedAlertTitle = alertTitle ?? (error && !alertDescription ? error : undefined);
  const resolvedAlertDescription = alertDescription ?? (alertTitle ? undefined : undefined);
  const hasBanner = Boolean(alert || resolvedAlertTitle || resolvedAlertDescription || error);

  // Derive input states
  const resolvedUserIdState: InputState = userIdState ?? (userIdError ? 'error' : 'default');
  const resolvedPasswordState: InputState = passwordState ?? (passwordError ? 'error' : 'default');

  return (
    <AuthBackground paused={pausedBackground} className={`fmdqui-signin-wrapper ${className}`} style={style}>
      <div className="fmdqui-signin">
        <main className="fmdqui-signin__card">
          {/* FMDQ Brand Logo */}
          <div className="fmdqui-signin__logo-container">
            <Logo variant="default" size="md" className="fmdqui-signin__logo" />
          </div>

          {/* Heading */}
          <header className="fmdqui-signin__heading">
            <h1 className="fmdqui-signin__title">{title}</h1>
            <p className="fmdqui-signin__subtitle">{subtitle}</p>
          </header>

          {/* Form */}
          <form className="fmdqui-signin__form" onSubmit={handleSubmit} noValidate>
            {/* Alert banner matching Figma 10303:161203 (Alert: banners error) */}
            {hasBanner && (
              <div className="fmdqui-signin__alert-wrapper">
                {alert ? (
                  alert
                ) : (
                  <Toast
                    type="banners"
                    state={alertState}
                    title={resolvedAlertTitle}
                    subtext={resolvedAlertDescription}
                    hasTitle={Boolean(resolvedAlertTitle)}
                    hasSubtext={Boolean(resolvedAlertDescription)}
                    hasIcon={true}
                    hasCloseButton={false}
                    hasCTA={false}
                  />
                )}
              </div>
            )}

            {/* User ID field */}
            <Input
              id="signin-user-id"
              label="User ID"
              placeholder="e.g. USR-90412"
              size="lg"
              value={userId}
              onChange={handleUserIdChange}
              state={resolvedUserIdState}
              helperText={userIdError}
              hasHelperText={Boolean(userIdError)}
              hasLeftIcon={true}
              leadingIcon={<Icon name="user" variant="bold" size={20} color="var(--color-neutral-500)" />}
              hasRightIcon={false}
              autoComplete="username"
              required
              disabled={loading}
            />

            {/* Password field */}
            <Input
              id="signin-password"
              label="Password"
              placeholder="Enter your password"
              size="lg"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              state={resolvedPasswordState}
              helperText={passwordError}
              hasHelperText={Boolean(passwordError)}
              hasLeftIcon={true}
              leadingIcon={<Icon name="lock" variant="bold" size={20} color="var(--color-neutral-500)" />}
              hasRightIcon={true}
              trailingIcon={
                <button
                  type="button"
                  className="fmdqui-signin__password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={loading}
                >
                  <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    variant="bold"
                    size={20}
                    color="var(--color-neutral-500)"
                  />
                </button>
              }
              autoComplete="current-password"
              required
              disabled={loading}
            />

            {/* Forgot password row */}
            <div className="fmdqui-signin__forgot-row">
              <Button
                type="button"
                variant="text"
                size="sm"
                buttonType="primary"
                onClick={onForgotPassword}
                disabled={loading}
                className="fmdqui-signin__forgot-btn"
              >
                Forgot password?
              </Button>
            </div>

            {/* Sign in button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              state={loading ? 'de-activated' : 'default'}
              className="fmdqui-signin__submit-btn"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Enquiries / Support (Paragraph/Small/Regular · 14/145) */}
          <p className="fmdqui-signin__support">
            For access or enquiries, email{' '}
            <a href={`mailto:${supportEmail}`} className="fmdqui-signin__support-link">
              {supportEmail}
            </a>
          </p>
        </main>

        {/* SEC Regulatory copyright notice (Paragraph/XSmall/Regular · 12/145) */}
        <footer className="fmdqui-signin__footer">
          <p className="fmdqui-signin__copyright">{copyrightText}</p>
        </footer>
      </div>
    </AuthBackground>
  );
};

SignIn.displayName = 'SignIn';
