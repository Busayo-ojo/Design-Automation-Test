import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnMenu, type ColumnMenuFilterType } from './ColumnMenu';

const meta: Meta<typeof ColumnMenu> = {
  title: 'Components/📑 ColumnMenu',
  component: ColumnMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Table Column Menu based 1:1 on Figma component set "Table / Column menu" (`11185:1015636`). Provides 240px wide header filter popovers with sorting controls (ascending/descending), context-aware filter fields (text search, numeric range, date range, checkbox options), and clear/apply action buttons.',
      },
    },
  },
  argTypes: {
    filter: {
      control: 'select',
      options: ['text', 'range', 'date', 'options'],
      description: 'Filter presentation variant matching Figma property "filter"',
    },
    filterTitle: {
      control: 'text',
      description: 'Title rendered above filter fields',
    },
    sortDirection: {
      control: 'radio',
      options: ['none', 'asc', 'desc'],
      description: 'Active sort direction indication',
    },
    textPlaceholder: {
      control: 'text',
      description: 'Placeholder for text filter input',
    },
    minPlaceholder: {
      control: 'text',
      description: 'Placeholder for range min input',
    },
    maxPlaceholder: {
      control: 'text',
      description: 'Placeholder for range max input',
    },
    startDatePlaceholder: {
      control: 'text',
      description: 'Placeholder for date start input',
    },
    endDatePlaceholder: {
      control: 'text',
      description: 'Placeholder for date end input',
    },
    clearLabel: {
      control: 'text',
      description: 'Text for clear action button',
    },
    applyLabel: {
      control: 'text',
      description: 'Text for apply action button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColumnMenu>;

// ─── Interactive Playground ──────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    filter: 'text',
    filterTitle: 'Filter',
    sortDirection: 'none',
    textPlaceholder: 'Search...',
    minPlaceholder: 'Min',
    maxPlaceholder: 'Max',
    startDatePlaceholder: 'From',
    endDatePlaceholder: 'To',
    clearLabel: 'Clear',
    applyLabel: 'Apply',
  },
  render: (args) => {
    const [sort, setSort] = useState(args.sortDirection || 'none');
    return (
      <ColumnMenu
        {...args}
        sortDirection={sort}
        onSortAscending={() => setSort('asc')}
        onSortDescending={() => setSort('desc')}
        onClear={() => {
          setSort('none');
          alert('Filters cleared');
        }}
        onApply={() => alert(`Filters applied (sort: ${sort})`)}
      />
    );
  },
};

// ─── Variant 1: Text Search Filter ───────────────────────────────────────────

export const FilterText: StoryObj = {
  render: () => {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState<'asc' | 'desc' | 'none'>('asc');

    return (
      <ColumnMenu
        filter="text"
        filterTitle="Filter"
        sortDirection={sort}
        textValue={query}
        onTextChange={setQuery}
        onSortAscending={() => setSort('asc')}
        onSortDescending={() => setSort('desc')}
        onClear={() => setQuery('')}
        onApply={() => alert(`Search: "${query}", Sort: ${sort}`)}
      />
    );
  },
};

// ─── Variant 2: Numeric Range Filter ─────────────────────────────────────────

export const FilterRange: StoryObj = {
  render: () => {
    const [min, setMin] = useState('100');
    const [max, setMax] = useState('5000');
    const [sort, setSort] = useState<'asc' | 'desc' | 'none'>('none');

    return (
      <ColumnMenu
        filter="range"
        filterTitle="Filter"
        sortDirection={sort}
        minValue={min}
        maxValue={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        onSortAscending={() => setSort('asc')}
        onSortDescending={() => setSort('desc')}
        onClear={() => {
          setMin('');
          setMax('');
        }}
        onApply={() => alert(`Range: ${min} to ${max}`)}
      />
    );
  },
};

// ─── Variant 3: Date Range Filter ────────────────────────────────────────────

export const FilterDate: StoryObj = {
  render: () => {
    const [start, setStart] = useState('2026-01-01');
    const [end, setEnd] = useState('2026-12-31');
    const [sort, setSort] = useState<'asc' | 'desc' | 'none'>('desc');

    return (
      <ColumnMenu
        filter="date"
        filterTitle="Filter"
        sortDirection={sort}
        startDate={start}
        endDate={end}
        onStartDateChange={setStart}
        onEndDateChange={setEnd}
        onSortAscending={() => setSort('asc')}
        onSortDescending={() => setSort('desc')}
        onClear={() => {
          setStart('');
          setEnd('');
        }}
        onApply={() => alert(`Date: ${start} to ${end}`)}
      />
    );
  },
};

// ─── Variant 4: Multi-Select Options Filter ──────────────────────────────────

export const FilterOptions: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['settled']);
    const [sort, setSort] = useState<'asc' | 'desc' | 'none'>('none');

    const options = [
      { id: 'settled', label: 'Settled' },
      { id: 'pending', label: 'Pending' },
      { id: 'failed', label: 'Failed' },
    ];

    return (
      <ColumnMenu
        filter="options"
        filterTitle="Filter"
        sortDirection={sort}
        options={options}
        selectedOptions={selected}
        onOptionToggle={(id) => {
          setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
          );
        }}
        onSortAscending={() => setSort('asc')}
        onSortDescending={() => setSort('desc')}
        onClear={() => setSelected([])}
        onApply={() => alert(`Selected options: ${selected.join(', ')}`)}
      />
    );
  },
};

// ─── All 4 Figma Variants Matrix ─────────────────────────────────────────────

export const AllVariantsMatrix: StoryObj = {
  render: () => {
    const variants: ColumnMenuFilterType[] = ['text', 'range', 'date', 'options'];

    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {variants.map((v) => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#667185', textTransform: 'uppercase' }}>
              filter = {v}
            </div>
            <ColumnMenu filter={v} />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Table Header Popover Integration ────────────────────────────────────────

export const TableHeaderIntegration: StoryObj = {
  render: () => {
    const [openCol, setOpenCol] = useState<string | null>('security');
    const [sortSec, setSortSec] = useState<'asc' | 'desc' | 'none'>('asc');

    return (
      <div style={{ width: '100%', maxWidth: '780px', margin: '0 auto', minHeight: '380px' }}>
        <div style={{ marginBottom: '16px', fontSize: '13px', color: '#667185' }}>
          <strong>Table Integration:</strong> Click a column header below to toggle its contextual <code>ColumnMenu</code> popover.
        </div>

        <div style={{ border: '1px solid #E4E7EC', borderRadius: '12px', overflow: 'visible', background: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EAECF0', color: '#475367' }}>
                <th style={{ padding: '12px 24px', position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setOpenCol(openCol === 'id' ? null : 'id')}
                    style={{ background: 'none', border: 'none', font: 'inherit', fontWeight: 600, color: '#101928', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
                  >
                    Trade ID
                    <span style={{ fontSize: '10px', color: '#667185' }}>▼</span>
                  </button>
                  {openCol === 'id' && (
                    <div style={{ position: 'absolute', top: '100%', left: '16px', zIndex: 100, marginTop: '4px' }}>
                      <ColumnMenu
                        filter="text"
                        textPlaceholder="Filter Trade ID..."
                        onClear={() => setOpenCol(null)}
                        onApply={() => setOpenCol(null)}
                      />
                    </div>
                  )}
                </th>

                <th style={{ padding: '12px 16px', position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setOpenCol(openCol === 'security' ? null : 'security')}
                    style={{ background: 'none', border: 'none', font: 'inherit', fontWeight: 600, color: '#101928', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
                  >
                    Security
                    <span style={{ fontSize: '10px', color: sortSec !== 'none' ? '#1D326D' : '#667185' }}>
                      {sortSec === 'asc' ? '▲' : sortSec === 'desc' ? '▼' : '⇅'}
                    </span>
                  </button>
                  {openCol === 'security' && (
                    <div style={{ position: 'absolute', top: '100%', left: '16px', zIndex: 100, marginTop: '4px' }}>
                      <ColumnMenu
                        filter="options"
                        sortDirection={sortSec}
                        onSortAscending={() => setSortSec('asc')}
                        onSortDescending={() => setSortSec('desc')}
                        options={[
                          { id: 'fgn', label: 'FGN Bonds' },
                          { id: 'ntb', label: 'Treasury Bills' },
                          { id: 'prom', label: 'Promissory Notes' },
                        ]}
                        onClear={() => {
                          setSortSec('none');
                          setOpenCol(null);
                        }}
                        onApply={() => setOpenCol(null)}
                      />
                    </div>
                  )}
                </th>

                <th style={{ padding: '12px 16px', position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setOpenCol(openCol === 'yield' ? null : 'yield')}
                    style={{ background: 'none', border: 'none', font: 'inherit', fontWeight: 600, color: '#101928', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
                  >
                    Yield
                    <span style={{ fontSize: '10px', color: '#667185' }}>▼</span>
                  </button>
                  {openCol === 'yield' && (
                    <div style={{ position: 'absolute', top: '100%', left: '16px', zIndex: 100, marginTop: '4px' }}>
                      <ColumnMenu
                        filter="range"
                        minPlaceholder="Min %"
                        maxPlaceholder="Max %"
                        onClear={() => setOpenCol(null)}
                        onApply={() => setOpenCol(null)}
                      />
                    </div>
                  )}
                </th>

                <th style={{ padding: '12px 24px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F0F2F5', color: '#344054' }}>
                <td style={{ padding: '12px 24px', fontWeight: 600, color: '#1D326D' }}>TRD-8821</td>
                <td style={{ padding: '12px 16px' }}>FGN 12.50 2030</td>
                <td style={{ padding: '12px 16px' }}>13.45%</td>
                <td style={{ padding: '12px 24px', color: '#099137' }}>Settled</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F0F2F5', color: '#344054' }}>
                <td style={{ padding: '12px 24px', fontWeight: 600, color: '#1D326D' }}>TRD-8822</td>
                <td style={{ padding: '12px 16px' }}>NTB 04/11/2027</td>
                <td style={{ padding: '12px 16px' }}>11.80%</td>
                <td style={{ padding: '12px 24px', color: '#CC9933' }}>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};

