import React, { forwardRef } from 'react';
import './Toggle.css';

export type ToggleType = 'Radio' | 'Checkbox' | 'Checkcircle' | 'Switch';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Toggle control type — maps 1:1 to Figma "Type" variant property.
   * - Radio: circular radio button (24×24px)
   * - Checkbox: square checkbox with rounded corners (24×24px, r=4)
   * - Checkcircle: fully rounded checkbox / check-circle (24×24px, r=100)
   * - Switch: pill-shaped sliding toggle (39×24px)
   */
  type?: ToggleType;
  /**
   * Whether the toggle is in the active/checked state —
   * maps to Figma "Active=Yes/No" variant property.
   */
  active?: boolean;
}

// ─── SVG check icon (13×10, white) used by Checkbox & Checkcircle ─────────
const CheckIcon = () => (
  <svg
    className="fmdqui-toggle__check-icon"
    viewBox="0 0 13 10"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M1 5L4.5 8.5L12 1"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Component ─────────────────────────────────────────────────────────────
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      type = 'Radio',
      active,
      checked,
      defaultChecked,
      onChange,
      disabled,
      className = '',
      id,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    // "active" prop overrides checked for controlled scenarios
    const resolvedChecked = active !== undefined ? active : checked;

    // Native input type: Switch uses checkbox semantics
    const nativeType: React.InputHTMLAttributes<HTMLInputElement>['type'] =
      type === 'Radio' ? 'radio' : 'checkbox';

    const containerClass = [
      'fmdqui-toggle',
      `fmdqui-toggle--${type.toLowerCase()}`,
      disabled ? 'fmdqui-toggle--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span className={containerClass}>
        <input
          ref={ref}
          id={inputId}
          type={nativeType}
          checked={resolvedChecked}
          defaultChecked={active === undefined && checked === undefined ? defaultChecked : undefined}
          disabled={disabled}
          onChange={onChange}
          aria-label={ariaLabel}
          className="fmdqui-toggle__input"
          {...props}
        />

        {/* ─── Radio ─────────────────────────────────────────────── */}
        {type === 'Radio' && (
          <span className="fmdqui-toggle__track fmdqui-toggle__track--radio" aria-hidden="true">
            <span className="fmdqui-toggle__radio-inner" />
          </span>
        )}

        {/* ─── Checkbox ──────────────────────────────────────────── */}
        {type === 'Checkbox' && (
          <span className="fmdqui-toggle__track fmdqui-toggle__track--checkbox" aria-hidden="true">
            <CheckIcon />
          </span>
        )}

        {/* ─── Checkcircle ───────────────────────────────────────── */}
        {type === 'Checkcircle' && (
          <span className="fmdqui-toggle__track fmdqui-toggle__track--checkcircle" aria-hidden="true">
            <CheckIcon />
          </span>
        )}

        {/* ─── Switch ────────────────────────────────────────────── */}
        {type === 'Switch' && (
          <span className="fmdqui-toggle__track fmdqui-toggle__track--switch" aria-hidden="true">
            <span className="fmdqui-toggle__knob" />
          </span>
        )}
      </span>
    );
  }
);

Toggle.displayName = 'Toggle';
