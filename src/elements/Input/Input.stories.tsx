import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { InputDropdown } from './InputDropdown';

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
  title: 'Elements/🔠 Input',
  component: Input,
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

// ─── Input Dropdown Stories (Merged from Dropdown / Selectors) ──────────────
export const InputDropdownNative: Story = {
  name: 'Input Dropdown (Native Select)',
  args: {
    state: 'input dropdown',
    label: 'Select Option',
    placeholder: 'Choose an option...',
    hasLeftIcon: true,
  },
};

export const InputDropdownRich: StoryObj<typeof InputDropdown> = {
  name: 'Input Dropdown / Playground',
  render: (args) => (
    <InputDropdown
      {...args}
      options={[
        { value: 'acc-1', label: 'Treasury Operations', sublabel: 'Operating Account •••• 4912' },
        { value: 'acc-2', label: 'Fixed Income Clearing', sublabel: 'Settlement Account •••• 8821' },
        { value: 'acc-3', label: 'FX Liquidity Desk', sublabel: 'Collateral Account •••• 1043' },
      ]}
    />
  ),
  args: {
    type: 'default',
    state: 'default',
    size: 'lg',
    label: 'Select Account',
    placeholder: 'Choose an operational account',
    hasLabel: true,
    hasHelperText: true,
    helperText: 'Select the primary account to debit',
  },
};

export const InputDropdownStates: StoryObj<typeof InputDropdown> = {
  name: 'Input Dropdown / All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '375px' }}>
      <div>
        <span style={sectionLabel}>1. Default State (Grey-300 border)</span>
        <InputDropdown
          label="Label"
          placeholder="Placeholder"
          state="default"
          options={[{ value: '1', label: 'Option 1' }]}
        />
      </div>

      <div>
        <span style={sectionLabel}>2. Hover State (Primary-600 border)</span>
        <InputDropdown
          label="Label"
          placeholder="Placeholder"
          state="hover"
          options={[{ value: '1', label: 'Option 1' }]}
        />
      </div>

      <div>
        <span style={sectionLabel}>3. Active State (Primary-600 border + 4px focus ring)</span>
        <InputDropdown
          label="Label"
          placeholder="Placeholder"
          state="active"
          options={[{ value: '1', label: 'Option 1' }]}
        />
      </div>

      <div>
        <span style={sectionLabel}>4. Filled State</span>
        <InputDropdown
          label="Label"
          placeholder="Placeholder"
          state="filled"
          defaultValue="filled-val"
          options={[{ value: 'filled-val', label: 'Selected Treasury Account' }]}
        />
      </div>

      <div>
        <span style={sectionLabel}>5. Disabled State (Grey-100 fill)</span>
        <InputDropdown
          label="Label"
          placeholder="Placeholder"
          state="disabled"
          disabled
          options={[{ value: '1', label: 'Option 1' }]}
        />
      </div>
    </div>
  ),
};

export const InputDropdownVariants: StoryObj<typeof InputDropdown> = {
  name: 'Input Dropdown / Variants Gallery',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 360px)', gap: '28px' }}>
      <div>
        <span style={sectionLabel}>Type: Default</span>
        <InputDropdown
          type="default"
          label="Standard Selector"
          placeholder="Placeholder"
          hasHelperText
          helperText="Standard text-only selector"
          options={[{ value: '1', label: 'Option 1' }]}
        />
      </div>

      <div>
        <span style={sectionLabel}>Type: Icon Leading</span>
        <InputDropdown
          type="icon leading"
          label="Search Filter"
          placeholder="Select market sector"
          hasHelperText
          helperText="Leading icon prefix"
          options={[{ value: '1', label: 'Money Market' }]}
        />
      </div>

      <div>
        <span style={sectionLabel}>Type: Avatar Leading</span>
        <InputDropdown
          type="avatar leading"
          label="Assigned Authoriser"
          placeholder="Select a member"
          hasHelperText
          helperText="Leading user identity avatar"
          options={[{ value: '1', label: 'David Eno' }]}
        />
      </div>

      <div>
        <span style={sectionLabel}>Type: Status</span>
        <InputDropdown
          type="status"
          label="Gateway Status"
          placeholder="Select gateway"
          hasHelperText
          helperText="Live connectivity indicator"
          statusColor="#04802E"
          options={[{ value: '1', label: 'Primary Gateway (Active)' }]}
        />
      </div>
    </div>
  ),
};

export const InputDropdownRichMenu: StoryObj<typeof InputDropdown> = {
  name: 'Input Dropdown / Extended Menu',
  render: () => (
    <div style={{ width: '375px', minHeight: '320px' }}>
      <InputDropdown
        label="Select Department"
        extended={true}
        defaultValue="fx"
        options={[
          { value: 'fi', label: 'Fixed Income', sublabel: 'Treasury Bills, Bonds, Repo' },
          { value: 'fx', label: 'Foreign Exchange', sublabel: 'Spot, Forwards, Swaps' },
          { value: 'mm', label: 'Money Market', sublabel: 'NIBOR, Call, Term placements' },
          { value: 'risk', label: 'Market Risk', sublabel: 'Surveillance & Limit Monitoring', disabled: true },
        ]}
      />
    </div>
  ),
};

// ─── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
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
