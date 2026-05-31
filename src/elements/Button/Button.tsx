import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'grey' | 'text' | 'success' | 'warning' | 'info' | 'error';
export type ButtonSize = 'sm' | 'lg';
export type ButtonType = 'solid' | 'outlined' | 'primary' | 'secondary' | 'destructive';
export type ButtonIconStyle = 'none' | 'leading icon' | 'trailing icon' | 'icon-only';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonType?: ButtonType;
  iconStyle?: ButtonIconStyle;
  icon?: React.ReactNode;
  label?: string;
  state?: 'default' | 'hover' | 'focused' | 'de-activated';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  buttonType = 'solid',
  iconStyle = 'none',
  icon,
  label,
  className = '',
  children,
  disabled,
  state,
  ...props
}) => {
  const classNames = [
    'fmdqui-button',
    `fmdqui-button--${variant}`,
    `fmdqui-button--${size}`,
    `fmdqui-button--type-${buttonType}`,
    state ? `fmdqui-button--state-${state}` : '',
    `fmdqui-button--icon-${iconStyle.replace(' ', '-')}`,
    className
  ].filter(Boolean).join(' ');

  const renderIcon = () => (
    <span className="fmdqui-button__icon">
      {icon || <DefaultIcon />}
    </span>
  );

  const isIconOnly = iconStyle === 'icon-only';

  return (
    <button 
      className={classNames} 
      disabled={disabled || state === 'de-activated'} 
      {...props}
    >
      {iconStyle === 'leading icon' && renderIcon()}
      {isIconOnly ? renderIcon() : (label || children || 'Button')}
      {iconStyle === 'trailing icon' && renderIcon()}
    </button>
  );
};

const DefaultIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
