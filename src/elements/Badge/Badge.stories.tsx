import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const MockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

const MockAvatar = () => (
  <img src="https://i.pravatar.cc/100" alt="Avatar" />
);

const meta: Meta<typeof Badge> = {
  title: 'Elements/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'orange', 'success', 'warning', 'error', 'neutral', 'disabled'],
    },
    type: {
      control: 'select',
      options: ['filled', 'accent', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    color: 'blue',
    type: 'filled',
    size: 'md',
  },
};

export const TypesAndColors: Story = {
  render: () => {
    const colors = ['blue', 'orange', 'success', 'warning', 'error', 'neutral', 'disabled'] as const;
    const types = ['filled', 'accent', 'outline'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-family-primary, sans-serif)' }}>
        {types.map((type) => (
          <div key={type} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ width: '80px', textTransform: 'capitalize', fontWeight: 'bold' }}>{type}</span>
            {colors.map((color) => (
              <Badge key={color} color={color} type={type} size="md">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    );
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontFamily: 'var(--font-family-primary, sans-serif)' }}>
      <Badge size="sm">Small Badge</Badge>
      <Badge size="md">Medium Badge</Badge>
      <Badge size="lg">Large Badge</Badge>
    </div>
  )
};

export const WithIconsAndAvatars: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', fontFamily: 'var(--font-family-primary, sans-serif)' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Badge hasLeftIcon leadingIcon={<MockIcon />}>Leading Icon</Badge>
        <Badge hasRightIcon trailingIcon={<MockIcon />}>Trailing Icon</Badge>
        <Badge hasLeftIcon hasRightIcon leadingIcon={<MockIcon />} trailingIcon={<MockIcon />}>Both Icons</Badge>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Badge hasAvatar avatar={<MockAvatar />}>With Avatar</Badge>
        <Badge hasAvatar hasRightIcon avatar={<MockAvatar />} trailingIcon={<MockIcon />}>Avatar & Icon</Badge>
      </div>
    </div>
  )
};
