import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Text } from './Text';
import { Label } from './Label';

const meta: Meta<typeof Heading> = {
  title: 'Foundations/Typography',
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Primary: Story = {
  args: {
    level: '1',
    children: 'Typography Foundation',
  },
};
