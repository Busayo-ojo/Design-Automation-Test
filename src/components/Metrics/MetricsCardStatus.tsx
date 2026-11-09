import React, { forwardRef } from 'react';
import './MetricsCardStatus.css';
import { Icon } from '../../foundations/icons';

// ─── Types & Definitions (1:1 with Figma 11145:1002308) ──────────────────────

export type MetricsCardStatusType = 'success' | 'warning' | 'error';
export type MetricsCardStatusState = 'default' | 'selected';

export interface MetricsCardStatusProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Status variant governing icon, palette, and semantic indicator (Figma: "status") */
  status?: MetricsCardStatusType;
  /** Selection state for when the participant breakdown is active/open (Figma: "state") */
  state?: MetricsCardStatusState;
  /** Primary metric count or value (Figma: "Value", default: "18") */
  value?: string | number;
  /** Descriptive status label (Figma: "Label", default: "Logged in, quoting") */
  label?: string;
  /** Whether to render trailing chevron (Figma: "has chevron", default: true) */
  hasChevron?: boolean;
  /** Whether to render vertical right divider separating tiles (Figma: "has divider", default: true) */
  hasDivider?: boolean;
}

export const MetricsCardStatus = forwardRef<HTMLButtonElement, MetricsCardStatusProps>(
  (
    {
      status = 'success',
      state = 'default',
      value = '18',
      label = 'Logged in, quoting',
      hasChevron = true,
      hasDivider = true,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const isSelected = state === 'selected';

    const classes = [
      'fmdqui-metrics-status',
      `fmdqui-metrics-status--${status}`,
      `fmdqui-metrics-status--state-${state}`,
      isSelected ? 'fmdqui-metrics-status--selected' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderIcon = () => {
      switch (status) {
        case 'success':
          return (
            <Icon
              name="check-circle"
              variant="bold"
              size={24}
              className="fmdqui-metrics-status__icon fmdqui-metrics-status__icon--success"
            />
          );
        case 'warning':
          return (
            <Icon
              name="info-circle"
              variant="bold"
              size={24}
              className="fmdqui-metrics-status__icon fmdqui-metrics-status__icon--warning"
            />
          );
        case 'error':
          return (
            <Icon
              name="multiply-circle"
              variant="bold"
              size={24}
              className="fmdqui-metrics-status__icon fmdqui-metrics-status__icon--error"
            />
          );
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        aria-pressed={isSelected}
        onClick={onClick}
        {...props}
      >
        <div className="fmdqui-metrics-status__body">
          {renderIcon()}

          <div className="fmdqui-metrics-status__text">
            <span className="fmdqui-metrics-status__value">{value}</span>
            <span className="fmdqui-metrics-status__label" title={label}>
              {label}
            </span>
          </div>

          {hasChevron && (
            <span className="fmdqui-metrics-status__chevron">
              <Icon
                name={isSelected ? 'chevron-up' : 'chevron-down'}
                variant="linear"
                size={16}
              />
            </span>
          )}
        </div>

        {hasDivider && <div className="fmdqui-metrics-status__divider" aria-hidden="true" />}
      </button>
    );
  }
);

MetricsCardStatus.displayName = 'MetricsCardStatus';

// ─── Composite Market Participation Card Container ───────────────────────────

export interface MarketParticipationItem {
  id: string;
  status: MetricsCardStatusType;
  value: string | number;
  label: string;
}

export interface MarketParticipationCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  title?: string;
  subtitle?: string;
  items?: MarketParticipationItem[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

export const MarketParticipationCard: React.FC<MarketParticipationCardProps> = ({
  title = 'Market Participation',
  subtitle = 'DMBs · Live Quoting Activity',
  items = [
    { id: 'quoting', status: 'success', value: 18, label: 'Logged in, quoting' },
    { id: 'not-quoting', status: 'warning', value: 4, label: 'Logged in, not quoting' },
    { id: 'offline', status: 'error', value: 2, label: 'Offline / Not logged in' },
  ],
  selectedId,
  onSelect,
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`fmdqui-market-participation-card ${className}`.trim()} {...props}>
      {(title || subtitle) && (
        <div className="fmdqui-market-participation-card__header">
          {title && <span className="fmdqui-market-participation-card__title">{title}</span>}
          {subtitle && <span className="fmdqui-market-participation-card__subtitle">{subtitle}</span>}
        </div>
      )}

      <div className="fmdqui-market-participation-card__grid">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isSelected = selectedId === item.id;

          return (
            <MetricsCardStatus
              key={item.id}
              status={item.status}
              state={isSelected ? 'selected' : 'default'}
              value={item.value}
              label={item.label}
              hasChevron={true}
              hasDivider={!isLast}
              onClick={() => onSelect?.(item.id)}
            />
          );
        })}
      </div>

      {children && (
        <div className="fmdqui-market-participation-card__dropdown-content">
          {children}
        </div>
      )}
    </div>
  );
};

MarketParticipationCard.displayName = 'MarketParticipationCard';
