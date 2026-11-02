import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import type { TabsProps } from './Tabs';
import { Icon } from '../../foundations/icons/Icon';

const meta: Meta<TabsProps & { hasIcon?: boolean, hasNumberTag?: boolean }> = {
  title: 'Components/🗂️ Tabs',
  component: Tabs,
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

export const Playground: Story = {
  args: {
    defaultValue: 'home',
    style: 'Line',
    fullWidth: false,
    hasIcon: true,
    hasNumberTag: true,
  },
  render: ({ hasIcon, hasNumberTag, ...args }) => (
    <Tabs {...args as TabsProps}>
      <TabList>
        <Tab
          value="home"
          hasIcon={hasIcon}
          icon={<Icon name="home-alt" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          Home
        </Tab>
        <Tab
          value="notifications"
          hasIcon={hasIcon}
          icon={<Icon name="bell" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="12"
        >
          Notifications
        </Tab>
        <Tab
          value="settings"
          hasIcon={hasIcon}
          icon={<Icon name="settings" variant="linear" />}
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
    defaultValue: 'overview',
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
          icon={<Icon name="home-alt" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          Overview
        </Tab>
        <Tab
          value="analytics"
          hasIcon={hasIcon}
          icon={<Icon name="chart" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="12"
        >
          Analytics
        </Tab>
        <Tab
          value="reports"
          hasIcon={hasIcon}
          icon={<Icon name="file-alt" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="0"
        >
          Reports
        </Tab>
        <Tab value="settings" hasIcon={hasIcon} icon={<Icon name="settings" variant="linear" />}>
          Settings
        </Tab>
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
          icon={<Icon name="user" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          Account
        </Tab>
        <Tab
          value="tab2"
          hasIcon={hasIcon}
          icon={<Icon name="lock" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="12"
        >
          Password
        </Tab>
        <Tab
          value="tab3"
          hasIcon={hasIcon}
          icon={<Icon name="settings-2" variant="linear" />}
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
          icon={<Icon name="home-alt" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="1"
        >
          First
        </Tab>
        <Tab
          value="tab2"
          hasIcon={hasIcon}
          icon={<Icon name="bell" variant="linear" />}
          hasNumberTag={hasNumberTag}
          numberTag="2"
        >
          Second
        </Tab>
        <Tab
          value="tab3"
          hasIcon={hasIcon}
          icon={<Icon name="globe" variant="linear" />}
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
