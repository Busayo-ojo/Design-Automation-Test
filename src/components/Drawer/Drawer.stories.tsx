import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './Drawer';
import { Button } from '../../elements/Button';
import { Text } from '../Typography';
import { Input } from '../../elements/Input';

const meta: Meta<typeof Drawer> = {
  title: 'Components/✨ Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader title="Quick Actions" onClose={() => setIsOpen(false)} />
          <DrawerBody>
            <Text color="secondary" style={{ display: 'block', marginBottom: '24px' }}>
              Select an action below to manage the selected record.
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Button variant="secondary" buttonType="outlined">Download Report</Button>
              <Button variant="secondary" buttonType="outlined">Share Record</Button>
              <Button variant="destructive" buttonType="outlined">Delete Record</Button>
            </div>
          </DrawerBody>
        </Drawer>
      </div>
    );
  }
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg" position="left">
          <DrawerHeader title="Edit User Profile" onClose={() => setIsOpen(false)} />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Input placeholder="Full Name" defaultValue="Bonnie Imisioluwa" />
              <Input placeholder="Email Address" defaultValue="bonnie@fmdqgroup.com" />
              <Input placeholder="Role" defaultValue="Administrator" disabled />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="grey" buttonType="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
          </DrawerFooter>
        </Drawer>
      </div>
    );
  }
};
