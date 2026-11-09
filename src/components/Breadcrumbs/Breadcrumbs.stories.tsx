import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';
import { Icon } from '../../foundations/icons';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/🍞 Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component:
          'Breadcrumbs inform visitors of their current location in relation to the entire site hierarchy and improve page findability. Mapped 1:1 to Figma component set 2031:39144 and documentation frame 2031:39096.',
      },
    },
  },
  args: {
    hasBorders: true,
    separator: '/',
    hasIcon: false,
    icon: 'heart',
  },
  argTypes: {
    hasBorders: { control: 'boolean', description: 'Top and bottom 1px divider lines (#E4E7EC)' },
    hasIcon: { control: 'boolean', description: 'Show leading icon on items' },
    separator: { control: 'text', description: 'Separator character or node between items' },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

/** Canonical Demo Trail directly from Figma artboard node 2031:39096: three items with active gold steps and default terminal step. */
export const DemoTrail: Story = {
  args: {
    hasBorders: true,
    hasIcon: false,
    items: [
      { label: 'Item List', state: 'active', href: '#item-1' },
      { label: 'Item List', state: 'active', href: '#item-2' },
      { label: 'Item List', state: 'default' },
    ],
  },
};

/** All 4 Figma Variant States from master component set 2031:39144 (Default, Hover, Active, Disabled) displayed with individual borders and heart icons. */
export const AllFigmaVariantsMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '27px', padding: '40px 50px', background: '#FFFFFF', border: '1px dashed #7B61FF', borderRadius: '5px' }}>
      <BreadcrumbItem label="Item List" state="default" hasIcon={true} icon="heart" hasBorders={true} />
      <BreadcrumbItem label="Item List" state="hover" hasIcon={true} icon="heart" hasBorders={true} />
      <BreadcrumbItem label="Item List" state="active" hasIcon={true} icon="heart" hasBorders={true} />
      <BreadcrumbItem label="Item List" state="disabled" hasIcon={true} icon="heart" hasBorders={true} />
    </div>
  ),
};

/** State: Default (Figma node 2031:39145). Neutral-500 label, Neutral-300 separator. */
export const StateDefault: Story = {
  render: () => (
    <BreadcrumbItem label="Item List" state="default" hasIcon={true} icon="heart" hasBorders={true} />
  ),
};

/** State: Hover (Figma node 2031:39161). Primary-300 blue label and icon, Neutral-400 separator. */
export const StateHover: Story = {
  render: () => (
    <BreadcrumbItem label="Item List" state="hover" hasIcon={true} icon="heart" hasBorders={true} />
  ),
};

/** State: Active (Figma node 2031:39169). Secondary-500 gold label (#CC9933), Primary-500 blue icon (#0D5EBA). */
export const StateActive: Story = {
  render: () => (
    <BreadcrumbItem label="Item List" state="active" hasIcon={true} icon="heart" hasBorders={true} />
  ),
};

/** State: Disabled (Figma node 2031:39153). Neutral-400 label and icon. */
export const StateDisabled: Story = {
  render: () => (
    <BreadcrumbItem label="Item List" state="disabled" hasIcon={true} icon="heart" hasBorders={true} />
  ),
};

/** Trail with leading icons enabled (Figma property `has icon=true`). */
export const WithIcons: Story = {
  args: {
    hasBorders: true,
    hasIcon: true,
    icon: 'heart',
    items: [
      { label: 'Home', state: 'active', icon: 'heart', href: '#' },
      { label: 'Products', state: 'active', icon: 'heart', href: '#' },
      { label: 'Item Details', state: 'default', icon: 'heart' },
    ],
  },
};

/** Minimal trail without top and bottom border dividers (`hasBorders=false`). */
export const WithoutBorders: Story = {
  args: {
    hasBorders: false,
    hasIcon: false,
    items: [
      { label: 'Dashboard', state: 'active', href: '#' },
      { label: 'Reporting', state: 'active', href: '#' },
      { label: 'Quarterly Summary', state: 'default' },
    ],
  },
};

/** Custom chevron separator variant using foundation icons. */
export const CustomChevronSeparator: Story = {
  args: {
    hasBorders: true,
    separator: <Icon name="chevron-right" size={14} />,
    hasIcon: false,
    items: [
      { label: 'Overview', state: 'active', href: '#' },
      { label: 'Settings', state: 'active', href: '#' },
      { label: 'Security & Access', state: 'default' },
    ],
  },
};

/** Interactive Playground with full controls. */
export const Playground: Story = {
  args: {
    hasBorders: true,
    hasIcon: false,
    separator: '/',
    items: [
      { label: 'Dashboard', state: 'active', href: '#' },
      { label: 'Portal', state: 'active', href: '#' },
      { label: 'User Management', state: 'default' },
    ],
  },
};

