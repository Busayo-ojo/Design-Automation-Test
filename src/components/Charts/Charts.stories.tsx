import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../elements/Button';
import {
  LineChart, BarChart, StackedBarChart, ChartLegend,
  PieChart, DonutChart, RadarChart, LegendValues,
} from './Charts';
import {
  LineChartLegendItem,
  LineChartNowMarker,
  LineChartThreshold,
  MultiSeriesLineChart,
  type MultiSeriesLineChartProps,
} from './MultiSeriesLineChart';
import {
  LINE_CHART_TYPES,
  SERIES_QUANTITIES,
  CHART_PALETTE,
  CHART_PALETTE_ACCESSIBLE,
  BAR_PALETTE,
  DEMO_SERIES,
  DEMO_MULTI_SERIES,
  generateRandomMultiSeries,
  type LineChartType,
  type MultiSeriesColor,
  type MultiSeriesPattern,
} from './chartUtils';

/* ───────────────────────────────────────────────────────────────────────────
   Figma: page "✤ Charts ⚜️"
     Line Chart           6257:42734 — 12 variants (Type × Quantity)
     Basic Bar Chart      6306:4216  — 3 variants (Quantity)
     Percent Stacked Bar  6287:6146  — 3 variants (Quantity)
   Shared elements: Legends 6240:33124, y axis 6240:33372, X-axis 6240:33501
   ─────────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof LineChart> = {
  title: 'Components/📈 Charts',
  component: LineChart,
  parameters: {
    docs: {
      description: {
        component:
          'Hand-built SVG charts — no charting dependency, matching how the rest of this system is built. Per the Figma documentation frame, a line chart "is ideal for displaying trends and changes over time with continuous, sequential data", a bar chart for "comparing values between different categories", and a percent stacked bar for "the composition of various categories in a whole".',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: LINE_CHART_TYPES,
      description: 'Figma `Type` variant — how points are joined',
      table: { category: 'Variant' },
    },
    quantity: {
      control: 'select',
      options: SERIES_QUANTITIES,
      description: 'Figma `Quantity` variant — number of series',
      table: { category: 'Variant' },
    },
    showLegend: { control: 'boolean', description: 'Figma `Show Legends`', table: { category: 'Boolean Controls' } },
    legendOrientation: { control: 'radio', options: ['Horizontal', 'Vertical'], table: { category: 'Variant' } },
    gridType: { control: 'radio', options: ['solid', 'broken'], description: 'Figma y-axis `Type`', table: { category: 'Variant' } },
    showYLabels: { control: 'boolean', description: 'Figma y-axis `Label`', table: { category: 'Boolean Controls' } },
    interactive: { control: 'boolean', description: 'Crosshair + tooltip on hover', table: { category: 'Boolean Controls' } },
    showTable: { control: 'boolean', description: 'Accessible table fallback', table: { category: 'Boolean Controls' } },
    width: { control: { type: 'range', min: 280, max: 900 }, table: { category: 'Layout' } },
    height: { control: { type: 'range', min: 140, max: 420 }, table: { category: 'Layout' } },
    series: { control: false, table: { category: 'Content' } },
    labels: { control: false, table: { category: 'Content' } },
    palette: { control: false, table: { category: 'Content' } },
  },
};
export default meta;

// ─── Local presentation helpers (stories only) ─────────────────────────────

const Wrap: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title, note, children,
}) => (
  <section style={{ marginBottom: 48, fontFamily: 'DM Sans, sans-serif' }}>
    <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: 'var(--color-neutral-900)' }}>{title}</h3>
    {note && <p style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-500)' }}>{note}</p>}
    <div style={{ marginTop: 16 }}>{children}</div>
  </section>
);

const Cell: React.FC<{ label: string; children: React.ReactNode; width?: number }> = ({
  label, children, width = 420,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width }}>
    <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{label}</code>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   1 · ELEMENTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const ElementsLegend: StoryObj = {
  name: 'Elements / 🏷️ Legend — both Figma orientations',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Legends` (COMPONENT_SET 6240:33124). An 8px dot with a 14px neutral-500 label. Note the base Figma component carries placeholder colours (teal, pink, brown) that the real charts override — the palette below is the one the charts actually use.',
      },
    },
  },
  render: () => (
    <Wrap title="Legends" note="Figma 6240:33124 · 2 variants (Orientation)">
      <div style={{ display: 'flex', gap: 64 }}>
        <Cell label="Orientation=Horizontal" width={320}>
          <ChartLegend
            orientation="Horizontal"
            items={DEMO_SERIES.map((s, i) => ({ name: s.name, color: CHART_PALETTE[i] }))}
          />
        </Cell>
        <Cell label="Orientation=Vertical" width={200}>
          <ChartLegend
            orientation="Vertical"
            items={DEMO_SERIES.map((s, i) => ({ name: s.name, color: CHART_PALETTE[i] }))}
          />
        </Cell>
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   2 · LINE CHART — all 12 Figma variants
   ═══════════════════════════════════════════════════════════════════════════ */

export const LineAllVariants: StoryObj = {
  name: 'Line / 📉 All 12 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Line Chart` (COMPONENT_SET 6257:42734) — the full `Type` × `Quantity` matrix. The four types are four ways of joining the same points: **Basic** straight segments through every point, **Slope** a single line from first to last, **Smooth** a gentle monotone curve, and **Wavy** a looser spline that overshoots into visible waves.',
      },
    },
  },
  render: () => (
    <div>
      {LINE_CHART_TYPES.map((t) => (
        <Wrap key={t} title={`Type=${t}`} note="Quantity = Three · Two · One">
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {SERIES_QUANTITIES.slice().reverse().map((q) => (
              <Cell key={q} label={`Quantity=${q}`} width={420}>
                <LineChart type={t as LineChartType} quantity={q} width={420} height={200} interactive={false} />
              </Cell>
            ))}
          </div>
        </Wrap>
      ))}
    </div>
  ),
};

export const LineAxisOptions: StoryObj = {
  name: 'Line / ⚙️ Axis & legend options',
  parameters: {
    docs: {
      description: {
        story:
          'The shared Figma elements in their variants: the y-axis rule as `solid` or `broken` (dashed 4/4), with or without value labels, and the legend horizontal or vertical.',
      },
    },
  },
  render: () => (
    <Wrap title="Axis & legend" note="Figma y axis 6240:33372 · X-axis 6240:33501 · Legends 6240:33124">
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <Cell label="gridType=broken (default)"><LineChart quantity="Two" width={420} height={200} interactive={false} /></Cell>
        <Cell label="gridType=solid"><LineChart quantity="Two" gridType="solid" width={420} height={200} interactive={false} /></Cell>
        <Cell label="showYLabels=false"><LineChart quantity="Two" showYLabels={false} width={420} height={200} interactive={false} /></Cell>
        <Cell label="showLegend=false"><LineChart quantity="Two" showLegend={false} width={420} height={200} interactive={false} /></Cell>
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   3 · BAR CHARTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const BarAllVariants: StoryObj = {
  name: 'Bar / 📊 Basic Bar — all 3 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Basic Bar Chart` (COMPONENT_SET 6306:4216). Bars are 13px wide with 4px top-rounded ends anchored to the baseline, on a blue sequential ramp rather than the categorical palette — the right choice when every bar measures the same quantity. A 2px surface gap separates adjacent bars.',
      },
    },
  },
  render: () => (
    <Wrap title="Basic Bar Chart" note="Figma 6306:4216 · 3 variants · 13px bars, 4px rounded ends">
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {[3, 2, 1].map((q) => (
          <Cell key={q} label={`Quantity=${q}`} width={460}>
            <BarChart quantity={q as 1 | 2 | 3} width={460} height={240} interactive={false} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

export const StackedAllVariants: StoryObj = {
  name: 'Bar / 🧱 Percent Stacked — all 3 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Percent Stacked Bar Chart` (COMPONENT_SET 6287:6146). Every column is normalised to 100%, so the y-axis is fixed at 0–100. Only the topmost segment carries the rounded data-end, and a 2px gap separates segments so they stay readable.',
      },
    },
  },
  render: () => (
    <Wrap title="Percent Stacked Bar Chart" note="Figma 6287:6146 · 3 variants · columns total 100%">
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {[4, 3, 2].map((q) => (
          <Cell key={q} label={`Quantity=${q}`} width={460}>
            <StackedBarChart quantity={q as 2 | 3 | 4} width={460} height={240} interactive={false} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   4 · INTERACTION & ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

export const Interactive: StoryObj = {
  name: 'Interactive / 🎯 Hover',
  parameters: {
    docs: {
      description: {
        story:
          'Hover anywhere across the line chart for a crosshair and a tooltip reading every series at that point; hover a bar group for its own tooltip, with the other groups receding rather than recolouring. Shipped on by default — an SVG chart in a browser is interactive, so it should behave like it.',
      },
    },
  },
  render: () => (
    <Wrap title="Hover layer" note="Crosshair + tooltip on lines · per-group tooltip on bars">
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        <Cell label="LineChart (move across the plot)" width={460}>
          <LineChart type="Smooth" quantity="Three" width={460} height={230} />
        </Cell>
        <Cell label="BarChart (hover a group)" width={460}>
          <BarChart width={460} height={230} />
        </Cell>
      </div>
    </Wrap>
  ),
};

export const PaletteAndAccessibility: StoryObj = {
  name: 'Accessibility / 🎨 Palette comparison',
  parameters: {
    docs: {
      description: {
        story:
          "Figma's categorical palette does not pass the colour validator. Slots 2↔3 (amber ↔ orange) measure ΔE 13.7 for normal vision, below the 15 floor, and slots 3↔4 (orange ↔ green) measure ΔE 0.9 under deuteranopia — effectively identical for red-green colour blindness. Figma is the source of truth so it ships as the default and is not silently altered; `CHART_PALETTE_ACCESSIBLE` is a validated opt-in that passes both checks.",
      },
    },
  },
  render: () => (
    <div>
      <Wrap
        title="Figma palette (default)"
        note="slots 2↔3 ΔE 13.7 normal (below the 15 floor) · slots 3↔4 ΔE 0.9 deutan"
      >
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <Cell label="3 series" width={460}>
            <LineChart quantity="Three" width={460} height={210} interactive={false} />
          </Cell>
          <Cell label="legend swatches" width={300}>
            <ChartLegend
              orientation="Vertical"
              items={CHART_PALETTE.map((c, i) => ({ name: `Slot ${i + 1}`, color: c }))}
            />
          </Cell>
        </div>
      </Wrap>

      <Wrap
        title="CHART_PALETTE_ACCESSIBLE (opt-in)"
        note="worst adjacent pair ΔE 21.1 deutan / 25.7 normal — both pass"
      >
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <Cell label="3 series" width={460}>
            <LineChart quantity="Three" palette={CHART_PALETTE_ACCESSIBLE} width={460} height={210} interactive={false} />
          </Cell>
          <Cell label="legend swatches" width={300}>
            <ChartLegend
              orientation="Vertical"
              items={CHART_PALETTE_ACCESSIBLE.map((c, i) => ({ name: `Slot ${i + 1}`, color: c }))}
            />
          </Cell>
        </div>
      </Wrap>

      <Wrap
        title="Bar ramp (blue sequential)"
        note="CVD ΔE 15.3 · normal ΔE 15.9 — both pass. A sequential ramp is the right call for one measure."
      >
        <Cell label="BAR_PALETTE" width={300}>
          <ChartLegend
            orientation="Vertical"
            items={BAR_PALETTE.map((c, i) => ({ name: `Step ${i + 1}`, color: c }))}
          />
        </Cell>
      </Wrap>
    </div>
  ),
};

export const TableView: StoryObj = {
  name: 'Accessibility / 📋 Table view',
  parameters: {
    docs: {
      description: {
        story:
          'Every chart can render the underlying numbers as a table. This is the relief the contrast warning obligates — the amber and light-blue slots fall below 3:1 against the chart surface, so the values must be readable without relying on colour.',
      },
    },
  },
  render: () => (
    <Wrap title="showTable" note="Available on all three chart types">
      <div style={{ maxWidth: 560 }}>
        <LineChart quantity="Three" showTable width={540} height={220} interactive={false} />
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   5 · PLAYGROUND
   ═══════════════════════════════════════════════════════════════════════════ */

export const Playground: StoryObj<typeof LineChart> = {
  args: {
    type: 'Basic',
    quantity: 'Three',
    showLegend: true,
    legendOrientation: 'Horizontal',
    gridType: 'broken',
    showYLabels: true,
    interactive: true,
    showTable: false,
    width: 560,
    height: 240,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   6 · PIE / DONUT / RADAR
   ═══════════════════════════════════════════════════════════════════════════ */

const pieData = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    name: `Legend ${i + 1}`,
    value: [40, 30, 30, 22, 18, 14, 11, 9][i] ?? 10,
  }));

export const PieAllVariants: StoryObj = {
  name: 'Pie / 🥧 All 7 quantities × Text',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Pie Chart` (COMPONENT_SET 6252:41592) — 14 variants, `Quantity` 2–8 × `Text` Yes/No. Slices start at 12 o\'clock and sweep clockwise on the primary ramp used as a sequential scale. With `Text=Yes` the percentage sits in each slice, switching from dark ink on the pale steps to white on the saturated ones.',
      },
    },
  },
  render: () => (
    <div>
      <Wrap title="Text=No" note="Figma 6252:41592 · 200×200 · primary ramp 50→600">
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[2, 3, 4, 5, 6, 7, 8].map((q) => (
            <Cell key={q} label={`Quantity=${q}`} width={200}>
              <PieChart slices={pieData(q)} showLegend={false} interactive={false} />
            </Cell>
          ))}
        </div>
      </Wrap>
      <Wrap title="Text=Yes" note="percentage labels inside each slice">
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[2, 3, 4, 5, 6, 7, 8].map((q) => (
            <Cell key={q} label={`Quantity=${q}`} width={200}>
              <PieChart slices={pieData(q)} showText showLegend={false} interactive={false} />
            </Cell>
          ))}
        </div>
      </Wrap>
    </div>
  ),
};

export const DonutAllVariants: StoryObj = {
  name: 'Donut / 🍩 All 7 Figma quantities',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Donut Chart` (COMPONENT_SET 6252:41600) — the pie with an inner radius of 0.8, giving Figma\'s thin ring. Per the Figma documentation frame, donuts keep "a clear center, which can be used for additional information or labels".',
      },
    },
  },
  render: () => (
    <Wrap title="Donut Chart" note="Figma 6252:41600 · 7 variants · innerRadius 0.8">
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        {[2, 3, 4, 5, 6, 7, 8].map((q) => (
          <Cell key={q} label={`Quantity=${q}`} width={200}>
            <DonutChart slices={pieData(q)} showLegend={false} interactive={false} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

export const LegendValuesVariants: StoryObj = {
  name: 'Elements / 📐 Legend & Values',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Legend & Values` (COMPONENT_SET 6248:37098) — 8 variants. A 4px colour bar beside a label and a large figure with a muted unit. `Direction` controls each item\'s internal layout: **Vertical** stacks the label above the figure and lays items out in a row; **Horizontal** puts the label beside the figure and stacks the items.',
      },
    },
  },
  render: () => (
    <Wrap title="Legend & Values" note="Figma 6248:37098 · 4px bar · 20px Medium figure">
      <div style={{ display: 'flex', gap: 80, flexWrap: 'wrap' }}>
        <Cell label="Direction=Vertical" width={320}>
          <LegendValues
            direction="Vertical"
            items={[
              { name: 'Legend', value: 60, color: 'var(--color-primary-600)' },
              { name: 'Legend', value: 40, color: 'var(--color-primary-500)' },
            ]}
          />
        </Cell>
        <Cell label="Direction=Horizontal" width={260}>
          <LegendValues
            direction="Horizontal"
            items={[
              { name: 'Legend', value: 60, color: 'var(--color-primary-600)' },
              { name: 'Legend', value: 40, color: 'var(--color-primary-500)' },
            ]}
          />
        </Cell>
      </div>
    </Wrap>
  ),
};

export const DonutWithValues: StoryObj = {
  name: 'Donut / 🍩 With Legend & Values',
  parameters: {
    docs: {
      description: {
        story:
          'The composition Figma lays out on its Donut Charts frame — the ring beside the `Legend & Values` block, so each share is readable as a number rather than estimated from the arc.',
      },
    },
  },
  render: () => {
    const data = pieData(4);
    const total = data.reduce((a, d) => a + d.value, 0);
    return (
      <Wrap title="Donut + values" note="Figma 6252:41600 + 6248:37098">
        <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <DonutChart slices={data} showLegend={false} />
          <LegendValues
            direction="Horizontal"
            items={data.map((d, i) => ({
              name: d.name,
              value: Math.round((d.value / total) * 100),
              color: `var(--color-primary-${[600, 500, 400, 200][i] ?? 75})`,
            }))}
          />
        </div>
      </Wrap>
    );
  },
};

export const RadarAllVariants: StoryObj = {
  name: 'Radar / 🕸️ All 16 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Radar Chart` (COMPONENT_SET 6256:41865) — `Quantity` (5/6/7/12 axes) × `Chart type` (Outline/Accent) × `Background` (Outline/Fill). `Accent` fills each series area at 24% opacity; `Fill` alternates tinted and white rings and mutes the spokes to neutral-200.',
      },
    },
  },
  render: () => (
    <div>
      {([5, 6, 7, 12] as const).map((axes) => (
        <Wrap key={axes} title={`Quantity=${axes}`} note="Chart type × Background">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {(['Outline', 'Accent'] as const).map((ct) =>
              (['Outline', 'Fill'] as const).map((bg) => (
                <Cell key={`${ct}-${bg}`} label={`type=${ct}, bg=${bg}`} width={300}>
                  <RadarChart
                    chartType={ct}
                    background={bg}
                    size={300}
                    showLegend={false}
                    series={[
                      { name: 'Legend 1', data: Array.from({ length: axes }, (_, i) => 18 + ((i * 7) % 16)) },
                      { name: 'Legend 2', data: Array.from({ length: axes }, (_, i) => 12 + ((i * 11) % 18)) },
                    ]}
                  />
                </Cell>
              ))
            )}
          </div>
        </Wrap>
      ))}
    </div>
  ),
};

export const RadarInteractive: StoryObj = {
  name: 'Radar / 🎯 Interactive',
  parameters: {
    docs: {
      description: {
        story:
          'Hover a series to bring it forward — the others recede rather than recolour, so identity never shifts. Category labels sit outside the outermost ring.',
      },
    },
  },
  render: () => (
    <Wrap title="Radar" note="Figma 6256:41865 · 6 axes · Accent + Fill">
      <RadarChart
        chartType="Accent"
        background="Fill"
        size={400}
        axes={['Liquidity', 'Yield', 'Duration', 'Credit', 'Volume', 'Spread']}
      />
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   Multi-series Line Chart — Figma 11041:684273
   Legend item (11041:684142), Now marker (11041:684143), Threshold (11041:684146)
   ═══════════════════════════════════════════════════════════════════════════ */

export const MultiSeriesLegendItems: StoryObj = {
  name: 'Multi-series / 🏷️ Legend Item Matrix (48 Variants)',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 11041:684142 — 48 variants across 6 colors × 4 patterns (solid, dashed, dotted, dash-dot) × 2 states (selected, unselected). Composed of Checkbox + 20×12 Swatch + 12px label.',
      },
    },
  },
  render: () => {
    const colors: MultiSeriesColor[] = ['1', '2', '3', '4', '5', '6'];
    const patterns: MultiSeriesPattern[] = ['solid', 'dashed', 'dotted', 'dash-dot'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-primary)' }}>
            Line Chart / Legend Item Atom (Figma 11041:684142)
          </h3>
          <p style={{ margin: 0, color: 'var(--color-neutral-500)', fontSize: '14px' }}>
            48 variants: 6 colors × 4 patterns × 2 selected states (Yes/No).
          </p>
        </div>

        {patterns.map((pattern) => (
          <div key={pattern} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-neutral-500)' }}>
              Pattern: {pattern}
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-200)' }}>
              {colors.map((color) => (
                <div key={color} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <LineChartLegendItem
                    color={color}
                    pattern={pattern}
                    selected={true}
                    label={`Color ${color} · Selected`}
                  />
                  <LineChartLegendItem
                    color={color}
                    pattern={pattern}
                    selected={false}
                    label={`Color ${color} · Unselected`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const MultiSeriesAtoms: StoryObj = {
  name: 'Multi-series / 📐 Now Marker & Threshold Atoms',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 11041:684143 (Line Chart / Now marker) & Figma 11041:684146 (Line Chart / Threshold).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', maxWidth: '600px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Chart Atoms</h3>
        <p style={{ margin: 0, color: 'var(--color-neutral-500)', fontSize: '14px' }}>
          Standalone vertical and horizontal indicator components.
        </p>
      </div>

      <div style={{ position: 'relative', height: '140px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--color-neutral-200)' }}>
        <LineChartThreshold y={30} label="Alert at +25 bps" hasLabel={true} />
        <LineChartThreshold y={100} label="Alert at -25 bps" hasLabel={true} />
        <LineChartNowMarker x={180} height={120} label="Now" />
      </div>
    </div>
  ),
};

export const MultiSeriesDefault: StoryObj<MultiSeriesLineChartProps> = {
  name: 'Multi-series / 📊 Default Size (496px)',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 11041:684150 — interval=quarter-hour, size=default (496px). 17 CASS benchmark securities with fixed color/pattern assignments and interactive checkbox toggling.',
      },
    },
  },
  args: {
    type: 'Basic',
    interval: 'quarter-hour',
    size: 'default',
    hasLegend: true,
    hasThreshold: true,
    thresholdBps: 25,
    thresholdLabel: 'Alert at ±25 bps',
    nowIndex: 10,
  },
  render: (args) => (
    <Wrap title="Multi-series Line Chart" note="Figma 11041:684150 · Quarter-hour · Size Default (496px)">
      <MultiSeriesLineChart {...args} />
    </Wrap>
  ),
};

export const MultiSeriesWide: StoryObj<MultiSeriesLineChartProps> = {
  name: 'Multi-series / 🖥️ Wide Size (1062px)',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 11041:686956 — interval=quarter-hour, size=wide (1062px). Full-width desk monitor layout with 17 securities and alert thresholds.',
      },
    },
  },
  args: {
    type: 'Basic',
    interval: 'quarter-hour',
    size: 'wide',
    hasLegend: true,
    hasThreshold: true,
    thresholdBps: 25,
    thresholdLabel: 'Alert at ±25 bps',
    nowIndex: 10,
  },
  render: (args) => (
    <Wrap title="Multi-series Line Chart" note="Figma 11041:686956 · Quarter-hour · Size Wide (1062px)">
      <MultiSeriesLineChart {...args} />
    </Wrap>
  ),
};

export const MultiSeriesHourly: StoryObj<MultiSeriesLineChartProps> = {
  name: 'Multi-series / ⏱️ Hourly Interval',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 11041:684224 & 11041:687030 — interval=hourly, showing 10 AM, 11 AM, 12 PM, 1 PM, 2 PM ticks.',
      },
    },
  },
  args: {
    type: 'Basic',
    interval: 'hourly',
    size: 'default',
    hasLegend: true,
    hasThreshold: true,
    thresholdBps: 25,
    thresholdLabel: 'Alert at ±25 bps',
    nowIndex: 10,
  },
  render: (args) => (
    <Wrap title="Multi-series Line Chart" note="Figma 11041:684224 · Interval Hourly · Size Default (496px)">
      <MultiSeriesLineChart {...args} />
    </Wrap>
  ),
};

const MultiSeriesInteractiveStory: React.FC<MultiSeriesLineChartProps> = (args) => {
  const [dataSeed, setDataSeed] = useState(0);
  const [seriesData, setSeriesData] = useState(DEMO_MULTI_SERIES);

  const handleRandomize = useCallback(() => {
    setDataSeed((c) => c + 1);
    setSeriesData(generateRandomMultiSeries(17, DEMO_MULTI_SERIES));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Button variant="secondary" size="sm" onClick={handleRandomize}>
          🎲 Generate New Random Data
        </Button>
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-600)' }}>
          Every line strictly originates from <strong>0 bps</strong> at 10:00 (matching Figma), diverging intraday.
        </span>
      </div>
      <Wrap
        title="Multi-series Line Chart"
        note={`Figma 11041:684273 · Size: ${args.size ?? 'default'} · Interval: ${args.interval ?? 'quarter-hour'}`}
      >
        <MultiSeriesLineChart
          key={dataSeed}
          {...args}
          series={seriesData}
          showRandomizeButton={args.showRandomizeButton ?? true}
          onRandomize={handleRandomize}
        />
      </Wrap>
    </div>
  );
};

export const MultiSeriesInteractive: StoryObj<MultiSeriesLineChartProps> = {
  name: 'Multi-series / 🎯 Interactive Controls',
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive Storybook playground: controls panel allows dynamic changes to size (default 496px vs wide 1062px), interval (quarter-hour vs hourly), thresholds, legend visibility, and now marker index. Click "Generate New Random Data" to simulate intraday movements starting strictly from 0 bps.',
      },
    },
  },
  args: {
    interval: 'quarter-hour',
    size: 'default',
    hasLegend: true,
    hasThreshold: true,
    thresholdBps: 25,
    thresholdLabel: 'Alert at ±25 bps',
    nowIndex: 10,
    showRandomizeButton: true,
  },
  argTypes: {
    interval: {
      control: 'radio',
      options: ['quarter-hour', 'hourly'],
      description: 'Time axis ticks',
    },
    size: {
      control: 'radio',
      options: ['default', 'wide'],
      description: 'Chart frame width (default: 496px, wide: 1062px)',
    },
    hasLegend: {
      control: 'boolean',
      description: 'Show / hide the legend section',
    },
    hasThreshold: {
      control: 'boolean',
      description: 'Show / hide alert threshold lines',
    },
    thresholdBps: {
      control: { type: 'range', min: 5, max: 40, step: 5 },
      description: 'Alert threshold in basis points (±bps)',
    },
    thresholdLabel: {
      control: 'text',
      description: 'Label on the upper alert line',
    },
    nowIndex: {
      control: { type: 'range', min: 0, max: 16, step: 1 },
      description: 'Position index of the vertical Now marker (0 to 16)',
    },
    showRandomizeButton: {
      control: 'boolean',
      description: 'Show randomize button in legend actions',
    },
  },
  render: (args) => <MultiSeriesInteractiveStory {...args} />,
};

