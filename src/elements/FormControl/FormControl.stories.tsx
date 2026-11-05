import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormControl, Checkbox, Radio, Switch, Checkcircle, Toggle } from './FormControl';

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--color-neutral-500, #667185)',
  marginBottom: '6px',
};

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const col: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  fontFamily: 'var(--font-family-primary, "DM Sans", sans-serif)',
  maxWidth: '480px',
};

const meta: Meta<typeof FormControl> = {
  title: 'Elements/🎛️ Form Controls',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['checkbox', 'radio', 'checkcircle', 'toggle', 'switch'],
      description: 'Control type — Checkbox | Radio | Checkcircle | Toggle / Switch',
      table: { category: 'Variant' },
    },
    position: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the control relative to the text',
      table: { category: 'Layout' },
    },
    heading: {
      control: 'text',
      description: 'Primary label / heading text',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Supporting description text',
      table: { category: 'Content' },
    },
    active: {
      control: 'boolean',
      description: 'Active / checked state',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormControl>;

export const Default: Story = {
  args: {
    type: 'checkbox',
    heading: 'Enable Benchmark Live Feed',
    description: 'Receive real-time automated updates during market fixing window.',
    position: 'left',
    active: true,
  },
};

// ── All Types Matrix ───────────────────────────────────────────────────────
export const AllTypes: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const types = ['Radio', 'Checkbox', 'Checkcircle', 'Switch'] as const;
    return (
      <div style={col}>
        {types.map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={sectionLabel}>{t}</span>
            <div style={row}>
              <Toggle type={t} active={false} aria-label={`${t} inactive`} />
              <Toggle type={t} active={true} aria-label={`${t} active`} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ── Interactive Atoms ──────────────────────────────────────────────────────
export const InteractiveAtoms: Story = {
  render: () => {
    const [radioVal, setRadioVal] = useState('fgn');
    const [chk1, setChk1] = useState(true);
    const [chk2, setChk2] = useState(false);
    const [sw, setSw] = useState(true);

    return (
      <div style={col}>
        <div>
          <div style={sectionLabel}>Checkboxes (Square, r=4)</div>
          <div style={row}>
            <Checkbox checked={chk1} onChange={() => setChk1(!chk1)} aria-label="Active Checkbox" />
            <Checkbox checked={chk2} onChange={() => setChk2(!chk2)} aria-label="Inactive Checkbox" />
            <Checkbox checked={true} disabled aria-label="Disabled Active Checkbox" />
            <Checkbox checked={false} disabled aria-label="Disabled Inactive Checkbox" />
          </div>
        </div>

        <div>
          <div style={sectionLabel}>Radios (Circular, 24×24)</div>
          <div style={row}>
            <Radio
              name="market"
              checked={radioVal === 'fgn'}
              onChange={() => setRadioVal('fgn')}
              aria-label="FGN Bonds"
            />
            <Radio
              name="market"
              checked={radioVal === 'ntb'}
              onChange={() => setRadioVal('ntb')}
              aria-label="Treasury Bills"
            />
            <Radio name="disabled-radio" checked={true} disabled aria-label="Disabled Checked Radio" />
            <Radio name="disabled-radio" checked={false} disabled aria-label="Disabled Unchecked Radio" />
          </div>
        </div>

        <div>
          <div style={sectionLabel}>Checkcircle (Circular Checkmark)</div>
          <div style={row}>
            <Checkcircle defaultChecked aria-label="Checkcircle Active" />
            <Checkcircle aria-label="Checkcircle Inactive" />
          </div>
        </div>

        <div>
          <div style={sectionLabel}>Toggle Switch (Pill, 39×24)</div>
          <div style={row}>
            <Switch checked={sw} onChange={() => setSw(!sw)} aria-label="Toggle Switch" />
            <Switch checked={false} aria-label="Toggle Switch Off" />
            <Switch checked={true} disabled aria-label="Toggle Switch Disabled On" />
          </div>
        </div>
      </div>
    );
  },
};

// ── Active States ──────────────────────────────────────────────────────────
export const ActiveStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const types = ['Radio', 'Checkbox', 'Checkcircle', 'Switch'] as const;
    return (
      <div style={col}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={sectionLabel}>All types — Inactive</span>
          <div style={row}>
            {types.map((t) => (
              <Toggle key={t} type={t} active={false} aria-label={`${t} inactive`} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={sectionLabel}>All types — Active</span>
          <div style={row}>
            {types.map((t) => (
              <Toggle key={t} type={t} active={true} aria-label={`${t} active`} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ── Disabled States ────────────────────────────────────────────────────────
export const DisabledStates: Story = {
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

// ── Form Control Rows with Labels & Descriptions ───────────────────────────
export const FormControlRows: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('dual');

    return (
      <div style={{ ...col, gap: '16px', width: '420px' }}>
        <div style={sectionLabel}>Left-Aligned Form Controls</div>
        <FormControl
          type="checkbox"
          heading="Two-Factor SMS Verification"
          description="Send one-time passcodes to authorised dealer phone on login."
          defaultChecked
        />
        <FormControl
          type="toggle"
          heading="Instant Trade Execution Alerts"
          description="Notify Chief Dealer when trade exceeds ₦500,000,000.00 threshold."
          defaultChecked
        />

        <div style={{ ...sectionLabel, marginTop: '16px' }}>Right-Aligned Form Controls</div>
        <FormControl
          type="radio"
          position="right"
          name="approvalMode"
          heading="Dual-Control Maker-Checker"
          description="Require second dealer authorisation for all benchmark returns."
          checked={selected === 'dual'}
          onChange={() => setSelected('dual')}
        />
        <FormControl
          type="radio"
          position="right"
          name="approvalMode"
          heading="Straight-Through Processing"
          description="Auto-authorise trade reporting from certified Bloomberg terminal."
          checked={selected === 'stp'}
          onChange={() => setSelected('stp')}
        />
      </div>
    );
  },
};
