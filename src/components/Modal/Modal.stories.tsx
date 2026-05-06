import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from '../../elements/Button';
import { Input } from '../../elements/Input';
import { Text } from '../Typography';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Delete Confirmation" onClose={() => setIsOpen(false)} />
          <ModalBody>
            Are you sure you want to delete this item? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button variant="grey" buttonType="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Create New Asset</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader title="Create Asset" onClose={() => setIsOpen(false)} />
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Text color="secondary">Fill out the details below to create a new tokenized asset.</Text>
              <Input placeholder="Asset Name — e.g. FGN Bond 2026" />
              <Input placeholder="Ticker Symbol — e.g. FGN26" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="grey" buttonType="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>Create</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};
