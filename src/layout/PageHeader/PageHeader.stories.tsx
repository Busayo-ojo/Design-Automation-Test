import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from './PageHeader';
import { Button } from '../../elements/Button';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/✨ PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

const ExportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Trade Execution',
    description: 'Manage, review, and confirm trades across various assets.',
    breadcrumbs: [
      { label: 'Dashboard', href: '#' },
      { label: 'Trading', href: '#' },
      { label: 'Trade Execution' }
    ],
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="secondary" buttonType="outlined" icon={<ExportIcon />} iconStyle="leading icon">Export Data</Button>
        <Button variant="primary" icon={<PlusIcon />} iconStyle="leading icon">New Trade</Button>
      </div>
    )
  }
};
