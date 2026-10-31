import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../foundations/icons';
import './Toast.css';

import toastInfoTexture from './assets/toast_information.png';
import toastSuccessTexture from './assets/toast_success.png';
import toastWarningTexture from './assets/toast_warning.png';
import toastErrorTexture from './assets/toast_error.png';
import bannerInfoTexture from './assets/banner_information.png';
import bannerSuccessTexture from './assets/banner_success.png';
import bannerWarningTexture from './assets/banner_warning.png';
import bannerErrorTexture from './assets/banner_error.png';

export type ToastType = 'toasts' | 'banners';
export type ToastState = 'information' | 'success' | 'warning' | 'error';

// Legacy alias compatibility
export type ToastVariant = ToastState | 'info';

export interface ToastProps {
  /** Toast style type: 'toasts' (compact notification) or 'banners' (broad alert with CTAs) */
  type?: ToastType;
  /** Visual state matching Figma: 'information', 'success', 'warning', 'error' */
  state?: ToastState;
  /** Heading title */
  title?: ReactNode;
  /** Controls title visibility — maps to Figma 'has title' */
  hasTitle?: boolean;
  /** Subtext or description */
  description?: ReactNode;
  /** Alias for description */
  subtext?: ReactNode;
  /** Controls subtext visibility — maps to Figma 'has subtexts' */
  hasSubtext?: boolean;
  /** Custom icon override */
  icon?: ReactNode;
  /** Controls icon visibility — maps to Figma 'has icon' */
  hasIcon?: boolean;
  /** Controls close button visibility — maps to Figma 'has close button' */
  hasCloseButton?: boolean;
  /** Callback fired when close button is clicked */
  onClose?: () => void;
  /** Controls CTA buttons section visibility in banners — maps to Figma 'has CTA' */
  hasCTA?: boolean;
  /** Controls primary CTA visibility — maps to Figma 'has primary CTA' */
  hasPrimaryCTA?: boolean;
  /** Primary button label */
  primaryCTALabel?: string;
  /** Primary button click callback */
  onPrimaryCTAClick?: () => void;
  /** Controls secondary CTA visibility — maps to Figma 'has secondary CTA' */
  hasSecondaryCTA?: boolean;
  /** Secondary button label */
  secondaryCTALabel?: string;
  /** Secondary button click callback */
  onSecondaryCTAClick?: () => void;
  /** Custom class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

const textureMap: Record<string, string> = {
  'toasts_information': toastInfoTexture,
  'toasts_success': toastSuccessTexture,
  'toasts_warning': toastWarningTexture,
  'toasts_error': toastErrorTexture,
  'banners_information': bannerInfoTexture,
  'banners_success': bannerSuccessTexture,
  'banners_warning': bannerWarningTexture,
  'banners_error': bannerErrorTexture,
};

// ─── Default Figma SVGs ──────────────────────────────────────────────────────

const CheckCircleIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.25" />
    <path d="M4.5 7L6.2 8.7L9.5 5.4" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MultiplyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Component Implementation ────────────────────────────────────────────────

export const Toast: React.FC<ToastProps> = ({
  type = 'toasts',
  state = 'information',
  title = 'Here’s the alert info title',
  hasTitle = true,
  description,
  subtext = 'The alert & notifications component',
  hasSubtext = true,
  icon,
  hasIcon = true,
  hasCloseButton = true,
  onClose,
  hasCTA = true,
  hasPrimaryCTA = true,
  primaryCTALabel = 'Special Primary Buttons',
  onPrimaryCTAClick,
  hasSecondaryCTA = true,
  secondaryCTALabel = 'Secondary CTA',
  onSecondaryCTAClick,
  className = '',
  style,
}) => {
  const resolvedSubtext = description ?? subtext;

  // Render State-driven Icon
  const renderIcon = () => {
    if (icon) return icon;

    switch (state) {
      case 'success':
        return <CheckCircleIcon color="#04802E" />;
      case 'warning':
        return <Icon name="info-triangle" variant="bold" size={16} color="#DD900D" />;
      case 'error':
        return <Icon name="info-triangle" variant="bold" size={16} color="#CB1A14" />;
      case 'information':
      default:
        return <CheckCircleIcon color="#1671D9" />;
    }
  };

  const isBanner = type === 'banners';
  const textureSrc = textureMap[`${type}_${state}`] || toastInfoTexture;

  return (
    <div
      className={`fmdqui-alert fmdqui-alert--${type} fmdqui-alert--${state} ${className}`}
      role="alert"
      style={style}
    >
      {/* 1. Left Stippled Texture Effect (Figma TEXTURE noise gradient) */}
      <div className="fmdqui-alert__texture-streak" aria-hidden="true">
        <img
          src={textureSrc}
          alt=""
          className="fmdqui-alert__texture-img"
        />
      </div>



      {/* 3. Main Alert Container (Elevated above texture) */}
      <div className="fmdqui-alert__container">
        {/* Left Icon Badge */}
        {hasIcon && (
          <div className="fmdqui-alert__icon-badge">
            {renderIcon()}
          </div>
        )}

        {/* Middle Content */}
        <div className="fmdqui-alert__content">
          <div className="fmdqui-alert__text-section">
            {hasTitle && title && <h4 className="fmdqui-alert__heading">{title}</h4>}
            {hasSubtext && resolvedSubtext && (
              <p className="fmdqui-alert__subtext">{resolvedSubtext}</p>
            )}
          </div>

          {/* Banner CTAs */}
          {isBanner && hasCTA && (hasPrimaryCTA || hasSecondaryCTA) && (
            <div className="fmdqui-alert__ctas">
              {hasPrimaryCTA && (
                <button
                  type="button"
                  className="fmdqui-alert__btn fmdqui-alert__btn--primary"
                  onClick={onPrimaryCTAClick}
                >
                  {primaryCTALabel}
                </button>
              )}
              {hasSecondaryCTA && (
                <button
                  type="button"
                  className="fmdqui-alert__btn fmdqui-alert__btn--secondary"
                  onClick={onSecondaryCTAClick}
                >
                  {secondaryCTALabel}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Close Section (Divider + Close Button) */}
        {hasCloseButton && (
          <div className="fmdqui-alert__close-section">
            <div className="fmdqui-alert__divider" />
            <button
              type="button"
              className="fmdqui-alert__close-btn"
              onClick={onClose}
              aria-label="Close notification"
            >
              <MultiplyIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const Alert = Toast;

// ─── Imperative Toast System (Provider & Portal) ─────────────────────────────

export interface ToastMessage {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  state?: ToastState;
  variant?: ToastVariant;
  type?: ToastType;
  duration?: number;
  hasCTA?: boolean;
  primaryCTALabel?: string;
  onPrimaryCTAClick?: () => void;
  secondaryCTALabel?: string;
  onSecondaryCTAClick?: () => void;
}

export interface ToastContextType {
  toast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...message, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC<{ toasts: ToastMessage[]; removeToast: (id: string) => void }> = ({
  toasts,
  removeToast,
}) => {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fmdqui-toast-portal">
      {toasts.map((t) => (
        <ToastPortalItem key={t.id} toast={t} removeToast={removeToast} />
      ))}
    </div>,
    document.body
  );
};

const ToastPortalItem: React.FC<{ toast: ToastMessage; removeToast: (id: string) => void }> = ({
  toast,
  removeToast,
}) => {
  const {
    id,
    title,
    description,
    state,
    variant,
    type = 'toasts',
    duration = 4000,
    hasCTA,
    primaryCTALabel,
    onPrimaryCTAClick,
    secondaryCTALabel,
    onSecondaryCTAClick,
  } = toast;

  // Resolve state from state or legacy variant ('info' -> 'information')
  const resolvedState: ToastState = state ?? (variant === 'info' ? 'information' : (variant as ToastState) ?? 'information');

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => removeToast(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, removeToast]);

  return (
    <div className="fmdqui-toast-portal__item">
      <Toast
        type={type}
        state={resolvedState}
        title={title}
        description={description}
        onClose={() => removeToast(id)}
        hasCTA={hasCTA}
        primaryCTALabel={primaryCTALabel}
        onPrimaryCTAClick={() => {
          onPrimaryCTAClick?.();
          removeToast(id);
        }}
        secondaryCTALabel={secondaryCTALabel}
        onSecondaryCTAClick={() => {
          onSecondaryCTAClick?.();
          removeToast(id);
        }}
      />
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
