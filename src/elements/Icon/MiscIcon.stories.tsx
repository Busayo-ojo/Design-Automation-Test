import type { Meta, StoryObj } from '@storybook/react-vite';
import { MiscIcon, type MiscIconProps } from './MiscIcon';

const meta: Meta<typeof MiscIcon> = {
  title: 'Elements/🔘 Misc Icon',
  component: MiscIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name from foundations icons library',
      table: { category: 'Content' },
    },
    iconVariant: {
      control: 'radio',
      options: ['bold', 'linear'],
      description: 'Icon style (Figma specifies bold for action / table cell controls)',
      table: { category: 'Style' },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Container & icon dimensions (xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 56px)',
      table: { category: 'Dimensions' },
    },
    color: {
      control: 'select',
      options: ['Primary', 'Gray', 'White', 'Error', 'Warning', 'Success'],
      description: 'Color and tonal background palette',
      table: { category: 'Palette' },
    },
    type: {
      control: 'radio',
      options: ['Square', 'Round'],
      description: 'Container border radius shape (Square has 8px/6px radius, Round is fully circular)',
      table: { category: 'Shape' },
    },
    hasBackground: {
      control: 'boolean',
      description: 'Turns container fill and border on/off. Useful when row height is tight.',
      table: { category: 'Visibility' },
    },
  },
  args: {
    icon: 'dots-v',
    iconVariant: 'bold',
    size: 'sm',
    color: 'White',
    type: 'Square',
    hasBackground: true,
  },
};

export default meta;
type Story = StoryObj<typeof MiscIcon>;

export const Playground: Story = {
  render: (args) => <MiscIcon {...args} />,
};

export const SizesMatrix: Story = {
  name: 'Sizes (xs, sm, md, lg, xl)',
  render: () => {
    const sizes: MiscIconProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#667185' }}>Square (Default 8px radius / 6px for xs)</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {sizes.map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <MiscIcon size={s} type="Square" color="White" icon="dots-v" />
                <span style={{ fontSize: '11px', color: '#667185' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#667185' }}>Round (Fully circular)</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {sizes.map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <MiscIcon size={s} type="Round" color="White" icon="dots-v" />
                <span style={{ fontSize: '11px', color: '#667185' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const ColorsMatrix: Story = {
  name: 'Color Palettes',
  render: () => {
    const colors: MiscIconProps['color'][] = ['Primary', 'Gray', 'White', 'Error', 'Warning', 'Success'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#667185' }}>Square Containers</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {colors.map((c) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <MiscIcon size="md" color={c} type="Square" icon="dots-v" />
                <span style={{ fontSize: '11px', color: '#667185' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#667185' }}>Round Containers</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {colors.map((c) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <MiscIcon size="md" color={c} type="Round" icon="dots-v" />
                <span style={{ fontSize: '11px', color: '#667185' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const HasBackgroundComparison: Story = {
  name: 'Has Background vs Transparent (Row Menu)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <p style={{ margin: 0, fontSize: '13px', color: '#475467', maxWidth: '540px' }}>
        In Figma (component set <code>3354:173707</code>), <code>hasBackground</code> controls whether the container has a solid fill and stroke border.
        When turned off, the icon retains its exact bounding box and center alignment, making it ideal for compact table row cells.
      </p>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <MiscIcon size="sm" color="White" type="Square" hasBackground={true} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#101928' }}>hasBackground = true</span>
          <span style={{ fontSize: '11px', color: '#667185' }}>White fill + 1px #E4E7EC border</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <MiscIcon size="sm" color="White" type="Square" hasBackground={false} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#101928' }}>hasBackground = false</span>
          <span style={{ fontSize: '11px', color: '#667185' }}>Transparent background & border</span>
        </div>
      </div>

      <div style={{ marginTop: '16px', padding: '16px', background: '#F8F9FA', borderRadius: '8px' }}>
        <h5 style={{ margin: '0 0 12px', fontSize: '12px', color: '#667185', textTransform: 'uppercase' }}>
          Table Cell Integration Demo
        </h5>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E4E7EC', borderRadius: '6px', width: '380px' }}>
          <span style={{ fontSize: '13px', color: '#101928' }}>Stanbic IBTC Bank (Tight 32px Row)</span>
          <MiscIcon size="xs" color="White" type="Square" hasBackground={false} />
        </div>
      </div>
    </div>
  ),
};
