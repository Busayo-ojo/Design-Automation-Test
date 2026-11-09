import React, { forwardRef, useState } from 'react';
import './Textarea.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export type TextareaState =
  | 'default'
  | 'hover'
  | 'focused'
  | 'typing'
  | 'filled'
  | 'error'
  | 'success'
  | 'disabled'
  | 'read only';

export type TextareaVariant = 'default' | 'error' | 'success';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Size variant matching Figma frame heights: 'sm' (88px), 'md' (120px), 'lg' (168px) */
  size?: TextareaSize;
  /** Explicit component state matching Figma: default, hover, focused, typing, filled, error, success, disabled, read only */
  state?: TextareaState;
  /** Visual variant (for backwards compatibility: 'default' | 'error' | 'success') */
  variant?: TextareaVariant;
  /** Label text displayed above the textarea */
  label?: React.ReactNode;
  /** Whether to show the label (default: true if label is provided) */
  hasLabel?: boolean;
  /** Marks the field as required and appends an indicator asterisk */
  required?: boolean;
  /** Explanatory helper text displayed in the footer */
  helperText?: React.ReactNode;
  /** Whether to show helper text (default: true if helperText is provided) */
  hasHelperText?: boolean;
  /** Specific error message (sets variant to 'error') */
  errorMessage?: string;
  /** Whether to show character count in footer */
  showCharacterCount?: boolean;
  /** Whether character count is enabled (Figma: 'has character count') */
  hasCharacterCount?: boolean;
  /** Custom character count text override (e.g. '0 / 500 characters') */
  characterCountText?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Stretch to full width of parent container (default: true) */
  fullWidth?: boolean;
  /** Resizing behavior: 'none' | 'vertical' | 'horizontal' | 'both' (default: 'vertical') */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Additional container class */
  className?: string;
  /** Container inline style */
  containerStyle?: React.CSSProperties;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'sm',
      state,
      variant,
      label,
      hasLabel = true,
      required,
      helperText,
      hasHelperText = true,
      errorMessage,
      showCharacterCount,
      hasCharacterCount,
      characterCountText,
      maxLength,
      fullWidth = true,
      resize = 'vertical',
      className = '',
      containerStyle,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      id,
      style,
      ...props
    },
    ref
  ) => {
    // Resolve internal character count tracking if needed
    const [charLength, setCharLength] = useState<number>(() => {
      if (typeof value === 'string') return value.length;
      if (typeof defaultValue === 'string') return defaultValue.length;
      return 0;
    });

    const isControlled = value !== undefined;
    const currentLength = isControlled && typeof value === 'string' ? value.length : charLength;

    // Resolve active state
    const isError = state === 'error' || variant === 'error' || Boolean(errorMessage);
    const isSuccess = state === 'success' || variant === 'success';
    const isDisabled = disabled || state === 'disabled';
    const isReadOnly = readOnly || state === 'read only';

    const activeHelperText = errorMessage || helperText;
    const shouldShowHelper = (hasHelperText && activeHelperText) || errorMessage;
    const shouldShowCount = (showCharacterCount || hasCharacterCount || maxLength !== undefined) && !isDisabled;

    // Unique IDs for accessibility
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;

    // Handle character count tracking on change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setCharLength(e.target.value.length);
      }
      onChange?.(e);
    };

    // Container CSS classes
    const containerClasses = [
      'fmdqui-textarea-container',
      fullWidth ? 'fmdqui-textarea-container--full-width' : '',
      isDisabled ? 'fmdqui-textarea-container--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Frame wrapper CSS classes
    const wrapperClasses = [
      'fmdqui-textarea-wrapper',
      `fmdqui-textarea-wrapper--${size}`,
      state ? `fmdqui-textarea-wrapper--state-${state.replace(' ', '-')}` : '',
      isError ? 'fmdqui-textarea-wrapper--error' : '',
      isSuccess ? 'fmdqui-textarea-wrapper--success' : '',
      isDisabled ? 'fmdqui-textarea-wrapper--disabled' : '',
      isReadOnly ? 'fmdqui-textarea-wrapper--read-only' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Resolved character count string
    const resolvedCountText =
      characterCountText ??
      (maxLength !== undefined ? `${currentLength} / ${maxLength} characters` : `${currentLength} characters`);

    const isNearLimit = maxLength !== undefined && currentLength >= maxLength;

    return (
      <div className={containerClasses} style={containerStyle}>
        {/* Top Label */}
        {hasLabel && label && (
          <label htmlFor={textareaId} className="fmdqui-textarea__label">
            <span>
              {label}
              {required && (
                <span className="fmdqui-textarea__label-required" aria-hidden="true">
                  *
                </span>
              )}
            </span>
          </label>
        )}

        {/* Textarea Frame */}
        <div className={wrapperClasses}>
          <textarea
            ref={ref}
            id={textareaId}
            className="fmdqui-textarea"
            disabled={isDisabled}
            readOnly={isReadOnly}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            aria-invalid={isError}
            aria-describedby={shouldShowHelper ? helperId : undefined}
            style={{ resize, ...style }}
            {...props}
          />
        </div>

        {/* Footer (Helper Text & Character Count) */}
        {(shouldShowHelper || shouldShowCount) && (
          <div className="fmdqui-textarea__footer">
            {shouldShowHelper ? (
              <p
                id={helperId}
                className={[
                  'fmdqui-textarea__helper-text',
                  isError ? 'fmdqui-textarea__helper-text--error' : '',
                  isSuccess ? 'fmdqui-textarea__helper-text--success' : '',
                  isDisabled ? 'fmdqui-textarea__helper-text--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role={isError ? 'alert' : undefined}
              >
                {activeHelperText}
              </p>
            ) : (
              <span />
            )}

            {shouldShowCount && (
              <span
                className={[
                  'fmdqui-textarea__char-count',
                  isDisabled ? 'fmdqui-textarea__char-count--disabled' : '',
                  isNearLimit ? 'fmdqui-textarea__char-count--limit' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-live="polite"
              >
                {resolvedCountText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
