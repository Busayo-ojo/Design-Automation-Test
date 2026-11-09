import React from 'react';
import './ProgressBar.css';

export type ProgressBarSize = 'sm' | 'lg';
export type ProgressBarColor = 'primary' | 'blue' | 'success' | 'warning' | 'error';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Progress value from 0 to 100 (or string like "45%").
   * Maps 1:1 to Figma "progress" variant property.
   */
  progress: number | string;
  /**
   * Size variant — 'sm' (8px height) or 'lg' (12px height).
   * Maps to Figma "size" variant property.
   */
  size?: ProgressBarSize;
  /**
   * Status color of progress fill:
   * - 'primary': FMDQ Deep Navy (#1D326D, matching Figma linear bar)
   * - 'blue': FMDQ Blue (#1671D9)
   * - 'success': #12B76A
   * - 'warning': #F79009
   * - 'error': #F04438
   */
  color?: ProgressBarColor;
  /**
   * Heading / title label above the progress bar — maps to Figma "Label"
   */
  label?: React.ReactNode;
  /**
   * Controls label visibility — maps to Figma "has label" boolean property.
   */
  hasLabel?: boolean;
  /**
   * Metadata displayed on the left footer.
   * If an array of strings is passed, items are separated with bullets (•).
   * Maps to Figma "meta data" / "has meta data" property.
   */
  metadata?: string | string[] | React.ReactNode;
  /**
   * Controls metadata visibility — maps to Figma "has meta data" boolean property.
   */
  hasMetadata?: boolean;
  /**
   * Supporting description below the bar (alternative or addition to metadata)
   */
  description?: React.ReactNode;
  /**
   * Controls description container visibility — maps to Figma "has description" boolean property.
   */
  hasDescription?: boolean;
  /**
   * Controls whether percentage is displayed — maps to Figma "has percentages" boolean property.
   */
  hasPercentages?: boolean;
  /**
   * Display percentage at top right next to label (instead of footer)
   */
  percentagePosition?: 'top' | 'bottom';
  /**
   * Custom fill color (overrides color variant)
   */
  fillColor?: string;
  /**
   * Custom track color (overrides default #F0F2F5)
   */
  trackColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'lg',
  color = 'primary',
  label = 'Label',
  hasLabel = true,
  metadata,
  hasMetadata = true,
  description,
  hasDescription = true,
  hasPercentages = true,
  percentagePosition = 'bottom',
  fillColor,
  trackColor,
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

  const showLabel = hasLabel && label !== undefined && label !== null && label !== false;
  const showTopPercent = hasPercentages && percentagePosition === 'top';
  const showBottomPercent = hasPercentages && percentagePosition === 'bottom';

  // Metadata resolution
  const resolvedMetadata = metadata ?? (description || ['meta data', 'meta data']);
  const showMetadata = hasMetadata && hasDescription && resolvedMetadata !== undefined && resolvedMetadata !== null;
  const showFooter = hasDescription && (showMetadata || showBottomPercent);

  const renderMetadataContent = () => {
    if (Array.isArray(resolvedMetadata)) {
      return (
        <div className="fmdqui-progress-bar__meta">
          {resolvedMetadata.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="fmdqui-progress-bar__bullet" aria-hidden="true">•</span>}
              <span className="fmdqui-progress-bar__meta-item">{item}</span>
            </React.Fragment>
          ))}
        </div>
      );
    }
    return <span className="fmdqui-progress-bar__description">{resolvedMetadata}</span>;
  };

  return (
    <div
      className={`fmdqui-progress-bar ${className}`.trim()}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={typeof label === 'string' ? label : `${percentString} progress`}
      {...props}
    >
      {(showLabel || showTopPercent) && (
        <div className="fmdqui-progress-bar__header">
          {showLabel && <span className="fmdqui-progress-bar__label">{label}</span>}
          {showTopPercent && (
            <span className="fmdqui-progress-bar__percentage-top">{percentString}</span>
          )}
        </div>
      )}

      <div
        className={`fmdqui-progress-bar__track fmdqui-progress-bar__track--${size}`}
        style={trackColor ? { backgroundColor: trackColor } : undefined}
      >
        <div
          className={`fmdqui-progress-bar__fill fmdqui-progress-bar__fill--${color}`}
          style={{
            width: clamped === 0 ? '0%' : percentString,
            opacity: clamped === 0 ? 0 : 1,
            ...(fillColor ? { backgroundColor: fillColor } : {}),
          }}
        />
      </div>

      {showFooter && (
        <div className="fmdqui-progress-bar__footer">
          {showMetadata && renderMetadataContent()}
          {showBottomPercent && (
            <span className="fmdqui-progress-bar__percentage">{percentString}</span>
          )}
        </div>
      )}
    </div>
  );
};
ProgressBar.displayName = 'ProgressBar';
