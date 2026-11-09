import React from 'react';
import './ProgressCircle.css';

export type ProgressCircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressCircleColor = 'primary' | 'navy' | 'success' | 'warning' | 'error';

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Progress value from 0 to 100 (or string like "75%").
   * Maps 1:1 to Figma "Progress" variant property.
   */
  progress: number | string;
  /**
   * Size variant — xs (48px) | sm (56px) | md (72px) | lg (90px) | xl (120px).
   * Maps 1:1 to Figma "size" variant property.
   */
  size?: ProgressCircleSize;
  /**
   * Controls visibility of percentage label inside the circle —
   * maps 1:1 to Figma "has text" boolean property.
   */
  hasText?: boolean;
  /**
   * Custom label or override for the center text (defaults to `${progress}%`)
   */
  label?: React.ReactNode;
  /**
   * Status color of progress ring
   */
  color?: ProgressCircleColor;
  /**
   * Stroke linecap: 'butt' (flat ends, matching Figma arc) or 'round'
   */
  strokeLinecap?: 'butt' | 'round';
  /**
   * Custom track background color
   */
  trackColor?: string;
  /**
   * Custom fill color (overrides color variant)
   */
  fillColor?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 'md',
  hasText = true,
  label,
  color = 'primary',
  strokeLinecap = 'butt',
  trackColor,
  fillColor,
  className = '',
  style,
  ...props
}) => {
  // Normalize progress to numeric 0..100
  const numericVal =
    typeof progress === 'string'
      ? parseFloat(progress.replace('%', ''))
      : progress;
  const clamped = Math.min(100, Math.max(0, isNaN(numericVal) ? 0 : numericVal));
  const percentString = `${Math.round(clamped)}%`;

  // SVG Geometry:
  // In viewBox 0 0 100 100:
  // With radius = 45 and strokeWidth = 10:
  // outer edge is 45 + 5 = 50, inner edge is 45 - 5 = 40.
  // 40 / 50 = 0.8 innerRadius, which is an exact 1:1 match to Figma's innerRadius: 0.8.
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  const classes = [
    'fmdqui-progress-circle',
    `fmdqui-progress-circle--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={typeof label === 'string' ? label : `${percentString} progress`}
      {...props}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {/* Background Track Circle */}
        <circle
          className="fmdqui-progress-circle__track"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          style={trackColor ? { stroke: trackColor } : undefined}
        />
        {/* Progress Arc */}
        {clamped > 0 && (
          <circle
            className={`fmdqui-progress-circle__fill fmdqui-progress-circle__fill--${color}`}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap={strokeLinecap}
            transform="rotate(-90 50 50)"
            style={fillColor ? { stroke: fillColor } : undefined}
          />
        )}
      </svg>

      {hasText && (
        <span className="fmdqui-progress-circle__text">
          {label ?? percentString}
        </span>
      )}
    </div>
  );
};
ProgressCircle.displayName = 'ProgressCircle';
