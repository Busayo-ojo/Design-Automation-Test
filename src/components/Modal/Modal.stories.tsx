import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalDetails,
  ModalDetailRow,
  ModalUploadDropzone,
  ModalFooter,
  type ModalType,
  type ModalTone,
} from './Modal';
import { Button } from '../../elements/Button';
import { Textarea } from '../Textarea';

const meta: Meta<typeof Modal> = {
  title: 'Components/🪟 Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### FMDQ Design System - Modal (Matching Figma \`✤ Modals\` 10378:339469 & 10379:339480)

Modal dialogs provide critical focused workflows, confirmations, dual-control authorizations, summary reviews, and alerts.
- **Source of Truth**: Figma \`Modals\` node \`10379:339470\` / component set \`10378:339469\`.
- **Accurate Icon Specs**:
  - Featured icons are **ONLY** present where specified in Figma (\`success\` with green \`check-circle\`, \`session-timeout\` with orange \`info-triangle\`).
  - Standard confirmation, summary, form, and upload headers have **NO** featured icon.
  - Close "X" button uses design system \`multiply\` icon and is only shown on dismissible layouts (e.g. \`upload\`, \`form\`).
  - Upload dropzone uses design system \`cloud-upload\` icon in a 56px circular badge.
- **Accurate Typography Specs**:
  - Title: DM Sans SemiBold, 20px / 24px line-height, color \`#101928\`.
  - Description: DM Sans Regular, 14px / 20px line-height, color \`#667185\`.
  - Details Table: 10px rounded container in \`#F9FAFB\`, 1px border \`#E4E7EC\`, 14px labels in \`#667185\`, 14px bold values in \`#101928\`.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'confirm',
        'confirm-destructive',
        'summary',
        'summary-note',
        'reason',
        'form',
        'upload',
        'success',
        'session-timeout',
      ] as ModalType[],
      description: 'Modal variant matching Figma component set',
      table: { category: 'Variant' },
    },
    tone: {
      control: 'select',
      options: ['info', 'warning', 'destructive', 'success'] as ModalTone[],
      description: 'Tone for the 40px circular featured icon (when active)',
      table: { category: 'Icon' },
    },
    showIcon: {
      control: 'boolean',
      description: 'Explicitly show/hide the featured icon',
      table: { category: 'Icon' },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Explicitly show/hide the top-right X close button',
      table: { category: 'Header' },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Modal dialog width (sm: 400px, md: 520px standard, lg: 640px)',
      table: { category: 'Dimensions' },
    },
    title: {
      control: 'text',
      description: 'Primary heading title',
      table: { category: 'Content' },
    },
    subtitle: {
      control: 'text',
      description: 'Supporting explanatory description',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ─── 1. Reactivate User (Confirm) ───────────────────────────────────────────

export const ReactivateUser: Story = {
  name: '1. Reactivate User (Confirm)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Reactivate Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="confirm"
          title="Reactivate Chinedu Obi?"
          subtitle="They can sign in again once an FMDQ authoriser approves. Their previous security level is restored."
          primaryText="Submit for approval"
          secondaryText="Cancel"
          onPrimaryAction={() => setIsOpen(false)}
          onSecondaryAction={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// ─── 2. Log Out Without Resubmitting (Confirm Destructive) ───────────────────

export const LogOutWithoutResubmitting: Story = {
  name: '2. Log Out Without Resubmitting (Destructive)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Trigger Unsaved Logout Warning
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="confirm-destructive"
          title="Log out without resubmitting?"
          subtitle="Your changes to Bola Ahmed’s request haven’t been sent. If you log out now, they’ll be lost."
          primaryText="Log out anyway"
          secondaryText="Keep editing"
          onPrimaryAction={() => setIsOpen(false)}
          onSecondaryAction={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// ─── 3. Submit User for Approval (Summary Table) ─────────────────────────────

export const SubmitUserForApproval: Story = {
  name: '3. Submit User For Approval (Summary)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const userDetails = [
      { label: 'Name', value: 'Adaeze Okafor' },
      { label: 'User ID', value: 'adaeze.okafor@accessbankplc.com' },
      { label: 'Member organisation', value: 'Access Bank PLC' },
      { label: 'Security level', value: 'NIBOR Inputter' },
    ];

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Review User Summary</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="summary"
          title="Submit this user for approval?"
          subtitle="Check the details. An FMDQ authoriser approves new users before they can sign in."
          details={userDetails}
          primaryText="Submit for approval"
          secondaryText="Go back and edit"
          onPrimaryAction={() => setIsOpen(false)}
          onSecondaryAction={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// ─── 4. Upload Weekly Trade Return (Upload Dropzone) ─────────────────────────

export const UploadWeeklyTradeReturn: Story = {
  name: '4. Upload Trade Return (Upload)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Upload Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="upload"
          title="Upload weekly trade return"
          subtitle="Week ending Fri 23 Oct 2026. Due 12:00 on Mon 26 Oct. We check every row before you send it."
          primaryText="Check file"
          secondaryText="Cancel"
          onPrimaryAction={() => setIsOpen(false)}
          onSecondaryAction={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// ─── 5. Sent for Approval (Success - 400px Centered) ─────────────────────────

export const SentForApproval: Story = {
  name: '5. Sent for Approval (Success)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Show Success Modal
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="success"
          title="Sent for approval"
          subtitle="An FMDQ authoriser will review Adaeze Okafor’s access. We’ll email you when it’s decided."
          primaryText="Done"
          onPrimaryAction={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// ─── 6. Session Timeout (Warning - 400px Centered) ───────────────────────────

export const SessionTimeout: Story = {
  name: '6. Session Timeout (Warning)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Show Timeout Dialog
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="session-timeout"
          title="You’ll be logged out in 1:59"
          subtitle="You’ve been inactive for 13 minutes. Anything you haven’t saved will be lost."
          primaryText="Stay signed in"
          secondaryText="Log out"
          onPrimaryAction={() => setIsOpen(false)}
          onSecondaryAction={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// ─── 7. Request Unlock with Note (Summary + Textarea) ────────────────────────

export const RequestUnlockWithNote: Story = {
  name: '7. Request Unlock (Summary + Textarea)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const unlockDetails = [
      { label: 'Member organisation', value: 'Fidelity Bank PLC' },
      { label: 'Security level', value: 'NAFEX Inputter' },
      { label: 'Locked since', value: '26 Oct 2026, 08:41' },
      { label: 'Reason', value: '5 failed sign-ins in a row' },
    ];

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Request Unlock with Note</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader
            title="Request an unlock for Ibrahim Musa"
            subtitle="An FMDQ authoriser must approve this. Ibrahim stays locked until then; once approved, their failed attempts reset to zero."
          />
          <ModalBody>
            <ModalDetails>
              {unlockDetails.map((d, i) => (
                <ModalDetailRow key={i} label={d.label} value={d.value} />
              ))}
            </ModalDetails>

            <div>
              <Textarea
                size="md"
                label="Note for the authoriser (required)"
                defaultValue="Called Ibrahim on 26 Oct 2026. Identity confirmed with Fidelity Bank’s compliance team."
                showCharacterCount
                maxLength={500}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter
            primaryText="Submit for approval"
            secondaryText="Cancel"
            onPrimaryAction={() => setIsOpen(false)}
            onSecondaryAction={() => setIsOpen(false)}
          />
        </Modal>
      </div>
    );
  },
};

// ─── 8. Reject Request with Reason (Reason + Textarea) ───────────────────────

export const RejectRequestWithReason: Story = {
  name: '8. Reject Request (Reason + Textarea)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Reject Request Dialog
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader
            title="Reject this request?"
            subtitle="Adaeze Okafor won’t be given access. Marvin Ogah will see your reason and can correct and resubmit."
          />
          <ModalBody>
            <Textarea
              size="md"
              label="Reason for rejection (required)"
              defaultValue="Security level should be NIBOR & NITTY Inputter. Access Bank contributes to both benchmarks."
              showCharacterCount
              maxLength={500}
              required
            />
          </ModalBody>
          <ModalFooter
            intent="destructive"
            primaryText="Reject request"
            secondaryText="Cancel"
            onPrimaryAction={() => setIsOpen(false)}
            onSecondaryAction={() => setIsOpen(false)}
          />
        </Modal>
      </div>
    );
  },
};

// ─── 9. All 6 Figma Dialogs Side-by-Side (Canvas Overview) ───────────────────

export const FigmaDialogsGallery: Story = {
  name: '9. Figma Design Overview (Static Gallery)',
  parameters: {
    layout: 'padded',
  },
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px' }}>
        <h2 style={{ fontFamily: 'var(--font-family-primary)', margin: 0, color: '#101928' }}>
          Figma Modals Specification (Node 10379-339470)
        </h2>

        {/* Row 1 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          {/* 1. Confirm */}
          <div className="fmdqui-modal-dialog fmdqui-modal-dialog--md" style={{ position: 'relative' }}>
            <ModalHeader
              title="Reactivate Chinedu Obi?"
              subtitle="They can sign in again once an FMDQ authoriser approves. Their previous security level is restored."
            />
            <ModalFooter
              primaryText="Submit for approval"
              secondaryText="Cancel"
            />
          </div>

          {/* 2. Confirm Destructive */}
          <div className="fmdqui-modal-dialog fmdqui-modal-dialog--md" style={{ position: 'relative' }}>
            <ModalHeader
              title="Log out without resubmitting?"
              subtitle="Your changes to Bola Ahmed’s request haven’t been sent. If you log out now, they’ll be lost."
            />
            <ModalFooter
              intent="destructive"
              primaryText="Log out anyway"
              secondaryText="Keep editing"
            />
          </div>

          {/* 3. Summary */}
          <div className="fmdqui-modal-dialog fmdqui-modal-dialog--md" style={{ position: 'relative' }}>
            <ModalHeader
              title="Submit this user for approval?"
              subtitle="Check the details. An FMDQ authoriser approves new users before they can sign in."
            />
            <ModalDetails>
              <ModalDetailRow label="Name" value="Adaeze Okafor" />
              <ModalDetailRow label="User ID" value="adaeze.okafor@accessbankplc.com" />
              <ModalDetailRow label="Member organisation" value="Access Bank PLC" />
              <ModalDetailRow label="Security level" value="NIBOR Inputter" />
            </ModalDetails>
            <ModalFooter
              primaryText="Submit for approval"
              secondaryText="Go back and edit"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          {/* 4. Upload */}
          <div className="fmdqui-modal-dialog fmdqui-modal-dialog--md" style={{ position: 'relative' }}>
            <ModalHeader
              title="Upload weekly trade return"
              subtitle="Week ending Fri 23 Oct 2026. Due 12:00 on Mon 26 Oct. We check every row before you send it."
              showCloseButton={true}
              onClose={() => {}}
            />
            <ModalUploadDropzone />
            <ModalFooter
              primaryText="Check file"
              secondaryText="Cancel"
            />
          </div>

          {/* 5. Success */}
          <div className="fmdqui-modal-dialog fmdqui-modal-dialog--sm" style={{ position: 'relative' }}>
            <ModalHeader
              title="Sent for approval"
              subtitle="An FMDQ authoriser will review Adaeze Okafor’s access. We’ll email you when it’s decided."
              align="center"
              showIcon={true}
              tone="success"
            />
            <ModalFooter
              buttons="one"
              primaryText="Done"
            />
          </div>

          {/* 6. Session Timeout */}
          <div className="fmdqui-modal-dialog fmdqui-modal-dialog--sm" style={{ position: 'relative' }}>
            <ModalHeader
              title="You’ll be logged out in 1:59"
              subtitle="You’ve been inactive for 13 minutes. Anything you haven’t saved will be lost."
              align="center"
              showIcon={true}
              tone="warning"
            />
            <ModalFooter
              primaryText="Stay signed in"
              secondaryText="Log out"
            />
          </div>
        </div>
      </div>
    );
  },
};
