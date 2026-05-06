import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Elements/Avatars',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['Image', 'Initials', 'Icon'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    statusIcon: {
      control: 'select',
      options: ['None', 'online', 'offline', 'verified'],
    },
    isEditable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    type: 'Image',
    size: 'md',
    statusIcon: 'None',
    imageUrl: 'https://i.pravatar.cc/150?u=1',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
      <Avatar {...args} size="2xl" />
    </div>
  ),
  args: {
    type: 'Image',
    imageUrl: 'https://i.pravatar.cc/150?u=2',
  }
};

export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar {...args} type="Image" imageUrl="https://i.pravatar.cc/150?u=3" />
      <Avatar {...args} type="Initials" initials="JD" />
      <Avatar {...args} type="Icon" />
    </div>
  ),
  args: {
    size: 'lg',
  }
};

export const StatusIndicators: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar {...args} statusIcon="None" />
      <Avatar {...args} statusIcon="online" />
      <Avatar {...args} statusIcon="offline" />
      <Avatar {...args} statusIcon="verified" />
    </div>
  ),
  args: {
    type: 'Image',
    size: 'xl',
    imageUrl: 'https://i.pravatar.cc/150?u=4',
  }
};

export const Editable: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar {...args} size="lg" isEditable />
      <Avatar {...args} size="xl" isEditable />
      <Avatar {...args} size="2xl" isEditable />
    </div>
  ),
  args: {
    type: 'Image',
    imageUrl: 'https://i.pravatar.cc/150?u=5',
  }
};

export const AllVariants: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    const statuses = ['None', 'online', 'offline', 'verified'] as const;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)' }}>
        {statuses.map(status => (
          <div key={status} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>Status: {status}</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {sizes.map(size => (
                <Avatar 
                  key={size} 
                  size={size} 
                  statusIcon={status} 
                  type="Image" 
                  imageUrl={`https://i.pravatar.cc/150?u=${size}${status}`} 
                />
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>Editable (Hover to see)</span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Avatar size="lg" isEditable type="Image" imageUrl="https://i.pravatar.cc/150?u=edit1" />
            <Avatar size="xl" isEditable type="Image" imageUrl="https://i.pravatar.cc/150?u=edit2" />
            <Avatar size="2xl" isEditable type="Image" imageUrl="https://i.pravatar.cc/150?u=edit3" />
          </div>
        </div>
      </div>
    );
  }
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
  fontSize: '14px',
  fontWeight: 600,
  color: 'var(--color-neutral-700, #344054)',
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={labelStyle}>Small Group</span>
        <AvatarGroup size="sm">
          <Avatar size="sm" type="Image" imageUrl="https://i.pravatar.cc/150?u=g1" />
          <Avatar size="sm" type="Image" imageUrl="https://i.pravatar.cc/150?u=g2" />
          <Avatar size="sm" type="Image" imageUrl="https://i.pravatar.cc/150?u=g3" />
          <Avatar size="sm" type="Initials" initials="+5" />
        </AvatarGroup>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={labelStyle}>Medium Group</span>
        <AvatarGroup size="md">
          <Avatar size="md" type="Image" imageUrl="https://i.pravatar.cc/150?u=g4" />
          <Avatar size="md" type="Image" imageUrl="https://i.pravatar.cc/150?u=g5" />
          <Avatar size="md" type="Image" imageUrl="https://i.pravatar.cc/150?u=g6" />
          <Avatar size="md" type="Initials" initials="+3" />
        </AvatarGroup>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={labelStyle}>Large Group</span>
        <AvatarGroup size="lg">
          <Avatar size="lg" type="Image" imageUrl="https://i.pravatar.cc/150?u=g7" />
          <Avatar size="lg" type="Image" imageUrl="https://i.pravatar.cc/150?u=g8" />
          <Avatar size="lg" type="Image" imageUrl="https://i.pravatar.cc/150?u=g9" />
          <Avatar size="lg" type="Initials" initials="+2" />
        </AvatarGroup>
      </div>
    </div>
  )
};
