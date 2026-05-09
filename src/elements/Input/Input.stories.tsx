import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

// ─── Shared label style for section headers ────────────────────────────────
const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-neutral-500, #667185)',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '8px',
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '32px',
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
};

// ─── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Input> = {
  title: 'Elements/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Variant axes
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'typing', 'filled', 'success', 'error', 'read only', 'input dropdown'],
      description: 'Visual state of the input — maps 1:1 to Figma states',
      table: { category: 'Variant' },
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg', 'xl'],
      description: 'Size: sm (36px), lg (56px), or xl (80px+ expandable textarea)',
      table: { category: 'Variant' },
    },
    // Boolean controls — matching Figma boolean properties exactly
    hasLabel: {
      control: 'boolean',
      description: 'Show / hide the label — Figma "has label"',
      table: { category: 'Boolean Controls' },
    },
    hasHelperText: {
      control: 'boolean',
      description: 'Show / hide helper / status text — Figma "has helper text"',
      table: { category: 'Boolean Controls' },
    },
    hasLeftIcon: {
      control: 'boolean',
      description: 'Show / hide leading icon — Figma "has left-icon"',
      table: { category: 'Boolean Controls' },
    },
    hasRightIcon: {
      control: 'boolean',
      description: 'Show / hide trailing icon — Figma "has right-icon"',
      table: { category: 'Boolean Controls' },
    },
    hasRightLabel: {
      control: 'boolean',
      description: 'Show / hide right add-on label — Figma "has right-label"',
      table: { category: 'Boolean Controls' },
    },
    // Content props
    label: {
      control: 'text',
      description: 'Label text above the input',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text inside the input',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Custom helper / status message (overrides default per state)',
      table: { category: 'Content' },
    },
    rightLabel: {
      control: 'text',
      description: 'Add-on label text shown to the right (e.g. "Add-on")',
      table: { category: 'Content' },
    },
    options: {
      control: 'object',
      description: 'Options for input dropdown state',
      table: { category: 'Content' },
    },
    // Hide internal / irrelevant HTML props
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    disabled: { table: { disable: true } },
    readOnly: { table: { disable: true } },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: undefined,
    rightLabel: 'Add-on',
    hasLabel: true,
    hasHelperText: true,
    hasLeftIcon: true,
    hasRightIcon: true,
    hasRightLabel: false,
    size: 'lg',
    state: 'default',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};


export default meta;
type Story = StoryObj<typeof Input>;

// ─── Default / Playground ──────────────────────────────────────────────────
export const Default: Story = {
  name: 'Playground',
};

export const InputDropdown: Story = {
  name: 'Input Dropdown',
  args: {
    state: 'input dropdown',
    label: 'Select Option',
    placeholder: 'Choose an option...',
    hasLeftIcon: true,
  },
};

// ─── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={gridStyle}>
      <div style={rowStyle}>
        <span style={sectionLabel}>Large (56px)</span>
        <Input size="lg" state="default" />
      </div>
      <div style={rowStyle}>
        <span style={sectionLabel}>Small (36px)</span>
        <Input size="sm" state="default" />
      </div>
      <div style={rowStyle}>
        <span style={sectionLabel}>XL (80px+ textarea)</span>
        <Input size="xl" state="default" style={{ width: '490px' }} />
      </div>
    </div>
  ),
};

// ─── Boolean Controls Showcase ─────────────────────────────────────────────
export const BooleanControls: Story = {
  name: 'Boolean Controls',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={gridStyle}>
      <div style={rowStyle}>
        <span style={sectionLabel}>has label: true / false</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Input size="lg" hasLabel hasHelperText={false} />
          <Input size="lg" hasLabel={false} hasHelperText={false} />
        </div>
      </div>

      <div style={rowStyle}>
        <span style={sectionLabel}>has helper text: true / false</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Input size="lg" hasLabel={false} hasHelperText />
          <Input size="lg" hasLabel={false} hasHelperText={false} />
        </div>
      </div>

      <div style={rowStyle}>
        <span style={sectionLabel}>has left-icon: true / false</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Input size="lg" hasLabel={false} hasHelperText={false} hasLeftIcon />
          <Input size="lg" hasLabel={false} hasHelperText={false} hasLeftIcon={false} />
        </div>
      </div>

      <div style={rowStyle}>
        <span style={sectionLabel}>has right-icon: true / false</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Input size="lg" hasLabel={false} hasHelperText={false} hasRightIcon />
          <Input size="lg" hasLabel={false} hasHelperText={false} hasRightIcon={false} />
        </div>
      </div>

      <div style={rowStyle}>
        <span style={sectionLabel}>has right-label: true / false</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Input size="lg" hasLabel={false} hasHelperText={false} hasRightLabel rightLabel="Add-on" />
          <Input size="lg" hasLabel={false} hasHelperText={false} hasRightLabel={false} />
        </div>
      </div>
    </div>
  ),
};

// ─── States – All Sizes (bottom of nav) ────────────────────────────────────
export const StatesSmall: Story = {
  name: 'All States (Small)',
  parameters: { controls: { disable: true } },
  render: () => {
    const states = [
      'default', 'hover', 'active', 'typing', 'filled',
      'success', 'error', 'read only',
    ] as const;

    return (
      <div style={gridStyle}>
        {states.map((s) => (
          <div key={s} style={rowStyle}>
            <span style={sectionLabel}>{s}</span>
            <Input
              state={s}
              size="sm"
              label="Label"
              placeholder="Placeholder"
              hasLabel
              hasHelperText
              hasLeftIcon
              hasRightIcon
              hasRightLabel={false}
              defaultValue={['filled', 'success', 'error', 'typing', 'active'].includes(s) ? 'Input' : undefined}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const States: Story = {
  name: 'All States (Large)',
  parameters: { controls: { disable: true } },
  render: () => {
    const states = [
      'default', 'hover', 'active', 'typing', 'filled',
      'success', 'error', 'read only', 'input dropdown',
    ] as const;

    return (
      <div style={gridStyle}>
        {states.map((s) => (
          <div key={s} style={rowStyle}>
            <span style={sectionLabel}>{s}</span>
            <Input
              state={s}
              size="lg"
              label="Label"
              placeholder={s === 'input dropdown' ? 'Choose option...' : 'Placeholder'}
              hasLabel
              hasHelperText
              hasLeftIcon
              hasRightIcon
              hasRightLabel={false}
              defaultValue={['filled', 'success', 'error', 'typing', 'active'].includes(s) ? 'Input' : undefined}
              options={s === 'input dropdown' ? [
                { value: '1', label: 'Dropdown Option 1' },
                { value: '2', label: 'Dropdown Option 2' },
              ] : undefined}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const StatesXL: Story = {
  name: 'All States (XL)',
  parameters: { controls: { disable: true } },
  render: () => {
    const states = [
      'default', 'hover', 'active', 'typing', 'filled',
    ] as const;

    return (
      <div style={{ ...gridStyle, width: '490px' }}>
        {states.map((s) => (
          <div key={s} style={rowStyle}>
            <span style={sectionLabel}>{s}</span>
            <Input
              state={s}
              size="xl"
              label="Label"
              placeholder="Type your message here..."
              hasLabel
              hasHelperText
              hasLeftIcon
              hasRightIcon={false}
              hasRightLabel={false}
              defaultValue={['filled', 'typing', 'active'].includes(s) ? 'This is a longer input for detailed text entry.' : undefined}
            />
          </div>
        ))}
      </div>
    );
  },
};
