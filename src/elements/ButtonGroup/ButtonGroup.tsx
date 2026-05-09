import React from 'react';
import './ButtonGroup.css';

export type ButtonGroupStyle = 'first' | 'middle' | 'last' | 'more';
export type ButtonGroupState = 'regular' | 'hover' | 'focused' | 'disabled';
export type ButtonGroupIcon = 'left+right icon' | 'left-icon' | 'right-icon' | 'None';

export interface ButtonGroupItemProps {
  /** Position within the group — controls which corners are rounded */
  style?: ButtonGroupStyle;
  /** Visual state */
  state?: ButtonGroupState;
  /** Icon visibility */
  icon?: ButtonGroupIcon;
  /** Button label */
  label?: string;
  /** Custom leading icon — defaults to left arrow */
  leadingIcon?: React.ReactNode;
  /** Custom trailing icon — defaults to right arrow */
  trailingIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ButtonGroupItem: React.FC<ButtonGroupItemProps> = ({
  style = 'middle',
  state = 'regular',
  icon = 'None',
  label = 'Button',
  leadingIcon,
  trailingIcon,
  onClick,
  className = '',
}) => {
  const showLeading = icon === 'left+right icon' || icon === 'left-icon';
  const showTrailing = icon === 'left+right icon' || icon === 'right-icon';

  const classes = [
    'fmdqui-btn-group__item',
    `fmdqui-btn-group__item--${style}`,
    `fmdqui-btn-group__item--${state}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={state === 'disabled'}
      onClick={onClick}
    >
      {showLeading && (
        <span className="fmdqui-btn-group__icon">
          {leadingIcon ?? <ArrowLeft />}
        </span>
      )}
      <span className="fmdqui-btn-group__label">{label}</span>
      {showTrailing && (
        <span className="fmdqui-btn-group__icon">
          {trailingIcon ?? <ArrowRight />}
        </span>
      )}
    </button>
  );
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = '' }) => {
  return (
    <div className={`fmdqui-btn-group ${className}`.trim()}>
      {children}
    </div>
  );
};
