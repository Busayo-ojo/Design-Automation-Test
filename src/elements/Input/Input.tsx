import React, { forwardRef } from 'react';
import './Input.css';

export type InputState =
  | 'default'
  | 'hover'
  | 'active'
  | 'typing'
  | 'filled'
  | 'success'
  | 'error'
  | 'read only'
  | 'input dropdown';

export type InputSize = 'sm' | 'lg' | 'xl';

export interface InputOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>, 'size'> {
  /** Visual state of the input — maps 1:1 to Figma states */
  state?: InputState;
  /** Size variant: sm (36px), lg (56px), or xl (80px+ expandable textarea) */
  size?: InputSize;
  /** Field label rendered above the input */
  label?: string;
  /** Show/hide the label — maps to Figma "has label" boolean */
  hasLabel?: boolean;
  /** Helper or status message below the input */
  helperText?: string;
  /** Show/hide helper text — maps to Figma "has helper text" boolean */
  hasHelperText?: boolean;
  /** Icon rendered on the left side inside the input */
  leadingIcon?: React.ReactNode;
  /** Show/hide left icon — maps to Figma "has left-icon" boolean */
  hasLeftIcon?: boolean;
  /** Icon rendered on the right side inside the input */
  trailingIcon?: React.ReactNode;
  /** Show/hide right icon — maps to Figma "has right-icon" boolean */
  hasRightIcon?: boolean;
  /** Short add-on label rendered right of the input (e.g. "Add-on") */
  rightLabel?: string;
  /** Show/hide right add-on label — maps to Figma "has right-label" boolean */
  hasRightLabel?: boolean;
  /** Options for 'input dropdown' state */
  options?: InputOption[];
}

// ─── Default SVG icons matching Figma ──────────────────────────────────────

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2.5 7.5L10 12L17.5 7.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.5" stroke="#04802E" strokeWidth="1.5"/>
    <path d="M6.5 10L9 12.5L13.5 7.5" stroke="#04802E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.5" stroke="#CB1A14" strokeWidth="1.5"/>
    <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="#CB1A14" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Component ─────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, InputProps>(
  (
    {
      state = 'default',
      size = 'sm',
      label = 'Label',
      hasLabel = true,
      helperText,
      hasHelperText = true,
      leadingIcon,
      hasLeftIcon = true,
      trailingIcon,
      hasRightIcon = true,
      rightLabel,
      hasRightLabel = false,
      options = [],
      className = '',
      disabled,
      readOnly,
      id,
      placeholder = 'Placeholder',
      ...props
    },
    ref
  ) => {
    const isXl = size === 'xl';

    // Derive actual disabled/readOnly from state prop too
    const isDisabled = disabled || state === 'read only';
    const isReadOnly = readOnly || state === 'read only';

    // Resolve state-driven icons (trailing) when not explicitly provided
    const resolvedTrailingIcon = (() => {
      if (trailingIcon) return trailingIcon;
      if (state === 'success') return <SuccessIcon />;
      if (state === 'error') return <ErrorIcon />;
      if (state === 'input dropdown') return <ChevronDownIcon />;
      return <MailIcon />;
    })();


    const resolvedLeadingIcon = leadingIcon ?? <SearchIcon />;

    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    // Helper text: state overrides
    const resolvedHelperText = (() => {
      if (helperText) return helperText;
      if (state === 'success') return 'Success text';
      if (state === 'error') return 'Error text';
      return 'Helper text';
    })();

    const containerClasses = [
      'fmdqui-input-container',
      `fmdqui-input-container--${size}`,
      className,
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      'fmdqui-input-wrapper',
      `fmdqui-input-wrapper--${size}`,
      `fmdqui-input-wrapper--${state.replace(' ', '-')}`,
      isDisabled ? 'fmdqui-input-wrapper--disabled' : '',
    ].filter(Boolean).join(' ');

    const helperClasses = [
      'fmdqui-input__helper',
      state === 'success' ? 'fmdqui-input__helper--success' : '',
      state === 'error' ? 'fmdqui-input__helper--error' : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        {/* Label */}
        {hasLabel && (
          <label htmlFor={inputId} className="fmdqui-input__label">
            {label}
          </label>
        )}

        {/* Input field row */}
        <div className={wrapperClasses}>
          {/* Left icon */}
          {hasLeftIcon && (
            <span className="fmdqui-input__icon fmdqui-input__icon--leading">
              {resolvedLeadingIcon}
            </span>
          )}

          {state === 'input dropdown' ? (
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              id={inputId}
              className="fmdqui-input fmdqui-input--select"
              disabled={isDisabled}
              aria-invalid={false}
              aria-describedby={hasHelperText ? `${inputId}-helper` : undefined}
              {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
            >
              {placeholder && (
                <option value="" disabled hidden>
                  {placeholder}
                </option>
              )}
              {options.map((option, index) => (
                <option
                  key={`${option.value}-${index}`}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          ) : isXl ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              className="fmdqui-input fmdqui-input--textarea"
              disabled={isDisabled}
              readOnly={isReadOnly}
              placeholder={placeholder}
              aria-invalid={state === 'error'}
              aria-describedby={hasHelperText ? `${inputId}-helper` : undefined}
              {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={inputId}
              className="fmdqui-input"
              disabled={isDisabled}
              readOnly={isReadOnly}
              placeholder={placeholder}
              aria-invalid={state === 'error'}
              aria-describedby={hasHelperText ? `${inputId}-helper` : undefined}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {/* Right add-on label */}
          {hasRightLabel && (
            <span className="fmdqui-input__right-label">
              {rightLabel ?? 'Add-on'}
            </span>
          )}

          {/* Right icon */}
          {hasRightIcon && (
            <span className="fmdqui-input__icon fmdqui-input__icon--trailing">
              {resolvedTrailingIcon}
            </span>
          )}
        </div>


        {/* Helper / status text */}
        {hasHelperText && (
          <span id={`${inputId}-helper`} className={helperClasses}>
            {resolvedHelperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
