import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppLayout } from './AppLayout';

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/✨ AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen', // crucial for full page layout stories
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

const DummySidebar = () => (
  <div style={{ padding: '24px', height: '100%' }}>Sidebar Content</div>
);

const DummyTopbar = () => (
  <div style={{ padding: '0 24px', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>Topbar Content</div>
);

export const Default: Story = {
  args: {
    sidebar: <DummySidebar />,
    topbar: <DummyTopbar />,
    children: (
      <div style={{ 
        border: '2px dashed var(--color-grey-deactivated, #e4e7ec)', 
        borderRadius: '8px', 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexGrow: 1
      }}>
        Main Page Content Area
      </div>
    )
  }
};
