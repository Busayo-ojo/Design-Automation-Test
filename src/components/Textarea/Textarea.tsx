import React, { forwardRef } from 'react';
import './Textarea.css';

export type TextareaVariant = 'default' | 'error';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The visual variant of the textarea */
  variant?: TextareaVariant;
  /** Error message to display below the textarea when variant is 'error' */
  errorMessage?: string;
  /** Additional helper text to display below the textarea */
  helperText?: string;
  /** Full width modifier */
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      errorMessage,
      helperText,
      fullWidth = false,
      className = '',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Container handles full-width and general text alignment
    const containerClasses = [
      'fmdqui-textarea-container',
      fullWidth ? 'fmdqui-textarea-container--full-width' : '',
      disabled ? 'fmdqui-textarea-container--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Wrapper handles the border, hover, and focus states
    const wrapperClasses = [
      'fmdqui-textarea-wrapper',
      `fmdqui-textarea-wrapper--${variant}`,
      disabled ? 'fmdqui-textarea-wrapper--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    return (
      <div className={containerClasses}>
        <div className={wrapperClasses}>
          <textarea
            ref={ref}
            id={textareaId}
            className="fmdqui-textarea"
            disabled={disabled}
            aria-invalid={variant === 'error'}
            aria-describedby={[
              helperText ? helperId : '',
              variant === 'error' && errorMessage ? errorId : ''
            ].filter(Boolean).join(' ') || undefined}
            {...props}
          />
        </div>

        {/* Helper or Error Text */}
        {variant === 'error' && errorMessage ? (
          <div id={errorId} className="fmdqui-textarea__message fmdqui-textarea__message--error" role="alert">
            {errorMessage}
          </div>
        ) : helperText ? (
          <div id={helperId} className="fmdqui-textarea__message fmdqui-textarea__message--helper">
            {helperText}
          </div>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
