import React, { forwardRef } from 'react';
import './MiscIcon.css';
import { Icon } from '../../foundations/icons';

// ─── Types (1:1 with Figma 3354:173707) ──────────────────────────────────────

export type MiscIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type MiscIconColor = 'Primary' | 'Gray' | 'White' | 'Error' | 'Warning' | 'Success';
export type MiscIconShape = 'Round' | 'Square';

export interface MiscIconProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Icon name from foundations icons (default: 'dots-v') */
  icon?: string;
  /** Icon drawing style: 'linear' or 'bold' (default: 'bold') */
  iconVariant?: 'linear' | 'bold';
  /** Size variant: xs (24px), sm (32px), md (40px), lg (48px), xl (56px) */
  size?: MiscIconSize;
  /** Palette color variant (Figma: Color) */
  color?: MiscIconColor;
  /** Container shape: Round (circle) or Square (rounded rectangle) */
  type?: MiscIconShape;
  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * Turns the fill and border on or off (Figma: "has background", default: true).
   * Turn it off when the table row height is tight. The icon stays the same size.
   */
  hasBackground?: boolean;
}

const SIZE_MAP: Record<MiscIconSize, { box: number; icon: number }> = {
  xs: { box: 24, icon: 14 },
  sm: { box: 32, icon: 16 },
  md: { box: 40, icon: 20 },
  lg: { box: 48, icon: 24 },
  xl: { box: 56, icon: 28 },
};

export const MiscIcon = forwardRef<HTMLButtonElement, MiscIconProps>(
  (
    {
      icon = 'dots-v',
      iconVariant = 'bold',
      size = 'sm',
      color = 'White',
      type = 'Square',
      htmlType = 'button',
      hasBackground = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const { icon: iconPixelSize } = SIZE_MAP[size] ?? SIZE_MAP.sm;

    const classes = [
      'fmdqui-misc-icon',
      `fmdqui-misc-icon--size-${size}`,
      `fmdqui-misc-icon--color-${color.toLowerCase()}`,
      `fmdqui-misc-icon--shape-${type.toLowerCase()}`,
      !hasBackground ? 'fmdqui-misc-icon--no-background' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={htmlType} className={classes} {...props}>
        <Icon name={icon} variant={iconVariant} size={iconPixelSize} />
      </button>
    );
  }
);

MiscIcon.displayName = 'MiscIcon';
