import React, { useEffect } from 'react';
import { Button } from '../../elements/Button';
import { Icon } from '../../foundations/icons';
import './Modal.css';

export type ModalType =
  | 'confirm'
  | 'confirm-destructive'
  | 'summary'
  | 'summary-note'
  | 'reason'
  | 'form'
  | 'upload'
  | 'success'
  | 'session-timeout'
  | 'custom';

export type ModalTone = 'info' | 'warning' | 'destructive' | 'success';

export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalHeaderAlign = 'left' | 'center';

export type ModalFooterIntent = 'primary' | 'destructive';

/* ─── 1. Featured Icon Subcomponent ─────────────────────────────────────────── */

export interface ModalFeaturedIconProps {
  tone?: ModalTone;
  icon?: React.ReactNode;
  className?: string;
}

export const ModalFeaturedIcon: React.FC<ModalFeaturedIconProps> = ({
  tone = 'info',
  icon,
  className = '',
}) => {
  const renderDesignSystemIcon = () => {
    switch (tone) {
      case 'success':
        return <Icon name="check-circle" variant="bold" size={20} color="var(--color-success-600)" />;
      case 'warning':
        return <Icon name="info-triangle" variant="bold" size={20} color="var(--color-warning-700)" />;
      case 'destructive':
        return <Icon name="info-triangle" variant="bold" size={20} color="var(--color-error-500)" />;
      case 'info':
      default:
        return <Icon name="info-circle" variant="bold" size={20} color="var(--color-fmdq-blue)" />;
    }
  };

  return (
    <div className={`fmdqui-modal-featured-icon fmdqui-modal-featured-icon--${tone} ${className}`.trim()}>
      {icon || renderDesignSystemIcon()}
    </div>
  );
};

/* ─── 2. Header Subcomponent ─────────────────────────────────────────────────── */

export interface ModalHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  featuredIcon?: React.ReactNode;
  showIcon?: boolean;
  tone?: ModalTone;
  align?: ModalHeaderAlign;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  featuredIcon,
  showIcon = false,
  tone,
  align = 'left',
  onClose,
  showCloseButton = false,
  className = '',
}) => {
  const shouldRenderIcon = showIcon || !!featuredIcon;

  return (
    <div className={`fmdqui-modal-header fmdqui-modal-header--${align} ${className}`.trim()}>
      {shouldRenderIcon && (featuredIcon || <ModalFeaturedIcon tone={tone} />)}

      <div className="fmdqui-modal-header__content">
        <h3 className="fmdqui-modal-title">{title}</h3>
        {subtitle && <p className="fmdqui-modal-subtitle">{subtitle}</p>}
      </div>

      {showCloseButton && onClose && (
        <button
          type="button"
          className="fmdqui-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="multiply" variant="linear" size={16} color="var(--color-neutral-500)" />
        </button>
      )}
    </div>
  );
};

/* ─── 3. Body Subcomponent ──────────────────────────────────────────────────── */

export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`fmdqui-modal-body ${className}`.trim()} {...props}>
    {children}
  </div>
);

/* ─── 4. Details Stack & Row Subcomponents ─────────────────────────────────── */

export interface ModalDetailRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
}

export const ModalDetailRow: React.FC<ModalDetailRowProps> = ({ label, value, className = '' }) => (
  <div className={`fmdqui-modal-detail-row ${className}`.trim()}>
    <span className="fmdqui-modal-detail-row__label">{label}</span>
    <span className="fmdqui-modal-detail-row__value">{value}</span>
  </div>
);

export const ModalDetails: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`fmdqui-modal-details ${className}`.trim()} {...props}>
    {children}
  </div>
);

/* ─── 5. Upload Dropzone Subcomponent (Figma 10378:339405) ──────────────────── */

export interface ModalUploadDropzoneProps {
  onFileSelect?: (file: File) => void;
  onBrowseClick?: () => void;
  titleActionText?: string;
  supportingText?: string;
  acceptedFormatsText?: string;
  buttonLabel?: string;
  className?: string;
}

export const ModalUploadDropzone: React.FC<ModalUploadDropzoneProps> = ({
  onFileSelect,
  onBrowseClick,
  titleActionText = 'Click to upload',
  supportingText = 'or drag and drop',
  acceptedFormatsText = 'CSV or XLSX, using the FMDQ trade return template (max. 10 MB)',
  buttonLabel = 'Browse Files',
  className = '',
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const triggerInput = () => {
    if (onBrowseClick) {
      onBrowseClick();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`fmdqui-modal-upload-dropzone ${className}`.trim()}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="fmdqui-modal-upload-icon-wrapper">
        <Icon name="cloud-upload" variant="linear" size={28} color="var(--color-neutral-600)" />
      </div>

      <div className="fmdqui-modal-upload-text-group">
        <div className="fmdqui-modal-upload-action-row">
          <button
            type="button"
            className="fmdqui-modal-upload-link"
            onClick={triggerInput}
          >
            {titleActionText}
          </button>
          <span className="fmdqui-modal-upload-supporting-action">{supportingText}</span>
        </div>
        <div className="fmdqui-modal-upload-meta">{acceptedFormatsText}</div>
      </div>

      <div className="fmdqui-modal-upload-divider">
        <span className="fmdqui-modal-upload-divider__badge">OR</span>
      </div>

      <Button
        variant="primary"
        size="sm"
        type="button"
        onClick={triggerInput}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

/* ─── 6. Footer Subcomponent ────────────────────────────────────────────────── */

export interface ModalFooterProps {
  intent?: ModalFooterIntent;
  buttons?: 'one' | 'two';
  align?: 'right' | 'center' | 'full';
  primaryText?: string;
  secondaryText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  intent = 'primary',
  buttons = 'two',
  align = 'right',
  primaryText = 'Confirm',
  secondaryText = 'Cancel',
  onPrimaryAction,
  onSecondaryAction,
  primaryButton,
  secondaryButton,
  className = '',
  children,
}) => {
  if (children) {
    return (
      <div className={`fmdqui-modal-footer fmdqui-modal-footer--${align} ${className}`.trim()}>
        {children}
      </div>
    );
  }

  const isDestructive = intent === 'destructive';
  const isFullWidthSingle = buttons === 'one';

  return (
    <div
      className={`fmdqui-modal-footer fmdqui-modal-footer--${align} ${
        isFullWidthSingle ? 'fmdqui-modal-footer--single' : ''
      } ${className}`.trim()}
    >
      {buttons === 'two' &&
        (secondaryButton || (
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={onSecondaryAction}
          >
            {secondaryText}
          </Button>
        ))}

      {primaryButton || (
        <Button
          variant={isDestructive ? 'destructive' : 'primary'}
          buttonType="solid"
          size="sm"
          type="button"
          onClick={onPrimaryAction}
          className={isFullWidthSingle ? 'fmdqui-button--full-width' : ''}
        >
          {primaryText}
        </Button>
      )}
    </div>
  );
};

/* ─── 7. Root Modal Component ───────────────────────────────────────────────── */

export interface ModalProps {
  /** Whether modal dialog is active */
  isOpen: boolean;
  /** Callback fired when modal is closed via backdrop, close button, or Escape key */
  onClose?: () => void;
  /** Modal layout type matching Figma (10378:339469) */
  type?: ModalType;
  /** Featured icon tone (only rendered if showIcon is true or type is success/session-timeout) */
  tone?: ModalTone;
  /** Explicitly toggle featured icon visibility (Figma default is false for left-aligned dialogs) */
  showIcon?: boolean;
  /** Modal width size: 'sm' (400px), 'md' (520px - Figma default), 'lg' (640px) */
  size?: ModalSize;
  /** Header alignment */
  align?: ModalHeaderAlign;
  /** Title text */
  title?: React.ReactNode;
  /** Subtitle / explanatory description */
  subtitle?: React.ReactNode;
  /** Custom featured icon node override */
  featuredIcon?: React.ReactNode;
  /** Key-value details array (for summary layouts) */
  details?: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  /** Upload dropzone options (for upload layouts) */
  uploadProps?: ModalUploadDropzoneProps;
  /** Primary button action text */
  primaryText?: string;
  /** Secondary button action text */
  secondaryText?: string;
  /** Number of action buttons in footer */
  buttons?: 'one' | 'two';
  /** Callback fired on primary action */
  onPrimaryAction?: () => void;
  /** Callback fired on secondary action */
  onSecondaryAction?: () => void;
  /** Close when user hits Escape key (default: true) */
  closeOnEscape?: boolean;
  /** Close when user clicks outer backdrop (default: true) */
  closeOnBackdropClick?: boolean;
  /** Show top-right X close button (default: false except upload & form) */
  showCloseButton?: boolean;
  /** Custom modal dialog class */
  className?: string;
  /** Custom children (if provided, overrides auto-layout) */
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = 'confirm',
  tone,
  showIcon,
  size,
  align,
  title,
  subtitle,
  featuredIcon,
  details,
  uploadProps,
  primaryText,
  secondaryText,
  buttons,
  onPrimaryAction,
  onSecondaryAction,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  showCloseButton,
  className = '',
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  // Resolve defaults strictly based on Figma 10378:339469 specs
  const isCentered = align === 'center' || type === 'success' || type === 'session-timeout';
  const resolvedSize: ModalSize =
    size ?? (type === 'success' || type === 'session-timeout' ? 'sm' : 'md');

  // Icons are ONLY shown in success and session-timeout by default in Figma
  const resolvedShowIcon =
    showIcon !== undefined
      ? showIcon
      : type === 'success' || type === 'session-timeout';

  const resolvedTone: ModalTone =
    tone ??
    (type === 'success'
      ? 'success'
      : type === 'session-timeout'
      ? 'warning'
      : type === 'confirm-destructive' || type === 'reason'
      ? 'destructive'
      : 'info');

  // Close button is ONLY shown on form and upload by default in Figma
  const resolvedShowCloseButton =
    showCloseButton !== undefined
      ? showCloseButton
      : type === 'form' || type === 'upload';

  const isDestructive = type === 'confirm-destructive' || type === 'reason';

  // Default button texts matching Figma component set
  const resolvedPrimaryText =
    primaryText ??
    (type === 'confirm'
      ? 'Submit for approval'
      : type === 'confirm-destructive'
      ? 'Log out anyway'
      : type === 'summary' || type === 'summary-note'
      ? 'Submit for approval'
      : type === 'reason'
      ? 'Reject request'
      : type === 'form'
      ? 'Add holiday'
      : type === 'upload'
      ? 'Check file'
      : type === 'success'
      ? 'Done'
      : type === 'session-timeout'
      ? 'Stay signed in'
      : 'Confirm');

  const resolvedSecondaryText =
    secondaryText ??
    (type === 'confirm-destructive'
      ? 'Keep editing'
      : type === 'summary'
      ? 'Go back and edit'
      : type === 'session-timeout'
      ? 'Log out'
      : 'Cancel');

  const resolvedButtonsCount: 'one' | 'two' =
    buttons ?? (type === 'success' ? 'one' : 'two');

  return (
    <div
      className="fmdqui-modal-overlay"
      onClick={closeOnBackdropClick ? onClose : undefined}
      role="presentation"
    >
      <div
        className={`fmdqui-modal-dialog fmdqui-modal-dialog--${resolvedSize} ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'fmdqui-modal-title' : undefined}
      >
        {/* If custom children are passed, render them directly */}
        {children ? (
          children
        ) : (
          <>
            {/* Header */}
            {title && (
              <ModalHeader
                title={title}
                subtitle={subtitle}
                featuredIcon={featuredIcon}
                showIcon={resolvedShowIcon}
                tone={resolvedTone}
                align={isCentered ? 'center' : 'left'}
                onClose={onClose}
                showCloseButton={resolvedShowCloseButton}
              />
            )}

            {/* Optional details rows (for summary layouts) */}
            {details && details.length > 0 && (
              <ModalDetails>
                {details.map((d, i) => (
                  <ModalDetailRow key={i} label={d.label} value={d.value} />
                ))}
              </ModalDetails>
            )}

            {/* Optional upload dropzone (for upload layout) */}
            {type === 'upload' && (
              <ModalUploadDropzone {...uploadProps} />
            )}

            {/* Footer with actions */}
            <ModalFooter
              intent={isDestructive ? 'destructive' : 'primary'}
              buttons={resolvedButtonsCount}
              align={resolvedButtonsCount === 'one' ? 'full' : 'right'}
              primaryText={resolvedPrimaryText}
              secondaryText={resolvedSecondaryText}
              onPrimaryAction={onPrimaryAction}
              onSecondaryAction={onSecondaryAction || onClose}
            />
          </>
        )}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
