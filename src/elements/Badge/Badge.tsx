import React from 'react';
import type { HTMLAttributes } from 'react';
import './Badge.css';

export type BadgeColor = 'blue' | 'orange' | 'success' | 'warning' | 'error' | 'neutral' | 'disabled';
export type BadgeType = 'filled' | 'accent' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  type?: BadgeType;
  size?: BadgeSize;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  hasAvatar?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  avatar?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  color = 'blue', 
  type = 'filled',
  size = 'sm',
  hasLeftIcon = false,
  hasRightIcon = false,
  hasAvatar = false,
  leadingIcon,
  trailingIcon,
  avatar,
  className = '', 
  children, 
  ...props 
}) => {
  const classes = [
    'fmdqui-badge',
    `fmdqui-badge--color-${color}`,
    `fmdqui-badge--type-${type}`,
    `fmdqui-badge--size-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {hasAvatar && avatar && <span className="fmdqui-badge__avatar">{avatar}</span>}
      {hasLeftIcon && leadingIcon && <span className="fmdqui-badge__icon fmdqui-badge__icon--leading">{leadingIcon}</span>}
      <span className="fmdqui-badge__label">{children}</span>
      {hasRightIcon && trailingIcon && <span className="fmdqui-badge__icon fmdqui-badge__icon--trailing">{trailingIcon}</span>}
    </span>
  );
};
