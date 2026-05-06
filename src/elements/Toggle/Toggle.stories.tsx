import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

// ─── Section label style (consistent with other stories) ──────────────
const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-neutral-500, #667185)',
  marginBottom: '4px',
};

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const col: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '24px',
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
};

// ─── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Toggle> = {
  title: 'Elements/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Figma "Type" variant property
    type: {
      control: 'select',
      options: ['Radio', 'Checkbox', 'Checkcircle', 'Switch'],
      description:
        'Control type — maps 1:1 to Figma "Type" variant (Radio | Checkbox | Checkcircle | Switch)',
      table: { category: 'Variant' },
    },
    // Figma "Active" variant property → boolean control
    active: {
      control: 'boolean',
      description:
        'Whether the toggle is active (checked) — maps to Figma "Active=Yes/No" variant',
      table: { category: 'Variant' },
    },
    // Standard HTML boolean controls
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
      table: { category: 'State' },
    },
    // Hide irrelevant HTML props
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    type: 'Radio',
    active: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ─── Playground ────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Playground',
};

// ─── All Types × Active States ─────────────────────────────────────────────
export const AllTypes: Story = {
  name: 'All Types',
  parameters: { controls: { disable: true } },
  render: () => {
    const types = ['Radio', 'Checkbox', 'Checkcircle', 'Switch'] as const;
    return (
      <div style={col}>
        {types.map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={sectionLabel}>{t}</span>
            <div style={row}>
              {/* Active=No */}
              <Toggle type={t} active={false} aria-label={`${t} inactive`} />
              {/* Active=Yes */}
              <Toggle type={t} active={true} aria-label={`${t} active`} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── Active State ──────────────────────────────────────────────────────────
export const ActiveYes: Story = {
  name: 'Active=Yes',
  parameters: { controls: { disable: true } },
  render: () => {
    const types = ['Radio', 'Checkbox', 'Checkcircle', 'Switch'] as const;
    return (
      <div style={col}>
        <span style={sectionLabel}>All types — Active</span>
        <div style={row}>
          {types.map((t) => (
            <Toggle key={t} type={t} active={true} aria-label={`${t} active`} />
          ))}
        </div>
      </div>
    );
  },
};

// ─── Inactive State ────────────────────────────────────────────────────────
export const ActiveNo: Story = {
  name: 'Active=No',
  parameters: { controls: { disable: true } },
  render: () => {
    const types = ['Radio', 'Checkbox', 'Checkcircle', 'Switch'] as const;
    return (
      <div style={col}>
        <span style={sectionLabel}>All types — Inactive</span>
        <div style={row}>
          {types.map((t) => (
            <Toggle key={t} type={t} active={false} aria-label={`${t} inactive`} />
          ))}
        </div>
      </div>
    );
  },
};

// ─── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: 'Disabled',
  parameters: { controls: { disable: true } },
  render: () => {
    const types = ['Radio', 'Checkbox', 'Checkcircle', 'Switch'] as const;
    return (
      <div style={col}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={sectionLabel}>Disabled — Inactive</span>
          <div style={row}>
            {types.map((t) => (
              <Toggle key={t} type={t} active={false} disabled aria-label={`${t} disabled`} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={sectionLabel}>Disabled — Active</span>
          <div style={row}>
            {types.map((t) => (
              <Toggle key={t} type={t} active={true} disabled aria-label={`${t} disabled active`} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ─── Individual type stories ────────────────────────────────────────────────
export const Radio: Story = {
  name: 'Type: Radio',
  args: { type: 'Radio' },
};

export const Checkbox: Story = {
  name: 'Type: Checkbox',
  args: { type: 'Checkbox' },
};

export const Checkcircle: Story = {
  name: 'Type: Checkcircle',
  args: { type: 'Checkcircle' },
};

export const Switch: Story = {
  name: 'Type: Switch',
  args: { type: 'Switch' },
};
