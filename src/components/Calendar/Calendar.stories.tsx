import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Calendar,
  DateSelector,
  DateSelectorCell,
  DateSelectorHeader,
  DateGrid,
  MonthYearPanel,
  InteractiveDateSelector,
} from './Calendar';
import {
  buildMonthCells,
  type DateSelectorCellState,
  type DateSelectorCellPosition,
} from './dateUtils';

/* ───────────────────────────────────────────────────────────────────────────
   Figma: page "✤ Calendar & Date Selectors ⚜️" — file Hq7luvf787VJlCj1d3YJYw
   Stories follow Figma's own order: Elements → Nested → Full.
   ─────────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Calendar> = {
  title: 'Components/📅 Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          'Calendar and date selectors from the Figma "✤ Calendar & Date Selectors" page. Per the Figma documentation frame, these "allow users to choose dates and navigate through calendars… essential for tasks like booking appointments, scheduling events, or setting reminders." Built up from the Date cell and the Month & Year header, and composing the existing Button and Chip elements.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['date picker', 'date picker + last day', 'month & year picker'],
      description: 'Figma `Type` variant',
      table: { category: 'Variant' },
    },
    showCtas: {
      control: 'boolean',
      description: 'Figma `Show CTA(s)` boolean. Defaults off for the Last Day variant.',
      table: { category: 'Variant' },
    },
    year: { control: 'number', table: { category: 'Content' } },
    monthIndex: {
      control: { type: 'number', min: 0, max: 11 },
      description: '0-based month index (6 = July, Figma\'s reference month)',
      table: { category: 'Content' },
    },
    selected: { control: 'number', description: 'Day rendered `single selected`', table: { category: 'Content' } },
    today: { control: 'number', description: 'Day flagged with the Show Today dot', table: { category: 'Content' } },
    lastDayLabel: { control: 'text', table: { category: 'Content' } },
    cancelLabel: { control: 'text', table: { category: 'Content' } },
    doneLabel: { control: 'text', table: { category: 'Content' } },
    range: { control: false, table: { category: 'Content' } },
    statusDays: { control: false, table: { category: 'Content' } },
  },
};
export default meta;

// ─── Local presentation helpers (stories only) ─────────────────────────────

const Wrap: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title,
  note,
  children,
}) => (
  <section style={{ marginBottom: 48, fontFamily: 'DM Sans, sans-serif' }}>
    <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: 'var(--color-neutral-900)' }}>
      {title}
    </h3>
    {note && <p style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-500)' }}>{note}</p>}
    <div style={{ marginTop: 16 }}>{children}</div>
  </section>
);

const Cell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{label}</code>
    {children}
  </div>
);

/* The exact 10 variants that exist in the Figma set — this is a curated list,
   not the full State × Position cross product. */
const FIGMA_DATE_VARIANTS: Array<{
  state: DateSelectorCellState;
  position: DateSelectorCellPosition;
  day?: string;
}> = [
  { state: 'default', position: 'start' },
  { state: 'disabled', position: 'start' },
  { state: 'default', position: 'last day', day: 'Last Day' },
  { state: 'multi-selected', position: 'middle' },
  { state: 'single selected', position: 'start' },
  { state: 'single selected', position: 'last day', day: 'Last Day' },
  { state: 'multi-selected', position: 'end' },
  { state: 'multi-selected', position: 'end-mid' },
  { state: 'multi-selected', position: 'start' },
  { state: 'multi-selected', position: 'start-mid' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   1 · ELEMENTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const ElementsDateCell: StoryObj = {
  name: 'Elements / 🔢 Date Cell — all 10 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Date` (COMPONENT_SET 6335:28092). The set defines a curated 10 variants rather than the full State × Position cross product. The primary-400 ring appears only on the two range endpoints (`start`, `end`), never on the mid positions, and the text switches to SemiBold in both selected states.',
      },
    },
  },
  render: () => (
    <Wrap title="Date" note="Figma 6335:28092 · 10 variants · 38×38 (72×38 for Last Day) · r10">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 24, justifyContent: 'start' }}>
        {FIGMA_DATE_VARIANTS.map((v, i) => (
          <Cell key={i} label={`State=${v.state}, Position=${v.position}`}>
            <DateSelectorCell state={v.state} position={v.position} day={v.day ?? '4'} />
          </Cell>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>
          Boolean properties — Show Today / Show Status
        </code>
        <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
          <Cell label="Show Today">
            <DateSelectorCell showToday />
          </Cell>
          <Cell label="Show Status">
            <DateSelectorCell showStatus />
          </Cell>
          <Cell label="both">
            <DateSelectorCell showToday showStatus />
          </Cell>
        </div>
      </div>
    </Wrap>
  ),
};

export const ElementsHeader: StoryObj = {
  name: 'Elements / 🗓️ Month & Year Header',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Month & Year` (COMPONENT_SET 6335:28189). The chevron beside the label is `chevron-down` when collapsed and `chevron-up` when the picker is open — two different icons in Figma, not a rotation. The header and weekday rows are independently hidden across the three Calendar variants.',
      },
    },
  },
  render: () => (
    <Wrap title="Month & Year" note="Figma 6335:28189 · header + weekday row, each toggleable">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 300 }}>
        <Cell label="default (collapsed)">
          <DateSelectorHeader />
        </Cell>
        <Cell label="expanded — chevron-up">
          <DateSelectorHeader monthYear="March 2019" expanded />
        </Cell>
        <Cell label="showHeader=false (Last Day variant)">
          <DateSelectorHeader showHeader={false} />
        </Cell>
        <Cell label="showWeekdays=false (Month & Year variant)">
          <DateSelectorHeader monthYear="March 2019" expanded showWeekdays={false} />
        </Cell>
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   2 · NESTED
   ═══════════════════════════════════════════════════════════════════════════ */

export const NestedDateGrid: StoryObj = {
  name: 'Nested / ▦ Date Grid',
  parameters: {
    docs: {
      description: {
        story:
          'Figma\'s "Dates" frame — 7 columns laid out space-between with an 8px row gap. The column gap is 4px on the Date Picker and 0 on the Last Day variant. Leading and trailing days from the adjacent months are present but `disabled`, exactly as Figma draws July 2026.',
      },
    },
  },
  render: () => (
    <Wrap title="Date Grid" note="7 columns × 6 rows · July 2026 · row gap 8">
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <Cell label="plain">
          <div style={{ width: 300 }}>
            <DateGrid cells={buildMonthCells({ year: 2026, monthIndex: 6 })} />
          </div>
        </Cell>
        <Cell label="single selected + today + status">
          <div style={{ width: 300 }}>
            <DateGrid
              cells={buildMonthCells({
                year: 2026,
                monthIndex: 6,
                selected: 15,
                today: 9,
                statusDays: [3, 22],
              })}
            />
          </div>
        </Cell>
        <Cell label="multi-selected range 10–18">
          <div style={{ width: 300 }}>
            <DateGrid
              cells={buildMonthCells({ year: 2026, monthIndex: 6, range: { from: 10, to: 18 } })}
            />
          </div>
        </Cell>
      </div>
    </Wrap>
  ),
};

export const NestedMonthYearPanel: StoryObj = {
  name: 'Nested / 🔀 Month & Year Panel',
  parameters: {
    docs: {
      description: {
        story:
          'The Month and Year sections from Figma\'s `Type=Month & Year Picker`. Each is a space-between header (Bold 12px label + 16px nav chevrons) above a row of Chips. The pills are the existing Chip element — `Type=Input`, `state="default"` or `"focused"` — not a bespoke control.',
      },
    },
  },
  render: () => (
    <Wrap title="Month & Year Panel" note="Chips: Type=Input · default / focused · gap 8">
      <div style={{ width: 300 }}>
        <MonthYearPanel />
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   3 · FULL
   ═══════════════════════════════════════════════════════════════════════════ */

export const FullCalendarAllVariants: StoryObj = {
  name: 'Full / 📅 Calendar — all 3 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Calendar` (COMPONENT_SET 6335:28236). `Date Picker` shows the header, weekdays and a 7×6 grid with CTAs. `Date Picker + Last Day` hides the header, closes the column gap, ends on a double-width "Last Day" cell and carries no CTAs at all. `Month & Year Picker` hides the weekday row and swaps the grid for the Month/Year chip sections.',
      },
    },
  },
  render: () => (
    <Wrap title="Calendar" note="Figma 6335:28236 · 3 variants · 300px wide">
      <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Cell label="Type=Date Picker">
          <DateSelector type="date picker" selected={15} />
        </Cell>
        <Cell label="Type=Date Picker + Last Day">
          <DateSelector type="date picker + last day" />
        </Cell>
        <Cell label="Type=Month & Year Picker">
          <DateSelector type="month & year picker" monthYearLabel="March 2019" />
        </Cell>
      </div>
    </Wrap>
  ),
};

export const AnatomyBuildUp: StoryObj = {
  name: 'Anatomy / 🧬 Elements → Nested → Full',
  parameters: {
    docs: {
      description: {
        story:
          'The same build-up Figma documents: the Date cell and Month & Year header combine into the grid and panel, which combine into the three Calendar variants.',
      },
    },
  },
  render: () => (
    <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Wrap title="① Elements" note="Date cell and Month & Year header">
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Cell label="DateSelectorCell">
            <DateSelectorCell state="single selected" day="15" />
          </Cell>
          <Cell label="DateSelectorHeader">
            <div style={{ width: 300 }}>
              <DateSelectorHeader />
            </div>
          </Cell>
        </div>
      </Wrap>

      <Wrap title="② Nested" note="Cells become a grid; chips become the month/year panel">
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Cell label="DateGrid">
            <div style={{ width: 300 }}>
              <DateGrid cells={buildMonthCells({ year: 2026, monthIndex: 6, selected: 15 })} />
            </div>
          </Cell>
          <Cell label="MonthYearPanel">
            <div style={{ width: 300 }}>
              <MonthYearPanel />
            </div>
          </Cell>
        </div>
      </Wrap>

      <Wrap title="③ Full" note="Header + grid/panel + Button CTAs">
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Cell label="DateSelector">
            <DateSelector type="date picker" selected={15} today={9} />
          </Cell>
        </div>
      </Wrap>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   4 · PLAYGROUND
   ═══════════════════════════════════════════════════════════════════════════ */

export const Playground: StoryObj<typeof DateSelector> = {
  args: {
    type: 'date picker',
    year: 2026,
    monthIndex: 6,
    selected: 15,
    today: 9,
    lastDayLabel: 'Last Day',
    cancelLabel: 'Cancel',
    doneLabel: 'Done',
  },
};

export const InteractivePlayground: StoryObj = {
  name: 'Playground / Interactive',
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive. **Single mode** — click a date to select it. **Range mode** — click a start then an end; the two endpoints get the primary-400 ring and everything between fills, exactly as the Figma `Multi-Selected` positions specify. Click the **month-year label** to open the Month & Year picker, pick from the chips, then press Done. The header chevrons step month by month; the picker\'s own chevrons page through months (4 at a time) and years (5 at a time), matching Figma.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Cell label="selectionMode=&quot;single&quot;">
        <InteractiveDateSelector selectionMode="single" today={9} />
      </Cell>
      <Cell label="selectionMode=&quot;range&quot; — click a start, then an end">
        <InteractiveDateSelector selectionMode="range" today={9} />
      </Cell>
    </div>
  ),
};

export const InteractiveRange: StoryObj = {
  name: 'Playground / Range selection',
  parameters: {
    docs: {
      description: {
        story:
          'Click any two dates to define a range. The first click arms the start (shown `single selected`), the second closes it, and a third starts over. Ring on the endpoints only — never on the mid positions — per the Figma `Date` set.',
      },
    },
  },
  render: () => <InteractiveDateSelector selectionMode="range" today={9} />,
};

export const InteractiveMonthYear: StoryObj = {
  name: 'Playground / Month & Year selection',
  parameters: {
    docs: {
      description: {
        story:
          'Opens on the Month & Year picker. Choose a month and a year from the Chips, page them with the section chevrons, then press Done to return to the grid on the chosen month.',
      },
    },
  },
  render: () => <InteractiveDateSelector type="month & year picker" today={9} />,
};
