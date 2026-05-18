import React from 'react';
import { Heading } from './Heading';
import { Text } from './Text';
import './Typography.css';

const PHRASE = "The quick brown fox jumps over the lazy dog";

export const TypefaceHero = () => (
  <div style={{ 
    padding: '64px', 
    backgroundColor: '#F9FAFC', 
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    marginBottom: '64px',
    border: '1px solid var(--color-neutral-200)',
    textAlign: 'center'
  }}>
    <div style={{ 
      fontSize: '180px', 
      fontWeight: 700, 
      lineHeight: 1, 
      letterSpacing: '-0.05em', 
      color: '#1D326D',
      fontFamily: 'var(--font-family-primary)'
    }}>
      Aa
    </div>
    <div style={{ maxWidth: '600px' }}>
      <Heading level={2} style={{ marginBottom: '16px', color: '#1D326D' }}>DM Sans Typeface</Heading>
      <Text size="md" color="secondary">
        DM Sans is a low-contrast geometric sans-serif design, intended for use at smaller text sizes. 
        It serves as the foundation of the FMDQ digital experience, offering exceptional clarity 
        and a modern, professional aesthetic across all platforms.
      </Text>
    </div>
    <div style={{ display: 'flex', gap: '48px', marginTop: '16px' }}>
      <div style={{ textAlign: 'left' }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weights</Text>
        <Text size="sm">Regular, Medium, SemiBold, Bold</Text>
      </div>
      <div style={{ textAlign: 'left' }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Character Set</Text>
        <Text size="sm">Latin, Latin Extended</Text>
      </div>
      <div style={{ textAlign: 'left' }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Usage</Text>
        <Text size="sm">Headings, Body, UI Components</Text>
      </div>
    </div>
  </div>
);

interface TypeBlockProps {
  label: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  children: React.ReactNode;
}

export const TypeBlock = ({ label, size, weight, lineHeight, letterSpacing, children }: TypeBlockProps) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: '280px 1fr', 
    gap: '40px', 
    padding: '32px 0', 
    borderBottom: '1px solid var(--color-neutral-100)',
    alignItems: 'start'
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text size="sm" weight="bold" style={{ margin: 0, color: 'var(--color-neutral-900)' }}>{label}</Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Text size="xs" color="secondary" style={{ margin: 0, width: '80px' }}>Size</Text>
          <Text size="xs" style={{ margin: 0 }}>{size}</Text>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Text size="xs" color="secondary" style={{ margin: 0, width: '80px' }}>Weight</Text>
          <Text size="xs" style={{ margin: 0 }}>{weight}</Text>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Text size="xs" color="secondary" style={{ margin: 0, width: '80px' }}>Line Height</Text>
          <Text size="xs" style={{ margin: 0 }}>{lineHeight}</Text>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Text size="xs" color="secondary" style={{ margin: 0, width: '80px' }}>Spacing</Text>
          <Text size="xs" style={{ margin: 0 }}>{letterSpacing}</Text>
        </div>
      </div>
    </div>
    <div style={{ width: '100%' }}>
      {children}
    </div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div style={{ 
    padding: '16px 0', 
    borderBottom: '2px solid #1D326D', 
    marginBottom: '24px',
    marginTop: '48px'
  }}>
    <Heading level={3} style={{ margin: 0, color: '#1D326D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</Heading>
  </div>
);

export const TypographyShowcase = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1200px' }}>
      <TypefaceHero />

      <section>
        <SectionHeader title="Display" />
        <TypeBlock label="Display Large" size="56px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level="display-lg">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Display Small" size="48px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level="display-sm">{PHRASE}</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Headings" />
        <TypeBlock label="Heading 1" size="40px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level={1}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 2" size="36px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level={2}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 3" size="32px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-2%">
          <Heading level={3}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 4" size="28px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-2%">
          <Heading level={4}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 5" size="24px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-2%">
          <Heading level={5}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 6" size="20px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-2%">
          <Heading level={6}>{PHRASE}</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Paragraphs" />
        <TypeBlock label="Paragraph Large" size="18px" weight="400 (Regular)" lineHeight="100%" letterSpacing="0">
          <Text size="lg">Large body text for emphasized paragraphs and introductory content.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph Medium" size="16px" weight="400 (Regular)" lineHeight="100%" letterSpacing="0">
          <Text size="md">Medium body text (Default) for standard content, articles, and descriptions.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph Small" size="14px" weight="400 (Regular)" lineHeight="100%" letterSpacing="0">
          <Text size="sm">Small body text for secondary information, sidebars, and supporting content.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph XSmall" size="12px" weight="400 (Regular)" lineHeight="100%" letterSpacing="0">
          <Text size="xs">Extra small body text for fine print, legal disclaimers, and micro-copy.</Text>
        </TypeBlock>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <SectionHeader title="Captions" />
        <TypeBlock label="Caption Large" size="14px" weight="600 (SemiBold)" lineHeight="100%" letterSpacing="12%">
          <Text size="caption-lg" weight="semibold">CAPTION LARGE FOR LABELS AND METADATA</Text>
        </TypeBlock>
        <TypeBlock label="Caption Small" size="12px" weight="600 (SemiBold)" lineHeight="100%" letterSpacing="12%">
          <Text size="caption-sm" weight="semibold">CAPTION SMALL FOR LESSER EMPHASIS LABELS</Text>
        </TypeBlock>
        <TypeBlock label="Caption XSmall" size="10px" weight="600 (SemiBold)" lineHeight="100%" letterSpacing="16%">
          <Text size="caption-xs" weight="semibold">CAPTION XS FOR TINY UI ANNOTATIONS</Text>
        </TypeBlock>
      </section>
    </div>
  );
};
