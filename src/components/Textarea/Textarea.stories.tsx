import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Components/✨ Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'radio',
            options: ['default', 'error'],
        },
        disabled: {
            control: 'boolean',
        },
        fullWidth: {
            control: 'boolean',
        },
        rows: {
            control: 'number',
        }
    },
    args: {
        placeholder: 'Enter your message...',
        rows: 4,
    }
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        variant: 'default',
    },
};

export const WithHelperText: Story = {
    args: {
        helperText: 'Please keep your description under 500 characters.',
    },
};

export const ErrorState: Story = {
    args: {
        variant: 'error',
        errorMessage: 'Description cannot be empty.',
        defaultValue: '',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: 'This content is read-only and cannot be modified.',
        helperText: 'Editing is locked for this field.'
    },
};

export const FullWidth: Story = {
    parameters: {
        layout: 'padded',
    },
    args: {
        fullWidth: true,
        placeholder: 'This textarea stretches to fill its container.',
    },
};
