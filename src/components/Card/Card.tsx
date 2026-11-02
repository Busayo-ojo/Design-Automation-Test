import React from 'react';
import type { HTMLAttributes } from 'react';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card elevation variant:
   * - 'default': flat with 1px border and no box-shadow
   * - 'elevated': with drop shadow
   */
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({ variant = 'default', className = '', children, ...props }) => {
  const classes = [
    'fmdqui-card',
    variant === 'elevated' ? 'fmdqui-card--elevated' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-card-header ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className = '', children, ...props }) => (
  <h3 className={`fmdqui-card-title ${className}`} {...props}>
    {children}
  </h3>
);

export const CardBody: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-card-body ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-card-footer ${className}`} {...props}>
    {children}
  </div>
);
