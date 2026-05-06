import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './index';
import { Button } from '../../elements/Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleItems = [
  { id: '1', label: 'Edit profile', onClick: () => alert('Edit') },
  { id: '2', label: 'View settings', onClick: () => alert('Settings') },
  { id: '3', label: 'Deactivate account', disabled: true },
  { id: '4', label: 'Delete account', destructive: true, onClick: () => alert('Delete') },
];

export const Default: Story = {
  args: {
    trigger: <Button label="Actions (Click Me)" variant="secondary" buttonType="outlined" />,
    items: sampleItems,
  },
};

export const RightAligned: Story = {
  args: {
    align: 'right',
    trigger: <Button label="Aligned Right" variant="primary" />,
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'The dropdown menu opens aligned to the right edge of the trigger.',
      },
    },
  },
};
