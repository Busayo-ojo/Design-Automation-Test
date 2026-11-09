import React from 'react';
import { AuthBackground } from '../AuthBackground';
import { Logo } from '../../elements/Logo';
import { Icon } from '../../foundations/icons';
import { Button } from '../../elements/Button';
import './AccountLocked.css';

export type AccountLockedReason = 'password' | 'verification';

export interface AccountLockedProps {
  /** Reason for account lockout: 'password' (1.3 failed sign-in) or 'verification' (1.4d 5 wrong OTP codes) */
  reason?: AccountLockedReason;
  /** Custom heading title override */
  title?: string;
  /** Custom subtitle explanatory copy override */
  subtitle?: string;
  /** Support email address for the primary button */
  supportEmail?: string;
  /** Custom primary button label override */
  primaryButtonLabel?: string;
  /** Primary button click callback (defaults to opening mailto) */
  onEmailSupport?: () => void;
  /** Callback when user clicks 'Back to sign in' */
  onBackToSignIn?: () => void;
  /** Pauses the animated dotted shader background */
  pausedBackground?: boolean;
  /** Logo click handler */
  onLogoClick?: () => void;
  /** Legal copyright footer text */
  copyrightText?: string;
  /** Custom className */
  className?: string;
}

export const AccountLocked: React.FC<AccountLockedProps> = ({
  reason = 'password',
  title = 'Your account is locked',
  subtitle,
  supportEmail = 'support@fmdqgroup.com',
  primaryButtonLabel,
  onEmailSupport,
  onBackToSignIn,
  pausedBackground = false,
  onLogoClick,
  copyrightText = '© 2026 FMDQ Group PLC. All rights reserved. Registered and regulated by the Securities and Exchange Commission, Nigeria.',
  className = '',
}) => {
  const defaultSubtitle =
    reason === 'verification'
      ? 'You entered 5 incorrect verification codes, so we locked your account to keep it safe. Contact the Market Service Group to unlock it.'
      : 'Your account was locked after several unsuccessful sign-in attempts. Contact the Market Service Group to unlock it.';

  const resolvedSubtitle = subtitle ?? defaultSubtitle;
  const resolvedButtonLabel = primaryButtonLabel ?? `Email ${supportEmail}`;

  const handleEmailClick = () => {
    if (onEmailSupport) {
      onEmailSupport();
    } else {
      window.location.href = `mailto:${supportEmail}?subject=DRP%20Account%20Unlock%20Request`;
    }
  };

  return (
    <AuthBackground paused={pausedBackground} className={`fmdqui-locked-wrapper ${className}`}>
      <div className="fmdqui-locked">
        <main className="fmdqui-locked__card" role="region" aria-label={title}>
          {/* FMDQ Brand Logo */}
          <div className="fmdqui-locked__logo-container">
            <button
              type="button"
              className="fmdqui-locked__logo-button"
              onClick={onLogoClick}
              aria-label="FMDQ Data Reporting Portal Home"
            >
              <Logo variant="default" size="md" className="fmdqui-locked__logo" />
            </button>
          </div>

          {/* Featured Lock Icon (Error Red #CB1A14 / #FEE4E2) */}
          <div className="fmdqui-locked__icon-badge" aria-hidden="true">
            <Icon name="lock" variant="bold" size={28} color="#CB1A14" />
          </div>

          {/* Heading Group */}
          <div className="fmdqui-locked__heading-group">
            <h1 className="fmdqui-locked__title">{title}</h1>
            {resolvedSubtitle && <p className="fmdqui-locked__subtitle">{resolvedSubtitle}</p>}
          </div>

          {/* Primary Action Button */}
          <div className="fmdqui-locked__action">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="fmdqui-locked__submit-btn"
              onClick={handleEmailClick}
            >
              {resolvedButtonLabel}
            </Button>
          </div>

          {/* Back to Sign In */}
          <div className="fmdqui-locked__back">
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
        </main>

        {/* Global Legal Footer */}
        <footer className="fmdqui-locked__footer">
          <p className="fmdqui-locked__copyright">{copyrightText}</p>
        </footer>
      </div>
    </AuthBackground>
  );
};

