import React from 'react';
import { Logo } from '../../elements/Logo';
import { Button } from '../../elements/Button';
import './WelcomeEmail.css';

export interface WelcomeEmailProps {
  /** Recipient first name */
  recipientName?: string;
  /** Envelope header subject line */
  emailSubject?: string;
  /** Envelope header metadata (sender, recipient, date) */
  senderText?: string;
  /** User ID string */
  userId?: string;
  /** Institution name */
  institution?: string;
  /** Access role or module permission */
  accessRole?: string;
  /** Primary button label */
  ctaLabel?: string;
  /** Callback fired when user clicks 'Set up your account' */
  onSetUpAccount?: () => void;
  /** Logo click handler */
  onLogoClick?: () => void;
  /** Legal automated message footer */
  copyrightText?: string;
  /** Custom className */
  className?: string;
}

/**
 * 1.15 Welcome email layout (Figma node 10306:12506)
 * Simulates the initial email invitation sent to new users on the FMDQ Data Reporting Portal.
 */
export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  recipientName = 'Adaeze',
  emailSubject = 'Your Data Reporting Portal account is ready',
  senderText = 'From: FMDQ Data Reporting Portal  ·  To: adaeze.okafor@accessbankplc.com  ·  26 Oct 2026, 11:02',
  userId = 'adaeze.okafor@accessbankplc.com',
  institution = 'Access Bank PLC',
  accessRole = 'NIBOR Inputter',
  ctaLabel = 'Set up your account',
  onSetUpAccount,
  onLogoClick,
  copyrightText = '© 2026 FMDQ Group PLC. This is an automated message; replies are not monitored.',
  className = '',
}) => {
  return (
    <div className={`fmdqui-welcome-email ${className}`.trim()}>
      <div className="fmdqui-welcome-email__container">
        {/* Envelope Metadata Header (Figma 10306:12507) */}
        <header className="fmdqui-welcome-email__envelope" aria-label="Email details">
          <h2 className="fmdqui-welcome-email__subject">{emailSubject}</h2>
          <p className="fmdqui-welcome-email__meta">{senderText}</p>
        </header>

        {/* Main Email Body Card (Figma 10306:12510) */}
        <main className="fmdqui-welcome-email__card" role="main" aria-label="Invitation email content">
          {/* FMDQ Brand Logo */}
          <div className="fmdqui-welcome-email__logo-row">
            <button
              type="button"
              className="fmdqui-welcome-email__logo-btn"
              onClick={onLogoClick}
              aria-label="FMDQ Data Reporting Portal"
            >
              <Logo variant="default" size="md" className="fmdqui-welcome-email__logo" />
            </button>
          </div>

          {/* Salutation & Intro Text */}
          <div className="fmdqui-welcome-email__message">
            <h1 className="fmdqui-welcome-email__greeting">Hello {recipientName},</h1>
            <p className="fmdqui-welcome-email__intro">
              An account has been created for you on the FMDQ Data Reporting Portal.
            </p>
          </div>

          {/* Account Details Summary Box (Figma 10306:12531) */}
          <div className="fmdqui-welcome-email__summary" role="region" aria-label="Account Summary">
            <div className="fmdqui-welcome-email__summary-row">
              <span className="fmdqui-welcome-email__summary-label">User ID</span>
              <span className="fmdqui-welcome-email__summary-value">{userId}</span>
            </div>
            <div className="fmdqui-welcome-email__summary-row">
              <span className="fmdqui-welcome-email__summary-label">Institution</span>
              <span className="fmdqui-welcome-email__summary-value">{institution}</span>
            </div>
            <div className="fmdqui-welcome-email__summary-row">
              <span className="fmdqui-welcome-email__summary-label">Access</span>
              <span className="fmdqui-welcome-email__summary-value">{accessRole}</span>
            </div>
          </div>

          {/* Action Callout & Button */}
          <div className="fmdqui-welcome-email__action-group">
            <p className="fmdqui-welcome-email__instruction">
              Set a password to activate your account. The link can only be used once.
            </p>
            <div className="fmdqui-welcome-email__button-wrapper">
              <Button
                variant="primary"
                size="lg"
                className="fmdqui-welcome-email__cta"
                onClick={onSetUpAccount}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>

          {/* Security Disclaimer Note (Figma node 10306:12545) */}
          <p className="fmdqui-welcome-email__disclaimer">
            If you weren't expecting this email, don't use the link. Contact support@fmdqgroup.com.
          </p>
        </main>

        {/* Global Email Footer */}
        <footer className="fmdqui-welcome-email__footer">
          <p className="fmdqui-welcome-email__copyright">{copyrightText}</p>
        </footer>
      </div>
    </div>
  );
};

