import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AuthBackground } from '../AuthBackground';
import { Logo } from '../../elements/Logo';
import { Icon } from '../../foundations/icons';
import { Button } from '../../elements/Button';
import { Badge } from '../../elements/Badge';
import { Toast, type ToastState } from '../../components/Toast';
import './TwoStepVerification.css';

export interface TwoStepVerificationProps {
  /** Page heading */
  title?: string;
  /** Explanatory subtext with recipient email / expiry */
  subtitle?: string;
  /** Optional badge above heading (e.g. "Step 2 of 2" for onboarding) */
  badgeLabel?: string;
  /** Controlled 6-digit verification code */
  code?: string;
  /** Initial code value for uncontrolled usage */
  defaultCode?: string;
  /** Fired whenever digit values change */
  onCodeChange?: (code: string) => void;
  /** Fired when all 6 digits have been entered */
  onComplete?: (code: string) => void;
  /** Error message displayed below digit boxes (Figma node 10306:193912) */
  error?: string;
  /** Optional alert banner state ('warning', 'error', etc.) */
  alertState?: ToastState;
  /** Alert banner title (e.g. "2 tries left" or "Last try before your account locks") */
  alertTitle?: string;
  /** Alert banner subtext */
  alertDescription?: string;
  /** Custom alert slot */
  alert?: ReactNode;
  /** Remaining resend cooldown in seconds (e.g. 45 or 12). If 0 or omitted, "Resend it now." link is shown */
  resendSeconds?: number;
  /** Callback fired when user clicks resend */
  onResend?: () => void;
  /** Whether the resend action is disabled */
  resendDisabled?: boolean;
  /** Additional trailing note after the resend link */
  resendNote?: string;
  /** Label for primary verification button */
  primaryButtonLabel?: string;
  /** Click handler for primary button */
  onSubmit?: (code: string) => void;
  /** Whether submission is in loading state */
  loading?: boolean;
  /** Whether to show "Back to sign in" link button at bottom */
  showBackToSignIn?: boolean;
  /** Click handler for "Back to sign in" */
  onBackToSignIn?: () => void;
  /** Pauses the animated dotted shader background for reduced motion or tests */
  pausedBackground?: boolean;
  /** Custom logo click handler */
  onLogoClick?: () => void;
  /** Legal copyright footer text */
  copyrightText?: string;
  /** Custom className */
  className?: string;
}

export const TwoStepVerification: React.FC<TwoStepVerificationProps> = ({
  title = 'Enter your verification code',
  subtitle = "We've sent a 6-digit code to m••••••@fmdqgroup.com. It expires in 10 minutes.",
  badgeLabel,
  code: controlledCode,
  defaultCode = '',
  onCodeChange,
  onComplete,
  error,
  alertState,
  alertTitle,
  alertDescription,
  alert,
  resendSeconds = 45,
  onResend,
  resendDisabled = false,
  resendNote,
  primaryButtonLabel = 'Verify and continue',
  onSubmit,
  loading = false,
  showBackToSignIn = true,
  onBackToSignIn,
  pausedBackground = false,
  onLogoClick,
  copyrightText = '© 2026 FMDQ Group PLC. All rights reserved. Registered and regulated by the Securities and Exchange Commission, Nigeria.',
  className = '',
}) => {
  const [internalCode, setInternalCode] = useState<string[]>(() => {
    const initial = (controlledCode !== undefined ? controlledCode : defaultCode).slice(0, 6);
    return Array.from({ length: 6 }, (_, i) => initial[i] || '');
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync internal state if controlledCode changes
  useEffect(() => {
    if (controlledCode !== undefined) {
      setInternalCode(Array.from({ length: 6 }, (_, i) => controlledCode[i] || ''));
    }
  }, [controlledCode]);

  const updateDigits = useCallback(
    (newDigits: string[]) => {
      setInternalCode(newDigits);
      const fullCode = newDigits.join('');
      onCodeChange?.(fullCode);
      if (fullCode.length === 6 && !newDigits.some((d) => d === '')) {
        onComplete?.(fullCode);
      }
    },
    [onCodeChange, onComplete]
  );

  const handleDigitChange = (index: number, val: string) => {
    // Only accept numeric digit
    const cleaned = val.replace(/\D/g, '');
    if (!cleaned) {
      const nextDigits = [...internalCode];
      nextDigits[index] = '';
      updateDigits(nextDigits);
      return;
    }

    const digit = cleaned.slice(-1);
    const nextDigits = [...internalCode];
    nextDigits[index] = digit;
    updateDigits(nextDigits);

    // Auto-advance to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!internalCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const nextDigits = Array.from({ length: 6 }, (_, i) => pasted[i] || '');
    updateDigits(nextDigits);

    const targetIndex = Math.min(pasted.length, 5);
    inputRefs.current[targetIndex]?.focus();
  };

  const handlePrimaryClick = () => {
    const fullCode = internalCode.join('');
    onSubmit?.(fullCode);
  };

  const fullCodeString = internalCode.join('');
  const isComplete = fullCodeString.length === 6 && !internalCode.some((d) => d === '');
  const hasAlert = Boolean(alert || (alertState && (alertTitle || alertDescription)));

  // Format seconds into "M:SS"
  const formattedCountdown = `${Math.floor(resendSeconds / 60)}:${(resendSeconds % 60)
    .toString()
    .padStart(2, '0')}`;

  return (
    <AuthBackground paused={pausedBackground} className={`fmdqui-twostep-wrapper ${className}`}>
      <div className="fmdqui-twostep">
        <main className="fmdqui-twostep__card" role="region" aria-label="Two-step verification">
          {/* FMDQ Brand Logo */}
          <div className="fmdqui-twostep__logo-container">
            <button
              type="button"
              className="fmdqui-twostep__logo-button"
              onClick={onLogoClick}
              aria-label="FMDQ Data Reporting Portal Home"
            >
              <Logo variant="default" size="md" className="fmdqui-twostep__logo" />
            </button>
          </div>

          {/* Featured Shield-Tick Icon */}
          <div className="fmdqui-twostep__icon-badge" aria-hidden="true">
            <Icon name="shield-tick" variant="bold" size={28} color="#1D326D" />
          </div>

          {/* Step Badge & Heading */}
          <div className="fmdqui-twostep__heading-group">
            {badgeLabel && (
              <div className="fmdqui-twostep__step-badge">
                <Badge color="blue" type="filled" size="md">
                  {badgeLabel}
                </Badge>
              </div>
            )}
            <h1 className="fmdqui-twostep__title">{title}</h1>
            {subtitle && <p className="fmdqui-twostep__subtitle">{subtitle}</p>}
          </div>

          {/* Warning / Attempt Alert Banner (1.4b, 1.4c) */}
          {hasAlert && (
            <div className="fmdqui-twostep__alert-wrapper">
              {alert ? (
                alert
              ) : (
                <Toast
                  type="banners"
                  state={alertState}
                  title={alertTitle}
                  subtext={alertDescription}
                  hasTitle={Boolean(alertTitle)}
                  hasSubtext={Boolean(alertDescription)}
                  hasIcon={true}
                  hasCloseButton={false}
                  hasCTA={false}
                />
              )}
            </div>
          )}

          {/* 6-Digit Code Input Section */}
          <div className="fmdqui-twostep__code-section">
            <div
              className={`fmdqui-twostep__digits ${error ? 'fmdqui-twostep__digits--error' : ''}`}
              role="group"
              aria-label="6-digit verification code"
            >
              {internalCode.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  aria-label={`Digit ${idx + 1} of 6`}
                  aria-invalid={Boolean(error)}
                  className="fmdqui-twostep__digit-input"
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {/* Error Message below digit inputs */}
            {error && (
              <p className="fmdqui-twostep__error-message" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Primary Submit Button */}
          <div className="fmdqui-twostep__action">
            <Button
              variant="primary"
              size="lg"
              className="fmdqui-twostep__submit-btn"
              disabled={!isComplete || loading}
              onClick={handlePrimaryClick}
            >
              {primaryButtonLabel}
            </Button>
          </div>

          {/* Resend Code Section */}
          <div className="fmdqui-twostep__resend">
            <span className="fmdqui-twostep__resend-text">
              Didn’t get a code?{' '}
              {resendSeconds > 0 ? (
                `You can resend in ${formattedCountdown}.`
              ) : (
                <button
                  type="button"
                  className="fmdqui-twostep__resend-button"
                  onClick={onResend}
                  disabled={resendDisabled}
                >
                  Resend it now.
                </button>
              )}
              {resendNote ? ` ${resendNote}` : ''}
            </span>
          </div>

          {/* Back to Sign In (Omitted in onboarding step) */}
          {showBackToSignIn && (
            <div className="fmdqui-twostep__back">
              <Button
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
        </main>

        {/* Global Legal Footer */}
        <footer className="fmdqui-twostep__footer">
          <p className="fmdqui-twostep__copyright">{copyrightText}</p>
        </footer>
      </div>
    </AuthBackground>
  );
};
