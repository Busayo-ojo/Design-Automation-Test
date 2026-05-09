import React from 'react';
import './Typography.css';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'display-lg' | 'display-sm' | 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'default' | 'inherit';
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  align = 'left',
  color = 'default',
  className = '',
  children,
  ...props
}) => {
  // Normalize level to number if it's a string representation of 1-6
  const isNumericLevel = (val: any): val is 1 | 2 | 3 | 4 | 5 | 6 => 
    (typeof val === 'number' && val >= 1 && val <= 6) || 
    (typeof val === 'string' && /^[1-6]$/.test(val));
  
  const normalizedLevel = (typeof level === 'string' && /^[1-6]$/.test(level)) 
    ? parseInt(level, 10) 
    : level;

  const Tag = (typeof normalizedLevel === 'number' ? `h${normalizedLevel}` : 'h1') as React.ElementType;
  const classNames = [
    'fmdq-heading',
    `fmdq-heading--${typeof normalizedLevel === 'number' ? `h${normalizedLevel}` : normalizedLevel}`,
    `fmdq-typography--align-${align}`,
    `fmdq-typography--color-${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
};
