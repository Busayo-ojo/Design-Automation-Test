import React from 'react';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Name of the icon (e.g. 'ai-stars') */
  name: string;
  /** Style variant of the icon: 'linear' or 'bold' */
  variant?: 'linear' | 'bold';
  /** Color of the icon. Can be a CSS color value or design system token name (e.g. 'primary-700', 'fmdq-gold') */
  color?: string;
  /** Size of the icon (e.g. '24px', '2rem', '1.5em') */
  size?: string;
}

const resolveIconColor = (color: string): string => {
  if (!color) return 'currentColor';
  const trimmed = color.trim();
  if (
    trimmed.startsWith('var(') || 
    trimmed.startsWith('#') || 
    trimmed.startsWith('rgb') || 
    trimmed.startsWith('hsl') ||
    trimmed.toLowerCase() === 'currentcolor'
  ) {
    return trimmed;
  }
  // Normalize color parameter: replace spaces and underscores with hyphens
  const normalized = trimmed.toLowerCase().replace(/[\s_]+/g, '-');
  
  // Check if it matches a token pattern (e.g. primary-600, neutral-white, fmdq-blue)
  if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(normalized)) {
    return `var(--color-${normalized})`;
  }
  return trimmed;
};

export const Icon: React.FC<IconProps> = ({
  name,
  variant = 'linear',
  color,
  size,
  className = '',
  style = {},
  ...props
}) => {
  const iconClass = `fmdq-icon fmdq-icon-${name} ${variant === 'bold' ? 'style-bold' : 'style-linear'} ${className}`.trim();
  
  const customStyles = {
    ...style,
    '--icon-color': color ? resolveIconColor(color) : undefined,
    '--icon-size': size || undefined,
  } as React.CSSProperties;

  return (
    <span
      className={iconClass}
      style={customStyles}
      {...props}
    />
  );
};
