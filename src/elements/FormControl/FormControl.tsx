import React, { forwardRef } from 'react';
import { Icon } from '../../foundations/icons';
import './FormControl.css';

export type FormControlType = 'checkbox' | 'radio' | 'checkcircle' | 'toggle' | 'switch';
export type ToggleType = 'Radio' | 'Checkbox' | 'Checkcircle' | 'Switch';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Toggle control type — maps 1:1 to Figma "Type" variant property.
   * - Radio: circular radio button (24×24px)
   * - Checkbox: square checkbox with rounded corners (24×24px, r=4)
   * - Checkcircle: fully rounded checkbox / check-circle (24×24px, r=100)
   * - Switch / Toggle: pill-shaped sliding toggle (39×24px)
   */
  type?: ToggleType;
  /**
   * Whether the toggle is in the active/checked state —
   * maps to Figma "Active=Yes/No" variant property.
   */
  active?: boolean;
}

// ─── SVG check icon (from foundations icon set) ───────────────────────────
const CheckIcon = () => (
  <Icon
    name="check"
    variant="linear"
    size={14}
    color="var(--color-neutral-white)"
    className="fmdqui-toggle__check-icon"
  />
);

// ─── Standalone Toggle Atom ───────────────────────────────────────────────
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

    // Native input type
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

// ─── Dedicated Named Atoms ────────────────────────────────────────────────
export const Checkbox = forwardRef<HTMLInputElement, Omit<ToggleProps, 'type'>>((props, ref) => (
  <Toggle ref={ref} type="Checkbox" {...props} />
));
Checkbox.displayName = 'Checkbox';

export const Radio = forwardRef<HTMLInputElement, Omit<ToggleProps, 'type'>>((props, ref) => (
  <Toggle ref={ref} type="Radio" {...props} />
));
Radio.displayName = 'Radio';

export const Checkcircle = forwardRef<HTMLInputElement, Omit<ToggleProps, 'type'>>((props, ref) => (
  <Toggle ref={ref} type="Checkcircle" {...props} />
));
Checkcircle.displayName = 'Checkcircle';

export const Switch = forwardRef<HTMLInputElement, Omit<ToggleProps, 'type'>>((props, ref) => (
  <Toggle ref={ref} type="Switch" {...props} />
));
Switch.displayName = 'Switch';

// ─── Full Form Control Row (Matches Figma "Form Control Component") ────────
export interface FormControlProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Type of control: 'checkbox' | 'radio' | 'checkcircle' | 'toggle' / 'switch' */
  type?: FormControlType;
  /** Primary label / heading text */
  heading?: React.ReactNode;
  /** Supporting description text */
  description?: React.ReactNode;
  /** Position of the control relative to text: 'left' or 'right' */
  position?: 'left' | 'right';
  /** Whether the control is checked/active */
  active?: boolean;
}

export const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
  (
    {
      type = 'checkbox',
      heading,
      description,
      position = 'left',
      active,
      checked,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;

    // Map FormControlType to ToggleType
    const normalizedType: ToggleType =
      type === 'radio'
        ? 'Radio'
        : type === 'checkcircle'
        ? 'Checkcircle'
        : type === 'toggle' || type === 'switch'
        ? 'Switch'
        : 'Checkbox';

    return (
      <label
        htmlFor={controlId}
        className={[
          'fmdqui-form-control',
          `fmdqui-form-control--${position}`,
          disabled ? 'fmdqui-form-control--disabled' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Toggle
          ref={ref}
          id={controlId}
          type={normalizedType}
          active={active}
          checked={checked}
          disabled={disabled}
          {...props}
        />

        {(heading || description) && (
          <div className="fmdqui-form-control__content">
            {heading && <div className="fmdqui-form-control__heading">{heading}</div>}
            {description && <div className="fmdqui-form-control__description">{description}</div>}
          </div>
        )}
      </label>
    );
  }
);
FormControl.displayName = 'FormControl';
