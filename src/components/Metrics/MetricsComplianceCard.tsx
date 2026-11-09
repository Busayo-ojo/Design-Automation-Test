import React from 'react';
import './MetricsComplianceCard.css';
import { Badge } from '../../elements/Badge';

export type MetricsComplianceStatus = 'compliant' | 'below';
export type MetricsComplianceBarMode = 'single' | 'split';

export interface MetricsComplianceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric category or heading (Figma: "Title", default: "Firm order placement") */
  title?: string;
  /** Primary compliance percentage or value (Figma: "Value", default: "92%") */
  value?: string | number;
  /** Status variant governing badge appearance and compliance palette (Figma: "status") */
  status?: MetricsComplianceStatus;
  /** Bar visualization variant: continuous 'single' or dual 'split' (Figma: "bar") */
  bar?: MetricsComplianceBarMode;
  /** Controls progress bar row visibility (Figma: "has bar") */
  hasBar?: boolean;
  /** Controls details breakdown visibility (Figma: "has details") */
  hasDetails?: boolean;
  /** Optional custom badge text (defaults to "Compliant" or "Below 90%") */
  badgeLabel?: string;
  /** Breakdown row 1 label (Figma: "Label 1", default: "Required") */
  label1?: string;
  /** Breakdown row 1 value (Figma: "Figure 1", default: "1,400,000") */
  figure1?: string;
  /** Breakdown row 2 label (Figma: "Label 2", default: "Placed") */
  label2?: string;
  /** Breakdown row 2 value (Figma: "Figure 2", default: "1,290,000") */
  figure2?: string;
}

export const MetricsComplianceCard: React.FC<MetricsComplianceCardProps> = ({
  title = 'Firm order placement',
  value = '92%',
  status = 'compliant',
  bar = 'single',
  hasBar = true,
  hasDetails = true,
  badgeLabel,
  label1 = 'Required',
  figure1 = '1,400,000',
  label2 = 'Placed',
  figure2 = '1,290,000',
  className = '',
  style,
  ...props
}) => {
  // Parse numeric percentage from value prop (e.g. "92%", 92)
  const numericVal =
    typeof value === 'number'
      ? value
      : parseFloat(String(value).replace('%', ''));
  const clamped = Math.min(100, Math.max(0, isNaN(numericVal) ? 90 : numericVal));
  const remaining = 100 - clamped;

  const defaultBadgeText = status === 'compliant' ? 'Compliant' : 'Below 90%';
  const resolvedBadgeText = badgeLabel ?? defaultBadgeText;
  const badgeColor = status === 'compliant' ? 'success' : 'warning';

  return (
    <div
      className={`fmdqui-metrics-compliance-card fmdqui-metrics-compliance-card--${status} ${className}`.trim()}
      style={style}
      {...props}
    >
      {/* ── Title ── */}
      <span className="fmdqui-metrics-compliance-card__title">{title}</span>

      {/* ── Value Row ── */}
      <div className="fmdqui-metrics-compliance-card__value-row">
        <span className="fmdqui-metrics-compliance-card__value">
          {typeof value === 'number' ? `${value}%` : value}
        </span>
        <Badge
          color={badgeColor}
          type="accent"
          size="sm"
          className="fmdqui-metrics-compliance-card__badge"
        >
          {resolvedBadgeText}
        </Badge>
      </div>

      {/* ── Progress Bar ── */}
      {hasBar && (
        <div
          className={`fmdqui-metrics-compliance-card__bar fmdqui-metrics-compliance-card__bar--${bar}`}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${title} compliance progress: ${clamped}%`}
        >
          {bar === 'single' ? (
            <div className="fmdqui-metrics-compliance-card__track">
              <div
                className="fmdqui-metrics-compliance-card__fill fmdqui-metrics-compliance-card__fill--passed"
                style={{ width: `${clamped}%` }}
              />
            </div>
          ) : (
            <div className="fmdqui-metrics-compliance-card__split-track">
              <div
                className="fmdqui-metrics-compliance-card__split-segment fmdqui-metrics-compliance-card__fill--passed"
                style={{ flex: clamped }}
              />
              <div
                className="fmdqui-metrics-compliance-card__split-segment fmdqui-metrics-compliance-card__fill--failed"
                style={{ flex: remaining }}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Details Rows ── */}
      {hasDetails && (
        <div className="fmdqui-metrics-compliance-card__details">
          <div className="fmdqui-metrics-compliance-card__detail-row">
            <span className="fmdqui-metrics-compliance-card__detail-label">{label1}</span>
            <span className="fmdqui-metrics-compliance-card__detail-figure">{figure1}</span>
          </div>
          <div className="fmdqui-metrics-compliance-card__detail-row">
            <span className="fmdqui-metrics-compliance-card__detail-label">{label2}</span>
            <span className="fmdqui-metrics-compliance-card__detail-figure">{figure2}</span>
          </div>
        </div>
      )}
    </div>
  );
};

MetricsComplianceCard.displayName = 'MetricsComplianceCard';

