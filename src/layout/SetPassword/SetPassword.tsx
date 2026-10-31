import React, { useState, useId } from 'react';
import type { FormEvent } from 'react';
import { AuthBackground } from '../AuthBackground';
import { Logo } from '../../elements/Logo';
import { Icon } from '../../foundations/icons';
import { Input, type InputState } from '../../elements/Input';
import { Button } from '../../elements/Button';
import { Badge } from '../../elements/Badge';
import './SetPassword.css';

export interface PasswordRuleState {
  length: boolean;
  cases: boolean;
  number: boolean;
  special: boolean;
}

export type SetPasswordMode = 'setPassword' | 'expired';

export interface SetPasswordProps {
  /** Mode: 'setPassword' (1.7, 1.7a, 1.16) or 'expired' (1.16a) */
  mode?: SetPasswordMode;
  /** Page heading */
  title?: string;
  /** Page explanatory subtitle */
  subtitle?: string;
  /** Optional onboarding badge (e.g. "Step 1 of 2") */
  badgeLabel?: string;
  /** New password value (controlled) */
  password?: string;
  /** Confirm new password value (controlled) */
  confirmPassword?: string;
  /** Default new password for uncontrolled usage */
  defaultPassword?: string;
  /** Default confirm password for uncontrolled usage */
  defaultConfirmPassword?: string;
  /** Fired when new password changes */
  onPasswordChange?: (val: string) => void;
  /** Fired when confirm password changes */
  onConfirmPasswordChange?: (val: string) => void;
  /** Specific validation error for the confirm password field (e.g. "Passwords don’t match. Check both fields and try again.") */
  confirmPasswordError?: string;
  /** Specific validation error for the new password field */
  passwordError?: string;
  /** Label for the primary submit button */
  primaryButtonLabel?: string;
  /** Loading state for primary submission */
  loading?: boolean;
  /** Fired when form is submitted */
  onSubmit?: (values: { password: string; confirmPassword: string }) => void;
  /** Fired when user requests a new link (in expired mode) */
  onRequestNewLink?: () => void;
  /** Fired when clicking 'Back to sign in' */
  onBackToSignIn?: () => void;
  /** Whether to show 'Back to sign in' link (defaults to true in expired mode) */
  showBackToSignIn?: boolean;
  /** Pauses the animated dotted shader background */
  pausedBackground?: boolean;
  /** Logo click handler */
  onLogoClick?: () => void;
  /** Legal copyright text */
  copyrightText?: string;
  /** Custom className */
  className?: string;
}

export const SetPassword: React.FC<SetPasswordProps> = ({
  mode = 'setPassword',
  title,
  subtitle,
  badgeLabel,
  password: controlledPassword,
  confirmPassword: controlledConfirmPassword,
  defaultPassword = '',
  defaultConfirmPassword = '',
  onPasswordChange,
  onConfirmPasswordChange,
  confirmPasswordError,
  passwordError,
  primaryButtonLabel,
  loading = false,
  onSubmit,
  onRequestNewLink,
  onBackToSignIn,
  showBackToSignIn,
  pausedBackground = false,
  onLogoClick,
  copyrightText = '© 2026 FMDQ Group PLC. All rights reserved. Registered and regulated by the Securities and Exchange Commission, Nigeria.',
  className = '',
}) => {
  const [internalPassword, setInternalPassword] = useState(defaultPassword);
  const [internalConfirmPassword, setInternalConfirmPassword] = useState(defaultConfirmPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordToggleId = useId();
  const confirmToggleId = useId();

  const password = controlledPassword !== undefined ? controlledPassword : internalPassword;
  const confirmPassword = controlledConfirmPassword !== undefined ? controlledConfirmPassword : internalConfirmPassword;

  // Live password rules verification
  const rules: PasswordRuleState = {
    length: password.length >= 8,
    cases: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allRulesMet = rules.length && rules.cases && rules.number && rules.special;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledPassword === undefined) {
      setInternalPassword(val);
    }
    onPasswordChange?.(val);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledConfirmPassword === undefined) {
      setInternalConfirmPassword(val);
    }
    onConfirmPasswordChange?.(val);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (mode === 'expired') {
      onRequestNewLink?.();
    } else {
      onSubmit?.({ password, confirmPassword });
    }
  };

  const isExpired = mode === 'expired';

  // Titles and button labels
  const defaultTitle = isExpired ? 'This set-up link has expired' : 'Set a new password';
  const defaultSubtitle = isExpired
    ? 'For security, set-up links work once and expire after 72 hours. Request a new one and we’ll ask the Market Service Group to resend it.'
    : 'Choose a password you have not used on this portal before.';

  const resolvedTitle = title ?? defaultTitle;
  const resolvedSubtitle = subtitle ?? defaultSubtitle;
  const defaultButtonLabel = isExpired
    ? 'Request a new link'
    : badgeLabel
    ? 'Continue'
    : 'Update password';
  const resolvedButtonLabel = primaryButtonLabel ?? defaultButtonLabel;

  const passwordState: InputState = passwordError ? 'error' : 'default';
  const confirmState: InputState = confirmPasswordError ? 'error' : 'default';

  return (
    <AuthBackground paused={pausedBackground} className={`fmdqui-setpassword-wrapper ${className}`}>
      <div className="fmdqui-setpassword">
        <main className="fmdqui-setpassword__card" role="region" aria-label={resolvedTitle}>
          {/* FMDQ Brand Logo */}
          <div className="fmdqui-setpassword__logo-container">
            <button
              type="button"
              className="fmdqui-setpassword__logo-button"
              onClick={onLogoClick}
              aria-label="FMDQ Data Reporting Portal Home"
            >
              <Logo variant="default" size="md" className="fmdqui-setpassword__logo" />
            </button>
          </div>

          {/* Featured Icon (Expired mode: 56px clock) */}
          {isExpired && (
            <div className="fmdqui-setpassword__icon-badge" aria-hidden="true">
              <Icon name="clock" variant="bold" size={28} color="#1D326D" />
            </div>
          )}

          {/* Heading Group */}
          <div className="fmdqui-setpassword__heading-group">
            {badgeLabel && (
              <div className="fmdqui-setpassword__step-badge">
                <Badge color="blue" type="filled" size="md">
                  {badgeLabel}
                </Badge>
              </div>
            )}
            <h1 className="fmdqui-setpassword__title">{resolvedTitle}</h1>
            {resolvedSubtitle && <p className="fmdqui-setpassword__subtitle">{resolvedSubtitle}</p>}
          </div>

          {/* Mode 1: Set Password Form */}
          {!isExpired ? (
            <form className="fmdqui-setpassword__form" onSubmit={handleSubmit} noValidate>
              <div className="fmdqui-setpassword__inputs">
                <Input
                  size="lg"
                  type={showPassword ? 'text' : 'password'}
                  label="New password"
                  placeholder="Enter new password"
                  value={password}
                  state={passwordState}
                  helperText={passwordError}
                  hasHelperText={Boolean(passwordError)}
                  onChange={handlePasswordChange}
                  hasLeftIcon={true}
                  leadingIcon={<Icon name="lock" size={20} color="var(--color-neutral-500)" />}
                  hasRightIcon={true}
                  trailingIcon={
                    <button
                      type="button"
                      id={passwordToggleId}
                      className="fmdqui-setpassword__password-toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon
                        name={showPassword ? 'eye-slash' : 'eye'}
                        size={20}
                        color="var(--color-neutral-500)"
                      />
                    </button>
                  }
                  autoFocus
                />

                <Input
                  size="lg"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm new password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  state={confirmState}
                  helperText={confirmPasswordError}
                  hasHelperText={Boolean(confirmPasswordError)}
                  onChange={handleConfirmPasswordChange}
                  hasLeftIcon={true}
                  leadingIcon={<Icon name="lock" size={20} color="var(--color-neutral-500)" />}
                  hasRightIcon={true}
                  trailingIcon={
                    <button
                      type="button"
                      id={confirmToggleId}
                      className="fmdqui-setpassword__password-toggle"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon
                        name={showConfirmPassword ? 'eye-slash' : 'eye'}
                        size={20}
                        color="var(--color-neutral-500)"
                      />
                    </button>
                  }
                />
              </div>

              {/* Password Rules Checklist */}
              <div className="fmdqui-setpassword__rules" role="region" aria-label="Password rules">
                <h4 className="fmdqui-setpassword__rules-title">Your password must have:</h4>
                <ul className="fmdqui-setpassword__rules-list">
                  <li className={`fmdqui-setpassword__rule ${rules.length ? 'fmdqui-setpassword__rule--met' : ''}`}>
                    <span className="fmdqui-setpassword__rule-icon" aria-hidden="true">
                      {rules.length ? (
                        <Icon name="check-circle" variant="bold" size={16} color="#04802E" />
                      ) : (
                        <Icon name="minus-circle" variant="bold" size={16} color="#98A2B3" />
                      )}
                    </span>
                    <span className="fmdqui-setpassword__rule-text">At least 8 characters</span>
                  </li>

                  <li className={`fmdqui-setpassword__rule ${rules.cases ? 'fmdqui-setpassword__rule--met' : ''}`}>
                    <span className="fmdqui-setpassword__rule-icon" aria-hidden="true">
                      {rules.cases ? (
                        <Icon name="check-circle" variant="bold" size={16} color="#04802E" />
                      ) : (
                        <Icon name="minus-circle" variant="bold" size={16} color="#98A2B3" />
                      )}
                    </span>
                    <span className="fmdqui-setpassword__rule-text">Upper and lower case letters</span>
                  </li>

                  <li className={`fmdqui-setpassword__rule ${rules.number ? 'fmdqui-setpassword__rule--met' : ''}`}>
                    <span className="fmdqui-setpassword__rule-icon" aria-hidden="true">
                      {rules.number ? (
                        <Icon name="check-circle" variant="bold" size={16} color="#04802E" />
                      ) : (
                        <Icon name="minus-circle" variant="bold" size={16} color="#98A2B3" />
                      )}
                    </span>
                    <span className="fmdqui-setpassword__rule-text">At least one number</span>
                  </li>

                  <li className={`fmdqui-setpassword__rule ${rules.special ? 'fmdqui-setpassword__rule--met' : ''}`}>
                    <span className="fmdqui-setpassword__rule-icon" aria-hidden="true">
                      {rules.special ? (
                        <Icon name="check-circle" variant="bold" size={16} color="#04802E" />
                      ) : (
                        <Icon name="minus-circle" variant="bold" size={16} color="#98A2B3" />
                      )}
                    </span>
                    <span className="fmdqui-setpassword__rule-text">At least one special character</span>
                  </li>
                </ul>
              </div>

              {/* Primary Action Button */}
              <div className="fmdqui-setpassword__action">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="fmdqui-setpassword__submit-btn"
                  disabled={loading || !allRulesMet || !confirmPassword}
                >
                  {resolvedButtonLabel}
                </Button>
              </div>

              {/* Back to sign in if enabled */}
              {showBackToSignIn && (
                <div className="fmdqui-setpassword__back">
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
              )}
            </form>
          ) : (
            /* Mode 2: Expired Link Screen (1.16a) */
            <div className="fmdqui-setpassword__expired-content">
              <div className="fmdqui-setpassword__action">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="fmdqui-setpassword__submit-btn"
                  onClick={onRequestNewLink}
                  disabled={loading}
                >
                  {resolvedButtonLabel}
                </Button>
              </div>

              <div className="fmdqui-setpassword__back">
                <Button
                  type="button"
                  variant="text"
                  size="sm"
                  buttonType="primary"
                  onClick={onBackToSignIn}
                >
                  Back to sign in
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* Global Legal Footer */}
        <footer className="fmdqui-setpassword__footer">
          <p className="fmdqui-setpassword__copyright">{copyrightText}</p>
        </footer>
      </div>
    </AuthBackground>
  );
};

