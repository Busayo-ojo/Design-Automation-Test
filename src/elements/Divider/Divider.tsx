import React from 'react';
import { Button, type ButtonProps } from '../Button';
import { Icon } from '../../foundations/icons';
import './Divider.css';

export type DividerType =
  | 'default'
  | 'with label'
  | 'with icon'
  | 'with title only'
  | 'with button only'
  | 'with title and button';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Divider variant matching Figma "type" property:
   * - 'default': simple 1px separator line
   * - 'with icon': centered icon with line extending across
   * - 'with label': label on the left with line extending to the right
   * - 'with title only': centered 18px title with line extending across
   * - 'with button only': centered action button (+ Label) with line extending across
   * - 'with title and button': title on left, line in middle, button on right
   */
  type?: DividerType;
  /** Label text for 'with label' or button label for 'with button only' (defaults to 'Label') */
  label?: React.ReactNode;
  /** Title text for 'with title only' and 'with title and button' (defaults to 'Continue') */
  title?: React.ReactNode;
  /** Icon element for 'with icon' (defaults to plus icon) */
  icon?: React.ReactNode;
  /** Button element or text (defaults to Button element with 'Label') */
  button?: React.ReactNode;
  /** Whether button includes leading icon (defaults to true for + icon) */
  hasButtonIcon?: boolean;
  /** Custom button icon (defaults to Plus icon) */
  buttonIcon?: React.ReactNode;
  /** Additional props to pass to the underlying Button element */
  buttonProps?: Partial<ButtonProps>;
  /** Button click handler */
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Render label as a button element */
  asButton?: boolean;
  /** Optional content alignment override: 'left' | 'center' */
  contentPosition?: 'left' | 'center';
  /** Orientation: horizontal (default) or vertical */
  orientation?: DividerOrientation;
  /** Custom class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

const PlusIcon = () => (
  <Icon name="plus" variant="linear" size={16} />
);

export const Divider: React.FC<DividerProps> = ({
  type = 'default',
  label = 'Label',
  title = 'Continue',
  icon,
  button,
  hasButtonIcon = true,
  buttonIcon,
  buttonProps,
  onButtonClick,
  asButton = false,
  contentPosition,
  orientation = 'horizontal',
  className = '',
  style,
  ...props
}) => {
  // ─── Vertical Divider ────────────────────────────────────────────────────────
  if (orientation === 'vertical') {
    return (
      <div
        className={`fmdqui-divider fmdqui-divider--vertical ${className}`.trim()}
        style={style}
        role="separator"
        aria-orientation="vertical"
        {...props}
      >
        <div className="fmdqui-divider__line" />
      </div>
    );
  }

  // Resolved button content
  const resolvedButtonContent = button ?? label ?? 'Label';

  // Helper to render the actual Button element (Secondary variant, smallest size sm, leading icon)
  const renderButtonElement = () => {
    if (React.isValidElement(button)) {
      return button;
    }

    const buttonLabel = typeof resolvedButtonContent === 'string' ? resolvedButtonContent : undefined;
    const buttonChildren = typeof resolvedButtonContent !== 'string' ? resolvedButtonContent : undefined;

    return (
      <Button
        variant="secondary"
        size="sm"
        iconStyle={hasButtonIcon ? 'leading icon' : 'none'}
        icon={buttonIcon ?? <PlusIcon />}
        onClick={onButtonClick}
        label={buttonLabel}
        {...buttonProps}
      >
        {buttonChildren}
      </Button>
    );
  };

  // ─── 1. Default (Simple 1px Line) ───────────────────────────────────────────
  if (type === 'default') {
    return (
      <div
        className={`fmdqui-divider fmdqui-divider--default ${className}`.trim()}
        style={style}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      >
        <div className="fmdqui-divider__line" />
      </div>
    );
  }

  // ─── 2. With Icon (Figma: Centered Icon with White Pad) ──────────────────────
  if (type === 'with icon') {
    return (
      <div
        className={`fmdqui-divider fmdqui-divider--with-icon fmdqui-divider--centered ${className}`.trim()}
        style={style}
        role="separator"
        {...props}
      >
        <div className="fmdqui-divider__line" />
        <span className="fmdqui-divider__center-content fmdqui-divider__center-content--icon">
          {icon ?? <PlusIcon />}
        </span>
        <div className="fmdqui-divider__line" />
      </div>
    );
  }

  // ─── 3. With Title Only (Figma: Centered 18px Title with White Pad) ──────────
  if (type === 'with title only') {
    const isLeft = contentPosition === 'left';
    return (
      <div
        className={`fmdqui-divider fmdqui-divider--with-title-only ${
          isLeft ? '' : 'fmdqui-divider--centered'
        } ${className}`.trim()}
        style={style}
        role="separator"
        {...props}
      >
        {!isLeft && <div className="fmdqui-divider__line" />}
        <span className="fmdqui-divider__center-content fmdqui-divider__center-content--title">
          {title}
        </span>
        <div className="fmdqui-divider__line" />
      </div>
    );
  }

  // ─── 4. With Button Only (Figma: Centered Button Element with + icon) ────────
  if (type === 'with button only' || asButton) {
    return (
      <div
        className={`fmdqui-divider fmdqui-divider--with-button-only fmdqui-divider--centered ${className}`.trim()}
        style={style}
        role="separator"
        {...props}
      >
        <div className="fmdqui-divider__line" />
        <span className="fmdqui-divider__center-content fmdqui-divider__center-content--button">
          {renderButtonElement()}
        </span>
        <div className="fmdqui-divider__line" />
      </div>
    );
  }

  // ─── 5. With Title and Button (Figma: Left Title, Center Line, Right Button) ─
  if (type === 'with title and button') {
    return (
      <div
        className={`fmdqui-divider fmdqui-divider--with-title-and-button ${className}`.trim()}
        style={style}
        role="separator"
        {...props}
      >
        <span className="fmdqui-divider__left-title">{title}</span>
        <div className="fmdqui-divider__line" />
        <span className="fmdqui-divider__right-button">{renderButtonElement()}</span>
      </div>
    );
  }

  // ─── 6. With Label (Figma: Left Label 14px #98A2B3, Line to Right) ───────────
  const isCentered = contentPosition === 'center';
  return (
    <div
      className={`fmdqui-divider fmdqui-divider--with-label ${
        isCentered ? 'fmdqui-divider--with-label-centered' : ''
      } ${className}`.trim()}
      style={style}
      role="separator"
      {...props}
    >
      {isCentered && <div className="fmdqui-divider__line" />}
      <span className="fmdqui-divider__label">{label}</span>
      <div className="fmdqui-divider__line" />
    </div>
  );
};
Divider.displayName = 'Divider';
