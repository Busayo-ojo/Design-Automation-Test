import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';
import { Text } from './Text';
import { TypographyPlayground } from './TypographyPlayground';
import { TypographyShowcase } from './TypographyShowcase';

const meta: Meta<typeof Heading> = {
  title: 'Foundations/✍🏽 Typography',
  component: Heading,
  argTypes: {
    fontFamily: {
      control: 'select',
      options: ['dm-sans', 'rubik'],
      description: 'Font family (DM Sans default UI or Rubik for FMDQ NEXT)'
    },
    level: {
      control: 'select',
      options: ['display-lg', 'display-sm', 1, 2, 3, 4, 5, 6],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'inherit'],
    }
  }
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const PrimaryHeading: Story = {
  args: {
    level: 1,
    fontFamily: 'dm-sans',
    children: 'Heading 1 – DM Sans (-6% Kerning)',
  },
};

export const RubikHeading: Story = {
  args: {
    level: 1,
    fontFamily: 'rubik',
    children: 'Heading 1 – Rubik (-4% Kerning)',
  },
};

export const DMSansHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Heading level="display-lg" fontFamily="dm-sans">Display Large 56px (-6%)</Heading>
      <Heading level="display-sm" fontFamily="dm-sans">Display Small 48px (-6%)</Heading>
      <Heading level={1} fontFamily="dm-sans">Heading 1 40px (-6%)</Heading>
      <Heading level={2} fontFamily="dm-sans">Heading 2 36px (-6%)</Heading>
      <Heading level={3} fontFamily="dm-sans">Heading 3 32px (-4%)</Heading>
      <Heading level={4} fontFamily="dm-sans">Heading 4 28px (-4%)</Heading>
      <Heading level={5} fontFamily="dm-sans">Heading 5 24px (-4%)</Heading>
      <Heading level={6} fontFamily="dm-sans">Heading 6 20px (-4%)</Heading>
    </div>
  )
};

export const RubikHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Heading level="display-lg" fontFamily="rubik">Rubik Display Large 56px (-4%)</Heading>
      <Heading level="display-sm" fontFamily="rubik">Rubik Display Small 48px (-4%)</Heading>
      <Heading level={1} fontFamily="rubik">Rubik Heading 1 40px (-4%)</Heading>
      <Heading level={2} fontFamily="rubik">Rubik Heading 2 36px (-4%)</Heading>
      <Heading level={3} fontFamily="rubik">Rubik Heading 3 32px (-2%)</Heading>
      <Heading level={4} fontFamily="rubik">Rubik Heading 4 28px (-2%)</Heading>
      <Heading level={5} fontFamily="rubik">Rubik Heading 5 24px (-2%)</Heading>
      <Heading level={6} fontFamily="rubik">Rubik Heading 6 20px (-2%)</Heading>
    </div>
  )
};

export const BodyParagraphs: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Heading level={4} style={{ color: '#1D326D' }}>DM Sans (-4% Kerning, 145% LH)</Heading>
        <div>
          <Text size="xs" weight="bold" color="secondary">PARAGRAPH LARGE (18px)</Text>
          <Text size="lg" fontFamily="dm-sans">Large body text provides exceptional clarity for intro leads and featured narratives.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">PARAGRAPH MEDIUM (16px - Default)</Text>
          <Text size="md" fontFamily="dm-sans">Medium body text is the foundational UI copy style across forms, cards, and dashboards.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">PARAGRAPH SMALL (14px)</Text>
          <Text size="sm" fontFamily="dm-sans">Small body text serves secondary information, tooltips, list descriptions, and table rows.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">PARAGRAPH XSMALL (12px)</Text>
          <Text size="xs" fontFamily="dm-sans">Extra small body copy for metadata, timestamp indicators, and footnote disclaimers.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">PARAGRAPH XXSMALL (10px - NEW)</Text>
          <Text size="xxs" fontFamily="dm-sans">Double extra small body text for dense tabular annotations and micro labels.</Text>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Heading level={4} fontFamily="rubik" style={{ color: '#CC9933' }}>Rubik (0% Kerning, 145% LH)</Heading>
        <div>
          <Text size="xs" weight="bold" color="secondary">RUBIK PARAGRAPH LARGE (18px)</Text>
          <Text size="lg" fontFamily="rubik">Large body text in Rubik provides a friendly, warm voice for accent storytelling.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">RUBIK PARAGRAPH MEDIUM (16px)</Text>
          <Text size="md" fontFamily="rubik">Medium body text in Rubik for modern component highlights and editorial callouts.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">RUBIK PARAGRAPH SMALL (14px)</Text>
          <Text size="sm" fontFamily="rubik">Small body text in Rubik for supporting metrics and secondary descriptive copy.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">RUBIK PARAGRAPH XSMALL (12px)</Text>
          <Text size="xs" fontFamily="rubik">Extra small body text in Rubik for micro card attributes and small tags.</Text>
        </div>
        <div>
          <Text size="xs" weight="bold" color="secondary">RUBIK PARAGRAPH XXSMALL (10px - NEW)</Text>
          <Text size="xxs" fontFamily="rubik">Double extra small body text in Rubik for dense auxiliary status notes.</Text>
        </div>
      </div>
    </div>
  )
};

export const Captions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Heading level={4} style={{ marginBottom: '12px' }}>DM Sans Captions (+12% / +16%)</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text size="caption-lg" weight="semibold">CAPTION LARGE 14PX (+12% LETTER-SPACING, 120% LINE-HEIGHT)</Text>
          <Text size="caption-sm" weight="semibold">CAPTION SMALL 12PX (+12% LETTER-SPACING, 120% LINE-HEIGHT)</Text>
          <Text size="caption-xs" weight="semibold">CAPTION XSMALL 10PX (+16% LETTER-SPACING, 120% LINE-HEIGHT)</Text>
        </div>
      </div>

      <div>
        <Heading level={4} fontFamily="rubik" style={{ marginBottom: '12px', color: '#CC9933' }}>Rubik Captions (+12% / +16%)</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text size="caption-lg" weight="semibold" fontFamily="rubik">RUBIK CAPTION LARGE 14PX (+12% LETTER-SPACING)</Text>
          <Text size="caption-sm" weight="semibold" fontFamily="rubik">RUBIK CAPTION SMALL 12PX (+12% LETTER-SPACING)</Text>
          <Text size="caption-xs" weight="semibold" fontFamily="rubik">RUBIK CAPTION XSMALL 10PX (+16% LETTER-SPACING)</Text>
        </div>
      </div>
    </div>
  )
};

export const TypefaceComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{
        padding: '24px',
        backgroundColor: '#F9FAFB',
        borderRadius: '12px',
        border: '1px solid #EAECF0'
      }}>
        <Heading level={3} style={{ marginBottom: '8px' }}>DM Sans vs Rubik Direct Comparison</Heading>
        <Text size="sm" color="secondary">
          Notice the subtle differences: DM Sans features sharper geometric terminals with tight -6%/-4% kerning for institutional clarity, whereas Rubik features rounded sans-serif geometry with relaxed kerning for warm brand accentuation.
        </Text>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid #D0D5DD' }}>
          <Heading level={2} fontFamily="dm-sans">FMDQ Financial Markets</Heading>
          <Text size="md" fontFamily="dm-sans" style={{ marginTop: '12px' }}>
            The premier market infrastructure group in Africa, operating debt capital, foreign exchange, and derivative markets with uncompromising institutional standards.
          </Text>
        </div>

        <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid #F7C164', backgroundColor: '#FEF6E7' }}>
          <Heading level={2} fontFamily="rubik">FMDQ Financial Markets</Heading>
          <Text size="md" fontFamily="rubik" style={{ marginTop: '12px' }}>
            The premier market infrastructure group in Africa, operating debt capital, foreign exchange, and derivative markets with uncompromising institutional standards.
          </Text>
        </div>
      </div>
    </div>
  )
};

export const CompleteShowcase: Story = {
  render: () => <TypographyShowcase />
};

export const InteractivePlayground: Story = {
  render: () => <TypographyPlayground />
};
