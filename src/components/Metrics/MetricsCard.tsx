import React from 'react';
import './MetricsCard.css';
import { Badge, type BadgeColor, type BadgeType } from '../../elements/Badge';
import { Icon } from '../../foundations/icons';

export type MetricsCardType = 'data only' | 'data + CTA';
export type MetricsCardOrientation = 'left' | 'center';

export interface MetricsBadgeConfig {
  label: string;
  color?: BadgeColor;
  type?: BadgeType;
}

export interface MetricsCardProps {
  /** Metric title / label */
  title: string;
  /** Primary metric value (e.g. "₦1.84 Trillion", "45,823", "99.4%") */
  value: React.ReactNode;
  /** Optional icon in 32x32 rounded square header box */
  icon?: React.ReactNode;
  /** Controls icon visibility — maps to Figma "has icon" */
  hasIcon?: boolean;
  /** Badge displaying percentage or status */
  badge?: MetricsBadgeConfig | React.ReactNode;
  /** Controls badge visibility — maps to Figma "has badge" */
  hasBadge?: boolean;
  /** Secondary contextual description (e.g. "vs previous cycle", "100% submission rate") */
  subtext?: React.ReactNode;
  /** Controls description visibility — maps to Figma "has description" */
  hasSubtext?: boolean;
  /** Card type: 'data only' or 'data + CTA' with bottom action link */
  type?: MetricsCardType;
  /** Content orientation: 'left' or 'center' */
  orientation?: MetricsCardOrientation;
  /** CTA button label (when type is 'data + CTA') */
  ctaLabel?: string;
  /** Callback fired when CTA button is clicked */
  onCtaClick?: () => void;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

const ChevronRightIcon = () => (
  <Icon name="chevron-right" variant="linear" size={16} />
);

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  hasIcon = true,
  badge,
  hasBadge = true,
  subtext,
  hasSubtext = true,
  type = 'data only',
  orientation = 'left',
  ctaLabel = 'View details',
  onCtaClick,
  className = '',
  style,
}) => {
  const showIcon = hasIcon && !!icon;
  const showBadge = hasBadge && !!badge;
  const showSubtext = hasSubtext && !!subtext;
  const showSubtextRow = showBadge || showSubtext;
  const showCta = type === 'data + CTA' && !!ctaLabel;

  return (
    <div
      className={`fmdqui-metrics-card fmdqui-metrics-card--${orientation} ${className}`.trim()}
      style={style}
    >
      <div className="fmdqui-metrics-card__body">
        <div className="fmdqui-metrics-card__header">
          {showIcon && <div className="fmdqui-metrics-card__icon-box">{icon}</div>}
          <span className="fmdqui-metrics-card__title">{title}</span>
        </div>

        <div className="fmdqui-metrics-card__metrics-container">
          <div className="fmdqui-metrics-card__value">{value}</div>

          {showSubtextRow && (
            <div className="fmdqui-metrics-card__subtext-row">
              {showBadge && (
                badge && typeof badge === 'object' && 'label' in badge ? (
                  <Badge
                    color={badge.color ?? 'success'}
                    type={badge.type ?? 'accent'}
                    size="sm"
                  >
                    {badge.label}
                  </Badge>
                ) : (
                  (badge as React.ReactNode)
                )
              )}
              {showSubtext && (
                <span className="fmdqui-metrics-card__subtext">{subtext}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {showCta && (
        <div className="fmdqui-metrics-card__footer">
          <button
            type="button"
            className="fmdqui-metrics-card__cta-btn"
            onClick={onCtaClick}
          >
            <span>{ctaLabel}</span>
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
};
