import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';



const meta: Meta<typeof Chip> = {
  title: 'Elements/🍪 Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Input', 'Filter'],
    },
    state: {
      control: 'select',
      options: ['default', 'focused', 'disabled'],
    },
    hasIcon: {
      control: 'boolean',
    },
    hasCloseButton: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  args: {
    label: 'Chip Label',
    type: 'Input',
    state: 'default',
    hasIcon: false,
    hasCloseButton: true,
  },
};

export const Input: Story = {
  args: {
    label: 'Input Chip',
    type: 'Input',
    hasCloseButton: true,
  },
};

export const Filter: Story = {
  args: {
    label: 'Filter Chip',
    type: 'Filter',
    hasIcon: true,
    hasCloseButton: true,
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Chip label="Default" state="default" />
      <Chip label="Focused" state="focused" />
      <Chip label="Disabled" state="disabled" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Chip label="Input" type="Input" />
        <Chip label="Input with Icon" type="Input" hasIcon />
        <Chip label="Input no Close" type="Input" hasCloseButton={false} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Chip label="Filter" type="Filter" />
        <Chip label="Filter Focused" type="Filter" state="focused" />
        <Chip label="Filter Disabled" type="Filter" state="disabled" />
      </div>
    </div>
  ),
};
