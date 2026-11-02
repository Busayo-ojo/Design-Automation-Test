import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableContainer,
  TableElement,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TextStackCell,
  AvatarCell,
  ControlCell,
  BadgeCell,
  ProgressCell,
  MoreMenuCell,
  type ColumnDef,
} from './Table';
import { Badge } from '../../elements/Badge';
import { Button } from '../../elements/Button';
import { Chip } from '../../elements/Chip';

const meta: Meta<typeof Table> = {
  title: 'Components/🔳 Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `
### Granular, Cell-by-Cell Table Architecture (Matching Figma \`✤ Tables\`)

The Table component follows the Figma design specification closely:
- **Granular Cell Sub-components**: Plain text, Text stack (primary above, supporting below), Form controls (checkbox, radio, switch), Avatars & Avatar groups, Badges, Chips, Progress bars, Actions, and More menus.
- **Header Cells**: With selection checkboxes, sort direction indicators, and separators.
- **Row States**: Default, Hover, and Selected states (highlighted in Figma blue \`#F0F4FE\`).
- **Flexible Composition**: Usable both as declarative compound JSX (\`<Table><TableHead>...<TableBody>...\`) and data-driven (\`columns\` + \`data\`).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─── 1. Granular Cell Types Showcase ──────────────────────────────────────────

export const GranularCellTypes: Story = {
  render: () => (
    <TableContainer>
      <TableElement>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Cell Type</TableHeaderCell>
            <TableHeaderCell>Granular Output / Preview</TableHeaderCell>
            <TableHeaderCell>Figma Variant & Description</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Plain Text */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Plain Text
            </TableCell>
            <TableCell variant="text" text="NGN 1,250,000,000.00" />
            <TableCell variant="text" muted>
              Single-line text with configurable font weight and alignment
            </TableCell>
          </TableRow>

          {/* Text Stack */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Text Stack
            </TableCell>
            <TableCell
              variant="text-stack"
              primaryText="FGN 13.53% 23-MAR-2027"
              secondaryText="Bond • ISIN: NGB2027S2"
            />
            <TableCell variant="text" muted>
              Primary heading above secondary supporting metadata
            </TableCell>
          </TableRow>

          {/* Form Control (Checkbox) */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Form Control (Checkbox)
            </TableCell>
            <TableCell
              variant="control"
              controlType="checkbox"
              controlChecked={true}
              onControlChange={() => {}}
            />
            <TableCell variant="text" muted>
              Row selection checkbox with checked/unchecked states
            </TableCell>
          </TableRow>

          {/* Form Control (Radio & Switch) */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Form Control (Switch / Radio)
            </TableCell>
            <TableCell style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <TableCell variant="control" controlType="switch" controlChecked={true} hasSeparator={false} />
              <TableCell variant="control" controlType="radio" controlChecked={true} hasSeparator={false} />
            </TableCell>
            <TableCell variant="text" muted>
              Inline toggles or single-choice radio controls
            </TableCell>
          </TableRow>

          {/* Avatar + Text */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Avatar + Text
            </TableCell>
            <TableCell
              variant="avatar-text"
              avatarInitials="AO"
              primaryText="Amara Okafor"
              secondaryText="Surveillance Officer • amara@fmdqgroup.com"
            />
            <TableCell variant="text" muted>
              Avatar image or initials with two-line user details
            </TableCell>
          </TableRow>

          {/* Avatar Group */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Avatar Group
            </TableCell>
            <TableCell
              variant="avatar-group"
              avatars={[
                { initials: 'AO' },
                { initials: 'KB' },
                { initials: 'TA' },
                { initials: 'CE' },
                { initials: 'FO' },
                { initials: 'DA' },
              ]}
              maxAvatars={4}
            />
            <TableCell variant="text" muted>
              Overlapping circular avatar cluster with +N overflow badge
            </TableCell>
          </TableRow>

          {/* Status Badge */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Badge / Chip
            </TableCell>
            <TableCell>
              <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                <Badge color="success">Approved</Badge>
                <Badge color="warning">Pending Review</Badge>
                <Chip label="Derivatives" hasCloseButton={false} />
              </div>
            </TableCell>
            <TableCell variant="text" muted>
              Status indicators and categorization chips
            </TableCell>
          </TableRow>

          {/* Progress Bar */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Progress Bar
            </TableCell>
            <TableCell
              variant="progress"
              progress={78}
              progressLabel="Reporting"
              progressColor="primary"
            />
            <TableCell variant="text" muted>
              Horizontal track with label and dynamic percentage
            </TableCell>
          </TableRow>

          {/* Action Buttons */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Actions
            </TableCell>
            <TableCell variant="actions">
              <Button size="sm" variant="primary">
                View Trade
              </Button>
              <Button size="sm" variant="secondary">
                Export
              </Button>
            </TableCell>
            <TableCell variant="text" muted>
              Contextual action triggers inside row cells
            </TableCell>
          </TableRow>

          {/* More Menu */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              More Menu
            </TableCell>
            <TableCell variant="more-menu" onMenuClick={() => alert('Menu clicked')} />
            <TableCell variant="text" muted>
              Three-dots vertical overflow action button
            </TableCell>
          </TableRow>

          {/* Rating */}
          <TableRow>
            <TableCell variant="text" textWeight="medium">
              Rating
            </TableCell>
            <TableCell variant="rating" rating={4} maxRating={5} />
            <TableCell variant="text" muted>
              Star ratings for dealer performance or audits
            </TableCell>
          </TableRow>
        </TableBody>
      </TableElement>
    </TableContainer>
  ),
};

// ─── 2. Granular Composed Table (Figma Specification) ─────────────────────────

export const GranularComposedTable: Story = {
  render: () => {
    return (
      <TableContainer>
        <TableElement>
          <TableHead>
            <TableRow>
              <TableHeaderCell checkbox checked={false} style={{ width: '48px' }} />
              <TableHeaderCell sortable sortDirection="asc">
                Dealer / Counterparty
              </TableHeaderCell>
              <TableHeaderCell sortable sortDirection="none">
                Instrument
              </TableHeaderCell>
              <TableHeaderCell align="right">Traded Volume</TableHeaderCell>
              <TableHeaderCell>Verification Status</TableHeaderCell>
              <TableHeaderCell>SLA Completion</TableHeaderCell>
              <TableHeaderCell align="center" style={{ width: '60px' }}>
                Actions
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Row 1 - Selected */}
            <TableRow selected={true}>
              <ControlCell
                controlType="checkbox"
                controlChecked={true}
                onControlChange={() => {}}
              />
              <AvatarCell
                avatarInitials="ST"
                primaryText="Stanbic IBTC Bank"
                secondaryText="RC-129482 • Tier 1 Primary Dealer"
              />
              <TextStackCell
                primaryText="16.2884% FGN MAR 2027"
                secondaryText="Fixed Income • S/N 49102"
              />
              <TableCell variant="text" align="right" textWeight="semibold">
                ₦4,500,000,000.00
              </TableCell>
              <TableCell>
                <Badge color="success">Matched</Badge>
              </TableCell>
              <ProgressCell progress={92} progressColor="success" showPercentage />
              <MoreMenuCell onMenuClick={() => {}} />
            </TableRow>

            {/* Row 2 - Default */}
            <TableRow selected={false}>
              <ControlCell
                controlType="checkbox"
                controlChecked={false}
                onControlChange={() => {}}
              />
              <AvatarCell
                avatarInitials="AC"
                primaryText="Access Bank Plc"
                secondaryText="RC-049281 • Market Maker"
              />
              <TextStackCell
                primaryText="NTB 182-Day 14-NOV-2026"
                secondaryText="Treasury Bill • Discount 18.5%"
              />
              <TableCell variant="text" align="right" textWeight="semibold">
                ₦1,200,000,000.00
              </TableCell>
              <TableCell>
                <Badge color="warning">Pending Confirmation</Badge>
              </TableCell>
              <ProgressCell progress={45} progressColor="warning" showPercentage />
              <MoreMenuCell onMenuClick={() => {}} />
            </TableRow>

            {/* Row 3 - Default */}
            <TableRow selected={false}>
              <ControlCell
                controlType="checkbox"
                controlChecked={false}
                onControlChange={() => {}}
              />
              <AvatarCell
                avatarInitials="GT"
                primaryText="Guaranty Trust Bank"
                secondaryText="RC-018239 • Clearing Member"
              />
              <TextStackCell
                primaryText="FMDQ FX Futures FEB 2027"
                secondaryText="Derivatives • USD/NGN"
              />
              <TableCell variant="text" align="right" textWeight="semibold">
                $5,000,000.00
              </TableCell>
              <TableCell>
                <Badge color="blue">Processing</Badge>
              </TableCell>
              <ProgressCell progress={68} progressColor="primary" showPercentage />
              <MoreMenuCell onMenuClick={() => {}} />
            </TableRow>

            {/* Row 4 - Default */}
            <TableRow selected={false}>
              <ControlCell
                controlType="checkbox"
                controlChecked={false}
                onControlChange={() => {}}
              />
              <AvatarCell
                avatarInitials="ZE"
                primaryText="Zenith Bank Plc"
                secondaryText="RC-009182 • Trading License Holder"
              />
              <TextStackCell
                primaryText="Dangote Cement CP Series 4"
                secondaryText="Commercial Paper • Rating Aa"
              />
              <TableCell variant="text" align="right" textWeight="semibold">
                ₦850,000,000.00
              </TableCell>
              <TableCell>
                <Badge color="error">Exceptions Flagged</Badge>
              </TableCell>
              <ProgressCell progress={20} progressColor="error" showPercentage />
              <MoreMenuCell onMenuClick={() => {}} />
            </TableRow>
          </TableBody>
        </TableElement>
      </TableContainer>
    );
  },
};

// ─── 3. Interactive Row Selection with State ──────────────────────────────────

export const InteractiveRowSelection: Story = {
  render: () => {
    const initialRows = [
      { id: '1', name: 'Chapel Hill Denham', category: 'Brokers', volume: '₦2.4B', status: 'Active' },
      { id: '2', name: 'Coronation Merchant Bank', category: 'Merchant Bank', volume: '₦1.8B', status: 'Active' },
      { id: '3', name: 'FBNQuest Merchant Bank', category: 'Primary Dealer', volume: '₦3.1B', status: 'Pending' },
      { id: '4', name: 'United Bank for Africa', category: 'Commercial Bank', volume: '₦4.9B', status: 'Active' },
    ];

    const [selectedIds, setSelectedIds] = useState<string[]>(['1']);

    const allSelected = selectedIds.length === initialRows.length;
    const isIndeterminate = selectedIds.length > 0 && !allSelected;

    const toggleAll = () => {
      if (allSelected) {
        setSelectedIds([]);
      } else {
        setSelectedIds(initialRows.map((r) => r.id));
      }
    };

    const toggleRow = (id: string) => {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '14px', color: '#667185' }}>
            Selected: <strong>{selectedIds.length}</strong> of {initialRows.length} institutions
          </div>
          {selectedIds.length > 0 && (
            <Button size="sm" variant="secondary" onClick={() => setSelectedIds([])}>
              Clear Selection
            </Button>
          )}
        </div>

        <TableContainer>
          <TableElement>
            <TableHead>
              <TableRow>
                <TableHeaderCell
                  checkbox
                  checked={allSelected}
                  indeterminate={isIndeterminate}
                  onCheckboxChange={toggleAll}
                  style={{ width: '48px' }}
                />
                <TableHeaderCell>Institution Name</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell align="right">Reported Volume</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialRows.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <TableRow
                    key={row.id}
                    selected={isSelected}
                    onClick={() => toggleRow(row.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ControlCell
                      controlType="checkbox"
                      controlChecked={isSelected}
                      onControlChange={(e) => {
                        e.stopPropagation();
                        toggleRow(row.id);
                      }}
                      style={{ width: '48px' }}
                    />
                    <TableCell variant="text" textWeight="medium">
                      {row.name}
                    </TableCell>
                    <TableCell variant="text" muted>
                      {row.category}
                    </TableCell>
                    <TableCell variant="text" align="right" textWeight="semibold">
                      {row.volume}
                    </TableCell>
                    <BadgeCell>
                      <Badge color={row.status === 'Active' ? 'success' : 'warning'}>
                        {row.status}
                      </Badge>
                    </BadgeCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableElement>
        </TableContainer>
      </div>
    );
  },
};

// ─── 4. Declarative Data Table with Design System Pagination ──────────────────

interface TradeRecord {
  id: string;
  ref: string;
  dealer: string;
  initials: string;
  instrument: string;
  subType: string;
  amount: number;
  status: 'Matched' | 'Pending' | 'Flagged';
  progress: number;
}

const mockTrades: TradeRecord[] = Array.from({ length: 35 }).map((_, i) => ({
  id: `TRD-${1000 + i}`,
  ref: `FMDQ/TRD/2026/${1000 + i}`,
  dealer: ['Stanbic IBTC', 'Access Bank', 'Guaranty Trust Bank', 'Zenith Bank', 'Citi Nigeria'][i % 5],
  initials: ['SB', 'AC', 'GT', 'ZE', 'CI'][i % 5],
  instrument: i % 2 === 0 ? 'FGN Bond 13.53% 2027' : 'Treasury Bill 364D',
  subType: i % 2 === 0 ? 'Fixed Income' : 'Money Market',
  amount: (i + 1) * 250_000_000,
  status: i % 3 === 0 ? 'Pending' : i % 5 === 0 ? 'Flagged' : 'Matched',
  progress: Math.min(25 + i * 8, 100),
}));

export const DeclarativeDataTable: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['TRD-1000', 'TRD-1002']);

    const columns: ColumnDef<TradeRecord>[] = [
      {
        header: 'Counterparty',
        accessorKey: 'dealer',
        sortable: true,
        cell: ({ row }) => (
          <AvatarCell
            avatarInitials={row.initials}
            primaryText={row.dealer}
            secondaryText={row.ref}
            hasSeparator={false}
          />
        ),
      },
      {
        header: 'Security / Product',
        accessorKey: 'instrument',
        sortable: true,
        cell: ({ row }) => (
          <TextStackCell
            primaryText={row.instrument}
            secondaryText={row.subType}
            hasSeparator={false}
          />
        ),
      },
      {
        header: 'Face Value (NGN)',
        accessorKey: 'amount',
        align: 'right',
        sortable: true,
        cell: ({ row }) => (
          <TableCell
            variant="text"
            textWeight="semibold"
            align="right"
            hasSeparator={false}
          >
            ₦{row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </TableCell>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        sortable: true,
        cell: ({ row }) => (
          <BadgeCell hasSeparator={false}>
            <Badge
              color={
                row.status === 'Matched'
                  ? 'success'
                  : row.status === 'Pending'
                  ? 'warning'
                  : 'error'
              }
            >
              {row.status}
            </Badge>
          </BadgeCell>
        ),
      },
      {
        header: 'Audit SLA',
        accessorKey: 'progress',
        sortable: true,
        cell: ({ row }) => (
          <ProgressCell
            progress={row.progress}
            progressColor={row.progress >= 90 ? 'success' : row.progress >= 50 ? 'primary' : 'warning'}
            showPercentage
            hasSeparator={false}
          />
        ),
      },
      {
        header: '',
        id: 'actions',
        align: 'right',
        cell: () => <MoreMenuCell onMenuClick={() => {}} hasSeparator={false} />,
      },
    ];

    return (
      <Table<TradeRecord>
        data={mockTrades}
        columns={columns}
        pagination={true}
        defaultPageSize={8}
        selectable={true}
        selectedRowKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        getRowId={(row: TradeRecord) => row.id}
      />
    );
  },
};

// ─── 5. Empty State Showcase ──────────────────────────────────────────────────

export const EmptyState: Story = {
  render: () => {
    return (
      <Table
        data={[]}
        columns={[
          { header: 'ID', accessorKey: 'id' },
          { header: 'Instrument', accessorKey: 'instrument' },
          { header: 'Status', accessorKey: 'status' },
        ]}
        emptyTitle="No Market Records Available"
        emptyDescription="There are currently no surveillance trade logs for the selected date range."
      />
    );
  },
};
