import React from 'react';

export type IconVariant = 'linear' | 'bold';
export type IconSize = number | string;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  variant?: IconVariant;
  size?: IconSize;
  color?: string;
}

// Automatically picks up every src/foundations/icons/svg/{name}/{variant}.svg
// New icons added to the folder are available immediately — no code changes needed.
const svgModules = import.meta.glob('./svg/*/*.svg', {
  eager: true,
  query: '?react',
}) as Record<string, { default: React.FC<React.SVGProps<SVGSVGElement>> }>;

export const Icon: React.FC<IconProps> = ({
  name,
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className,
  ...props
}) => {
  const key = `./svg/${name}/${variant}.svg`;
  const mod = svgModules[key];
  if (!mod?.default) {
    console.warn(`[Icon] "${name}/${variant}" not found`);
    return null;
  }
  const SvgIcon = mod.default;
  return (
    <SvgIcon
      width={size}
      height={size}
      style={{ color }}
      className={className}
      aria-hidden="true"
      {...props}
    />
  );
};
