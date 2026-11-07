import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Pagination,
  PageNumber,
  TruncatedPages,
  PageIndicator,
  NavigationControls,
  PaginationList,
  type PageNumberState,
  type PageNumberShape,
  type PageNumberSize,
  type NavControlStyle,
} from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/📄 Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comprehensive Pagination component suite based 1:1 on Figma page "✤ Pagination" (Node ID: `347:10062`). Includes base elements (PageNumber, TruncatedPages, PageIndicator, NavigationControls), composite row (PaginationList), and the complete responsive navigation bar (Pagination) with 5 variations and 4 alignment options.',
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Active page number (1-indexed)',
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Total number of pages',
    },
    totalItems: {
      control: { type: 'number', min: 10, max: 500 },
      description: 'Total number of items (for entries indicator)',
    },
    pageSize: {
      control: { type: 'number', min: 5, max: 100 },
      description: 'Items displayed per page',
    },
    variation: {
      control: 'radio',
      options: ['1', '2', '3', '4', '5'],
      description:
        'Figma Variations: 1 (Indicator center), 2 (Numbers center), 3 (Left cluster), 4 (Right cluster), 5 (Center cluster)',
    },
    orientation: {
      control: 'radio',
      options: ['full width', 'centre aligned', 'right aligned', 'left aligned'],
      description: 'Bar alignment across viewport or container',
    },
    buttonType: {
      control: 'select',
      options: ['single buttons', 'group button', 'selectors', 'default buttons', 'no buttons'],
      description: 'Navigation control style applied to prev/next triggers',
    },
    shape: {
      control: 'radio',
      options: ['square', 'round'],
      description: 'Page number shape: square (radius 6px) or round (circle)',
    },
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Page number dimensions: small (24px) or large (36px)',
    },
    activeVariant: {
      control: 'radio',
      options: ['active v1', 'active v2'],
      description: 'Active page button look: active v1 (soft blue fill) or active v2 (blue outline)',
    },
    controlStyle: {
      control: 'select',
      options: ['outlined', 'filled-brand', 'filled-dark', 'ghost'],
      description: 'Visual treatment for navigation buttons',
    },
    hasTopDivider: {
      control: 'boolean',
      description: 'Whether to show the top divider line matching Figma property "has top divider" (default: true)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    hasLeftStroke: {
      control: 'boolean',
      description: 'Whether to add 1px Grey/200 left edge matching Figma property "has left stroke" for table footer containment (default: false)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasRightStroke: {
      control: 'boolean',
      description: 'Whether to add 1px Grey/200 right edge matching Figma property "has right stroke" for table footer containment (default: false)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasBottomStroke: {
      control: 'boolean',
      description: 'Whether to add 1px Grey/200 bottom edge matching Figma property "has bottom stroke" for table footer containment (default: false)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showDivider: {
      control: 'boolean',
      description: 'Legacy alias for hasTopDivider',
    },
    prevLabel: {
      control: 'text',
      description: 'Label for Previous text button',
    },
    nextLabel: {
      control: 'text',
      description: 'Label for Next text button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ─── Interactive Playground ──────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage || 1);
    return (
      <div style={{ width: '100%', maxWidth: '880px', margin: '0 auto', padding: '24px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAECF0' }}>
        <div style={{ marginBottom: '16px', fontSize: '13px', color: '#667185' }}>
          <strong>Interactive Controls:</strong> Change pages by clicking page numbers, prev/next buttons, or typing in the selector. Or tweak props in the Controls panel below.
        </div>
        <Pagination
          {...args}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    );
  },
  args: {
    currentPage: 3,
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    variation: '2',
    orientation: 'full width',
    buttonType: 'single buttons',
    shape: 'square',
    size: 'large',
    activeVariant: 'active v1',
    controlStyle: 'outlined',
    hasTopDivider: true,
    hasLeftStroke: false,
    hasRightStroke: false,
    hasBottomStroke: false,
    showDivider: true,
    prevLabel: 'Previous',
    nextLabel: 'Next',
  },
};

// ─── Base Element: Page Number Variants ──────────────────────────────────────

export const BasePageNumbers: StoryObj = {
  render: () => {
    const sizes: PageNumberSize[] = ['large', 'small'];
    const shapes: PageNumberShape[] = ['square', 'round'];
    const states: PageNumberState[] = ['inactive', 'hover', 'active v1', 'active v2'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#101928' }}>Base Element: Page Number (`2608:66376`)</h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#667185' }}>
            12 total Figma variants across 2 sizes (Large 36px, Small 24px), 2 shapes (Square r6, Round r46), and 4 visual states.
          </p>
        </div>

        {sizes.map((sz) => (
          <div key={sz} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ margin: '0', fontSize: '15px', color: '#344054', textTransform: 'capitalize' }}>
              Size: {sz} ({sz === 'large' ? '36×36px, 14px DM Sans' : '24×24px, 12px DM Sans'})
            </h4>
            <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '640px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #EAECF0' }}>
                  <th style={{ padding: '8px 12px', fontSize: '13px', color: '#475367' }}>Shape</th>
                  {states.map((st) => (
                    <th key={st} style={{ padding: '8px 12px', fontSize: '13px', color: '#475367', textTransform: 'capitalize' }}>
                      {st}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shapes.map((shp) => (
                  <tr key={shp} style={{ borderBottom: '1px solid #F0F2F5' }}>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: 600, color: '#1D2739', textTransform: 'capitalize' }}>
                      {shp}
                    </td>
                    {states.map((st) => (
                      <td key={st} style={{ padding: '12px' }}>
                        <PageNumber
                          page={1}
                          size={sz}
                          shape={shp}
                          state={st}
                          isSelected={st.startsWith('active')}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  },
};

// ─── Base Element: Truncated Pages ──────────────────────────────────────────

export const BaseTruncatedPages: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#101928' }}>Base Element: Truncated Pages (`2775:76546`)</h3>
        <p style={{ margin: '0', fontSize: '14px', color: '#667185' }}>
          Ellipsis indicator used when hiding middle page ranges in large lists.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#344054' }}>Large (36px):</span>
          <TruncatedPages size="large" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#344054' }}>Small (24px):</span>
          <TruncatedPages size="small" />
        </div>
      </div>
    </div>
  ),
};

// ─── Base Element: Page Indicators ──────────────────────────────────────────

export const BasePageIndicators: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#101928' }}>Base Element: Page Indicator (`2609:67848`)</h3>
        <p style={{ margin: '0', fontSize: '14px', color: '#667185' }}>
          14px DM Sans SemiBold text indicator showing current page and total entries.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#667185', marginBottom: '4px' }}>Page of Total:</div>
          <PageIndicator currentPage={1} totalPages={30} />
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#667185', marginBottom: '4px' }}>Showing Entries Range:</div>
          <PageIndicator currentPage={2} totalPages={10} totalItems={100} pageSize={10} />
        </div>
      </div>
    </div>
  ),
};

// ─── Base Element: Navigation Controls ──────────────────────────────────────

export const BaseNavigationControls: StoryObj = {
  render: () => {
    const styles: NavControlStyle[] = ['outlined', 'filled-brand', 'filled-dark', 'ghost'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#101928' }}>Base Element: Navigation Controls (`2607:66246`)</h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#667185' }}>
            Figma navigation triggers across 4 control types (Single Buttons, Grouped Buttons, Text Buttons, Selector) and 4 color styles.
          </p>
        </div>

        {/* 1. Single Buttons */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#344054' }}>1. Single Buttons (36×36px)</h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {styles.map((st) => (
              <div key={st} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#667185' }}>{st}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <NavigationControls type="single buttons" styleVariant={st} position="left" />
                  <NavigationControls type="single buttons" styleVariant={st} position="right" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Grouped Buttons */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#344054' }}>2. Grouped Buttons (72×36px linked pair)</h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {styles.map((st) => (
              <div key={st} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#667185' }}>{st}</span>
                <NavigationControls type="grouped buttons" styleVariant={st} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Text Buttons */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#344054' }}>3. Default Text Buttons (Previous / Next)</h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {styles.map((st) => (
              <div key={st} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#667185' }}>{st}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <NavigationControls type="button" styleVariant={st} position="left" prevLabel="Previous" />
                  <NavigationControls type="button" styleVariant={st} position="right" nextLabel="Next" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Page Selector */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#344054' }}>4. Page Selector ("Go to page" input)</h4>
          <NavigationControls
            type="selector"
            currentPage={3}
            totalPages={20}
            onSelectPage={(p) => alert(`Navigating to page ${p}`)}
          />
        </div>
      </div>
    );
  },
};

// ─── Composite Element: Pagination List ──────────────────────────────────────

export const CompositePaginationList: StoryObj = {
  render: () => {
    const InteractiveListDemo = () => {
      const [page1, setPage1] = useState(3);
      const [page2, setPage2] = useState(6);
      const [page3, setPage3] = useState(1);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#101928' }}>Composite: Pagination List (`2767:76342`)</h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#667185' }}>
              Standalone interactive row composed of PageNumber items with intelligent truncation (`…`) and 2px spacing.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#344054', marginBottom: '8px' }}>
              Large Square, Outlined Arrows (Active page: {page1})
            </div>
            <PaginationList
              currentPage={page1}
              totalPages={15}
              onPageChange={setPage1}
              size="large"
              shape="square"
              arrowStyle="outlined"
            />
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#344054', marginBottom: '8px' }}>
              Large Round, Filled Brand Arrows (Active page: {page2})
            </div>
            <PaginationList
              currentPage={page2}
              totalPages={20}
              onPageChange={setPage2}
              size="large"
              shape="round"
              activeVariant="active v2"
              arrowStyle="filled-brand"
            />
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#344054', marginBottom: '8px' }}>
              Small Square, Without Arrows (Active page: {page3})
            </div>
            <PaginationList
              currentPage={page3}
              totalPages={8}
              onPageChange={setPage3}
              size="small"
              shape="square"
              arrowStyle="no arrows"
            />
          </div>
        </div>
      );
    };

    return <InteractiveListDemo />;
  },
};

// ─── Full Composite: Variation 1 (Indicator Center) ──────────────────────────

export const Variation1IndicatorCenter: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ width: '100%', maxWidth: '840px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Pagination
          variation="1"
          currentPage={page}
          totalPages={30}
          totalItems={300}
          pageSize={10}
          buttonType="default buttons"
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// ─── Full Composite: Variation 2 (Numbers Center) ────────────────────────────

export const Variation2NumbersCenter: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    return (
      <div style={{ width: '100%', maxWidth: '840px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Pagination
          variation="2"
          currentPage={page}
          totalPages={16}
          buttonType="single buttons"
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// ─── Full Composite: Variation 3 (Left Aligned Cluster) ──────────────────────

export const Variation3LeftAligned: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return (
      <div style={{ width: '100%', maxWidth: '840px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Pagination
          variation="3"
          orientation="left aligned"
          currentPage={page}
          totalPages={10}
          totalItems={100}
          pageSize={10}
          buttonType="group button"
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// ─── Full Composite: Variation 4 (Right Aligned Cluster) ─────────────────────

export const Variation4RightAligned: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div style={{ width: '100%', maxWidth: '840px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Pagination
          variation="4"
          orientation="right aligned"
          currentPage={page}
          totalPages={12}
          totalItems={120}
          pageSize={10}
          buttonType="single buttons"
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// ─── Full Composite: Variation 5 (Center Aligned Cluster) ────────────────────

export const Variation5CenterAligned: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div style={{ width: '100%', maxWidth: '840px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Pagination
          variation="5"
          orientation="centre aligned"
          currentPage={page}
          totalPages={8}
          totalItems={80}
          pageSize={10}
          buttonType="default buttons"
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// ─── Feature: With Direct Page Selector ──────────────────────────────────────

export const WithPageSelector: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ width: '100%', maxWidth: '840px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Pagination
          variation="2"
          currentPage={page}
          totalPages={25}
          buttonType="selectors"
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// ─── Feature: With Grouped Navigation Buttons ────────────────────────────────

export const WithGroupedButtons: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return (
      <div style={{ width: '100%', maxWidth: '840px', padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
        <Pagination
          variation="2"
          currentPage={page}
          totalPages={10}
          buttonType="group button"
          controlStyle="filled-brand"
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// ─── Real World: Table Footer Integration ────────────────────────────────────

export const TableFooterIntegration: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const sampleRows = [
      { id: 'TRD-9041', time: '10:45:21', symbol: 'FBNH 12.5% 2028', rate: '12.45%', amount: '₦ 250,000,000', status: 'Settled' },
      { id: 'TRD-9042', time: '10:46:02', symbol: 'ZENITH 13.0% 2027', rate: '13.00%', amount: '₦ 120,000,000', status: 'Settled' },
      { id: 'TRD-9043', time: '10:48:33', symbol: 'GTCO 11.8% 2026', rate: '11.80%', amount: '₦ 500,000,000', status: 'Pending' },
      { id: 'TRD-9044', time: '10:50:14', symbol: 'UBA 12.2% 2029', rate: '12.20%', amount: '₦ 180,000,000', status: 'Settled' },
    ];

    return (
      <div
        style={{
          width: '100%',
          maxWidth: '880px',
          background: '#FFFFFF',
          border: '1px solid #E4E7EC',
          borderRadius: '12px',
          boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #EAECF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#101928', fontWeight: 600, fontSize: '16px' }}>Dealing Member Trade Blotter</div>
            <div style={{ color: '#667185', fontSize: '13px' }}>Live settled bond & treasury transactions</div>
          </div>
          <span style={{ background: '#E3EFFC', color: '#1D326D', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
            Viewing Page {page}
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EAECF0', color: '#475367', fontWeight: 500 }}>
              <th style={{ padding: '12px 24px' }}>Trade ID</th>
              <th style={{ padding: '12px 16px' }}>Time</th>
              <th style={{ padding: '12px 16px' }}>Security</th>
              <th style={{ padding: '12px 16px' }}>Yield</th>
              <th style={{ padding: '12px 16px' }}>Notional</th>
              <th style={{ padding: '12px 24px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleRows.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #F0F2F5', color: '#344054' }}>
                <td style={{ padding: '12px 24px', fontWeight: 600, color: '#1D326D' }}>{row.id}</td>
                <td style={{ padding: '12px 16px' }}>{row.time}</td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{row.symbol}</td>
                <td style={{ padding: '12px 16px' }}>{row.rate}</td>
                <td style={{ padding: '12px 16px' }}>{row.amount}</td>
                <td style={{ padding: '12px 24px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: row.status === 'Settled' ? '#E7F6EC' : '#FEF6E7',
                      color: row.status === 'Settled' ? '#099137' : '#CC9933',
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '12px 24px 16px 24px' }}>
          <Pagination
            currentPage={page}
            totalPages={12}
            totalItems={48}
            pageSize={4}
            variation="2"
            buttonType="single buttons"
            onPageChange={setPage}
            showDivider={true}
          />
        </div>
      </div>
    );
  },
};

// ─── Table Footer With Direct 1px Grey/200 Edge Strokes ───────────────────────

export const TableFooterWithStrokes: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1);
    const sampleRows = [
      { id: 'TRD-8821', time: '14:22:05', symbol: 'FGN 12.50 2030', rate: '13.45%', amount: '₦ 500,000,000', status: 'Settled' },
      { id: 'TRD-8822', time: '14:25:30', symbol: 'NTB 04/11/2027', rate: '11.80%', amount: '₦ 120,000,000', status: 'Pending' },
      { id: 'TRD-8823', time: '14:30:12', symbol: 'FGN 14.80 2039', rate: '14.15%', amount: '₦ 850,000,000', status: 'Settled' },
      { id: 'TRD-8824', time: '14:38:45', symbol: 'NTB 12/08/2027', rate: '12.05%', amount: '₦ 300,000,000', status: 'Settled' },
    ];

    return (
      <div style={{ width: '100%', maxWidth: '880px', margin: '0 auto', fontFamily: 'var(--font-family-primary, DM Sans, sans-serif)' }}>
        <div style={{ marginBottom: '16px', fontSize: '13px', color: '#667185' }}>
          <strong>Table Footer Edges (Figma update 11145:275–323):</strong> Pagination sits directly beneath the table with <code>hasTopDivider</code>, <code>hasLeftStroke</code>, <code>hasRightStroke</code>, and <code>hasBottomStroke</code> enabled. It carries no background fill (inheriting the surface beneath it) and wraps seamlessly with 1px Grey/200 borders.
        </div>

        {/* Table itself has 1px Grey/200 border (top, left, right) */}
        <div
          style={{
            width: '100%',
            background: '#FFFFFF',
            border: '1px solid #E4E7EC',
            borderBottom: 'none',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #EAECF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#101928', fontWeight: 600, fontSize: '16px' }}>Settlement Blotter</div>
              <div style={{ color: '#667185', fontSize: '13px' }}>Table footer containment with direct border strokes</div>
            </div>
            <span style={{ background: '#E3EFFC', color: '#1D326D', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
              Page {page} of 10
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EAECF0', color: '#475367', fontWeight: 500 }}>
                <th style={{ padding: '12px 24px' }}>Trade ID</th>
                <th style={{ padding: '12px 16px' }}>Time</th>
                <th style={{ padding: '12px 16px' }}>Security</th>
                <th style={{ padding: '12px 16px' }}>Yield</th>
                <th style={{ padding: '12px 16px' }}>Notional</th>
                <th style={{ padding: '12px 24px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleRows.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #F0F2F5', color: '#344054' }}>
                  <td style={{ padding: '12px 24px', fontWeight: 600, color: '#1D326D' }}>{row.id}</td>
                  <td style={{ padding: '12px 16px' }}>{row.time}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 500 }}>{row.symbol}</td>
                  <td style={{ padding: '12px 16px' }}>{row.rate}</td>
                  <td style={{ padding: '12px 16px' }}>{row.amount}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                        background: row.status === 'Settled' ? '#E7F6EC' : '#FEF6E7',
                        color: row.status === 'Settled' ? '#099137' : '#CC9933',
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination component sits directly below table without wrapper div, closing left, right, bottom borders */}
        <Pagination
          currentPage={page}
          totalPages={10}
          totalItems={40}
          pageSize={4}
          variation="2"
          buttonType="single buttons"
          onPageChange={setPage}
          hasTopDivider={true}
          hasLeftStroke={true}
          hasRightStroke={true}
          hasBottomStroke={true}
          style={{
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            padding: '12px 24px 16px 24px',
          }}
        />
      </div>
    );
  },
};
