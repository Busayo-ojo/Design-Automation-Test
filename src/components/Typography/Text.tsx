import React from 'react';
import './Typography.css';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'xxs' | 'caption-lg' | 'caption-sm' | 'caption-xs';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  fontFamily?: 'dm-sans' | 'rubik';
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'default' | 'inherit' | 'grey';
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export const Text: React.FC<TextProps> = ({
  as: Tag = 'p',
  size = 'md',
  weight = 'regular',
  fontFamily,
  align = 'left',
  color = 'default',
  italic = false,
  underline = false,
  strikethrough = false,
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'fmdq-text',
    `fmdq-text--size-${size}`,
    `fmdq-text--weight-${weight}`,
    fontFamily && (fontFamily === 'rubik' ? 'fmdq-typography--font-rubik' : 'fmdq-typography--font-dmsans'),
    italic && 'fmdq-typography--italic',
    underline && 'fmdq-typography--underline',
    strikethrough && 'fmdq-typography--strikethrough',
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
