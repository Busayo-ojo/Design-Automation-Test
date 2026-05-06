import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';
import type { ButtonGroupState, ButtonGroupIcon } from './ButtonGroup';

const meta: Meta<typeof ButtonGroupItem> = {
  title: 'Elements/Tabbed Buttons',
  component: ButtonGroupItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['first', 'middle', 'last', 'more'],
      description: 'Position within the group — controls border radius',
    },
    state: {
      control: 'select',
      options: ['regular', 'hover', 'focused', 'disabled'],
      description: 'Visual state of the button segment',
    },
    icon: {
      control: 'select',
      options: ['left+right icon', 'left-icon', 'right-icon', 'None'],
      description: 'Which icon(s) to show',
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroupItem>;

// ── Helpers ──────────────────────────────────────────────────────────────────

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--color-neutral-500, #667185)',
  marginBottom: 8,
  textTransform: 'capitalize' as const,
};

const col: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 8,
};

// ── Default (interactive single segment) ────────────────────────────────────

export const Default: Story = {
  args: {
    style: 'first',
    state: 'regular',
    icon: 'left+right icon',
    label: 'First',
  },
};

// ── Assembled Group (interactive — controls affect all segments) ──────────

export const Group: Story = {
  name: 'Assembled Group',
  args: {
    state: 'regular',
    icon: 'left+right icon',
  },
  argTypes: {
    style: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args) => (
    <ButtonGroup>
      <ButtonGroupItem {...args} style="first" label="First" />
      <ButtonGroupItem {...args} style="middle" label="Middle" />
      <ButtonGroupItem {...args} style="more" label="+More" />
      <ButtonGroupItem {...args} style="last" label="Last" />
    </ButtonGroup>
  ),
};

// ── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: { layout: 'padded' },
  render: () => {
    const states: ButtonGroupState[] = ['regular', 'hover', 'focused', 'disabled'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {states.map((state) => (
          <div key={state} style={col}>
            <span style={sectionLabel}>{state}</span>
            <ButtonGroup>
              <ButtonGroupItem style="first" state={state} icon="left+right icon" label="First" />
              <ButtonGroupItem style="middle" state={state} icon="left+right icon" label="Middle" />
              <ButtonGroupItem style="more" state={state} icon="left+right icon" label="+More" />
              <ButtonGroupItem style="last" state={state} icon="left+right icon" label="Last" />
            </ButtonGroup>
          </div>
        ))}
      </div>
    );
  },
};

// ── Icon Variants ────────────────────────────────────────────────────────────

export const IconVariants: Story = {
  name: 'Icon Variants',
  parameters: { layout: 'padded' },
  render: () => {
    const icons: ButtonGroupIcon[] = ['left+right icon', 'right-icon', 'left-icon', 'None'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {icons.map((icon) => (
          <div key={icon} style={col}>
            <span style={sectionLabel}>{icon}</span>
            <ButtonGroup>
              <ButtonGroupItem style="first" state="regular" icon={icon} label="First" />
              <ButtonGroupItem style="middle" state="regular" icon={icon} label="Middle" />
              <ButtonGroupItem style="more" state="regular" icon={icon} label="+More" />
              <ButtonGroupItem style="last" state="regular" icon={icon} label="Last" />
            </ButtonGroup>
          </div>
        ))}
      </div>
    );
  },
};

// ── All Variants (matches Figma grid) ────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { layout: 'padded' },
  render: () => {
    const states: ButtonGroupState[] = ['regular', 'hover', 'focused', 'disabled'];
    const icons: ButtonGroupIcon[] = ['left+right icon', 'right-icon', 'left-icon', 'None'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)' }}>
        {states.map((state) => (
          <div key={state} style={col}>
            <span style={{ ...sectionLabel, fontSize: 13 }}>{state}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {icons.map((icon) => (
                <ButtonGroup key={icon}>
                  <ButtonGroupItem style="first" state={state} icon={icon} label="First" />
                  <ButtonGroupItem style="middle" state={state} icon={icon} label="Middle" />
                  <ButtonGroupItem style="more" state={state} icon={icon} label="+More" />
                  <ButtonGroupItem style="last" state={state} icon={icon} label="Last" />
                </ButtonGroup>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
