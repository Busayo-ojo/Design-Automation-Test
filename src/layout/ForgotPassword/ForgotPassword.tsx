import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { AuthBackground } from '../AuthBackground';
import { Logo } from '../../elements/Logo';
import { Icon } from '../../foundations/icons';
import { Input, type InputState } from '../../elements/Input';
import { Button } from '../../elements/Button';
import './ForgotPassword.css';

export type ForgotPasswordMode = 'request' | 'sent';

export interface ForgotPasswordProps {
  /** Mode: 'request' (1.5 Enter User ID) or 'sent' (1.6 Check your email) */
  mode?: ForgotPasswordMode;
  /** Current User ID value */
  userId?: string;
  /** Default User ID for uncontrolled state */
  defaultUserId?: string;
  /** Fired when User ID input changes */
  onUserIdChange?: (val: string) => void;
  /** Error message for User ID field */
  userIdError?: string;
  /** Custom title override */
  title?: string;
  /** Custom subtitle override */
  subtitle?: string;
  /** Submission loading state */
  loading?: boolean;
  /** Fired when user submits the request form (mode 'request') */
  onRequestReset?: (userId: string) => void;
  /** Fired when clicking 'Back to sign in' */
  onBackToSignIn?: () => void;
  /** Fired when clicking 'Resend link' (mode 'sent') */
  onResendLink?: () => void;
  /** Pauses the animated background */
  pausedBackground?: boolean;
  /** Logo click handler */
  onLogoClick?: () => void;
  /** Legal copyright footer text */
  copyrightText?: string;
  /** Custom className */
  className?: string;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  mode = 'request',
  userId: controlledUserId,
  defaultUserId = '',
  onUserIdChange,
  userIdError,
  title,
  subtitle,
  loading = false,
  onRequestReset,
  onBackToSignIn,
  onResendLink,
  pausedBackground = false,
  onLogoClick,
  copyrightText = '© 2026 FMDQ Group PLC. All rights reserved. Registered and regulated by the Securities and Exchange Commission, Nigeria.',
  className = '',
}) => {
  const [internalUserId, setInternalUserId] = useState(defaultUserId);
  const userId = controlledUserId !== undefined ? controlledUserId : internalUserId;

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledUserId === undefined) {
      setInternalUserId(val);
    }
    onUserIdChange?.(val);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onRequestReset?.(userId);
  };

  const isSent = mode === 'sent';

  const defaultTitle = isSent ? 'Check your email' : 'Reset your password';
  const defaultSubtitle = isSent
    ? "If an account exists for that User ID, we've sent a link to reset your password. The link can only be used once."
    : "Enter your User ID and we'll email you a link to set a new password.";

  const resolvedTitle = title ?? defaultTitle;
  const resolvedSubtitle = subtitle ?? defaultSubtitle;
  const inputState: InputState = userIdError ? 'error' : 'default';

  return (
    <AuthBackground paused={pausedBackground} className={`fmdqui-forgot-wrapper ${className}`}>
      <div className="fmdqui-forgot">
        <main className="fmdqui-forgot__card" role="region" aria-label={resolvedTitle}>
          {/* FMDQ Brand Logo */}
          <div className="fmdqui-forgot__logo-container">
            <button
              type="button"
              className="fmdqui-forgot__logo-button"
              onClick={onLogoClick}
              aria-label="FMDQ Data Reporting Portal Home"
            >
              <Logo variant="default" size="md" className="fmdqui-forgot__logo" />
            </button>
          </div>

          {/* Featured Icon Badge */}
          <div className="fmdqui-forgot__icon-badge" aria-hidden="true">
            {isSent ? (
              <Icon name="mail-check" variant="bold" size={28} color="#1D326D" />
            ) : (
              <Icon name="lock" variant="bold" size={28} color="#1D326D" />
            )}
          </div>

          {/* Heading Group */}
          <div className="fmdqui-forgot__heading-group">
            <h1 className="fmdqui-forgot__title">{resolvedTitle}</h1>
            {resolvedSubtitle && <p className="fmdqui-forgot__subtitle">{resolvedSubtitle}</p>}
          </div>

          {/* Mode 1: Request reset form */}
          {!isSent ? (
            <form className="fmdqui-forgot__form" onSubmit={handleSubmit} noValidate>
              <Input
                size="lg"
                label="User ID"
                placeholder="e.g. USR-90412"
                value={userId}
                state={inputState}
                helperText={userIdError}
                hasHelperText={Boolean(userIdError)}
                onChange={handleUserIdChange}
                leadingIcon={<Icon name="user" size={20} color="var(--color-neutral-500)" />}
                hasRightIcon={false}
                autoFocus
              />

              <div className="fmdqui-forgot__action">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="fmdqui-forgot__submit-btn"
                  disabled={loading || !userId.trim()}
                >
                  Send reset link
                </Button>
              </div>

              <div className="fmdqui-forgot__back">
                <Button
                  type="button"
                  variant="text"
                  size="sm"
                  buttonType="primary"
                  iconStyle="leading icon"
                  icon={<Icon name="arrow-left" variant="linear" size={16} />}
                  onClick={onBackToSignIn}
                >
                  Back to sign in
                </Button>
              </div>
            </form>
          ) : (
            /* Mode 2: Email sent confirmation */
            <div className="fmdqui-forgot__sent-content">
              <div className="fmdqui-forgot__action">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="fmdqui-forgot__submit-btn"
                  onClick={onBackToSignIn}
                >
                  Back to sign in
                </Button>
              </div>

              <div className="fmdqui-forgot__resend">
                <p className="fmdqui-forgot__resend-text">
                  Didn’t get the email? Check your spam folder or resend the link.
                </p>
                <Button
                  type="button"
                  variant="text"
                  size="sm"
                  buttonType="primary"
                  className="fmdqui-forgot__resend-btn"
                  onClick={onResendLink}
                >
                  Resend link
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* Global Legal Footer */}
        <footer className="fmdqui-forgot__footer">
          <p className="fmdqui-forgot__copyright">{copyrightText}</p>
        </footer>
      </div>
    </AuthBackground>
  );
};
