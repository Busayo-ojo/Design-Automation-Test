import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import type { TabsProps } from './Tabs';

const meta: Meta<TabsProps & { hasIcon?: boolean, hasNumberTag?: boolean }> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['Line', 'Pill'],
      description: 'The visual style of the tabs',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the tabs should take up the full width of the container',
    },
    hasIcon: { 
      control: 'boolean',
      description: 'Toggle icons for all tabs'
    },
    hasNumberTag: { 
      control: 'boolean',
      description: 'Toggle number tags for all tabs'
    },
  },
  args: {
    hasIcon: false,
    hasNumberTag: false,
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

export const Playground: Story = {
  args: {
    defaultValue: 'home',
    style: 'Line',
    fullWidth: false,
    hasIcon: true,
    hasNumberTag: true,
  },
  argTypes: {
  },
  render: ({ hasIcon, hasNumberTag, ...args }) => (
    <Tabs {...args as TabsProps}>
      <TabList>
        <Tab 
          value="home" 
          hasIcon={hasIcon} 
          icon={<HomeIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          Home
        </Tab>
        <Tab 
          value="notifications" 
          hasIcon={hasIcon} 
          icon={<BellIcon />}
          hasNumberTag={hasNumberTag} 
          numberTag="12"
        >
          Notifications
        </Tab>
        <Tab 
          value="settings" 
          hasIcon={hasIcon} 
          icon={<SettingsIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="0"
        >
          Settings
        </Tab>
      </TabList>
      <TabPanel value="home">Home content dashboard.</TabPanel>
      <TabPanel value="notifications">Your notifications appear here.</TabPanel>
      <TabPanel value="settings">System configuration and preferences.</TabPanel>
    </Tabs>
  )
};

export const LineStyle: Story = {
  args: {
    style: 'Line',
    hasIcon: true,
    hasNumberTag: true,
  },
  render: ({ hasIcon, hasNumberTag, ...args }) => (
    <Tabs {...args as TabsProps}>
      <TabList>
        <Tab 
          value="overview" 
          hasIcon={hasIcon} 
          icon={<HomeIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          Overview
        </Tab>
        <Tab 
          value="analytics"
          hasIcon={hasIcon} 
          icon={<BellIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="12"
        >
          Analytics
        </Tab>
        <Tab 
          value="reports"
          hasIcon={hasIcon} 
          icon={<SettingsIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="0"
        >
          Reports
        </Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">
        <div style={{ padding: '20px 0' }}>Overview content goes here.</div>
      </TabPanel>
      <TabPanel value="analytics">
        <div style={{ padding: '20px 0' }}>Analytics dashboard and charts.</div>
      </TabPanel>
      <TabPanel value="reports">
        <div style={{ padding: '20px 0' }}>Detailed business reports.</div>
      </TabPanel>
      <TabPanel value="settings">
        <div style={{ padding: '20px 0' }}>Account and system settings.</div>
      </TabPanel>
    </Tabs>
  )
};

export const PillStyle: Story = {
  args: {
    defaultValue: 'tab1',
    style: 'Pill',
    hasIcon: true,
    hasNumberTag: true,
  },
  render: ({ hasIcon, hasNumberTag, ...args }) => (
    <Tabs {...args as TabsProps}>
      <TabList>
        <Tab 
          value="tab1"
          hasIcon={hasIcon} 
          icon={<HomeIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          Account
        </Tab>
        <Tab 
          value="tab2"
          hasIcon={hasIcon} 
          icon={<BellIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="12"
        >
          Password
        </Tab>
        <Tab 
          value="tab3"
          hasIcon={hasIcon} 
          icon={<SettingsIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="0"
        >
          Security
        </Tab>
        <Tab value="tab4" disabled>Disabled</Tab>
      </TabList>
      <TabPanel value="tab1">Account settings and profile information.</TabPanel>
      <TabPanel value="tab2">Password change and 2FA options.</TabPanel>
      <TabPanel value="tab3">Security logs and active sessions.</TabPanel>
    </Tabs>
  )
};

export const FullWidth: Story = {
  args: {
    defaultValue: 'tab1',
    style: 'Pill',
    fullWidth: true,
  },
  render: ({ hasIcon, hasNumberTag, ...args }) => (
    <Tabs {...args as TabsProps}>
      <TabList>
        <Tab 
          value="tab1"
          hasIcon={hasIcon} 
          icon={<HomeIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          First
        </Tab>
        <Tab 
          value="tab2"
          hasIcon={hasIcon} 
          icon={<BellIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="2"
        >
          Second
        </Tab>
        <Tab 
          value="tab3"
          hasIcon={hasIcon} 
          icon={<SettingsIcon />}
          hasNumberTag={hasNumberTag}
          numberTag="3"
        >
          Third
        </Tab>
      </TabList>
      <TabPanel value="tab1">Content for the first full-width tab.</TabPanel>
      <TabPanel value="tab2">Content for the second full-width tab.</TabPanel>
      <TabPanel value="tab3">Content for the third full-width tab.</TabPanel>
    </Tabs>
  )
};

