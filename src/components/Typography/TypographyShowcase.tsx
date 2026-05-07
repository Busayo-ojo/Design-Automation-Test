import React from 'react';
import { Heading } from './Heading';
import { Text } from './Text';
import './Typography.css';

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
      color: '#183972',
      fontFamily: 'var(--font-family-primary)'
    }}>
      Aa
    </div>
    <div style={{ maxWidth: '600px' }}>
      <Heading level={2} style={{ marginBottom: '16px', color: '#183972' }}>DM Sans Typeface</Heading>
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

export const TypeBlock = ({ label, size, weight, lineHeight, letterSpacing, children }: any) => (
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
    borderBottom: '2px solid #183972', 
    marginBottom: '24px',
    marginTop: '48px'
  }}>
    <Heading level={3} style={{ margin: 0, color: '#183972', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</Heading>
  </div>
);

export const TypographyShowcase = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1200px' }}>
      <TypefaceHero />

      <section>
        <SectionHeader title="Display" />
        <TypeBlock label="Display Large" size="56px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level="display-lg">The quick brown fox</Heading>
        </TypeBlock>
        <TypeBlock label="Display Small" size="48px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level="display-sm">The quick brown fox</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Headings" />
        <TypeBlock label="Heading 1" size="40px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={1}>The quick brown fox jumps over</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 2" size="36px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={2}>The quick brown fox jumps over</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 3" size="32px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={3}>The quick brown fox jumps over</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 4" size="28px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={4}>The quick brown fox jumps over</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 5" size="24px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={5}>The quick brown fox jumps over</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 6" size="20px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={6}>The quick brown fox jumps over</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Paragraphs" />
        <TypeBlock label="Paragraph Large" size="18px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0">
          <Text size="lg">Create a design playbook that outlines the department's expectations, best practices, and standard operating procedures. This ensures consistency and quality across all digital products and touchpoints within the FMDQ ecosystem.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph Medium" size="16px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0">
          <Text size="md">Create a design playbook that outlines the department's expectations, best practices, and standard operating procedures. This ensures consistency and quality across all digital products and touchpoints within the FMDQ ecosystem.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph Small" size="14px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0">
          <Text size="sm">Create a design playbook that outlines the department's expectations, best practices, and standard operating procedures. This ensures consistency and quality across all digital products and touchpoints within the FMDQ ecosystem.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph XSmall" size="12px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0">
          <Text size="xs">Create a design playbook that outlines the department's expectations, best practices, and standard operating procedures. This ensures consistency and quality across all digital products and touchpoints within the FMDQ ecosystem.</Text>
        </TypeBlock>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <SectionHeader title="Captions" />
        <TypeBlock label="Caption Large" size="14px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="12%">
          <Text size="caption-lg" weight="semibold">CREATE A DESIGN PLAYBOOK THAT OUTLINES THE DEPARTMENT'S EXPECTATIONS</Text>
        </TypeBlock>
        <TypeBlock label="Caption Small" size="12px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="12%">
          <Text size="caption-sm" weight="semibold">CREATE A DESIGN PLAYBOOK THAT OUTLINES THE DEPARTMENT'S EXPECTATIONS</Text>
        </TypeBlock>
        <TypeBlock label="Caption XSmall" size="10px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="16%">
          <Text size="caption-xs" weight="semibold">CREATE A DESIGN PLAYBOOK THAT OUTLINES THE DEPARTMENT'S EXPECTATIONS</Text>
        </TypeBlock>
      </section>
    </div>
  );
};

