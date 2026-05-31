import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Elements/➡️ Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'destructive', 'grey', 'text', 'success', 'warning', 'info', 'error'],
        },
        size: {
            control: 'radio',
            options: ['sm', 'lg'],
        },
        buttonType: {
            control: 'select',
            options: ['solid', 'outlined', 'primary', 'secondary', 'destructive'],
        },
        iconStyle: {
            control: 'select',
            options: ['none', 'leading icon', 'trailing icon', 'icon-only'],
        },
        state: {
            control: 'select',
            options: ['default', 'hover', 'focused', 'de-activated'],
        }
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        label: 'Primary Button',
        size: 'sm',
        iconStyle: 'none',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'Secondary Button',
        size: 'sm',
    },
};

export const DestructiveSolid: Story = {
    args: {
        variant: 'destructive',
        buttonType: 'solid',
        label: 'Destructive Solid',
    },
};

export const DestructiveOutlined: Story = {
    args: {
        variant: 'destructive',
        buttonType: 'outlined',
        label: 'Destructive Outlined',
    },
};

export const GreySolid: Story = {
    args: {
        variant: 'grey',
        buttonType: 'solid',
        label: 'Grey Solid',
    },
};

export const GreyOutlined: Story = {
    args: {
        variant: 'grey',
        buttonType: 'outlined',
        label: 'Grey Outlined',
    },
};

export const TextPrimary: Story = {
    args: {
        variant: 'text',
        buttonType: 'primary',
        label: 'Text Primary',
    },
};

export const TextSecondary: Story = {
    args: {
        variant: 'text',
        buttonType: 'secondary',
        label: 'Text Secondary',
    },
};

export const TextDestructive: Story = {
    args: {
        variant: 'text',
        buttonType: 'destructive',
        label: 'Text Destructive',
    },
};

export const Success: Story = {
    name: 'Special Success',
    args: {
        variant: 'success',
        label: 'Special Success',
    },
};

export const Warning: Story = {
    name: 'Special Warning',
    args: {
        variant: 'warning',
        label: 'Special Warning',
    },
};

export const Information: Story = {
    name: 'Special Information',
    args: {
        variant: 'info',
        label: 'Special Information',
    },
};

export const SpecialDestructive: Story = {
    args: {
        variant: 'error',
        label: 'Destructive Button',
    },
};

export const LargeWithIcon: Story = {
    args: {
        variant: 'primary',
        size: 'lg',
        label: 'Large Leading Icon',
        iconStyle: 'leading icon',
    },
};

export const IconOnly: Story = {
    args: {
        variant: 'primary',
        iconStyle: 'icon-only',
        'aria-label': 'Settings',
    },
};

export const Deactivated: Story = {
    args: {
        variant: 'primary',
        label: 'Deactivated',
        state: 'de-activated',
    },
};
