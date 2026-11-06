/* ═══════════════════════════════════════════════════════════════════════════
   Charts — scales, path builders, palettes and Figma variant unions.

   Hand-built: this design system ships no charting dependency, and every other
   component here is plain React + CSS + tokens. Kept separate from Charts.tsx
   so that file only exports components (react-refresh/only-export-components).
   ═══════════════════════════════════════════════════════════════════════════ */

/** Figma `Line Chart` (6257:42734) → `Type` variant */
export type LineChartType = 'Basic' | 'Slope' | 'Smooth' | 'Wavy';
/** Figma `Line Chart` (6257:42734) → `Quantity` variant */
export type SeriesQuantity = 'One' | 'Two' | 'Three';
/** Figma `Legends` (6240:33124) → `Orientation` variant */
export type LegendOrientation = 'Vertical' | 'Horizontal';
/** Figma `y axis` (6240:33372) → `Type` variant */
export type GridLineType = 'solid' | 'broken';
/** Figma `X-axis` (6240:33501) → `type` variant */
export type XAxisScale = 'Year' | 'Month' | 'Week';

export const LINE_CHART_TYPES: LineChartType[] = ['Basic', 'Slope', 'Smooth', 'Wavy'];
export const SERIES_QUANTITIES: SeriesQuantity[] = ['One', 'Two', 'Three'];
export const QUANTITY_COUNT: Record<SeriesQuantity, number> = { One: 1, Two: 2, Three: 3 };

/* ─── Palettes ─────────────────────────────────────────────────────────────
   Read from Figma, in Figma's own order. The categorical palette is used by
   the line charts; the bar charts use a blue sequential ramp.

   ACCESSIBILITY NOTE — the categorical palette does not pass the colour
   validator. Measured with OKLab ΔE ×100 on a light surface:
     · slots 2↔3 (#F3A218 amber ↔ #F56630 orange) ΔE 13.7 normal vision,
       below the 15 floor — hard to separate even with full colour vision.
     · slots 3↔4 (#F56630 orange ↔ #60B527 green) ΔE 0.9 deutan — effectively
       identical for red-green colour blindness (~8% of men).
   Figma is the source of truth, so this palette ships as the default and is
   NOT silently altered. `CHART_PALETTE_ACCESSIBLE` below is a validated
   opt-in, and `ChartLegend` is always rendered so identity is never
   colour-alone. See the component docs for the full report.                */
export const CHART_PALETTE = [
  'var(--color-primary-400)',    // #1671D9
  'var(--color-secondary-400)',  // #F3A218
  'var(--color-warning-500)',    // #F56630
  'var(--color-chart-green)',    // #60B527
  'var(--color-chart-navy)',     // #022859
  'var(--color-chart-pink)',     // #EE46BC
];

/** Opt-in palette that passes CVD and normal-vision separation. */
export const CHART_PALETTE_ACCESSIBLE = [
  'var(--color-primary-400)',    // #1671D9
  'var(--color-secondary-400)',  // #F3A218
  'var(--color-error-500)',      // #D42620 — replaces the orange, ΔE 21.1 deutan
  'var(--color-success-400)',    // #0F973D
  'var(--color-primary-800)',    // #012657
  'var(--color-chart-pink)',     // #EE46BC
];

/** Figma's bar charts use a blue sequential ramp rather than categorical hues. */
export const BAR_PALETTE = [
  'var(--color-primary-600)',    // #034592
  'var(--color-primary-400)',    // #1671D9
  'var(--color-primary-200)',    // #80BBFF
  'var(--color-primary-75)',     // #C6DDF7
];

export interface ChartSeries {
  /** Legend label. Figma default: "Legend 1" … */
  name: string;
  /** Y values, one per x tick */
  data: number[];
  /** Overrides the palette slot */
  color?: string;
}

/* ─── Scales ─────────────────────────────────────────────────────────────── */

export interface PlotBox {
  width: number;
  height: number;
  padLeft: number;
  padRight: number;
  padTop: number;
  padBottom: number;
}

export const scaleX = (i: number, count: number, box: PlotBox) => {
  const inner = box.width - box.padLeft - box.padRight;
  return box.padLeft + (count <= 1 ? inner / 2 : (inner * i) / (count - 1));
};

export const scaleY = (v: number, max: number, box: PlotBox) => {
  const inner = box.height - box.padTop - box.padBottom;
  return box.padTop + inner - (max <= 0 ? 0 : (inner * v) / max);
};

/** Band scale for bar charts — returns the left edge of each group. */
export const bandX = (i: number, count: number, box: PlotBox) => {
  const inner = box.width - box.padLeft - box.padRight;
  const step = inner / count;
  return box.padLeft + step * i;
};

/**
 * Rounds a max value up to a clean axis top whose fifth is also round, so the
 * six gridlines land on readable values. A peak of 880 gives 1000 (steps of
 * 200), which is the axis Figma draws.
 */
export function niceMax(values: number[], fallback = 1000): number {
  const peak = Math.max(0, ...values);
  if (peak <= 0) return fallback;
  const mag = Math.pow(10, Math.floor(Math.log10(peak)));
  const candidates = [1, 2, 2.5, 5, 10].map((m) => m * mag);
  return candidates.find((c) => c >= peak) ?? mag * 10;
}

/* ─── Path builders ───────────────────────────────────────────────────────
   Figma's four `Type` variants are four ways of joining the same points:
     Basic   straight segments through every point (jagged)
     Slope   a single straight line from first to last
     Smooth  a gentle monotone curve
     Wavy    a looser cardinal spline that overshoots into visible waves
   ───────────────────────────────────────────────────────────────────────── */

export interface Point { x: number; y: number }

const linePath = (pts: Point[]) =>
  pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

/**
 * Cardinal spline through the points. `tension` 0 is nearly straight; Figma's
 * Smooth reads around 0.35 and Wavy around 0.8, where the curve overshoots.
 */
function splinePath(pts: Point[], tension: number): string {
  if (pts.length < 2) return linePath(pts);
  let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2;
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

export function buildLinePath(pts: Point[], type: LineChartType): string {
  if (pts.length === 0) return '';
  switch (type) {
    case 'Slope':
      return linePath([pts[0], pts[pts.length - 1]]);
    case 'Smooth':
      return splinePath(pts, 0.35);
    case 'Wavy':
      return splinePath(pts, 0.8);
    case 'Basic':
    default:
      return linePath(pts);
  }
}

/** A rect path with only the top two corners rounded — Figma's bar shape. */
export function topRoundedRect(x: number, y: number, w: number, h: number, r = 4): string {
  const rr = Math.min(r, w / 2, Math.max(0, h));
  if (h <= 0) return '';
  return [
    `M${x},${y + h}`,
    `L${x},${y + rr}`,
    `Q${x},${y} ${x + rr},${y}`,
    `L${x + w - rr},${y}`,
    `Q${x + w},${y} ${x + w},${y + rr}`,
    `L${x + w},${y + h}`,
    'Z',
  ].join(' ');
}

/** Figma's demo series — 12 points, 0–1000, used as the story defaults. */
export const DEMO_SERIES: ChartSeries[] = [
  { name: 'Legend 1', data: [120, 640, 180, 880, 300, 520, 460, 760, 540, 820, 600, 140] },
  { name: 'Legend 2', data: [420, 260, 180, 560, 300, 700, 380, 620, 480, 560, 740, 600] },
  { name: 'Legend 3', data: [560, 480, 140, 320, 260, 180, 300, 240, 220, 400, 180, 60] },
];

export const DEMO_BAR_SERIES: ChartSeries[] = [
  { name: 'Legend 1', data: [560, 300, 660, 450, 720, 380, 540] },
  { name: 'Legend 2', data: [720, 450, 240, 600, 380, 700, 300] },
  { name: 'Legend 3', data: [520, 350, 490, 280, 610, 440, 660] },
];

export const DEMO_STACK_SERIES: ChartSeries[] = [
  { name: 'Legend 1', data: [30, 45, 25, 50, 35, 40, 28] },
  { name: 'Legend 2', data: [25, 20, 35, 20, 30, 25, 32] },
  { name: 'Legend 3', data: [25, 20, 25, 18, 20, 20, 22] },
  { name: 'Legend 4', data: [20, 15, 15, 12, 15, 15, 18] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Multi-series Line Chart — Figma 11041:684273
   6 colors × 4 stroke patterns = 24 distinct series styles.
   ═══════════════════════════════════════════════════════════════════════════ */

export type MultiSeriesColor = '1' | '2' | '3' | '4' | '5' | '6';
export type MultiSeriesPattern = 'solid' | 'dashed' | 'dotted' | 'dash-dot';
export type MultiSeriesInterval = 'quarter-hour' | 'hourly';
export type MultiSeriesSize = 'default' | 'wide';

export const MULTI_SERIES_COLORS: Record<MultiSeriesColor, string> = {
  '1': '#6C299E', // Purple
  '2': '#ED2885', // Pink
  '3': '#3D89DF', // Blue
  '4': '#F56630', // Orange
  '5': '#A77FC5', // Lavender
  '6': 'var(--color-secondary-500, #CC9933)', // FMDQ Gold
};

export const MULTI_SERIES_PATTERNS: Record<MultiSeriesPattern, string> = {
  'solid': 'none',
  'dashed': '6,3',
  'dotted': '1.5,3',
  'dash-dot': '8,3,1.5,3',
};

export const MULTI_SERIES_QH_TICKS = [
  '10:00', '10:15', '10:30', '10:45',
  '11:00', '11:15', '11:30', '11:45',
  '12:00', '12:15', '12:30', '12:45',
  '13:00', '13:15', '13:30', '13:45',
  '14:00',
];

export const MULTI_SERIES_HOURLY_TICKS = [
  '10 AM', '11 AM', '12 PM', '1 PM', '2 PM',
];

export const MULTI_SERIES_Y_TICKS = [40, 20, 0, -20, -40];

export interface MultiSeriesItem {
  id: string;
  label: string;
  color: MultiSeriesColor;
  pattern: MultiSeriesPattern;
  selected?: boolean;
  data: number[]; // bps values (e.g. from -40 to +40)
}

/** 17 canonical securities from CASS benchmark monitoring — all starting strictly at 0 bps */
export const DEMO_MULTI_SERIES: MultiSeriesItem[] = [
  { id: 'sec-1', label: 'NTB 05/05/2027', color: '1', pattern: 'solid', selected: true, data: [0, 1, -2, -4, -4, -6, -8, -8, -8, -9, -9, -10, -11, -12, -14, -13, -15] },
  { id: 'sec-2', label: 'NTB 07/10/2027', color: '2', pattern: 'solid', selected: true, data: [0, 0, 0, 2, 5, 3, 9, 13, 20, 27, 29, 33, 34, 32, 35, 36, 38] },
  { id: 'sec-3', label: 'NTB 03/09/2027', color: '3', pattern: 'solid', selected: true, data: [0, 2, 4, 5, 9, 12, 12, 12, 15, 15, 15, 15, 16, 18, 20, 22, 24] },
  { id: 'sec-4', label: 'NTB 04/02/2027', color: '4', pattern: 'solid', selected: true, data: [0, -1, 1, 1, 2, 4, 1, 0, 0, 0, -1, -2, -3, -1, 0, -2, -3] },
  { id: 'sec-5', label: 'NTB 08/12/2027', color: '5', pattern: 'solid', selected: true, data: [0, -1, -1, 0, 1, 5, 6, 5, 6, 6, 6, 7, 8, 9, 11, 10, 12] },
  { id: 'sec-6', label: 'NTB 01/07/2027', color: '6', pattern: 'solid', selected: true, data: [0, 0, 0, -2, 0, -1, 0, 1, 1, 1, 0, 1, 2, 2, 3, 4, 5] },
  { id: 'sec-7', label: 'NTB 01/21/2027', color: '1', pattern: 'dashed', selected: true, data: [0, 1, 3, 3, 4, 5, 5, 6, 8, 11, 10, 13, 14, 15, 17, 18, 20] },
  { id: 'sec-8', label: 'NTB 02/04/2027', color: '2', pattern: 'dashed', selected: true, data: [0, -2, -4, -8, -6, -9, -9, -12, -13, -14, -17, -16, -18, -20, -22, -21, -23] },
  { id: 'sec-9', label: 'NTB 02/18/2027', color: '3', pattern: 'dashed', selected: true, data: [0, 3, 6, 9, 11, 11, 10, 9, 8, 7, 8, 8, 9, 10, 12, 11, 13] },
  { id: 'sec-10', label: 'NTB 03/04/2027', color: '4', pattern: 'dashed', selected: true, data: [0, 1, 2, 1, 4, 3, 1, 1, -3, -5, -10, -10, -12, -15, -18, -17, -20] },
  { id: 'sec-11', label: 'NTB 03/18/2027', color: '5', pattern: 'dashed', selected: true, data: [0, 2, 0, 3, 2, 4, 5, 6, 5, 4, 3, 4, 5, 6, 7, 8, 9] },
  { id: 'sec-12', label: 'NTB 04/15/2027', color: '6', pattern: 'dashed', selected: true, data: [0, 0, 0, 0, -1, -5, -8, -7, -10, -10, -9, -13, -15, -18, -20, -22, -24] },
  { id: 'sec-13', label: 'NTB 05/13/2027', color: '1', pattern: 'dotted', selected: true, data: [0, 3, 6, 10, 12, 12, 12, 14, 17, 18, 17, 18, 19, 21, 23, 25, 27] },
  { id: 'sec-14', label: 'NTB 06/10/2027', color: '2', pattern: 'dotted', selected: true, data: [0, 1, 2, 3, 5, 6, 8, 8, 8, 8, 11, 15, 16, 18, 19, 21, 23] },
  { id: 'sec-15', label: 'NTB 07/08/2027', color: '3', pattern: 'dotted', selected: true, data: [0, 2, 5, 3, 5, 3, 3, 4, 6, 8, 9, 7, 8, 9, 10, 12, 11] },
  { id: 'sec-16', label: 'NTB 09/09/2027', color: '4', pattern: 'dotted', selected: true, data: [0, -2, -1, -1, -1, -1, 0, -1, 0, -2, -3, -3, -4, -5, -6, -5, -7] },
  { id: 'sec-17', label: 'NTB 10/07/2027', color: '5', pattern: 'dotted', selected: true, data: [0, 0, -1, -4, -4, -5, -8, -7, -6, -5, -4, -3, -4, -5, -7, -8, -9] },
];

/**
 * Generates randomized multi-series data where EVERY series starts strictly at 0 bps.
 * Simulates realistic intraday basis point movements diverging from market open.
 */
export function generateRandomMultiSeries(
  length = 17,
  baseSecurities: MultiSeriesItem[] = DEMO_MULTI_SERIES
): MultiSeriesItem[] {
  return baseSecurities.map((sec, secIdx) => {
    const data: number[] = [0]; // Strictly starts at 0 bps
    let current = 0;
    // Varied drift trajectory per security
    const drift = ((secIdx % 5) - 2) * 0.4;
    const volatility = 1.2 + (secIdx % 3) * 0.5;

    for (let i = 1; i < length; i++) {
      const delta = (Math.random() - 0.48) * volatility * 2.2 + drift;
      current = Math.max(-38, Math.min(38, Number((current + delta).toFixed(1))));
      data.push(current);
    }

    return {
      ...sec,
      data,
    };
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   Pie / Donut / Radar — variant unions, palettes and geometry.
   Figma: Pie Chart 6252:41592 · Donut Chart 6252:41600 ·
          Legend & Values 6248:37098 · Radar Chart 6256:41865
   ═══════════════════════════════════════════════════════════════════════════ */

/** Figma `Pie Chart` → `Text` variant — show the percentage inside each slice */
export type PieTextVariant = 'Yes' | 'No';
/** Figma `Legend & Values` → `Direction` variant (the item's internal layout) */
export type LegendValuesDirection = 'Vertical' | 'Horizontal';
/** Figma `Radar Chart` → `Chart type` variant */
export type RadarChartType = 'Outline' | 'Accent';
/** Figma `Radar Chart` → `Background` variant */
export type RadarBackground = 'Outline' | 'Fill';

export const PIE_QUANTITIES = [2, 3, 4, 5, 6, 7, 8] as const;
export const RADAR_QUANTITIES = [5, 6, 7, 12] as const;

/**
 * Figma's pie and donut use the full primary ramp as a sequential scale,
 * light → dark. Eight steps for eight slices.
 */
export const PIE_PALETTE = [
  'var(--color-primary-50)',   // #E3EFFC
  'var(--color-primary-75)',   // #C6DDF7
  'var(--color-primary-100)',  // #B6D8FF
  'var(--color-primary-200)',  // #80BBFF
  'var(--color-primary-300)',  // #3D89DF
  'var(--color-primary-400)',  // #1671D9
  'var(--color-primary-500)',  // #0D5EBA
  'var(--color-primary-600)',  // #034592
];

/** Hex equivalents, used to pick a readable label colour per slice. */
const PIE_PALETTE_HEX = [
  '#E3EFFC', '#C6DDF7', '#B6D8FF', '#80BBFF',
  '#3D89DF', '#1671D9', '#0D5EBA', '#034592',
];

/**
 * Figma keeps the lightest step as the first slice and takes the darkest
 * steps for the rest, so a 3-slice pie reads 50 / 500 / 600. Exact for
 * 3 and 8 slices; one ramp step lighter than Figma on 2 and 4.
 */
export function pieSlots(n: number): number[] {
  if (n >= PIE_PALETTE.length) return PIE_PALETTE.map((_, i) => i);
  if (n <= 1) return [PIE_PALETTE.length - 1];
  const dark = Array.from({ length: n - 1 }, (_, i) => PIE_PALETTE.length - (n - 1) + i);
  return [0, ...dark];
}

/** Dark ink on the pale steps, white on the saturated ones — as Figma does. */
export function pieLabelColor(slot: number): string {
  const light = slot <= 3;
  return light ? 'var(--color-primary-600)' : 'var(--color-neutral-white)';
}

export const PIE_PALETTE_HEXES = PIE_PALETTE_HEX;

export interface PieSlice {
  name: string;
  value: number;
  color?: string;
}

/** Figma's demo slices total 100. */
export const DEMO_PIE: PieSlice[] = [
  { name: 'Legend 1', value: 40 },
  { name: 'Legend 2', value: 30 },
  { name: 'Legend 3', value: 30 },
];

export const DEMO_RADAR: ChartSeries[] = [
  { name: 'Legend 1', data: [30, 22, 28, 18, 26, 20] },
  { name: 'Legend 2', data: [16, 30, 12, 26, 14, 24] },
];

/**
 * SVG arc path for one slice. Figma starts every pie at 12 o'clock and sweeps
 * clockwise; `inner` is a fraction of the outer radius (0.8 for the donut).
 */
export function arcPath(
  cx: number, cy: number, r: number,
  startFrac: number, endFrac: number, inner = 0
): string {
  const TAU = Math.PI * 2;
  // -90° so the first slice begins at the top, matching Figma's arcData.
  const a0 = startFrac * TAU - Math.PI / 2;
  const a1 = endFrac * TAU - Math.PI / 2;
  const ri = r * inner;
  const large = endFrac - startFrac > 0.5 ? 1 : 0;

  // A full circle cannot be drawn with a single arc — use two halves.
  if (endFrac - startFrac >= 0.999) {
    const half = (a0 + a1) / 2;
    const ring = (rad: number) =>
      `M${cx + rad * Math.cos(a0)},${cy + rad * Math.sin(a0)}` +
      ` A${rad},${rad} 0 1 1 ${cx + rad * Math.cos(half)},${cy + rad * Math.sin(half)}` +
      ` A${rad},${rad} 0 1 1 ${cx + rad * Math.cos(a0)},${cy + rad * Math.sin(a0)}`;
    return inner > 0 ? `${ring(r)} ${ring(ri)}` : ring(r);
  }

  const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
  if (inner <= 0) {
    return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`;
  }
  const ix1 = cx + ri * Math.cos(a1), iy1 = cy + ri * Math.sin(a1);
  const ix0 = cx + ri * Math.cos(a0), iy0 = cy + ri * Math.sin(a0);
  return (
    `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1}` +
    ` L${ix1},${iy1} A${ri},${ri} 0 ${large} 0 ${ix0},${iy0} Z`
  );
}

/** Centroid of a slice, for placing its percentage label. */
export function arcCentroid(
  cx: number, cy: number, r: number,
  startFrac: number, endFrac: number, inner = 0
): Point {
  const mid = ((startFrac + endFrac) / 2) * Math.PI * 2 - Math.PI / 2;
  const rad = inner > 0 ? r * (1 + inner) / 2 : r * 0.62;
  return { x: cx + rad * Math.cos(mid), y: cy + rad * Math.sin(mid) };
}

/** Vertex of a radar axis at a given radius fraction. */
export function radarPoint(
  cx: number, cy: number, r: number, i: number, axes: number, frac = 1
): Point {
  const a = (i / axes) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + r * frac * Math.cos(a), y: cy + r * frac * Math.sin(a) };
}

/** Closed polygon through every axis at a fixed radius — one radar ring. */
export function radarRing(cx: number, cy: number, r: number, axes: number, frac: number): string {
  return Array.from({ length: axes }, (_, i) => {
    const p = radarPoint(cx, cy, r, i, axes, frac);
    return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(' ') + ' Z';
}

/** Closed polygon through one series' values. */
export function radarSeriesPath(
  cx: number, cy: number, r: number, values: number[], max: number
): string {
  return values.map((v, i) => {
    const p = radarPoint(cx, cy, r, i, values.length, max > 0 ? v / max : 0);
    return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(' ') + ' Z';
}
