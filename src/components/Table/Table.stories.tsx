
import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import type { ColumnDef, TableProps } from './Table';

interface TradeData {
  id: string;
  instrument: string;
  price: number;
  qty: number;
  status: 'Completed' | 'Pending';
}

type ConcreteTable = ComponentType<TableProps<TradeData>>;

const data: TradeData[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `TRD-${1000 + i}`,
  instrument: i % 2 === 0 ? 'FGN Bond' : 'Treasury Bill',
  price: 105.45 + (i * 0.1),
  qty: (i + 1) * 1000,
  status: i % 3 === 0 ? 'Pending' : 'Completed',
}));

const columns: ColumnDef<TradeData>[] = [
  { header: 'Trade ID', accessorKey: 'id' },
  { header: 'Instrument', accessorKey: 'instrument' },
  { header: 'Price', accessorKey: 'price', cell: ({ row }) => `$${row.price.toFixed(2)}` },
  { header: 'Quantity', accessorKey: 'qty' },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <span style={{
        padding: '4px 8px',
        borderRadius: '16px',
        backgroundColor: row.status === 'Completed' ? '#d1fae5' : '#fef3c7',
        color: row.status === 'Completed' ? '#065f46' : '#92400e',
        fontSize: '12px'
      }}>
        {row.status}
      </span>
    )
  },
];

const meta: Meta<TableProps<TradeData>> = {
  title: 'Components/✨ Table',
  component: Table as ConcreteTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TableProps<TradeData>>;

export const Default: Story = {
  args: {
    data: data.slice(0, 5),
    columns,
  },
};

export const WithPagination: Story = {
  args: {
    data,
    columns,
    pagination: true,
    defaultPageSize: 10,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No trades found.'
  },
};
