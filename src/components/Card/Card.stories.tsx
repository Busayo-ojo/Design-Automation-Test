import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from './Card';
import { Button } from '../../elements/Button';
import { Text, Heading } from '../Typography';

const meta: Meta<typeof Card> = {
  title: 'Components/✨ Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <CardHeader>
        <CardTitle>Trade Execution</CardTitle>
        <Text color="secondary" size="sm">
          Review details before confirming the trade.
        </Text>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Instrument</span>
          <span style={{ fontWeight: 600, color: 'var(--color-grey-focused)' }}>FGN Bond 2026</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Volume</span>
          <span style={{ fontWeight: 600, color: 'var(--color-grey-focused)' }}>$500,000</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Yield</span>
          <span style={{ fontWeight: 600, color: 'var(--color-primary-default)' }}>12.45%</span>
        </div>
      </CardBody>
      <CardFooter style={{ justifyContent: 'flex-end' }}>
        <Button variant="grey" buttonType="outlined">Decline</Button>
        <Button variant="primary">Approve Trade</Button>
      </CardFooter>
    </Card>
  )
};

export const Simple: Story = {
  render: () => (
    <Card style={{ maxWidth: '300px' }}>
      <CardBody style={{ paddingTop: '24px' }}>
        <Heading level={3} style={{ margin: '0 0 8px 0' }}>$1.2M</Heading>
        <Text color="secondary" size="sm">Total Traded Volume (Today)</Text>
      </CardBody>
    </Card>
  )
};
