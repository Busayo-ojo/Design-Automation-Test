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
  LeadingCell,
  ContentCell,
  TextStackCell,
  AvatarCell,
  ControlCell,
  ProgressCell,
  MoreMenuCell,
  type ColumnDef,
} from './Table';
import { Badge } from '../../elements/Badge';
import { Button } from '../../elements/Button';
import { ColumnMenu } from '../ColumnMenu';

const meta: Meta<typeof Table> = {
  title: 'Components/🔳 Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `
### Modular Table Architecture (Matching Figma \`✤ Tables\`)

The Table architecture directly mirrors the Figma component hierarchy on page \`✤ Tables\` (Node ID: \`347:10049\`):
- **Header Cells (\`2804:80528\`)**: Standalone header cell component set (30 variants) supporting Default, Hover, and Selected states, selection checkboxes, label visibility, trailing sort indicators, and separators.
- **Leading Cells (\`5604:43632\`)**: Leading cell component set (12 variants) combining form controls (radio, toggle, checkbox), leading media (featured icon, avatar), and two-line text (label + description).
- **Content Cells (\`5604:44353\`)**: Granular content cell component set (16 variants) covering Avatar + Text, Action Icons, Status Badges, Action Buttons, Avatar Groups, Progress Bars, Star Ratings, and More Menus.
- **Composed Tables**: Real-world operational financial tables assembling Header, Leading, and Content cells.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─── 1. Header Variants (Figma Node 2804:80528, 30 Variants) ─────────────────

export const HeaderVariants: Story = {
  name: 'Header Cells',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#101828' }}>
            State: Default (Variants by Checkbox, Label, Trailing Icon & Separator)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667085' }}>
            Matches Figma <code>Header</code> component set (2804:80528) with white background, DM Sans 12px uppercase medium text, and Grey/200 bottom border.
          </p>
          <TableContainer>
            <TableElement>
              <TableHead>
                <TableRow>
                  <TableHeaderCell state="default" checkbox checked={false} trailingIcon hasSeparator>
                    Checkbox + Label + Sort
                  </TableHeaderCell>
                  <TableHeaderCell state="default" checkbox checked={true} hasSeparator>
                    Checkbox + Label
                  </TableHeaderCell>
                  <TableHeaderCell state="default" sortable sortDirection="asc" hasSeparator>
                    Sort Ascending
                  </TableHeaderCell>
                  <TableHeaderCell state="default" sortable sortDirection="desc" hasSeparator>
                    Sort Descending
                  </TableHeaderCell>
                  <TableHeaderCell state="default" hasSeparator>
                    Label Only
                  </TableHeaderCell>
                  <TableHeaderCell state="default" align="center" hasSeparator>
                    Centered
                  </TableHeaderCell>
                  <TableHeaderCell state="default" align="right" hasSeparator>
                    Right Aligned
                  </TableHeaderCell>
                  <TableHeaderCell state="default" checkbox checked={false} hasLabel={false} hasSeparator style={{ width: '48px' }} />
                  <TableHeaderCell state="default" hasSeparator={false}>
                    No Separator
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
            </TableElement>
          </TableContainer>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#101828' }}>
            State: Hover (Figma Grey/50 #F9FAFB Background)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667085' }}>
            Interactive cursor hover feedback tint applied to header cells.
          </p>
          <TableContainer>
            <TableElement>
              <TableHead>
                <TableRow>
                  <TableHeaderCell state="hover" checkbox checked={false} trailingIcon hasSeparator>
                    Checkbox + Label + Sort
                  </TableHeaderCell>
                  <TableHeaderCell state="hover" checkbox checked={true} hasSeparator>
                    Checkbox + Label
                  </TableHeaderCell>
                  <TableHeaderCell state="hover" sortable sortDirection="asc" hasSeparator>
                    Sort Ascending
                  </TableHeaderCell>
                  <TableHeaderCell state="hover" sortable sortDirection="desc" hasSeparator>
                    Sort Descending
                  </TableHeaderCell>
                  <TableHeaderCell state="hover" hasSeparator>
                    Label Only
                  </TableHeaderCell>
                  <TableHeaderCell state="hover" align="center" hasSeparator>
                    Centered
                  </TableHeaderCell>
                  <TableHeaderCell state="hover" align="right" hasSeparator>
                    Right Aligned
                  </TableHeaderCell>
                  <TableHeaderCell state="hover" checkbox checked={false} hasLabel={false} hasSeparator style={{ width: '48px' }} />
                  <TableHeaderCell state="hover" hasSeparator={false}>
                    No Separator
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
            </TableElement>
          </TableContainer>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#101828' }}>
            State: Selected (Figma Primary/50 #F0F4FE Background)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667085' }}>
            Active column or batch-selected header cell state.
          </p>
          <TableContainer>
            <TableElement>
              <TableHead>
                <TableRow>
                  <TableHeaderCell state="selected" checkbox checked={true} trailingIcon hasSeparator>
                    Checkbox + Label + Sort
                  </TableHeaderCell>
                  <TableHeaderCell state="selected" checkbox checked={true} hasSeparator>
                    Checkbox + Label
                  </TableHeaderCell>
                  <TableHeaderCell state="selected" sortable sortDirection="asc" hasSeparator>
                    Sort Ascending
                  </TableHeaderCell>
                  <TableHeaderCell state="selected" sortable sortDirection="desc" hasSeparator>
                    Sort Descending
                  </TableHeaderCell>
                  <TableHeaderCell state="selected" hasSeparator>
                    Label Only
                  </TableHeaderCell>
                  <TableHeaderCell state="selected" align="center" hasSeparator>
                    Centered
                  </TableHeaderCell>
                  <TableHeaderCell state="selected" align="right" hasSeparator>
                    Right Aligned
                  </TableHeaderCell>
                  <TableHeaderCell state="selected" checkbox checked={true} hasLabel={false} hasSeparator style={{ width: '48px' }} />
                  <TableHeaderCell state="selected" hasSeparator={false}>
                    No Separator
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
            </TableElement>
          </TableContainer>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#101828' }}>
            Infused Column Menu (Figma Node 11185:1015636)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667085' }}>
            Interactive popover menu attached directly to table column header cells, providing sorting (asc/desc) and filter controls.
          </p>
          <TableContainer style={{ overflow: 'visible', minHeight: '360px' }}>
            <TableElement>
              <TableHead>
                <TableRow>
                  <TableHeaderCell
                    sortable
                    hasColumnMenu
                    isMenuOpen={true}
                    columnMenu={
                      <ColumnMenu
                        filter="text"
                        filterTitle="Filter Trade ID"
                        sortDirection="asc"
                        textPlaceholder="Search trade reference..."
                        onSortAscending={() => {}}
                        onSortDescending={() => {}}
                        onClear={() => {}}
                        onApply={() => {}}
                      />
                    }
                  >
                    Trade ID (Open Menu)
                  </TableHeaderCell>
                  <TableHeaderCell sortable hasColumnMenu>
                    Counterparty
                  </TableHeaderCell>
                  <TableHeaderCell sortable hasColumnMenu>
                    Instrument
                  </TableHeaderCell>
                  <TableHeaderCell align="right">
                    Settlement Amount
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell variant="text" textWeight="medium">FMDQ/TRD/001</TableCell>
                  <TableCell variant="text">Stanbic IBTC Bank</TableCell>
                  <TableCell variant="text">FGN Bond 2027</TableCell>
                  <TableCell variant="text" align="right" textWeight="semibold">₦2,500,000,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="text" textWeight="medium">FMDQ/TRD/002</TableCell>
                  <TableCell variant="text">Access Bank Plc</TableCell>
                  <TableCell variant="text">NTB 182-Day</TableCell>
                  <TableCell variant="text" align="right" textWeight="semibold">₦750,000,000.00</TableCell>
                </TableRow>
              </TableBody>
            </TableElement>
          </TableContainer>
        </div>
      </div>
    );
  },
};

// ─── 2. Leading Cell Variants (Figma Node 5604:43632, 12 Variants) ───────────

export const LeadingCellVariants: Story = {
  name: 'Leading Cells',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#101828' }}>
            Leading Cell Component Set (Node 5604:43632)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667085' }}>
            Modular cell with control (Radio, Toggle, Checkbox), leading media (Featured Icon, Avatar), and text pair (Label + Description) in Default and Selected states.
          </p>
          <TableContainer>
            <TableElement>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Control Type</TableHeaderCell>
                  <TableHeaderCell>Leading Media</TableHeaderCell>
                  <TableHeaderCell>State: Default</TableHeaderCell>
                  <TableHeaderCell>State: Selected</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Radio + Featured Icon */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Radio Button</TableCell>
                  <TableCell variant="text" muted>Featured Icon</TableCell>
                  <LeadingCell
                    state="default"
                    control="radio-button"
                    media="featured-icon"
                    iconName="star"
                    label="Featured Asset"
                    description="Fixed Income • Primary Dealer"
                    hasSeparator
                  />
                  <LeadingCell
                    state="selected"
                    control="radio-button"
                    controlChecked={true}
                    media="featured-icon"
                    iconName="star"
                    label="Featured Asset"
                    description="Fixed Income • Primary Dealer"
                    hasSeparator
                  />
                </TableRow>

                {/* Radio + Avatar */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Radio Button</TableCell>
                  <TableCell variant="text" muted>Avatar</TableCell>
                  <LeadingCell
                    state="default"
                    control="radio-button"
                    media="avatar"
                    avatarInitials="ST"
                    label="Stanbic IBTC Bank"
                    description="RC-129482 • Tier 1 Member"
                    hasSeparator
                  />
                  <LeadingCell
                    state="selected"
                    control="radio-button"
                    controlChecked={true}
                    media="avatar"
                    avatarInitials="ST"
                    label="Stanbic IBTC Bank"
                    description="RC-129482 • Tier 1 Member"
                    hasSeparator
                  />
                </TableRow>

                {/* Toggle + Featured Icon */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Toggle Switch</TableCell>
                  <TableCell variant="text" muted>Featured Icon</TableCell>
                  <LeadingCell
                    state="default"
                    control="toggle"
                    controlChecked={false}
                    media="featured-icon"
                    iconName="shield-tick"
                    label="Automated Matching"
                    description="Real-time order validation"
                    hasSeparator
                  />
                  <LeadingCell
                    state="selected"
                    control="toggle"
                    controlChecked={true}
                    media="featured-icon"
                    iconName="shield-tick"
                    label="Automated Matching"
                    description="Real-time order validation"
                    hasSeparator
                  />
                </TableRow>

                {/* Toggle + Avatar */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Toggle Switch</TableCell>
                  <TableCell variant="text" muted>Avatar</TableCell>
                  <LeadingCell
                    state="default"
                    control="toggle"
                    controlChecked={false}
                    media="avatar"
                    avatarInitials="AC"
                    label="Access Bank Plc"
                    description="Settlement Bank Agent"
                    hasSeparator
                  />
                  <LeadingCell
                    state="selected"
                    control="toggle"
                    controlChecked={true}
                    media="avatar"
                    avatarInitials="AC"
                    label="Access Bank Plc"
                    description="Settlement Bank Agent"
                    hasSeparator
                  />
                </TableRow>

                {/* Checkbox + Featured Icon */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Checkbox</TableCell>
                  <TableCell variant="text" muted>Featured Icon</TableCell>
                  <LeadingCell
                    state="default"
                    control="checkbox"
                    controlChecked={false}
                    media="featured-icon"
                    iconName="building-1"
                    label="FBNQuest Merchant Bank"
                    description="Liquidity Provider Desk"
                    hasSeparator
                  />
                  <LeadingCell
                    state="selected"
                    control="checkbox"
                    controlChecked={true}
                    media="featured-icon"
                    iconName="building-1"
                    label="FBNQuest Merchant Bank"
                    description="Liquidity Provider Desk"
                    hasSeparator
                  />
                </TableRow>

                {/* Checkbox + Avatar */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Checkbox</TableCell>
                  <TableCell variant="text" muted>Avatar</TableCell>
                  <LeadingCell
                    state="default"
                    control="checkbox"
                    controlChecked={false}
                    media="avatar"
                    avatarInitials="ZE"
                    label="Zenith Bank Plc"
                    description="Clearing Member Tier 1"
                    hasSeparator
                  />
                  <LeadingCell
                    state="selected"
                    control="checkbox"
                    controlChecked={true}
                    media="avatar"
                    avatarInitials="ZE"
                    label="Zenith Bank Plc"
                    description="Clearing Member Tier 1"
                    hasSeparator
                  />
                </TableRow>
              </TableBody>
            </TableElement>
          </TableContainer>
        </div>
      </div>
    );
  },
};

// ─── 3. Content Cell Variants (Figma Node 5604:44353, 16 Variants) ───────────

export const ContentCellVariants: Story = {
  name: 'Content Cells',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#101828' }}>
            Content Cell Component Set (Node 5604:44353)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667085' }}>
            All 8 content cell types mapped 1:1 to Figma, displayed in both Default and Selected states.
          </p>
          <TableContainer>
            <TableElement>
              <TableHead>
                <TableRow>
                  <TableHeaderCell style={{ width: '160px' }}>Content Type</TableHeaderCell>
                  <TableHeaderCell>State: Default</TableHeaderCell>
                  <TableHeaderCell>State: Selected</TableHeaderCell>
                  <TableHeaderCell style={{ width: '220px' }}>Figma Description</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* 1. Avatar + Text */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Avatar + Text</TableCell>
                  <ContentCell
                    content="avatar + text"
                    state="default"
                    avatarInitials="AO"
                    primaryText="Amara Okafor"
                    secondaryText="Surveillance Officer • amara@fmdqgroup.com"
                    hasSeparator
                  />
                  <ContentCell
                    content="avatar + text"
                    state="selected"
                    avatarInitials="AO"
                    primaryText="Amara Okafor"
                    secondaryText="Surveillance Officer • amara@fmdqgroup.com"
                    hasSeparator
                  />
                  <TableCell variant="text" muted>User details with circular avatar & two-line stack</TableCell>
                </TableRow>

                {/* 2. Icons */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Icons</TableCell>
                  <ContentCell
                    content="icons"
                    state="default"
                    hasSeparator
                  />
                  <ContentCell
                    content="icons"
                    state="selected"
                    hasSeparator
                  />
                  <TableCell variant="text" muted>Action icons (pencil, bin, heart) for quick mutations</TableCell>
                </TableRow>

                {/* 3. Badge */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Badge</TableCell>
                  <ContentCell content="badge" state="default" hasSeparator>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <Badge color="success">Approved</Badge>
                      <Badge color="warning">Pending</Badge>
                    </div>
                  </ContentCell>
                  <ContentCell content="badge" state="selected" hasSeparator>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <Badge color="success">Approved</Badge>
                      <Badge color="warning">Pending</Badge>
                    </div>
                  </ContentCell>
                  <TableCell variant="text" muted>Status pill indicators with 8px horizontal padding</TableCell>
                </TableRow>

                {/* 4. Actions */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Actions</TableCell>
                  <ContentCell content="actions" state="default" hasSeparator>
                    <Button size="sm" variant="primary">View Trade</Button>
                    <Button size="sm" variant="secondary">Export</Button>
                  </ContentCell>
                  <ContentCell content="actions" state="selected" hasSeparator>
                    <Button size="sm" variant="primary">View Trade</Button>
                    <Button size="sm" variant="secondary">Export</Button>
                  </ContentCell>
                  <TableCell variant="text" muted>Inline contextual button actions</TableCell>
                </TableRow>

                {/* 5. Avatar Group */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Avatar Group</TableCell>
                  <ContentCell
                    content="avatar group"
                    state="default"
                    avatars={[
                      { initials: 'AO' },
                      { initials: 'KB' },
                      { initials: 'TA' },
                      { initials: 'CE' },
                      { initials: 'FO' },
                    ]}
                    maxAvatars={3}
                    hasSeparator
                  />
                  <ContentCell
                    content="avatar group"
                    state="selected"
                    avatars={[
                      { initials: 'AO' },
                      { initials: 'KB' },
                      { initials: 'TA' },
                      { initials: 'CE' },
                      { initials: 'FO' },
                    ]}
                    maxAvatars={3}
                    hasSeparator
                  />
                  <TableCell variant="text" muted>Overlapping circular user cluster with +N overflow</TableCell>
                </TableRow>

                {/* 6. Progress Bar */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Progress Bar</TableCell>
                  <ContentCell
                    content="progress bar"
                    state="default"
                    progress={78}
                    progressLabel="Reporting"
                    progressColor="primary"
                    showPercentage
                    hasSeparator
                  />
                  <ContentCell
                    content="progress bar"
                    state="selected"
                    progress={78}
                    progressLabel="Reporting"
                    progressColor="primary"
                    showPercentage
                    hasSeparator
                  />
                  <TableCell variant="text" muted>Linear progress indicator with label and percentage</TableCell>
                </TableRow>

                {/* 7. Rating */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">Rating</TableCell>
                  <ContentCell
                    content="rating"
                    state="default"
                    rating={4}
                    maxRating={5}
                    hasSeparator
                  />
                  <ContentCell
                    content="rating"
                    state="selected"
                    rating={4}
                    maxRating={5}
                    hasSeparator
                  />
                  <TableCell variant="text" muted>Star rating indicators for member scoring</TableCell>
                </TableRow>

                {/* 8. More Menu (Default / Transparent) */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">More Menu (Default)</TableCell>
                  <ContentCell
                    content="more menu"
                    state="default"
                    onMenuClick={() => alert('Menu clicked')}
                    hasSeparator
                  />
                  <ContentCell
                    content="more menu"
                    state="selected"
                    onMenuClick={() => alert('Menu clicked')}
                    hasSeparator
                  />
                  <TableCell variant="text" muted>Default transparent three-dots bold overflow trigger (Figma updated 5604:44736)</TableCell>
                </TableRow>

                {/* 8b. More Menu (With Background) */}
                <TableRow>
                  <TableCell variant="text" textWeight="medium">More Menu (With Background)</TableCell>
                  <ContentCell
                    content="more menu"
                    state="default"
                    menuHasBackground
                    onMenuClick={() => alert('Menu clicked')}
                    hasSeparator
                  />
                  <ContentCell
                    content="more menu"
                    state="selected"
                    menuHasBackground
                    onMenuClick={() => alert('Menu clicked')}
                    hasSeparator
                  />
                  <TableCell variant="text" muted>Enclosed 32×32px white box with 1px Grey/200 border (has background)</TableCell>
                </TableRow>
              </TableBody>
            </TableElement>
          </TableContainer>
        </div>
      </div>
    );
  },
};

// ─── 4. Granular Composed Table (Assembled from Header, Leading & Content) ────

export const GranularComposedTable: Story = {
  name: 'Composed Table',
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
              <TableHeaderCell align="center" style={{ width: '80px' }}>
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

// ─── 5. Interactive Row Selection with State ──────────────────────────────────

export const InteractiveRowSelection: Story = {
  name: 'Interactive Selection',
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
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            border: '1px solid #E4E7EC',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', color: '#344054' }}>
            Selected: <strong>{selectedIds.length}</strong> of {initialRows.length} institutions
          </span>
          {selectedIds.length > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="secondary" onClick={() => setSelectedIds([])}>
                Clear Selection
              </Button>
              <Button size="sm" variant="primary" onClick={() => alert(`Exporting ${selectedIds.length} rows`)}>
                Export Selected
              </Button>
            </div>
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
                <TableHeaderCell align="center" style={{ width: '60px' }}>
                  Action
                </TableHeaderCell>
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
                      onControlChange={() => toggleRow(row.id)}
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
                    <TableCell>
                      <Badge color={row.status === 'Active' ? 'success' : 'warning'}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <MoreMenuCell
                      onMenuClick={(e) => {
                        e.stopPropagation();
                        alert(`Action for ${row.name}`);
                      }}
                    />
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

// ─── 6. High-level Declarative Table with Sorting & Pagination ────────────────

interface TradeRecord {
  id: string;
  reference: string;
  counterparty: string;
  product: string;
  amount: string;
  status: 'matched' | 'unmatched' | 'settled';
  timestamp: string;
}

const sampleTrades: TradeRecord[] = [
  {
    id: 'TR-9021',
    reference: 'FMDQ/TRD/2026/0491',
    counterparty: 'Stanbic IBTC Bank',
    product: 'FGN Bond 2027',
    amount: '₦2,500,000,000.00',
    status: 'settled',
    timestamp: '10:45 AM',
  },
  {
    id: 'TR-9022',
    reference: 'FMDQ/TRD/2026/0492',
    counterparty: 'Access Bank Plc',
    product: 'NTB 182-Day',
    amount: '₦750,000,000.00',
    status: 'matched',
    timestamp: '11:12 AM',
  },
  {
    id: 'TR-9023',
    reference: 'FMDQ/TRD/2026/0493',
    counterparty: 'Guaranty Trust Bank',
    product: 'FX Futures FEB 2027',
    amount: '$1,200,000.00',
    status: 'matched',
    timestamp: '11:30 AM',
  },
  {
    id: 'TR-9024',
    reference: 'FMDQ/TRD/2026/0494',
    counterparty: 'Zenith Bank Plc',
    product: 'Commercial Paper 90D',
    amount: '₦500,000,000.00',
    status: 'unmatched',
    timestamp: '12:05 PM',
  },
  {
    id: 'TR-9025',
    reference: 'FMDQ/TRD/2026/0495',
    counterparty: 'United Bank for Africa',
    product: 'FGN Bond 2032',
    amount: '₦1,800,000,000.00',
    status: 'settled',
    timestamp: '12:40 PM',
  },
];

export const DeclarativeDataTable: Story = {
  name: 'Data-driven Table',
  render: () => {
    const columns: ColumnDef<TradeRecord>[] = [
      {
        id: 'reference',
        accessorKey: 'reference',
        header: 'Trade Reference',
        sortable: true,
        filterType: 'text',
        filterTitle: 'Filter Reference',
        cell: ({ row }) => (
          <TextStackCell
            primaryText={row.reference}
            secondaryText={row.id}
          />
        ),
      },
      {
        id: 'counterparty',
        accessorKey: 'counterparty',
        header: 'Counterparty',
        sortable: true,
        filterType: 'options',
        filterTitle: 'Filter Bank',
        filterOptions: [
          { id: 'Stanbic IBTC Bank', label: 'Stanbic IBTC Bank' },
          { id: 'Access Bank Plc', label: 'Access Bank Plc' },
          { id: 'Guaranty Trust Bank', label: 'Guaranty Trust Bank' },
          { id: 'Zenith Bank Plc', label: 'Zenith Bank Plc' },
          { id: 'United Bank for Africa', label: 'United Bank for Africa' },
        ],
        cell: ({ row }) => (
          <AvatarCell
            avatarInitials={row.counterparty.slice(0, 2).toUpperCase()}
            primaryText={row.counterparty}
            secondaryText="Member"
          />
        ),
      },
      {
        accessorKey: 'product',
        header: 'Instrument',
        sortable: true,
        filterType: 'text',
        filterTitle: 'Filter Instrument',
      },
      {
        accessorKey: 'amount',
        header: 'Volume / Amount',
        align: 'right',
        sortable: true,
        filterType: 'range',
        filterTitle: 'Filter Amount',
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        sortable: true,
        filterType: 'options',
        filterTitle: 'Filter Status',
        filterOptions: [
          { id: 'settled', label: 'SETTLED' },
          { id: 'matched', label: 'MATCHED' },
          { id: 'unmatched', label: 'UNMATCHED' },
        ],
        cell: ({ row }) => {
          const colorMap = {
            settled: 'success' as const,
            matched: 'blue' as const,
            unmatched: 'warning' as const,
          };
          return <Badge color={colorMap[row.status]}>{row.status.toUpperCase()}</Badge>;
        },
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        align: 'right',
      },
      {
        id: 'actions',
        header: '',
        align: 'center',
        hasColumnMenu: false,
        cell: () => <MoreMenuCell onMenuClick={() => alert('Row action clicked')} />,
      },
    ];

    return (
      <Table
        data={sampleTrades}
        columns={columns}
        pagination
        pageSize={5}
        totalItems={25}
      />
    );
  },
};

// ─── 7. Table With Open Column Menu Popover ───────────────────────────────────

export const TableWithOpenColumnMenu: Story = {
  name: 'Table with Column Menu',
  render: () => {
    const columns: ColumnDef<TradeRecord>[] = [
      {
        id: 'reference',
        accessorKey: 'reference',
        header: 'Trade Reference',
        sortable: true,
        filterType: 'text',
        filterTitle: 'Filter Trade Reference',
        cell: ({ row }) => (
          <TextStackCell
            primaryText={row.reference}
            secondaryText={row.id}
          />
        ),
      },
      {
        id: 'counterparty',
        accessorKey: 'counterparty',
        header: 'Counterparty',
        sortable: true,
        filterType: 'options',
        filterTitle: 'Filter Bank',
        filterOptions: [
          { id: 'Stanbic IBTC Bank', label: 'Stanbic IBTC Bank' },
          { id: 'Access Bank Plc', label: 'Access Bank Plc' },
          { id: 'Guaranty Trust Bank', label: 'Guaranty Trust Bank' },
          { id: 'Zenith Bank Plc', label: 'Zenith Bank Plc' },
          { id: 'United Bank for Africa', label: 'United Bank for Africa' },
        ],
        cell: ({ row }) => (
          <AvatarCell
            avatarInitials={row.counterparty.slice(0, 2).toUpperCase()}
            primaryText={row.counterparty}
            secondaryText="Member"
          />
        ),
      },
      {
        accessorKey: 'product',
        header: 'Instrument',
        sortable: true,
        filterType: 'text',
        filterTitle: 'Filter Instrument',
      },
      {
        accessorKey: 'amount',
        header: 'Volume / Amount',
        align: 'right',
        sortable: true,
        filterType: 'range',
        filterTitle: 'Filter Amount',
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        sortable: true,
        filterType: 'options',
        filterTitle: 'Filter Status',
        filterOptions: [
          { id: 'settled', label: 'SETTLED' },
          { id: 'matched', label: 'MATCHED' },
          { id: 'unmatched', label: 'UNMATCHED' },
        ],
        cell: ({ row }) => {
          const colorMap = {
            settled: 'success' as const,
            matched: 'blue' as const,
            unmatched: 'warning' as const,
          };
          return <Badge color={colorMap[row.status]}>{row.status.toUpperCase()}</Badge>;
        },
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        align: 'right',
      },
      {
        id: 'actions',
        header: '',
        align: 'center',
        hasColumnMenu: false,
        cell: () => <MoreMenuCell onMenuClick={() => alert('Row action clicked')} />,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#667085' }}>
          Click on any column header (e.g. <strong>Trade Reference</strong>, <strong>Counterparty</strong>, <strong>Instrument</strong>, or <strong>Volume / Amount</strong>) to toggle the contextual <code>ColumnMenu</code> popover.
        </p>
        <Table
          data={sampleTrades}
          columns={columns}
          pagination
          pageSize={5}
          totalItems={25}
        />
      </div>
    );
  },
};

// ─── 7. Empty State ───────────────────────────────────────────────────────────

export const EmptyState: Story = {
  render: () => (
    <Table
      data={[]}
      columns={[
        { id: '1', header: 'Reference' },
        { id: '2', header: 'Counterparty' },
        { id: '3', header: 'Instrument' },
        { id: '4', header: 'Volume', align: 'right' },
      ]}
      emptyTitle="No Data Available"
      emptyMessage="No Orders Available"
      emptyDescription="Try clearing active filters or searching for a different dealer counterparty."
    />
  ),
};
