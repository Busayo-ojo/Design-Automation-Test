import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Sidebar,
  SidebarSection,
  SidebarMenuItem,
  SidebarSubMenuItem,
  SidebarAccountMenu,
  type SidebarTheme,
  type SubMenuItemState,
  type SubMenuItemTheme,
} from './Sidebar';
import { Icon } from '../../foundations/icons';
import defaultAvatar from '../../assets/avatar-marvin.png';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/🍺 Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sidebar navigation column matching Figma "✤ Sidebars" (347:10108 & 3167:145002). Supports Variant 1 (Logo top, Profile bottom) & Variant 2 (Profile top, Logo bottom), 4 color themes (Light, Blue, Dark Blue, Dark Grey), Collapsed state (82px icon-only with align-justify hamburger toggle), multi-layered expandable menus, search input, and account flyout menu.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['1', '2'],
      description: 'Sidebar structure variant: 1 (Logo top) or 2 (Profile top)',
    },
    theme: {
      control: 'select',
      options: ['light', 'blue', 'dark-blue', 'dark-grey'],
      description: 'Color theme token mapping',
    },
    state: {
      control: 'select',
      options: ['default', 'collapsed'],
      description: 'Expanded (272px) vs Collapsed (82px)',
    },
    hasSearch: {
      control: 'boolean',
      description: 'Toggle search input visibility',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search placeholder text',
    },
    collapsed: { table: { disable: true } },
    onToggleCollapse: { table: { disable: true } },
    activeId: { table: { disable: true } },
    onActiveChange: { table: { disable: true } },
    searchValue: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    logo: { table: { disable: true } },
    profile: { table: { disable: true } },
    user: { table: { disable: true } },
    footerSection: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    variant: '1',
    theme: 'light',
    state: 'default',
    hasSearch: true,
    searchPlaceholder: 'Search',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// ─── Helper for Demo Sidebars ────────────────────────────────────────────────

const renderDemoSections = (theme: SidebarTheme, prefix = '') => (
  <>
    <SidebarSection title="Section Title" theme={theme}>
      <SidebarMenuItem
        id={`${prefix}m1`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m2`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m3`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m4`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m5`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
    </SidebarSection>

    <SidebarSection title="Section Title" theme={theme} hasDivider>
      <SidebarMenuItem
        id={`${prefix}m6`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m7`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m8`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m9`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
    </SidebarSection>

    <SidebarSection title="Section Title" theme={theme}>
      <SidebarMenuItem
        id={`${prefix}m10`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
      <SidebarMenuItem
        id={`${prefix}m11`}
        theme={theme}
        label="Menu title"
        icon={<Icon name="hashtag" variant="linear" size={20} />}
        counter={10}
      />
    </SidebarSection>
  </>
);

// ─── 1. All Figma Variants Matrix (Canvas 347:10108 Exact Replica) ───────────

export const AllFigmaVariantsMatrix: Story = {
  name: 'Canvas / All Figma Variants Matrix',
  render: () => {
    const themes: SidebarTheme[] = ['light', 'blue', 'dark-blue', 'dark-grey'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '64px',
          padding: '40px',
          backgroundColor: '#0D1424',
          minHeight: '100vh',
          overflowX: 'auto',
        }}
      >
        <div>
          <h2 style={{ color: '#FFFFFF', margin: '0 0 8px 0', fontFamily: 'var(--font-family-primary)' }}>
            Figma &quot;✤ Sidebars&quot; Complete Matrix (Node 347:10108)
          </h2>
          <p style={{ color: 'var(--color-primary-75)', margin: 0, fontSize: '14px' }}>
            Direct 1:1 replica of the 8 canonical sidebar variants across all 4 themes (Light, Blue, Dark Blue with gold icons, Dark Grey) in both Default (272px) and Collapsed (82px) states.
          </p>
        </div>

        {/* Row 1: Variant 1 (Logo top, Profile bottom) */}
        <div>
          <h3 style={{ color: 'var(--color-secondary-300)', marginBottom: '16px', fontFamily: 'var(--font-family-primary)' }}>
            Row 1: Variant 1 (Brand Logo Top, User Profile Bottom)
          </h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            {themes.map(theme => (
              <div key={`v1-${theme}`} style={{ display: 'flex', gap: '16px' }}>
                {/* Default 272px */}
                <div style={{ width: '272px', height: '960px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden' }}>
                  <Sidebar
                    variant="1"
                    theme={theme}
                    state="default"
                    activeId={`v1-${theme}-m1`}
                  >
                    {renderDemoSections(theme, `v1-${theme}-`)}
                  </Sidebar>
                </div>

                {/* Collapsed 82px */}
                <div style={{ width: '82px', height: '960px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden' }}>
                  <Sidebar
                    variant="1"
                    theme={theme}
                    state="collapsed"
                    activeId={`v1-${theme}-c-m1`}
                  >
                    {renderDemoSections(theme, `v1-${theme}-c-`)}
                  </Sidebar>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Variant 2 (Profile top, Logo bottom) */}
        <div>
          <h3 style={{ color: 'var(--color-secondary-300)', marginBottom: '16px', fontFamily: 'var(--font-family-primary)' }}>
            Row 2: Variant 2 (User Profile Top with Chevron, Brand Logo Bottom)
          </h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            {themes.map(theme => (
              <div key={`v2-${theme}`} style={{ display: 'flex', gap: '16px' }}>
                {/* Default 272px */}
                <div style={{ width: '272px', height: '960px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden' }}>
                  <Sidebar
                    variant="2"
                    theme={theme}
                    state="default"
                    activeId={`v2-${theme}-m1`}
                  >
                    {renderDemoSections(theme, `v2-${theme}-`)}
                  </Sidebar>
                </div>

                {/* Collapsed 82px */}
                <div style={{ width: '82px', height: '960px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden' }}>
                  <Sidebar
                    variant="2"
                    theme={theme}
                    state="collapsed"
                    activeId={`v2-${theme}-c-m1`}
                  >
                    {renderDemoSections(theme, `v2-${theme}-c-`)}
                  </Sidebar>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ─── 2. Menu Item Cells Matrix (Figma 2437:56486) ───────────────────────────

export const MenuItemCells: Story = {
  name: 'Cells / Menu Item Matrix',
  render: () => {
    const themes: { id: SidebarTheme; label: string; cardBg: string }[] = [
      { id: 'light', label: 'Theme: Light', cardBg: '#FFFFFF' },
      { id: 'blue', label: 'Theme: Secondary Blue', cardBg: '#012657' },
      { id: 'dark-blue', label: 'Theme: Dark Blue', cardBg: '#001633' },
      { id: 'dark-grey', label: 'Theme: Dark Grey', cardBg: '#101928' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-primary)' }}>
            Sidebar / Menu Item Cells (Figma 2437:56486)
          </h3>
          <p style={{ margin: 0, color: 'var(--color-neutral-500)', fontSize: '14px' }}>
            Base component set with 36 variants covering Type (Default, Multi-Layered with 6 Sub-Items, Icon-Only) and State (Default, Hover, Selected) across all 4 themes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {themes.map(({ id: theme, label, cardBg }) => {
            const isDark = theme !== 'light';

            return (
              <div
                key={theme}
                style={{
                  backgroundColor: cardBg,
                  padding: '20px',
                  borderRadius: '12px',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid var(--color-neutral-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: isDark ? 'var(--color-neutral-300)' : 'var(--color-neutral-500)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {label}
                </span>

                {/* 1. Default Text Menu Item States */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-neutral-400)' }}>
                    Type: Default (Default, Hover, Selected)
                  </span>
                  <SidebarMenuItem
                    id={`cell-def-${theme}`}
                    theme={theme}
                    state="default"
                    label="Menu title"
                    icon={<Icon name="hashtag" variant="linear" size={20} />}
                    counter={10}
                  />
                  <SidebarMenuItem
                    id={`cell-hov-${theme}`}
                    theme={theme}
                    state="hover"
                    label="Menu title"
                    icon={<Icon name="hashtag" variant="linear" size={20} />}
                    counter={10}
                  />
                  <SidebarMenuItem
                    id={`cell-sel-${theme}`}
                    theme={theme}
                    state="selected"
                    selected
                    label="Menu title"
                    icon={<Icon name="hashtag" variant="linear" size={20} />}
                    counter={10}
                  />
                </div>

                {/* 2. Multi-Layered with 6 Sub-Menu Items (Figma Frame 3) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-neutral-400)' }}>
                    Type: Multi-Layered (Selected with 6 Sub-Items)
                  </span>
                  <SidebarMenuItem
                    id={`cell-multi-${theme}`}
                    theme={theme}
                    type="multi-layered"
                    state="selected"
                    selected
                    label="Menu title"
                    icon={<Icon name="hashtag" variant="linear" size={20} />}
                    counter={10}
                    defaultExpanded
                    subItems={
                      <>
                        <SidebarSubMenuItem id={`sub-1-${theme}`} label="Sub menu 1" theme={theme} state="selected" selected />
                        <SidebarSubMenuItem id={`sub-2-${theme}`} label="Sub menu 2" theme={theme} state="default" />
                        <SidebarSubMenuItem id={`sub-3-${theme}`} label="Sub menu 3" theme={theme} state="default" />
                        <SidebarSubMenuItem id={`sub-4-${theme}`} label="Sub menu 4" theme={theme} state="default" />
                        <SidebarSubMenuItem id={`sub-5-${theme}`} label="Sub menu 5" theme={theme} state="default" />
                        <SidebarSubMenuItem id={`sub-6-${theme}`} label="Sub menu 6" theme={theme} state="default" />
                      </>
                    }
                  />
                </div>

                {/* 3. Icon-Only States (Default, Hover, Selected) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-neutral-400)' }}>
                    Type: Icon-Only (Default, Hover, Selected)
                  </span>
                  <SidebarMenuItem
                    id={`cell-icon-def-${theme}`}
                    theme={theme}
                    type="icon-only"
                    state="default"
                    icon={<Icon name="hashtag" variant="linear" size={20} />}
                  />
                  <SidebarMenuItem
                    id={`cell-icon-hov-${theme}`}
                    theme={theme}
                    type="icon-only"
                    state="hover"
                    icon={<Icon name="hashtag" variant="linear" size={20} />}
                  />
                  <SidebarMenuItem
                    id={`cell-icon-sel-${theme}`}
                    theme={theme}
                    type="icon-only"
                    state="selected"
                    selected
                    icon={<Icon name="hashtag" variant="linear" size={20} />}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

// ─── 3. Sub-Menu Item Cells Matrix (Figma 2437:57101) ───────────────────────

export const SubMenuItemCells: Story = {
  name: 'Cells / Sub-Menu Item Matrix',
  render: () => {
    const themes: { id: SubMenuItemTheme; label: string; cardBg: string }[] = [
      { id: 'light', label: 'Theme: Light', cardBg: '#FFFFFF' },
      { id: 'secondary blue', label: 'Theme: Secondary Blue', cardBg: '#012657' },
      { id: 'dark blue', label: 'Theme: Dark Blue', cardBg: '#001633' },
      { id: 'dark', label: 'Theme: Dark', cardBg: '#101928' },
    ];

    const states: { id: SubMenuItemState; label: string }[] = [
      { id: 'default', label: 'state=default' },
      { id: 'selected', label: 'state=selected' },
      { id: 'disabled', label: 'state=disabled' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-primary)' }}>
            Sidebar / Sub-Menu Item Atom (Figma 2437:57101)
          </h3>
          <p style={{ margin: 0, color: 'var(--color-neutral-500)', fontSize: '14px' }}>
            Base component set with 12 variants (3 states × 4 themes). Dimensions: 240px × 44px, 48px left indent, 4px radius, 14px DM Sans Regular text.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {themes.map(({ id: themeId, label: themeLabel, cardBg }) => {
            const isDark = themeId !== 'light';

            return (
              <div
                key={themeId}
                style={{
                  backgroundColor: cardBg,
                  padding: '20px',
                  borderRadius: '12px',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid var(--color-neutral-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: isDark ? 'var(--color-neutral-300)' : 'var(--color-neutral-500)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {themeLabel}
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {states.map(({ id: stateId, label: stateLabel }) => (
                    <div key={stateId} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-neutral-500)',
                        }}
                      >
                        {stateLabel}
                      </span>
                      <SidebarSubMenuItem
                        id={`sub-${themeId}-${stateId}`}
                        label="Search"
                        theme={themeId}
                        state={stateId}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

// ─── 4. Full Sidebar: Variant 1 (Light Theme) ───────────────────────────────

export const Variant1Light: Story = {
  name: 'Variant 1 / Light Theme (Default)',
  render: () => {
    const [active, setActive] = useState('surveillance');

    return (
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F8FAFC' }}>
        <Sidebar
          variant="1"
          theme="light"
          activeId={active}
          onActiveChange={setActive}
          user={{
            name: 'David Eno',
            email: 'david.e@fmdq.ui',
          }}
          footerSection={
            <SidebarSection title="Preferences" hasDivider>
              <SidebarMenuItem
                id="settings"
                label="System Settings"
                icon={<Icon name="settings-2" variant="linear" size={20} />}
              />
            </SidebarSection>
          }
        >
          {renderDemoSections('light', 'v1-l-')}
        </Sidebar>

        <main style={{ flex: 1, padding: '32px', fontFamily: 'var(--font-family-primary)' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-h5)' }}>
            Active Module: <span style={{ color: 'var(--color-primary-700)' }}>{active}</span>
          </h2>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-p-sm)' }}>
            Sidebar demonstrates live state synchronisation with full design system token adherence.
          </p>
        </main>
      </div>
    );
  },
};

// ─── 5. Full Sidebar: Variant 1 (Dark Blue Theme) ───────────────────────────

export const Variant1DarkBlue: Story = {
  name: 'Variant 1 / Dark Blue Theme',
  render: () => {
    const [active, setActive] = useState('v1-db-m1');

    return (
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#07101E' }}>
        <Sidebar
          variant="1"
          theme="dark-blue"
          activeId={active}
          onActiveChange={setActive}
          user={{
            name: 'David Eno',
            email: 'david.e@fmdq.ui',
          }}
        >
          {renderDemoSections('dark-blue', 'v1-db-')}
        </Sidebar>

        <main style={{ flex: 1, padding: '32px', fontFamily: 'var(--font-family-primary)', color: '#FFFFFF' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-h5)' }}>
            Dark Blue Theme with Gold Icons
          </h2>
          <p style={{ color: 'var(--color-primary-75)', fontSize: 'var(--font-size-p-sm)' }}>
            Official FMDQ Gold (#CC9933) icon strokes active on dark blue backgrounds matching Figma 3167:145002.
          </p>
        </main>
      </div>
    );
  },
};

// ─── 6. Full Sidebar: Variant 2 (Profile Top) ───────────────────────────────

export const Variant2ProfileTop: Story = {
  name: 'Variant 2 / Profile Top',
  render: () => {
    const [active, setActive] = useState('v2-l-m1');

    return (
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F8FAFC' }}>
        <Sidebar
          variant="2"
          theme="light"
          activeId={active}
          onActiveChange={setActive}
          user={{
            name: 'David Eno',
            email: 'david.e@fmdq.ui',
          }}
        >
          {renderDemoSections('light', 'v2-l-')}
        </Sidebar>

        <main style={{ flex: 1, padding: '32px', fontFamily: 'var(--font-family-primary)' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-h5)' }}>
            Variant 2: Top Profile with Chevron Selector, Bottom Brand Logo
          </h2>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-p-sm)' }}>
            Figma Variant 2 places the user identity card in the header and FMDQ branding at the bottom footer.
          </p>
        </main>
      </div>
    );
  },
};

export const Variant2DarkBlue: Story = {
  name: 'Variant 2 / Dark Blue Theme (DRP)',
  render: () => {
    const [active, setActive] = useState('dashboard');

    return (
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F9FAFB', padding: '16px', boxSizing: 'border-box' }}>
        <Sidebar
          variant="2"
          theme="dark-blue"
          activeId={active}
          onActiveChange={setActive}
          user={{
            name: 'Marvin Marvin Ogah',
            email: 'MSG Admin',
            avatarSrc: defaultAvatar,
          }}
          footerSection={
            <SidebarSection title="Administration" theme="dark-blue">
              <SidebarMenuItem
                id="users-members"
                theme="dark-blue"
                label="Users & Members"
                icon={<Icon name="users" variant="bold" size={20} />}
                counter={2}
              />
              <SidebarMenuItem
                id="reference-data"
                theme="dark-blue"
                label="Reference Data"
                icon={<Icon name="calendar" variant="bold" size={20} />}
              />
            </SidebarSection>
          }
        >
          <SidebarSection hasTitle={false} hasDivider theme="dark-blue">
            <SidebarMenuItem
              id="dashboard"
              theme="dark-blue"
              label="Dashboard"
              icon={<Icon name="home" variant="bold" size={20} />}
            />
            <SidebarMenuItem
              id="approvals"
              theme="dark-blue"
              label="Approvals"
              icon={<Icon name="check-circle" variant="bold" size={20} />}
              counter={42}
            />
          </SidebarSection>

          <SidebarSection title="Modules" theme="dark-blue">
            <SidebarMenuItem
              id="benchmark-contributions"
              theme="dark-blue"
              label="Benchmark Contributions"
              icon={<Icon name="chart-up" variant="bold" size={20} />}
              counter={12}
            />
            <SidebarMenuItem
              id="trade-data-reporting"
              theme="dark-blue"
              label="Trade Data Reporting"
              icon={<Icon name="data" variant="bold" size={20} />}
              counter={14}
            />
            <SidebarMenuItem
              id="securities-settlement"
              theme="dark-blue"
              label="Securities & Settlement"
              icon={<Icon name="bank" variant="bold" size={20} />}
              counter={3}
            />
            <SidebarMenuItem
              id="fx-market-data"
              theme="dark-blue"
              label="FX Market Data"
              icon={<Icon name="coin-swap" variant="bold" size={20} />}
              counter={11}
            />
            <SidebarMenuItem
              id="prices"
              theme="dark-blue"
              label="Prices"
              icon={<Icon name="bar-chart-v" variant="bold" size={20} />}
            />
            <SidebarMenuItem
              id="fees-billing"
              theme="dark-blue"
              label="Fees & Billing"
              icon={<Icon name="receipt" variant="bold" size={20} />}
            />
            <SidebarMenuItem
              id="reports"
              theme="dark-blue"
              label="Reports"
              icon={<Icon name="pie-chart" variant="bold" size={20} />}
            />
          </SidebarSection>
        </Sidebar>

        <main style={{ flex: 1, padding: '32px', fontFamily: 'var(--font-family-primary)' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-h5)', color: '#101828' }}>
            Variant 2 Dark Blue (DRP Admin Master)
          </h2>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-p-sm)' }}>
            Matches Figma node 10301:78468: 12px border-radius, #1D326D badge pills, gold bold icons, active item highlight, thin divider, and pinned Administration footer.
          </p>
        </main>
      </div>
    );
  },
};

// ─── 7. Collapsed Sidebar (82px) ─────────────────────────────────────────────

export const CollapsedState: Story = {
  name: 'State / Collapsed (82px)',
  render: () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
      <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-neutral-100)' }}>
        <Sidebar
          variant="1"
          theme="light"
          state={collapsed ? 'collapsed' : 'default'}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          activeId="c-m1"
        >
          {renderDemoSections('light', 'c-')}
        </Sidebar>

        <main style={{ flex: 1, padding: '32px', fontFamily: 'var(--font-family-primary)' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-h5)' }}>
            Collapsed Mode (82px Width)
          </h2>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-p-sm)' }}>
            Click the hamburger button (☰) at the top or the floating collapse arrow to toggle between 82px and 272px.
          </p>
        </main>
      </div>
    );
  },
};

// ─── 8. Account Flyout Menu ──────────────────────────────────────────────────

export const AccountMenuStandalone: Story = {
  name: 'Popover / Account Flyout Menu',
  render: () => (
    <div style={{ padding: '40px', backgroundColor: 'var(--color-neutral-100)', minHeight: '420px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-family-primary)' }}>
        Sidebar / Account Menu (Figma 10322:286059)
      </h3>
      <p style={{ margin: '0 0 20px 0', color: 'var(--color-neutral-500)', fontSize: '14px' }}>
        Flyout menu opened from the profile selector at the top or bottom of the sidebar. Account, security, help actions, and last signed-in timestamp.
      </p>
      <div style={{ width: '248px' }}>
        <SidebarAccountMenu isOpen={true} onClose={() => {}} hasBackdrop={false} />
      </div>
    </div>
  ),
};

export const AccountMenuOpenMsgAdmin: Story = {
  name: 'Variant 2 / Account Menu Open (MSG Admin)',
  render: () => (
    <div style={{ display: 'flex', width: '272px', height: '100vh', backgroundColor: '#001633' }}>
      <Sidebar
        variant="2"
        theme="dark-blue"
        defaultAccountMenuOpen={true}
        user={{
          name: 'Marvin Marvin Ogah',
          email: 'MSG Admin',
          avatarSrc: defaultAvatar,
        }}
        hasSearch={true}
      >
        <SidebarMenuItem
          id="dashboard"
          theme="dark-blue"
          label="Dashboard"
          icon={<Icon name="home" variant="bold" size={20} />}
        />
        <SidebarMenuItem
          id="approvals"
          theme="dark-blue"
          label="Approvals"
          icon={<Icon name="check-circle" variant="bold" size={20} />}
          counter={42}
        />
      </Sidebar>
    </div>
  ),
};

// ─── 9. Interactive Playground ───────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: '1',
    theme: 'light',
    state: 'default',
    hasSearch: true,
    searchPlaceholder: 'Search',
  },
  render: args => {
    const isCollapsed = args.state === 'collapsed';
    const currentTheme = (args.theme as SidebarTheme) || 'light';
    const isDark = currentTheme !== 'light';

    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          backgroundColor: isDark ? '#0D1424' : '#F8FAFC',
          transition: 'background-color 0.2s ease',
        }}
      >
        <Sidebar
          {...args}
          variant={args.variant}
          theme={currentTheme}
          state={args.state}
          collapsed={isCollapsed}
          hasSearch={args.hasSearch}
          searchPlaceholder={args.searchPlaceholder}
          activeId="p-m1"
        >
          {renderDemoSections(currentTheme, 'p-')}
        </Sidebar>

        <main
          style={{
            flex: 1,
            padding: '32px',
            fontFamily: 'var(--font-family-primary)',
            color: isDark ? '#FFFFFF' : '#101928',
          }}
        >
          <h2 style={{ margin: '0 0 8px 0' }}>Sidebar Playground</h2>
          <p style={{ margin: '0 0 24px 0', color: isDark ? 'var(--color-primary-75)' : 'var(--color-neutral-500)' }}>
            Use the Storybook controls below to inspect variants, themes, and states dynamically.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'var(--color-neutral-100)',
              fontSize: '14px',
            }}
          >
            <div><strong>Variant:</strong> {args.variant}</div>
            <div><strong>Theme:</strong> {args.theme}</div>
            <div><strong>State:</strong> {args.state} ({isCollapsed ? '82px Collapsed' : '272px Default'})</div>
            <div><strong>Search:</strong> {args.hasSearch ? 'Visible' : 'Hidden'}</div>
          </div>
        </main>
      </div>
    );
  },
};
