import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider } from './Toast';
import { useToast } from './useToast';
import { Button } from '../../elements/Button';

const meta: Meta = {
  title: 'Elements/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <div style={{ padding: '24px' }}>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button 
        variant="success" 
        onClick={() => toast({ title: 'Trade Executed', description: 'Your trade of $1,000 FGN Bond was successful.', variant: 'success' })}
      >
        Success Toast
      </Button>
      <Button 
        variant="destructive" 
        onClick={() => toast({ title: 'Connection Field', description: 'Unable to connect to FMDQ core services.', variant: 'error' })}
      >
        Error Toast
      </Button>
      <Button 
        variant="warning" 
        onClick={() => toast({ title: 'Approaching Limit', description: 'You have used 90% of your daily trading allocation.', variant: 'warning' })}
      >
        Warning Toast
      </Button>
      <Button 
        variant="primary" 
        onClick={() => toast({ title: 'System Update', description: 'The platform will undergo maintenance at 12:00 AM.', variant: 'info' })}
      >
        Info Toast
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />
};
