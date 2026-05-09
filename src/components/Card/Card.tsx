import React from 'react';
import type { HTMLAttributes } from 'react';
import './Card.css';

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-card ${className}`} {...props}>
    {children}
  </div>
);

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
