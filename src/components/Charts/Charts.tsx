import React, { forwardRef, useId, useState, type ReactNode } from 'react';
import {
  CHART_PALETTE,
  BAR_PALETTE,
  QUANTITY_COUNT,
  scaleX,
  scaleY,
  bandX,
  niceMax,
  buildLinePath,
  topRoundedRect,
  DEMO_SERIES,
  DEMO_BAR_SERIES,
  DEMO_STACK_SERIES,
  type ChartSeries,
  type LineChartType,
  type SeriesQuantity,
  type LegendOrientation,
  type GridLineType,
  type PlotBox,
  PIE_PALETTE,
  DEMO_PIE,
  DEMO_RADAR,
  pieSlots,
  pieLabelColor,
  arcPath,
  arcCentroid,
  radarPoint,
  radarRing,
  radarSeriesPath,
  type PieSlice,
  type LegendValuesDirection,
  type RadarChartType,
  type RadarBackground,
} from './chartUtils';
import './Charts.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Charts — built 1:1 from the Figma page "✤ Charts ⚜️"
   (file Hq7luvf787VJlCj1d3YJYw)

   Layered exactly as Figma organises it:

     ELEMENTS   (frame "Charts" 6225:18743)
       ChartLegend   ← Legends  6240:33124 (2 variants: Orientation)
       ChartGrid     ← y axis   6240:33372 (4 variants: Type × Label)
       ChartXAxis    ← X-axis   6240:33501 (3 variants: Year/Month/Week)

     FULL
       LineChart        ← Line Chart               6257:42734 (12 variants)
       BarChart         ← Basic Bar Chart          6306:4216  (3 variants)
       StackedBarChart  ← Percent Stacked Bar      6287:6146  (3 variants)

   Hand-built SVG — this design system ships no charting dependency, matching
   how every other component here is built.

   Per the dataviz guidance every chart ships a hover layer by default
   (crosshair + tooltip on lines, per-bar tooltip on bars), a legend whenever
   there is more than one series, and an optional table view.
   ═══════════════════════════════════════════════════════════════════════════ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — ChartLegend
   Figma: Legends (6240:33124) · 8px dot + 14px neutral-500 label, gap 8.
   Vertical stacks with gap 4; Horizontal rows with gap 13.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma `Orientation` variant */
  orientation?: LegendOrientation;
  /** Series names paired with their colours */
  items: Array<{ name: string; color: string }>;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({
  orientation = 'Horizontal',
  items,
  className,
  ...rest
}) => (
  <div
    className={cx('fmdqui-chart-legend', `fmdqui-chart-legend--${orientation.toLowerCase()}`, className)}
    {...rest}
  >
    {items.map((it, i) => (
      <span key={`${it.name}-${i}`} className="fmdqui-chart-legend__item">
        <span className="fmdqui-chart-legend__dot" style={{ backgroundColor: it.color }} />
        <span className="fmdqui-chart-legend__label">{it.name}</span>
      </span>
    ))}
  </div>
);

ChartLegend.displayName = 'ChartLegend';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — ChartGrid (the y-axis rules)
   Figma: y axis (6240:33372) — a neutral-300 rule, solid or dashed 4/4, with
   an optional 12px neutral-600 value label to its left.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ChartGridProps {
  /** Tick values, top to bottom */
  ticks: number[];
  /** Figma `Type` variant */
  gridType?: GridLineType;
  /** Figma `Label` variant */
  showLabels?: boolean;
  max: number;
  box: PlotBox;
}

export const ChartGrid: React.FC<ChartGridProps> = ({
  ticks,
  gridType = 'broken',
  showLabels = true,
  max,
  box,
}) => (
  <g className="fmdqui-chart__grid" aria-hidden="true">
    {ticks.map((t) => {
      const y = scaleY(t, max, box);
      return (
        <g key={t}>
          <line
            x1={box.padLeft}
            x2={box.width - box.padRight}
            y1={y}
            y2={y}
            className={cx('fmdqui-chart__gridline', gridType === 'broken' && 'fmdqui-chart__gridline--broken')}
          />
          {showLabels && (
            <text x={box.padLeft - 8} y={y} className="fmdqui-chart__y-label" textAnchor="end" dominantBaseline="middle">
              {t}
            </text>
          )}
        </g>
      );
    })}
  </g>
);

ChartGrid.displayName = 'ChartGrid';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — ChartXAxis
   Figma: X-axis (6240:33501) — 12px neutral-500 labels, space-between.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ChartXAxisProps {
  labels: Array<string | number>;
  box: PlotBox;
  /** Centre labels under bands (bar charts) rather than on points (line) */
  banded?: boolean;
}

export const ChartXAxis: React.FC<ChartXAxisProps> = ({ labels, box, banded = false }) => (
  <g className="fmdqui-chart__x-axis" aria-hidden="true">
    {labels.map((l, i) => {
      const x = banded
        ? bandX(i, labels.length, box) + (box.width - box.padLeft - box.padRight) / labels.length / 2
        : scaleX(i, labels.length, box);
      return (
        <text key={`${l}-${i}`} x={x} y={box.height - box.padBottom + 16} className="fmdqui-chart__x-label" textAnchor="middle">
          {l}
        </text>
      );
    })}
  </g>
);

ChartXAxis.displayName = 'ChartXAxis';

/* ─── Shared chart shell ─────────────────────────────────────────────────── */

interface ShellProps {
  legend: ReactNode;
  table: ReactNode;
  showTable: boolean;
  className?: string;
  children: ReactNode;
}

const ChartShell: React.FC<ShellProps> = ({ legend, table, showTable, className, children }) => (
  <div className={cx('fmdqui-chart', className)}>
    {legend}
    {children}
    {showTable && table}
  </div>
);

/** Accessible fallback — the dataviz guidance requires a table view to exist. */
const DataTable: React.FC<{ labels: Array<string | number>; series: ChartSeries[]; colors: string[] }> = ({
  labels, series, colors,
}) => (
  <table className="fmdqui-chart__table">
    <thead>
      <tr>
        <th scope="col">Series</th>
        {labels.map((l, i) => <th key={`${l}-${i}`} scope="col">{l}</th>)}
      </tr>
    </thead>
    <tbody>
      {series.map((s, i) => (
        <tr key={s.name}>
          <th scope="row">
            <span className="fmdqui-chart__table-dot" style={{ backgroundColor: s.color ?? colors[i] }} />
            {s.name}
          </th>
          {s.data.map((v, j) => <td key={j}>{v}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — LineChart
   Figma: Line Chart (6257:42734) — 12 variants, Type × Quantity.
   Series stroke 2px with round joins; 6 dashed gridlines; 12 x ticks.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface LineChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Figma `Type` variant — how the points are joined */
  type?: LineChartType;
  /** Figma `Quantity` variant — convenience for trimming `series` */
  quantity?: SeriesQuantity;
  series?: ChartSeries[];
  labels?: Array<string | number>;
  /** Figma `Show Legends` BOOLEAN property */
  showLegend?: boolean;
  legendOrientation?: LegendOrientation;
  gridType?: GridLineType;
  showYLabels?: boolean;
  /** Render the accessible table fallback beneath the chart */
  showTable?: boolean;
  /** Crosshair + tooltip on hover. On by default per the dataviz guidance. */
  interactive?: boolean;
  palette?: string[];
  width?: number;
  height?: number;
  max?: number;
}

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      type = 'Basic',
      quantity,
      series = DEMO_SERIES,
      labels = Array.from({ length: 12 }, (_, i) => i + 1),
      showLegend = true,
      legendOrientation = 'Horizontal',
      gridType = 'broken',
      showYLabels = true,
      showTable = false,
      interactive = true,
      palette = CHART_PALETTE,
      width = 520,
      height = 220,
      max,
      className,
      ...rest
    },
    ref
  ) => {
    const shown = quantity ? series.slice(0, QUANTITY_COUNT[quantity]) : series;
    const box: PlotBox = {
      width, height,
      padLeft: showYLabels ? 44 : 8,
      padRight: 8,
      padTop: 8,
      padBottom: 28,
    };
    const peak = max ?? niceMax(shown.flatMap((s) => s.data));
    // Six rules, top to bottom — cheap enough that the compiler handles it.
    const ticks = Array.from({ length: 6 }, (_, i) => Math.round((peak / 5) * (5 - i)));
    const [hover, setHover] = useState<number | null>(null);
    const titleId = useId();

    const colors = shown.map((s, i) => s.color ?? palette[i % palette.length]);

    const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
      if (!interactive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * width;
      const inner = width - box.padLeft - box.padRight;
      const i = Math.round(((x - box.padLeft) / inner) * (labels.length - 1));
      setHover(i >= 0 && i < labels.length ? i : null);
    };

    return (
      <ChartShell
        className={className}
        showTable={showTable}
        legend={showLegend && shown.length > 0 ? (
          <ChartLegend orientation={legendOrientation} items={shown.map((s, i) => ({ name: s.name, color: colors[i] }))} />
        ) : null}
        table={<DataTable labels={labels} series={shown} colors={colors} />}
      >
        <div ref={ref} className="fmdqui-chart__plot" {...rest}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="fmdqui-chart__svg"
            role="img"
            aria-labelledby={titleId}
            onMouseMove={onMove}
            onMouseLeave={() => setHover(null)}
          >
            <title id={titleId}>
              {`Line chart, ${shown.length} series: ${shown.map((s) => s.name).join(', ')}`}
            </title>

            <ChartGrid ticks={ticks} gridType={gridType} showLabels={showYLabels} max={peak} box={box} />
            <ChartXAxis labels={labels} box={box} />

            {shown.map((s, si) => {
              const pts = s.data.map((v, i) => ({ x: scaleX(i, s.data.length, box), y: scaleY(v, peak, box) }));
              return (
                <path
                  key={s.name}
                  d={buildLinePath(pts, type)}
                  className="fmdqui-chart__line"
                  stroke={colors[si]}
                />
              );
            })}

            {/* Crosshair + markers */}
            {interactive && hover !== null && (
              <g className="fmdqui-chart__hover" aria-hidden="true">
                <line
                  x1={scaleX(hover, labels.length, box)}
                  x2={scaleX(hover, labels.length, box)}
                  y1={box.padTop}
                  y2={height - box.padBottom}
                  className="fmdqui-chart__crosshair"
                />
                {shown.map((s, si) => (
                  <circle
                    key={s.name}
                    cx={scaleX(hover, s.data.length, box)}
                    cy={scaleY(s.data[hover] ?? 0, peak, box)}
                    r={4}
                    fill={colors[si]}
                    className="fmdqui-chart__marker"
                  />
                ))}
              </g>
            )}
          </svg>

          {interactive && hover !== null && (
            <div
              className="fmdqui-chart__tooltip"
              style={{ left: `${(scaleX(hover, labels.length, box) / width) * 100}%` }}
              role="status"
            >
              <span className="fmdqui-chart__tooltip-title">{labels[hover]}</span>
              {shown.map((s, si) => (
                <span key={s.name} className="fmdqui-chart__tooltip-row">
                  <span className="fmdqui-chart__tooltip-dot" style={{ backgroundColor: colors[si] }} />
                  <span className="fmdqui-chart__tooltip-name">{s.name}</span>
                  <span className="fmdqui-chart__tooltip-value">{s.data[hover]}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </ChartShell>
    );
  }
);

LineChart.displayName = 'LineChart';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — BarChart
   Figma: Basic Bar Chart (6306:4216) — 3 variants (Quantity 1/2/3).
   Bars are 13px wide with 4px top-rounded ends, grouped per category, on a
   blue sequential ramp. A 2px surface gap separates adjacent bars.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma `Quantity` variant — number of series per group */
  quantity?: 1 | 2 | 3;
  series?: ChartSeries[];
  labels?: Array<string | number>;
  /** Figma `Show legend` BOOLEAN property */
  showLegend?: boolean;
  legendOrientation?: LegendOrientation;
  gridType?: GridLineType;
  showYLabels?: boolean;
  showTable?: boolean;
  interactive?: boolean;
  palette?: string[];
  width?: number;
  height?: number;
  max?: number;
  /** Figma bar width */
  barWidth?: number;
}

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      quantity,
      series = DEMO_BAR_SERIES,
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      showLegend = true,
      legendOrientation = 'Horizontal',
      gridType = 'broken',
      showYLabels = true,
      showTable = false,
      interactive = true,
      palette = BAR_PALETTE,
      width = 560,
      height = 260,
      max,
      barWidth = 13,
      className,
      ...rest
    },
    ref
  ) => {
    const shown = quantity ? series.slice(0, quantity) : series;
    const box: PlotBox = {
      width, height,
      padLeft: showYLabels ? 44 : 8,
      padRight: 8,
      padTop: 8,
      padBottom: 28,
    };
    const peak = max ?? niceMax(shown.flatMap((s) => s.data));
    // Six rules, top to bottom — cheap enough that the compiler handles it.
    const ticks = Array.from({ length: 6 }, (_, i) => Math.round((peak / 5) * (5 - i)));
    const [hover, setHover] = useState<number | null>(null);
    const titleId = useId();
    const colors = shown.map((s, i) => s.color ?? palette[i % palette.length]);

    const groupWidth = (width - box.padLeft - box.padRight) / labels.length;
    // 2px surface gap between adjacent bars, per the dataviz mark spec
    const gap = 2;
    const clusterWidth = shown.length * barWidth + (shown.length - 1) * gap;

    return (
      <ChartShell
        className={className}
        showTable={showTable}
        legend={showLegend && shown.length > 0 ? (
          <ChartLegend orientation={legendOrientation} items={shown.map((s, i) => ({ name: s.name, color: colors[i] }))} />
        ) : null}
        table={<DataTable labels={labels} series={shown} colors={colors} />}
      >
        <div ref={ref} className="fmdqui-chart__plot" {...rest}>
          <svg viewBox={`0 0 ${width} ${height}`} className="fmdqui-chart__svg" role="img" aria-labelledby={titleId}>
            <title id={titleId}>
              {`Bar chart, ${shown.length} series: ${shown.map((s) => s.name).join(', ')}`}
            </title>

            <ChartGrid ticks={ticks} gridType={gridType} showLabels={showYLabels} max={peak} box={box} />
            <ChartXAxis labels={labels} box={box} banded />

            {labels.map((_, gi) => {
              const left = bandX(gi, labels.length, box) + (groupWidth - clusterWidth) / 2;
              return (
                <g
                  key={gi}
                  onMouseEnter={() => interactive && setHover(gi)}
                  onMouseLeave={() => interactive && setHover(null)}
                >
                  {/* Invisible hit target, larger than the marks */}
                  <rect
                    x={bandX(gi, labels.length, box)}
                    y={box.padTop}
                    width={groupWidth}
                    height={height - box.padTop - box.padBottom}
                    fill="transparent"
                  />
                  {shown.map((s, si) => {
                    const v = s.data[gi] ?? 0;
                    const y = scaleY(v, peak, box);
                    const h = height - box.padBottom - y;
                    return (
                      <path
                        key={s.name}
                        d={topRoundedRect(left + si * (barWidth + gap), y, barWidth, h, 4)}
                        fill={colors[si]}
                        className={cx('fmdqui-chart__bar', hover !== null && hover !== gi && 'fmdqui-chart__bar--dim')}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {interactive && hover !== null && (
            <div
              className="fmdqui-chart__tooltip"
              style={{ left: `${((bandX(hover, labels.length, box) + groupWidth / 2) / width) * 100}%` }}
              role="status"
            >
              <span className="fmdqui-chart__tooltip-title">{labels[hover]}</span>
              {shown.map((s, si) => (
                <span key={s.name} className="fmdqui-chart__tooltip-row">
                  <span className="fmdqui-chart__tooltip-dot" style={{ backgroundColor: colors[si] }} />
                  <span className="fmdqui-chart__tooltip-name">{s.name}</span>
                  <span className="fmdqui-chart__tooltip-value">{s.data[hover]}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </ChartShell>
    );
  }
);

BarChart.displayName = 'BarChart';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — StackedBarChart (percent)
   Figma: Percent Stacked Bar Chart (6287:6146) — 3 variants (Quantity 2/3/4).
   Every column totals 100%; segments carry a 2px surface gap between them.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface StackedBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma `Quantity` variant — number of stacked segments */
  quantity?: 2 | 3 | 4;
  series?: ChartSeries[];
  labels?: Array<string | number>;
  /** Figma `Show legend` BOOLEAN property */
  showLegend?: boolean;
  legendOrientation?: LegendOrientation;
  gridType?: GridLineType;
  showYLabels?: boolean;
  showTable?: boolean;
  interactive?: boolean;
  palette?: string[];
  width?: number;
  height?: number;
  barWidth?: number;
}

export const StackedBarChart = forwardRef<HTMLDivElement, StackedBarChartProps>(
  (
    {
      quantity,
      series = DEMO_STACK_SERIES,
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      showLegend = true,
      legendOrientation = 'Horizontal',
      gridType = 'broken',
      showYLabels = true,
      showTable = false,
      interactive = true,
      palette = BAR_PALETTE,
      width = 560,
      height = 260,
      barWidth = 28,
      className,
      ...rest
    },
    ref
  ) => {
    const shown = quantity ? series.slice(0, quantity) : series;
    const box: PlotBox = {
      width, height,
      padLeft: showYLabels ? 44 : 8,
      padRight: 8,
      padTop: 8,
      padBottom: 28,
    };
    // Percent stacked — every column is normalised to 100.
    const ticks = [100, 80, 60, 40, 20, 0];
    const [hover, setHover] = useState<number | null>(null);
    const titleId = useId();
    const colors = shown.map((s, i) => s.color ?? palette[i % palette.length]);
    const groupWidth = (width - box.padLeft - box.padRight) / labels.length;
    const segGap = 2;

    const columns = labels.map((_, gi) => {
      const raw = shown.map((s) => s.data[gi] ?? 0);
      const total = raw.reduce((a, b) => a + b, 0) || 1;
      return raw.map((v) => (v / total) * 100);
    });

    return (
      <ChartShell
        className={className}
        showTable={showTable}
        legend={showLegend && shown.length > 0 ? (
          <ChartLegend orientation={legendOrientation} items={shown.map((s, i) => ({ name: s.name, color: colors[i] }))} />
        ) : null}
        table={<DataTable labels={labels} series={shown} colors={colors} />}
      >
        <div ref={ref} className="fmdqui-chart__plot" {...rest}>
          <svg viewBox={`0 0 ${width} ${height}`} className="fmdqui-chart__svg" role="img" aria-labelledby={titleId}>
            <title id={titleId}>
              {`Percent stacked bar chart, ${shown.length} segments: ${shown.map((s) => s.name).join(', ')}`}
            </title>

            <ChartGrid ticks={ticks} gridType={gridType} showLabels={showYLabels} max={100} box={box} />
            <ChartXAxis labels={labels} box={box} banded />

            {columns.map((pcts, gi) => {
              const left = bandX(gi, labels.length, box) + (groupWidth - barWidth) / 2;
              let cursor = 0;
              return (
                <g
                  key={gi}
                  onMouseEnter={() => interactive && setHover(gi)}
                  onMouseLeave={() => interactive && setHover(null)}
                >
                  <rect
                    x={bandX(gi, labels.length, box)}
                    y={box.padTop}
                    width={groupWidth}
                    height={height - box.padTop - box.padBottom}
                    fill="transparent"
                  />
                  {pcts.map((pct, si) => {
                    const yTop = scaleY(cursor + pct, 100, box);
                    const yBottom = scaleY(cursor, 100, box);
                    cursor += pct;
                    const h = Math.max(0, yBottom - yTop - segGap);
                    // Only the topmost segment gets the rounded data-end.
                    const isTop = si === pcts.length - 1;
                    return isTop ? (
                      <path
                        key={si}
                        d={topRoundedRect(left, yTop, barWidth, h, 4)}
                        fill={colors[si]}
                        className={cx('fmdqui-chart__bar', hover !== null && hover !== gi && 'fmdqui-chart__bar--dim')}
                      />
                    ) : (
                      <rect
                        key={si}
                        x={left} y={yTop} width={barWidth} height={h}
                        fill={colors[si]}
                        className={cx('fmdqui-chart__bar', hover !== null && hover !== gi && 'fmdqui-chart__bar--dim')}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {interactive && hover !== null && (
            <div
              className="fmdqui-chart__tooltip"
              style={{ left: `${((bandX(hover, labels.length, box) + groupWidth / 2) / width) * 100}%` }}
              role="status"
            >
              <span className="fmdqui-chart__tooltip-title">{labels[hover]}</span>
              {shown.map((s, si) => (
                <span key={s.name} className="fmdqui-chart__tooltip-row">
                  <span className="fmdqui-chart__tooltip-dot" style={{ backgroundColor: colors[si] }} />
                  <span className="fmdqui-chart__tooltip-name">{s.name}</span>
                  <span className="fmdqui-chart__tooltip-value">
                    {`${Math.round(columns[hover][si])}%`}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </ChartShell>
    );
  }
);

StackedBarChart.displayName = 'StackedBarChart';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — LegendValues
   Figma: Legend & Values (6248:37098) — 8 variants (Direction × Quantity).
   A 4px colour bar, then the label above (Vertical) or beside (Horizontal)
   a large figure with a muted unit suffix.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface LegendValuesItem {
  name: string;
  value: number | string;
  unit?: string;
  color: string;
}

export interface LegendValuesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma `Direction` variant — each item's internal layout */
  direction?: LegendValuesDirection;
  items: LegendValuesItem[];
}

export const LegendValues: React.FC<LegendValuesProps> = ({
  direction = 'Vertical',
  items,
  className,
  ...rest
}) => (
  <div
    className={cx('fmdqui-chart-values', `fmdqui-chart-values--${direction.toLowerCase()}`, className)}
    {...rest}
  >
    {items.map((it, i) => (
      <div key={`${it.name}-${i}`} className="fmdqui-chart-values__item">
        <span className="fmdqui-chart-values__bar" style={{ backgroundColor: it.color }} />
        <div className="fmdqui-chart-values__body">
          <span className="fmdqui-chart-values__label">{it.name}</span>
          <span className="fmdqui-chart-values__figure">
            {it.value}
            <span className="fmdqui-chart-values__unit">{it.unit ?? '%'}</span>
          </span>
        </div>
      </div>
    ))}
  </div>
);

LegendValues.displayName = 'LegendValues';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — PieChart / DonutChart
   Figma: Pie Chart (6252:41592, 14 variants) and Donut Chart (6252:41600,
   7 variants). Both are 200×200, start at 12 o'clock and sweep clockwise on
   the primary ramp used as a sequential scale. The donut's inner radius is
   0.8 of the outer, giving Figma's thin ring.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  slices?: PieSlice[];
  /** Figma `Quantity` variant — convenience for trimming `slices` */
  quantity?: number;
  /** Figma `Text` variant — percentage labels inside each slice */
  showText?: boolean;
  /** 0 for a pie; Figma's donut uses 0.8 */
  innerRadius?: number;
  size?: number;
  showLegend?: boolean;
  legendOrientation?: LegendOrientation;
  showTable?: boolean;
  interactive?: boolean;
  palette?: string[];
}

export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      slices = DEMO_PIE,
      quantity,
      showText = false,
      innerRadius = 0,
      size = 200,
      showLegend = true,
      legendOrientation = 'Horizontal',
      showTable = false,
      interactive = true,
      palette,
      className,
      ...rest
    },
    ref
  ) => {
    const shown = quantity ? slices.slice(0, quantity) : slices;
    const slots = pieSlots(shown.length);
    const colors = shown.map((s, i) => s.color ?? (palette ?? PIE_PALETTE)[slots[i]]);
    const total = shown.reduce((a, s) => a + s.value, 0) || 1;
    const [hover, setHover] = useState<number | null>(null);
    const titleId = useId();
    const cxp = size / 2;

    // Cumulative offsets without mutating across the map — the React Compiler
    // rejects a reassigned accumulator here.
    const arcs = shown.map((s, i) => {
      const before = shown.slice(0, i).reduce((a, x) => a + x.value, 0);
      return {
        start: before / total,
        end: (before + s.value) / total,
        pct: (s.value / total) * 100,
      };
    });

    return (
      <ChartShell
        className={className}
        showTable={showTable}
        legend={showLegend ? (
          <ChartLegend
            orientation={legendOrientation}
            items={shown.map((s, i) => ({ name: s.name, color: colors[i] }))}
          />
        ) : null}
        table={
          <DataTable
            labels={shown.map((s) => s.name)}
            series={[{ name: 'Value', data: shown.map((s) => s.value) }]}
            colors={colors}
          />
        }
      >
        <div ref={ref} className="fmdqui-chart__plot fmdqui-chart__plot--radial" {...rest}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            className="fmdqui-chart__svg fmdqui-chart__svg--radial"
            role="img"
            aria-labelledby={titleId}
          >
            <title id={titleId}>
              {`${innerRadius > 0 ? 'Donut' : 'Pie'} chart: ${shown
                .map((s, i) => `${s.name} ${Math.round(arcs[i].pct)}%`)
                .join(', ')}`}
            </title>
            {arcs.map((a, i) => (
              <path
                key={shown[i].name}
                d={arcPath(cxp, cxp, cxp, a.start, a.end, innerRadius)}
                fill={colors[i]}
                className={cx('fmdqui-chart__slice', hover !== null && hover !== i && 'fmdqui-chart__slice--dim')}
                onMouseEnter={() => interactive && setHover(i)}
                onMouseLeave={() => interactive && setHover(null)}
              />
            ))}
            {showText && arcs.map((a, i) => {
              const p = arcCentroid(cxp, cxp, cxp, a.start, a.end, innerRadius);
              return (
                <text
                  key={`t-${shown[i].name}`}
                  x={p.x} y={p.y}
                  className="fmdqui-chart__slice-label"
                  fill={pieLabelColor(slots[i])}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {`${Math.round(a.pct)}%`}
                </text>
              );
            })}
          </svg>

          {interactive && hover !== null && (
            <div className="fmdqui-chart__tooltip fmdqui-chart__tooltip--radial" role="status">
              <span className="fmdqui-chart__tooltip-row">
                <span className="fmdqui-chart__tooltip-dot" style={{ backgroundColor: colors[hover] }} />
                <span className="fmdqui-chart__tooltip-name">{shown[hover].name}</span>
                <span className="fmdqui-chart__tooltip-value">
                  {`${Math.round(arcs[hover].pct)}%`}
                </span>
              </span>
            </div>
          )}
        </div>
      </ChartShell>
    );
  }
);

PieChart.displayName = 'PieChart';

/** Figma's Donut Chart is the pie with an 0.8 inner radius. */
export const DonutChart = forwardRef<HTMLDivElement, Omit<PieChartProps, 'innerRadius'> & { innerRadius?: number }>(
  ({ innerRadius = 0.8, ...rest }, ref) => <PieChart ref={ref} innerRadius={innerRadius} {...rest} />
);

DonutChart.displayName = 'DonutChart';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — RadarChart
   Figma: Radar Chart (6256:41865) — 16 variants
   Quantity (5/6/7/12 axes) × Chart type (Outline/Accent) × Background (Outline/Fill)

     Background=Fill     alternating chart-band / white rings, neutral-200 spokes
     Background=Outline  no ring fill, neutral-400 spokes
     Chart type=Accent   series area filled at 24% opacity
     Chart type=Outline  stroke only
   Series stroke 2px; 6px points with a 1px white ring.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series?: ChartSeries[];
  /** Axis labels. Figma repeats "Category". */
  axes?: string[];
  /** Figma `Chart type` variant */
  chartType?: RadarChartType;
  /** Figma `Background` variant */
  background?: RadarBackground;
  /** Number of concentric rings. Figma draws 5. */
  rings?: number;
  /** Show the numeric scale up the first spoke */
  showScale?: boolean;
  size?: number;
  max?: number;
  showLegend?: boolean;
  legendOrientation?: LegendOrientation;
  showTable?: boolean;
  interactive?: boolean;
  palette?: string[];
}

export const RadarChart = forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      series = DEMO_RADAR,
      axes,
      chartType = 'Outline',
      background = 'Outline',
      rings = 5,
      showScale = true,
      size = 360,
      max,
      showLegend = true,
      legendOrientation = 'Horizontal',
      showTable = false,
      interactive = true,
      palette = CHART_PALETTE,
      className,
      ...rest
    },
    ref
  ) => {
    const axisCount = series[0]?.data.length ?? 6;
    const labels = axes ?? Array.from({ length: axisCount }, () => 'Category');
    const peak = max ?? niceMax(series.flatMap((s) => s.data), 35);
    const colors = series.map((s, i) => s.color ?? palette[i % palette.length]);
    const [hover, setHover] = useState<number | null>(null);
    const titleId = useId();
    // Leave room for the category labels, which anchor outward from the
    // outermost ring — too little and they overflow the viewBox.
    const pad = 76;
    const c = size / 2;
    const r = c - pad;

    return (
      <ChartShell
        className={className}
        showTable={showTable}
        legend={showLegend && series.length > 1 ? (
          <ChartLegend
            orientation={legendOrientation}
            items={series.map((s, i) => ({ name: s.name, color: colors[i] }))}
          />
        ) : null}
        table={<DataTable labels={labels} series={series} colors={colors} />}
      >
        <div ref={ref} className="fmdqui-chart__plot fmdqui-chart__plot--radial" {...rest}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            className="fmdqui-chart__svg fmdqui-chart__svg--radial"
            role="img"
            aria-labelledby={titleId}
          >
            <title id={titleId}>
              {`Radar chart over ${axisCount} axes: ${series.map((s) => s.name).join(', ')}`}
            </title>

            {/* Rings, outermost first so the fills stack correctly */}
            <g aria-hidden="true">
              {Array.from({ length: rings }, (_, i) => rings - i).map((step) => (
                <path
                  key={step}
                  d={radarRing(c, c, r, axisCount, step / rings)}
                  className={cx(
                    'fmdqui-chart__radar-ring',
                    background === 'Fill' && (step % 2 === 1
                      ? 'fmdqui-chart__radar-ring--band'
                      : 'fmdqui-chart__radar-ring--plain')
                  )}
                />
              ))}
              {Array.from({ length: axisCount }, (_, i) => {
                const p = radarPoint(c, c, r, i, axisCount, 1);
                return (
                  <line
                    key={i}
                    x1={c} y1={c} x2={p.x} y2={p.y}
                    className={cx(
                      'fmdqui-chart__radar-spoke',
                      background === 'Fill' && 'fmdqui-chart__radar-spoke--muted'
                    )}
                  />
                );
              })}
            </g>

            {/* Scale up the first spoke */}
            {showScale && Array.from({ length: rings }, (_, i) => {
              const step = i + 1;
              const p = radarPoint(c, c, r, 0, axisCount, step / rings);
              return (
                <text
                  key={step}
                  x={p.x + 8} y={p.y}
                  className="fmdqui-chart__radar-scale"
                  dominantBaseline="middle"
                >
                  {Math.round((peak / rings) * step)}
                </text>
              );
            })}

            {/* Series */}
            {series.map((s, si) => (
              <g
                key={s.name}
                onMouseEnter={() => interactive && setHover(si)}
                onMouseLeave={() => interactive && setHover(null)}
                className={cx(hover !== null && hover !== si && 'fmdqui-chart__radar-series--dim')}
              >
                <path
                  d={radarSeriesPath(c, c, r, s.data, peak)}
                  fill={chartType === 'Accent' ? colors[si] : 'none'}
                  fillOpacity={chartType === 'Accent' ? 0.24 : 0}
                  stroke={colors[si]}
                  className="fmdqui-chart__radar-area"
                />
                {s.data.map((v, i) => {
                  const p = radarPoint(c, c, r, i, s.data.length, peak > 0 ? v / peak : 0);
                  return (
                    <circle key={i} cx={p.x} cy={p.y} r={3} fill={colors[si]} className="fmdqui-chart__radar-point" />
                  );
                })}
              </g>
            ))}

            {/* Category labels */}
            {labels.map((l, i) => {
              const p = radarPoint(c, c, r + 20, i, axisCount, 1);
              return (
                <text
                  key={`${l}-${i}`}
                  x={p.x} y={p.y}
                  className="fmdqui-chart__radar-label"
                  textAnchor={Math.abs(p.x - c) < 4 ? 'middle' : p.x > c ? 'start' : 'end'}
                  dominantBaseline="middle"
                >
                  {l}
                </text>
              );
            })}
          </svg>
        </div>
      </ChartShell>
    );
  }
);

RadarChart.displayName = 'RadarChart';
