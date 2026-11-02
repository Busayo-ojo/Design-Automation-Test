import type { Meta, StoryObj } from '@storybook/react-vite';
import { WelcomeEmail } from './WelcomeEmail';

const meta: Meta<typeof WelcomeEmail> = {
  title: 'Layout/✉️ WelcomeEmail',
  component: WelcomeEmail,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '1.15 Welcome email layout (Figma node 10306:12506). Represents the initial onboarding email received by new users inviting them to set up their FMDQ Data Reporting Portal account.',
      },
    },
  },
  argTypes: {
    recipientName: { control: 'text' },
    emailSubject: { control: 'text' },
    senderText: { control: 'text' },
    userId: { control: 'text' },
    institution: { control: 'text' },
    accessRole: { control: 'text' },
    ctaLabel: { control: 'text' },
    onSetUpAccount: { action: 'set-up-account' },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeEmail>;

export const Default: Story = {
  args: {
    recipientName: 'Adaeze',
    emailSubject: 'Your Data Reporting Portal account is ready',
    senderText: 'From: FMDQ Data Reporting Portal  ·  To: adaeze.okafor@accessbankplc.com  ·  26 Oct 2026, 11:02',
    userId: 'adaeze.okafor@accessbankplc.com',
    institution: 'Access Bank PLC',
    accessRole: 'NIBOR Inputter',
    ctaLabel: 'Set up your account',
  },
};

export const CustomRecipient: Story = {
  args: {
    recipientName: 'Marvin',
    emailSubject: 'Your Data Reporting Portal account is ready',
    senderText: 'From: FMDQ Data Reporting Portal  ·  To: marvin.ogah@fmdqgroup.com  ·  26 Oct 2026, 09:15',
    userId: 'USR-90412',
    institution: 'Market Service Group (MSG)',
    accessRole: 'MSG Admin',
    ctaLabel: 'Set up your account',
  },
};
