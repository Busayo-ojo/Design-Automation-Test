import type { Meta } from '@storybook/react-vite';
import { Heading, Text, Label } from './index';

const meta: Meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Display = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Heading level="display-lg">Display Large</Heading>
    <Heading level="display-sm">Display Small</Heading>
  </div>
);

export const Headings = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Heading level={1}>Heading 1</Heading>
    <Heading level={2}>Heading 2</Heading>
    <Heading level={3}>Heading 3</Heading>
    <Heading level={4}>Heading 4</Heading>
    <Heading level={5}>Heading 5</Heading>
    <Heading level={6}>Heading 6</Heading>
  </div>
);

export const Paragraphs = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Text size="lg">Large Text - FMDQ UI matches the latest Figma Design System sizes.</Text>
    <Text size="md">Medium Text - FMDQ UI matches the latest Figma Design System sizes.</Text>
    <Text size="sm">Small Text - FMDQ UI matches the latest Figma Design System sizes.</Text>
    <Text size="xs">XSmall Text - FMDQ UI matches the latest Figma Design System sizes.</Text>
  </div>
);

export const Captions = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Text size="caption-lg">Caption Large - ALL CAPS RECOMMENDED</Text>
    <Text size="caption-sm">Caption Small - ALL CAPS RECOMMENDED</Text>
    <Text size="caption-xs">Caption XSmall - ALL CAPS RECOMMENDED</Text>
  </div>
);

export const TextVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Text italic>Italic Variant</Text>
    <Text underline>Underline Variant</Text>
    <Text strikethrough>Strikethrough Variant</Text>
    <Text italic underline strikethrough>Combined Variants</Text>
  </div>
);

export const TextWeights = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Text weight="regular">Regular Weight</Text>
    <Text weight="medium">Medium Weight</Text>
    <Text weight="semibold">Semibold Weight</Text>
    <Text weight="bold">Bold Weight</Text>
  </div>
);

export const Labels = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label size="md">Medium Label</Label>
    <Label size="sm">Small Label</Label>
  </div>
);
