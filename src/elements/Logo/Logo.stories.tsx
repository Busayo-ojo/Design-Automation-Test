import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Elements/🏛️ Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Official FMDQ brand logo element, mapped 1:1 from Figma `fmdq-logo` (Node ID: `6769:1811`). Supports Default (transparent background for light surfaces) and Card (white container for dark themes / surfaces).',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'blue', 'dark-blue', 'dark-grey'],
      description: 'Background theme context for the logo',
    },
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Card wrapper (Property 1=DarkBG) vs default transparent (Property 1=Default)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Logo size scale',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const DefaultOnLight: Story = {
  name: 'Default / Light Background',
  args: {
    theme: 'light',
    variant: 'default',
    size: 'md',
  },
  render: args => (
    <div style={{ padding: '32px', background: '#FFFFFF', borderRadius: '8px' }}>
      <Logo {...args} />
    </div>
  ),
};

export const CardOnDarkBlue: Story = {
  name: 'Card / Dark Blue Theme',
  args: {
    theme: 'dark-blue',
    variant: 'card',
    size: 'md',
  },
  render: args => (
    <div style={{ padding: '32px', background: '#001633', borderRadius: '8px' }}>
      <Logo {...args} />
    </div>
  ),
};

export const CardOnSecondaryBlue: Story = {
  name: 'Card / Secondary Blue Theme',
  args: {
    theme: 'blue',
    variant: 'card',
    size: 'md',
  },
  render: args => (
    <div style={{ padding: '32px', background: '#012657', borderRadius: '8px' }}>
      <Logo {...args} />
    </div>
  ),
};

export const CardOnDarkGrey: Story = {
  name: 'Card / Dark Grey Theme',
  args: {
    theme: 'dark-grey',
    variant: 'card',
    size: 'md',
  },
  render: args => (
    <div style={{ padding: '32px', background: '#101928', borderRadius: '8px' }}>
      <Logo {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Size Matrix',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#667185', display: 'block', marginBottom: '8px' }}>Small (18px)</span>
        <Logo size="sm" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#667185', display: 'block', marginBottom: '8px' }}>Medium (24px) - Default</span>
        <Logo size="md" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#667185', display: 'block', marginBottom: '8px' }}>Large (32px)</span>
        <Logo size="lg" />
      </div>
    </div>
  ),
};
