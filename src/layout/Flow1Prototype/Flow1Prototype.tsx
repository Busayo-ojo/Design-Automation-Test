import React, { useState } from 'react';
import { WelcomeEmail } from '../WelcomeEmail';
import { SignIn } from '../SignIn';
import { TwoStepVerification } from '../TwoStepVerification';
import { ForgotPassword } from '../ForgotPassword';
import { SetPassword } from '../SetPassword';
import { AccountLocked } from '../AccountLocked';
import { Dashboard } from '../Dashboard';
import { Icon } from '../../foundations/icons';
import './Flow1Prototype.css';

export type Flow1Step =
  | 'welcome-email'
  | 'onboarding-password'
  | 'onboarding-2fa'
  | 'signin'
  | 'signin-incorrect'
  | 'signin-password-updated'
  | 'signin-session-timeout'
  | 'signin-logged-out'
  | 'verify-2fa'
  | 'verify-2fa-error'
  | 'verify-2fa-warning'
  | 'verify-2fa-last-try'
  | 'account-locked-pwd'
  | 'account-locked-2fa'
  | 'forgot-password'
  | 'check-email'
  | 'reset-password'
  | 'dashboard';

export interface Flow1PrototypeProps {
  /** Initial step to start the flow on (defaults to 'onboarding-password') */
  initialStep?: Flow1Step;
  /** Whether to show the floating reviewer navigation toolbar */
  showReviewerToolbar?: boolean;
  /** Additional CSS class */
  className?: string;
}

const STEP_LABELS: Record<Flow1Step, string> = {
  'welcome-email': '1.15 Welcome Email (Invite)',
  'onboarding-password': '1.16 Set Up Account · Password (Step 1)',
  'onboarding-2fa': '1.17 Set Up Account · 2FA (Step 2)',
  'signin': '1.1 Sign In (MSG Admin)',
  'signin-incorrect': '1.2 Sign In · Incorrect Details',
  'signin-password-updated': '1.8 Sign In · Password Updated',
  'signin-session-timeout': '1.9 Sign In · Session Timed Out',
  'signin-logged-out': '1.19 Sign In · Logged Out',
  'verify-2fa': '1.4 Two-Step Verification',
  'verify-2fa-error': '1.4a Two-Step · Incorrect Code',
  'verify-2fa-warning': '1.4b Two-Step · Warning (3 Failed)',
  'verify-2fa-last-try': '1.4c Two-Step · Last Try',
  'account-locked-pwd': '1.3 Account Locked (Password)',
  'account-locked-2fa': '1.4d Account Locked (5 Failed 2FA)',
  'forgot-password': '1.5 Forgot Password',
  'check-email': '1.6 Check Your Email',
  'reset-password': '1.7 Set A New Password',
  'dashboard': 'DRP / Dashboard (MSG Admin)',
};

export const Flow1Prototype: React.FC<Flow1PrototypeProps> = ({
  initialStep = 'welcome-email',
  showReviewerToolbar = true,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState<Flow1Step>(initialStep);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [isToolbarMinimized, setIsToolbarMinimized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User credential & simulation state
  const [userId, setUserId] = useState('adaeze.okafor@accessbankplc.com');
  const [password, setPassword] = useState('DemoPass2026!');
  const [failedPwdCount, setFailedPwdCount] = useState(0);

  // Helper with artificial micro-delay for realistic feedback
  const transitionTo = (step: Flow1Step, delayMs = 200) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(step);
    }, delayMs);
  };

  const handleResetFlow = () => {
    setFailedPwdCount(0);
    setCurrentStep('welcome-email');
  };

  return (
    <div className={`fmdqui-flow1-prototype ${className}`.trim()}>
      {/* ─── 1.15 Onboarding: Welcome Email Invite ─── */}
      {currentStep === 'welcome-email' && (
        <WelcomeEmail
          userId={userId}
          recipientName="Adaeze"
          institution="Access Bank PLC"
          accessRole="NIBOR Inputter"
          onSetUpAccount={() => transitionTo('onboarding-password')}
        />
      )}

      {/* ─── 1.16 Onboarding: Set Up Account · Password (Step 1 of 2) ─── */}
      {currentStep === 'onboarding-password' && (
        <SetPassword
          mode="setPassword"
          badgeLabel="Step 1 of 2"
          title="Set up your password"
          subtitle="Create a secure password for your Market Service Group account"
          primaryButtonLabel="Continue"
          loading={isSubmitting}
          showBackToSignIn
          onBackToSignIn={() => setCurrentStep('signin')}
          onSubmit={({ password: newPass }) => {
            setPassword(newPass);
            transitionTo('onboarding-2fa');
          }}
        />
      )}

      {/* ─── 1.17 Onboarding: Set Up Two-Step Verification (Step 2 of 2) ─── */}
      {currentStep === 'onboarding-2fa' && (
        <TwoStepVerification
          badgeLabel="Step 2 of 2"
          title="Set up two-step verification"
          subtitle="We've sent a 6-digit confirmation code to your registered email"
          primaryButtonLabel="Verify and continue"
          loading={isSubmitting}
          showBackToSignIn
          onBackToSignIn={() => setCurrentStep('signin')}
          onSubmit={() => {
            transitionTo('signin-password-updated');
          }}
        />
      )}

      {/* ─── 1.1 Sign In ─── */}
      {currentStep === 'signin' && (
        <SignIn
          userId={userId}
          onUserIdChange={setUserId}
          password={password}
          onPasswordChange={setPassword}
          loading={isSubmitting}
          onForgotPassword={() => setCurrentStep('forgot-password')}
          onSubmit={({ password: enteredPass }) => {
            // Check password simulation
            if (enteredPass && enteredPass !== 'DemoPass2026!' && failedPwdCount < 2) {
              const newCount = failedPwdCount + 1;
              setFailedPwdCount(newCount);
              setCurrentStep('signin-incorrect');
            } else if (enteredPass && enteredPass !== 'DemoPass2026!' && failedPwdCount >= 2) {
              setCurrentStep('account-locked-pwd');
            } else {
              setFailedPwdCount(0);
              transitionTo('verify-2fa');
            }
          }}
        />
      )}

      {/* ─── 1.2 Sign In · Incorrect Details ─── */}
      {currentStep === 'signin-incorrect' && (
        <SignIn
          userId={userId}
          onUserIdChange={setUserId}
          password={password}
          onPasswordChange={setPassword}
          alertTitle="We couldn't sign you in"
          alertDescription="Your User ID or password was entered incorrectly. 2 attempts remaining."
          alertState="error"
          userIdState="error"
          passwordState="error"
          loading={isSubmitting}
          onForgotPassword={() => setCurrentStep('forgot-password')}
          onSubmit={({ password: enteredPass }) => {
            if (enteredPass === 'DemoPass2026!') {
              setFailedPwdCount(0);
              transitionTo('verify-2fa');
            } else {
              setCurrentStep('account-locked-pwd');
            }
          }}
        />
      )}

      {/* ─── 1.8 Sign In · Password Updated ─── */}
      {currentStep === 'signin-password-updated' && (
        <SignIn
          userId={userId}
          onUserIdChange={setUserId}
          alertTitle="Password updated"
          alertDescription="Your password was updated. Sign in with your new password to continue."
          alertState="success"
          loading={isSubmitting}
          onForgotPassword={() => setCurrentStep('forgot-password')}
          onSubmit={() => transitionTo('verify-2fa')}
        />
      )}

      {/* ─── 1.9 Sign In · Session Timed Out ─── */}
      {currentStep === 'signin-session-timeout' && (
        <SignIn
          userId={userId}
          onUserIdChange={setUserId}
          alertTitle="Session timed out"
          alertDescription="You were signed out after 15 minutes of inactivity. Sign in again to pick up where you left off."
          alertState="warning"
          loading={isSubmitting}
          onForgotPassword={() => setCurrentStep('forgot-password')}
          onSubmit={() => transitionTo('verify-2fa')}
        />
      )}

      {/* ─── 1.19 Sign In · Logged Out ─── */}
      {currentStep === 'signin-logged-out' && (
        <SignIn
          userId={userId}
          onUserIdChange={setUserId}
          alertTitle="Signed out"
          alertDescription="You have been safely signed out of the Data Reporting Portal."
          alertState="success"
          loading={isSubmitting}
          onForgotPassword={() => setCurrentStep('forgot-password')}
          onSubmit={() => transitionTo('verify-2fa')}
        />
      )}

      {/* ─── 1.4 Two-Step Verification ─── */}
      {currentStep === 'verify-2fa' && (
        <TwoStepVerification
          loading={isSubmitting}
          showBackToSignIn
          onBackToSignIn={() => setCurrentStep('signin')}
          onResend={() => alert('A new verification code has been dispatched.')}
          onSubmit={(code) => {
            if (code && code !== '260842') {
              setCurrentStep('verify-2fa-error');
            } else {
              transitionTo('dashboard', 300);
            }
          }}
        />
      )}

      {/* ─── 1.4a Two-Step · Incorrect Code ─── */}
      {currentStep === 'verify-2fa-error' && (
        <TwoStepVerification
          error="Incorrect code. Check your email or request a new one."
          showBackToSignIn
          loading={isSubmitting}
          onBackToSignIn={() => setCurrentStep('signin')}
          onSubmit={(code) => {
            if (code === '260842') {
              transitionTo('dashboard');
            } else {
              setCurrentStep('verify-2fa-warning');
            }
          }}
        />
      )}

      {/* ─── 1.4b Two-Step · Warning (3 failed) ─── */}
      {currentStep === 'verify-2fa-warning' && (
        <TwoStepVerification
          alertState="warning"
          alertTitle="2 attempts remaining"
          alertDescription="After 5 incorrect codes your account will be locked for security."
          showBackToSignIn
          loading={isSubmitting}
          onBackToSignIn={() => setCurrentStep('signin')}
          onSubmit={(code) => {
            if (code === '260842') {
              transitionTo('dashboard');
            } else {
              setCurrentStep('verify-2fa-last-try');
            }
          }}
        />
      )}

      {/* ─── 1.4c Two-Step · Last Try ─── */}
      {currentStep === 'verify-2fa-last-try' && (
        <TwoStepVerification
          alertState="warning"
          alertTitle="Last try"
          alertDescription="Your account will be locked if this code is incorrect."
          showBackToSignIn
          loading={isSubmitting}
          onBackToSignIn={() => setCurrentStep('signin')}
          onSubmit={(code) => {
            if (code === '260842') {
              transitionTo('dashboard');
            } else {
              setCurrentStep('account-locked-2fa');
            }
          }}
        />
      )}

      {/* ─── 1.3 Account Locked (Password) ─── */}
      {currentStep === 'account-locked-pwd' && (
        <AccountLocked
          reason="password"
          onBackToSignIn={() => {
            setFailedPwdCount(0);
            setCurrentStep('signin');
          }}
        />
      )}

      {/* ─── 1.4d Account Locked (2FA OTP) ─── */}
      {currentStep === 'account-locked-2fa' && (
        <AccountLocked
          reason="verification"
          onBackToSignIn={() => {
            setCurrentStep('signin');
          }}
        />
      )}

      {/* ─── 1.5 Forgot Password ─── */}
      {currentStep === 'forgot-password' && (
        <ForgotPassword
          mode="request"
          userId={userId}
          onUserIdChange={setUserId}
          onBackToSignIn={() => setCurrentStep('signin')}
          onRequestReset={() => transitionTo('check-email')}
        />
      )}

      {/* ─── 1.6 Check Your Email ─── */}
      {currentStep === 'check-email' && (
        <ForgotPassword
          mode="sent"
          userId={userId}
          onBackToSignIn={() => setCurrentStep('signin')}
          onResendLink={() => alert('New reset link sent!')}
        />
      )}

      {/* ─── 1.7 Set A New Password (Reset) ─── */}
      {currentStep === 'reset-password' && (
        <SetPassword
          mode="setPassword"
          title="Set a new password"
          subtitle="Choose a password that meets the security requirements"
          primaryButtonLabel="Update password"
          showBackToSignIn
          onBackToSignIn={() => setCurrentStep('signin')}
          onSubmit={() => transitionTo('signin-password-updated')}
        />
      )}

      {/* ─── DRP / Dashboard ─── */}
      {currentStep === 'dashboard' && (
        <Dashboard
          user={{
            name: 'Marvin Marvin Ogah',
            email: 'MSG Admin',
            onSignOut: () => {
              transitionTo('signin-logged-out');
            },
          }}
        />
      )}

      {/* ─── Reviewer Floating Control Toolbar ─── */}
      {showReviewerToolbar && !isToolbarMinimized && (
        <aside
          className={`fmdqui-flow1-toolbar ${
            isToolbarOpen ? 'fmdqui-flow1-toolbar--open' : ''
          }`}
          aria-label="Flow 1 Prototype Reviewer Controls"
        >
          <div className="fmdqui-flow1-toolbar__header">
            <button
              type="button"
              className="fmdqui-flow1-toolbar__toggle"
              onClick={() => setIsToolbarOpen(!isToolbarOpen)}
              title={isToolbarOpen ? 'Collapse panel' : 'Expand reviewer controls'}
            >
              <span className="fmdqui-flow1-toolbar__badge">Flow 1 Reviewer</span>
              <span className="fmdqui-flow1-toolbar__current-name">
                {STEP_LABELS[currentStep]}
              </span>
              <Icon
                name={isToolbarOpen ? 'chevron-down' : 'chevron-up'}
                variant="linear"
                size={16}
              />
            </button>

            <button
              type="button"
              className="fmdqui-flow1-toolbar__reset-btn"
              onClick={handleResetFlow}
              title="Reset flow to beginning"
            >
              <Icon name="refresh" variant="linear" size={14} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              className="fmdqui-flow1-toolbar__icon-btn"
              onClick={() => setIsToolbarMinimized(true)}
              title="Minimize reviewer toolbar"
              aria-label="Minimize reviewer toolbar"
            >
              <Icon name="multiply" variant="linear" size={12} />
            </button>
          </div>

          {isToolbarOpen && (
            <div className="fmdqui-flow1-toolbar__body">
              <div className="fmdqui-flow1-toolbar__section-title">
                Jump to any Prototype Screen:
              </div>
              <ul className="fmdqui-flow1-toolbar__list">
                {(Object.keys(STEP_LABELS) as Flow1Step[]).map((stepKey) => (
                  <li key={stepKey}>
                    <button
                      type="button"
                      className={`fmdqui-flow1-toolbar__item-btn ${
                        currentStep === stepKey
                          ? 'fmdqui-flow1-toolbar__item-btn--active'
                          : ''
                      }`}
                      onClick={() => {
                        setCurrentStep(stepKey);
                        setIsToolbarOpen(false);
                      }}
                    >
                      <span className="fmdqui-flow1-toolbar__item-dot" />
                      <span>{STEP_LABELS[stepKey]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      )}

      {showReviewerToolbar && isToolbarMinimized && (
        <aside
          className="fmdqui-flow1-toolbar fmdqui-flow1-toolbar--minimized"
          aria-label="Flow 1 Prototype Reviewer Controls"
        >
          <button
            type="button"
            className="fmdqui-flow1-toolbar__restore-btn"
            onClick={() => setIsToolbarMinimized(false)}
            title="Expand Flow 1 Reviewer controls"
          >
            <span className="fmdqui-flow1-toolbar__badge">Flow 1 Reviewer</span>
            <span className="fmdqui-flow1-toolbar__current-name">
              {STEP_LABELS[currentStep]}
            </span>
            <Icon name="chevron-up" variant="linear" size={14} />
          </button>
        </aside>
      )}
    </div>
  );
};
Flow1Prototype.displayName = 'Flow1Prototype';
