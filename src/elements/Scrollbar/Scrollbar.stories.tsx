import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Scrollbar, type ScrollbarSize, type ScrollbarState, type ScrollbarTheme } from './Scrollbar';

const meta: Meta<typeof Scrollbar> = {
  title: 'Elements/📜 Scrollbar',
  component: Scrollbar,
  parameters: {
    docs: {
      description: {
        component:
          'Scrollbar primitive matching Figma component set `11163:1003629` (`      ✤  Scrollbar `). Supports horizontal and vertical orientations, sm (6px) and md (8px) sizes, interaction states (default, hover, dragging), and light/dark themes. Can be used standalone or synced bidirectionally to any scrolling DOM element.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of scrolling',
      table: { category: 'Variant' },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Thickness: sm (6px, r=3) or md (8px, r=4)',
      table: { category: 'Variant' },
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'dragging'],
      description: 'Interactive visual state',
      table: { category: 'State' },
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Surface theme',
      table: { category: 'Variant' },
    },
    hasTrack: {
      control: 'boolean',
      description: 'Show/hide track background fill',
      table: { category: 'Boolean Controls' },
    },
    position: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Normalized scroll progress (0 to 1)',
      table: { category: 'Controls' },
    },
    thumbLength: {
      control: 'text',
      description: 'Length of thumb in px or %',
      table: { category: 'Controls' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Scrollbar>;

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    size: 'sm',
    theme: 'light',
    hasTrack: true,
    position: 0.25,
    thumbLength: '40%',
  },
  render: (args) => (
    <div
      style={{
        padding: '32px',
        backgroundColor: args.theme === 'dark' ? '#001633' : '#FFFFFF',
        width: args.orientation === 'horizontal' ? '360px' : 'auto',
        height: args.orientation === 'vertical' ? '300px' : 'auto',
        borderRadius: '8px',
        border: '1px solid var(--color-neutral-200)',
      }}
    >
      <Scrollbar {...args} />
    </div>
  ),
};

// ─── 24 Variants Matrix (2 orientations × 2 sizes × 3 states × 2 themes) ────

export const AllVariantsMatrix: Story = {
  name: 'All Figma Variants (24 Variants)',
  render: () => {
    const sizes: ScrollbarSize[] = ['sm', 'md'];
    const states: ScrollbarState[] = ['default', 'hover', 'dragging'];
    const themes: ScrollbarTheme[] = ['light', 'dark'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-primary)' }}>
            Scrollbar Master Matrix (Figma 11163:1003629)
          </h3>
          <p style={{ margin: 0, color: 'var(--color-neutral-500)', fontSize: '14px' }}>
            24 variants: 2 orientations × 2 sizes (sm: 6px, md: 8px) × 3 states × 2 themes.
          </p>
        </div>

        {themes.map((theme) => {
          const isDark = theme === 'dark';
          return (
            <div
              key={theme}
              style={{
                backgroundColor: isDark ? '#001633' : '#FFFFFF',
                padding: '24px',
                borderRadius: '12px',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--color-neutral-200)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: isDark ? 'var(--color-neutral-white)' : 'var(--color-neutral-900)',
                }}
              >
                Theme: {theme}
              </h4>

              {/* Horizontal rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--color-neutral-600)' }}>
                  Horizontal (sm: 6px & md: 8px)
                </span>
                {sizes.map((size) => (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-neutral-500)' }}>
                      size={size}
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      {states.map((st) => (
                        <div key={st} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--color-neutral-400)' }}>
                            state={st}
                          </span>
                          <div style={{ width: '220px' }}>
                            <Scrollbar
                              orientation="horizontal"
                              size={size}
                              state={st}
                              theme={theme}
                              thumbLength={120}
                              position={st === 'default' ? 0.1 : st === 'hover' ? 0.35 : 0.6}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Vertical columns */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--color-neutral-600)' }}>
                  Vertical (sm: 6px & md: 8px)
                </span>
                <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
                  {sizes.map((size) => (
                    <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-neutral-500)' }}>
                        size={size}
                      </span>
                      <div style={{ display: 'flex', gap: '32px' }}>
                        {states.map((st) => (
                          <div key={st} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--color-neutral-400)' }}>
                              {st}
                            </span>
                            <div style={{ height: '180px' }}>
                              <Scrollbar
                                orientation="vertical"
                                size={size}
                                state={st}
                                theme={theme}
                                thumbLength={80}
                                position={st === 'default' ? 0.1 : st === 'hover' ? 0.4 : 0.75}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

// ─── Connected Wide Table Demo (1:1 with Figma CASS 2 Table) ─────────────────

export const ConnectedTableScroll: Story = {
  name: 'Demo / Connected Table Scrollbar (CASS 2)',
  render: () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', padding: '24px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-primary)' }}>
            Wide Data Table with Custom Scrollbar
          </h3>
          <p style={{ margin: 0, color: 'var(--color-neutral-500)', fontSize: '14px' }}>
            Scroll the table horizontally or drag the scrollbar below — both stay in 1:1 synchronization.
          </p>
        </div>

        <div style={{ border: '1px solid var(--color-neutral-200)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
          {/* Scrollable table container */}
          <div
            ref={tableContainerRef}
            style={{
              overflowX: 'auto',
              width: '100%',
              scrollbarWidth: 'none', // hide native scrollbar to show custom one
            }}
          >
            <table style={{ width: '1200px', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'var(--font-family-primary)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-neutral-50)', borderBottom: '1px solid var(--color-neutral-200)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Security</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>ISIN</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Tenor</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Maturity</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Bid Yield (%)</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Offer Yield (%)</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Mid Price (₦)</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['NTB 05/05/2027', 'NG000000101', '182 Days', '05-May-2027', '21.45', '21.30', '89.42', 'Active'],
                  ['NTB 12/08/2027', 'NG000000102', '270 Days', '12-Aug-2027', '22.10', '21.95', '85.20', 'Active'],
                  ['FGN 14.50 2029', 'NG000000201', '3 Years', '15-Jul-2029', '19.80', '19.65', '94.80', 'Active'],
                  ['FGN 16.28 2032', 'NG000000202', '6 Years', '22-Mar-2032', '18.90', '18.75', '98.50', 'Active'],
                  ['FGN 14.70 2033', 'NG000000203', '7 Years', '21-Jun-2033', '18.75', '18.60', '97.20', 'Active'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Figma Scrollbar row matching Figma 11163:1003658 */}
          <div style={{ padding: '8px 12px', borderTop: '1px solid var(--color-neutral-200)', backgroundColor: 'var(--color-neutral-white)' }}>
            <Scrollbar
              targetRef={tableContainerRef}
              orientation="horizontal"
              size="sm"
              theme="light"
              hasTrack={true}
            />
          </div>
        </div>
      </div>
    );
  },
};
