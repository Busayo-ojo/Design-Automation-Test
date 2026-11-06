import React, { forwardRef, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Checkbox } from '../../elements/FormControl';
import { Button } from '../../elements/Button';
import {
  MULTI_SERIES_COLORS,
  MULTI_SERIES_PATTERNS,
  MULTI_SERIES_QH_TICKS,
  MULTI_SERIES_HOURLY_TICKS,
  MULTI_SERIES_Y_TICKS,
  DEMO_MULTI_SERIES,
  generateRandomMultiSeries,
  buildLinePath,
} from './chartUtils';
import type {
  MultiSeriesColor,
  MultiSeriesPattern,
  MultiSeriesInterval,
  MultiSeriesSize,
  MultiSeriesItem,
  LineChartType,
  Point,
} from './chartUtils';
import './Charts.css';

// ─── 1. Line Chart / Legend item (Figma 11041:684142) ────────────────────────

export interface LineChartLegendItemProps {
  id?: string;
  label?: ReactNode;
  color?: MultiSeriesColor;
  pattern?: MultiSeriesPattern;
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  className?: string;
}

export const LineChartLegendItem = forwardRef<HTMLDivElement, LineChartLegendItemProps>(
  (
    {
      label = 'NTB 05/05/2027',
      color = '1',
      pattern = 'solid',
      selected = true,
      onChange,
      className = '',
      ...props
    },
    ref
  ) => {
    const strokeColor = MULTI_SERIES_COLORS[color] ?? MULTI_SERIES_COLORS['1'];
    const dashArray = MULTI_SERIES_PATTERNS[pattern] ?? 'none';

    return (
      <div
        ref={ref}
        className={[
          'fmdqui-line-chart-legend-item',
          `fmdqui-line-chart-legend-item--color-${color}`,
          `fmdqui-line-chart-legend-item--pattern-${pattern}`,
          selected ? 'fmdqui-line-chart-legend-item--selected' : 'fmdqui-line-chart-legend-item--unselected',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onChange?.(!selected)}
        role="checkbox"
        aria-checked={selected}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange?.(!selected)}
        }}
        {...props}
      >
        <span className="fmdqui-line-chart-legend-item__checkbox" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selected}
            onChange={(e) => onChange?.(e.target.checked)}
            aria-label={typeof label === 'string' ? label : undefined}
          />
        </span>

        <span className="fmdqui-line-chart-legend-item__swatch" aria-hidden="true">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <line
              x1="0"
              y1="6"
              x2="20"
              y2="6"
              stroke={strokeColor}
              strokeWidth="2"
              strokeDasharray={dashArray === 'none' ? undefined : dashArray}
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="fmdqui-line-chart-legend-item__label">{label}</span>
      </div>
    );
  }
);
LineChartLegendItem.displayName = 'LineChartLegendItem';

// ─── 2. Line Chart / Now marker (Figma 11041:684143) ─────────────────────────

export interface LineChartNowMarkerProps {
  /** Horizontal position in pixels or percent */
  x?: number | string;
  label?: string;
  height?: number;
  className?: string;
}

export const LineChartNowMarker: React.FC<LineChartNowMarkerProps> = ({
  x = '50%',
  label = 'Now',
  height = 232,
  className = '',
}) => {
  const leftStyle = typeof x === 'number' ? `${x}px` : x;

  return (
    <div
      className={`fmdqui-line-chart-now-marker ${className}`}
      style={{ left: leftStyle, height: `${height}px` }}
      aria-label={`Current time marker: ${label}`}
    >
      <div className="fmdqui-line-chart-now-marker__line" style={{ height: `${height}px` }} />
      <span className="fmdqui-line-chart-now-marker__label">{label}</span>
    </div>
  );
};

// ─── 3. Line Chart / Threshold (Figma 11041:684146) ──────────────────────────

export interface LineChartThresholdProps {
  /** Vertical position in pixels or bps relative to plot */
  y?: number;
  label?: string;
  hasLabel?: boolean;
  className?: string;
}

export const LineChartThreshold: React.FC<LineChartThresholdProps> = ({
  y = 0,
  label = 'Alert at ±25 bps',
  hasLabel = true,
  className = '',
}) => {
  return (
    <div
      className={`fmdqui-line-chart-threshold ${className}`}
      style={{ top: `${y}px` }}
      aria-label={label}
    >
      <div className="fmdqui-line-chart-threshold__line" />
      {hasLabel && <span className="fmdqui-line-chart-threshold__label">{label}</span>}
    </div>
  );
};

// ─── 4. Line Chart / Multi-series (Figma 11041:684273) ───────────────────────

export interface MultiSeriesLineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: LineChartType;
  interval?: MultiSeriesInterval;
  size?: MultiSeriesSize;
  hasLegend?: boolean;
  legendTitle?: string;
  series?: MultiSeriesItem[];
  thresholdBps?: number;
  thresholdLabel?: string;
  hasThreshold?: boolean;
  nowIndex?: number; // index along x-axis where 'Now' line sits (0 to 16)
  showRandomizeButton?: boolean;
  onRandomize?: () => void;
  onSeriesToggle?: (id: string, selected: boolean) => void;
  onClearAll?: () => void;
  onSelectAll?: () => void;
}

export const MultiSeriesLineChart = forwardRef<HTMLDivElement, MultiSeriesLineChartProps>(
  (
    {
      type = 'Basic',
      interval = 'quarter-hour',
      size = 'default',
      hasLegend = true,
      legendTitle,
      series: controlledSeries,
      thresholdBps = 25,
      thresholdLabel,
      hasThreshold = true,
      nowIndex = 10, // ~12:30 in QH ticks
      showRandomizeButton = false,
      onRandomize,
      onSeriesToggle,
      onClearAll,
      onSelectAll,
      className = '',
      ...props
    },
    ref
  ) => {
    const [uncontrolledSeries, setUncontrolledSeries] = useState<MultiSeriesItem[]>(DEMO_MULTI_SERIES);
    const series = controlledSeries ?? uncontrolledSeries;

    const xTicks = interval === 'hourly' ? MULTI_SERIES_HOURLY_TICKS : MULTI_SERIES_QH_TICKS;
    const selectedCount = series.filter((s) => s.selected !== false).length;
    const defaultLegendTitle = `Showing ${selectedCount} of ${series.length} securities`;
    const effectiveLegendTitle = legendTitle ?? defaultLegendTitle;

    const handleToggle = (id: string, selected: boolean) => {
      if (!controlledSeries) {
        setUncontrolledSeries((prev) =>
          prev.map((s) => (s.id === id ? { ...s, selected } : s))
        );
      }
      onSeriesToggle?.(id, selected);
    };

    const handleClearAll = () => {
      if (!controlledSeries) {
        setUncontrolledSeries((prev) => prev.map((s) => ({ ...s, selected: false })));
      }
      onClearAll?.();
    };

    const handleSelectAll = () => {
      if (!controlledSeries) {
        setUncontrolledSeries((prev) => prev.map((s) => ({ ...s, selected: true })));
      }
      onSelectAll?.();
    };

    const handleRandomize = () => {
      if (!controlledSeries) {
        const freshData = generateRandomMultiSeries(17, uncontrolledSeries);
        setUncontrolledSeries(freshData);
      }
      onRandomize?.();
    };

    // Plot geometry
    // Figma default size: 496px wide, wide size: 1062px wide.
    const plotWidth = size === 'wide' ? 1062 : 496;
    const plotHeight = 264;
    const padLeft = 40;
    const padRight = 16;
    const padTop = 16;
    const padBottom = 32;

    const innerW = plotWidth - padLeft - padRight;
    const innerH = plotHeight - padTop - padBottom; // 216px

    // Scaling bps: +40 to -40 (80 bps span). Baseline (0 bps) lands at exactly vertical center.
    const scaleBpsY = useCallback(
      (bps: number) => {
        const normalized = (40 - bps) / 80; // 0 at +40, 0.5 at 0, 1 at -40
        return padTop + normalized * innerH;
      },
      [padTop, innerH]
    );

    // Scaling X across whatever data length each series carries (so lines span from 10:00 to 14:00)
    const scaleDataX = useCallback(
      (index: number, totalPoints: number) => {
        if (totalPoints <= 1) return padLeft + innerW / 2;
        return padLeft + (index / (totalPoints - 1)) * innerW;
      },
      [padLeft, innerW]
    );

    const scaleTickX = useCallback(
      (index: number) => {
        if (xTicks.length <= 1) return padLeft + innerW / 2;
        return padLeft + (index / (xTicks.length - 1)) * innerW;
      },
      [xTicks.length, padLeft, innerW]
    );

    // Threshold lines at +thresholdBps and -thresholdBps
    const upperThresholdY = scaleBpsY(thresholdBps);
    const lowerThresholdY = scaleBpsY(-thresholdBps);

    // Now marker X position (relative to 17 intraday intervals from 10:00 to 14:00)
    const nowX = padLeft + (Math.max(0, Math.min(nowIndex, 16)) / 16) * innerW;

    // Build SVG paths for selected series — every series starts at 0 bps at x = padLeft!
    const renderedLines = useMemo(() => {
      return series.map((s) => {
        if (s.selected === false) return null;
        const color = MULTI_SERIES_COLORS[s.color] ?? MULTI_SERIES_COLORS['1'];
        const dashArray = MULTI_SERIES_PATTERNS[s.pattern] ?? 'none';

        const pts: Point[] = s.data.map((val, i) => ({
          x: Number(scaleDataX(i, s.data.length).toFixed(1)),
          y: Number(scaleBpsY(val).toFixed(1)),
        }));

        const d = buildLinePath(pts, type);

        return (
          <path
            key={s.id}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={dashArray === 'none' ? undefined : dashArray}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="fmdqui-multi-series-chart__series-line"
          />
        );
      });
    }, [series, scaleDataX, scaleBpsY, type]);

    return (
      <div
        ref={ref}
        className={[
          'fmdqui-multi-series-chart',
          `fmdqui-multi-series-chart--interval-${interval}`,
          `fmdqui-multi-series-chart--size-${size}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ maxWidth: `${plotWidth}px` }}
        {...props}
      >
        {/* ── Plot Container ── */}
        <div className="fmdqui-multi-series-chart__plot" style={{ height: `${plotHeight}px` }}>
          <svg
            className="fmdqui-multi-series-chart__svg"
            viewBox={`0 0 ${plotWidth} ${plotHeight}`}
            width={plotWidth}
            height={plotHeight}
          >
            {/* Horizontal Grid lines and Y-axis labels */}
            {MULTI_SERIES_Y_TICKS.map((bps) => {
              const y = scaleBpsY(bps);
              const label = bps > 0 ? `+${bps}` : `${bps}`;
              return (
                <g key={bps} className="fmdqui-multi-series-chart__grid-group">
                  <text
                    x={padLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fmdqui-multi-series-chart__axis-label"
                  >
                    {label}
                  </text>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={plotWidth - padRight}
                    y2={y}
                    className="fmdqui-multi-series-chart__grid-line"
                  />
                </g>
              );
            })}

            {/* Threshold Lines (Alert at ±25 bps) */}
            {hasThreshold && (
              <g className="fmdqui-multi-series-chart__threshold-group">
                {/* Upper threshold (+25) */}
                <line
                  x1={padLeft}
                  y1={upperThresholdY}
                  x2={plotWidth - padRight}
                  y2={upperThresholdY}
                  className="fmdqui-multi-series-chart__threshold-line"
                />
                <text
                  x={plotWidth - padRight}
                  y={upperThresholdY - 4}
                  textAnchor="end"
                  className="fmdqui-multi-series-chart__threshold-label"
                >
                  {thresholdLabel ?? `Alert at +${thresholdBps} bps`}
                </text>

                {/* Lower threshold (-25) */}
                <line
                  x1={padLeft}
                  y1={lowerThresholdY}
                  x2={plotWidth - padRight}
                  y2={lowerThresholdY}
                  className="fmdqui-multi-series-chart__threshold-line"
                />
                <text
                  x={plotWidth - padRight}
                  y={lowerThresholdY + 12}
                  textAnchor="end"
                  className="fmdqui-multi-series-chart__threshold-label"
                >
                  {thresholdLabel ? thresholdLabel.replace('+', '-') : `Alert at -${thresholdBps} bps`}
                </text>
              </g>
            )}

            {/* Now marker line */}
            <g className="fmdqui-multi-series-chart__now-group">
              <line
                x1={nowX}
                y1={padTop}
                x2={nowX}
                y2={padTop + innerH}
                className="fmdqui-multi-series-chart__now-line"
              />
              <text
                x={nowX + 4}
                y={padTop + innerH - 4}
                className="fmdqui-multi-series-chart__now-label"
              >
                Now
              </text>
            </g>

            {/* Multiple series paths */}
            <g className="fmdqui-multi-series-chart__lines-group">{renderedLines}</g>

            {/* X-axis tick labels */}
            {xTicks.map((tick, i) => {
              const x = scaleTickX(i);
              return (
                <text
                  key={tick}
                  x={x}
                  y={plotHeight - 8}
                  textAnchor="middle"
                  className="fmdqui-multi-series-chart__x-axis-label"
                >
                  {tick}
                </text>
              );
            })}
          </svg>
        </div>

        {/* ── Legend Header & Multi-series Legend Slot ── */}
        {hasLegend && (
          <div className="fmdqui-multi-series-chart__legend-section">
            <div className="fmdqui-multi-series-chart__legend-header">
              <span className="fmdqui-multi-series-chart__legend-title">
                {effectiveLegendTitle}
              </span>
              <div className="fmdqui-multi-series-chart__legend-actions">
                {showRandomizeButton && (
                  <Button
                    variant="text"
                    size="sm"
                    onClick={handleRandomize}
                    className="fmdqui-multi-series-chart__action-btn"
                  >
                    🎲 Randomize
                  </Button>
                )}
                {selectedCount < series.length && (
                  <Button
                    variant="text"
                    size="sm"
                    onClick={handleSelectAll}
                    className="fmdqui-multi-series-chart__action-btn"
                  >
                    Select all
                  </Button>
                )}
                {selectedCount > 0 && (
                  <Button
                    variant="text"
                    size="sm"
                    onClick={handleClearAll}
                    className="fmdqui-multi-series-chart__action-btn"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>

            <div className="fmdqui-multi-series-chart__legend-slot">
              {series.map((item) => (
                <LineChartLegendItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  color={item.color}
                  pattern={item.pattern}
                  selected={item.selected !== false}
                  onChange={(checked) => handleToggle(item.id, checked)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);
MultiSeriesLineChart.displayName = 'MultiSeriesLineChart';
