import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthBackground } from './AuthBackground';
import { authShaderSettings } from './shaderSettings';

const meta: Meta<typeof AuthBackground> = {
  title: 'Layout/🌌 AuthBackground',
  component: AuthBackground,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Login and set-up background: Primary/900 with the animated dotted shader from the profile-card exploration. Placed behind the Auth card on every Flow 1 auth screen.' } },
  },
  args: { paused: false, shaderSettings: { ...authShaderSettings } },
  argTypes: {
    paused: { control: 'boolean' },
    shaderSettings: { control: 'object', description: 'Named properties extracted from the Figma SHADER fill.' },
    children: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof AuthBackground>;

/** Background only — no authentication controls or overlays. */
export const Default: Story = {};
/** Developer preview state, not a separate Figma variant. */
export const Paused: Story = { args: { paused: true } };
/** Same design rendered inside a narrower container. */
export const Mobile: Story = {
  render: args => <AuthBackground {...args} style={{ width: 390, maxWidth: '100%', height: 844 }} />,
};
