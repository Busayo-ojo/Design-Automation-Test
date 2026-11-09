import React from 'react';
import { Heading } from './Heading';
import { Text } from './Text';
import './Typography.css';

const PHRASE = "The quick brown fox jumps over the lazy dog";

export const TypefaceHero = ({ 
  family = 'dm-sans',
  name = 'DM Sans Typeface',
  sample = 'Aa',
  description = 'DM Sans is a low-contrast geometric sans-serif design, intended for use at smaller text sizes. It serves as the foundation of the FMDQ digital experience, offering exceptional clarity and a modern, professional aesthetic across all platforms.',
  weights = 'Regular, Medium, SemiBold, Bold',
  usage = 'Headings, Body, UI Components'
}: {
  family?: 'dm-sans' | 'rubik';
  name?: string;
  sample?: string;
  description?: string;
  weights?: string;
  usage?: string;
}) => (
  <div style={{ 
    padding: '48px', 
    backgroundColor: family === 'rubik' ? '#F6F8FD' : '#F9FAFC', 
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '48px',
    border: '1px solid var(--color-neutral-200)',
    textAlign: 'center'
  }}>
    <div style={{ 
      fontSize: '160px', 
      fontWeight: 700, 
      lineHeight: 1, 
      letterSpacing: family === 'rubik' ? '-0.04em' : '-0.06em', 
      color: '#1D326D',
      fontFamily: family === 'rubik' ? 'var(--font-family-rubik)' : 'var(--font-family-dm-sans)'
    }}>
      {sample}
    </div>
    <div style={{ maxWidth: '640px' }}>
      <Heading level={2} fontFamily={family} style={{ marginBottom: '12px', color: '#1D326D' }}>{name}</Heading>
      <Text size="md" fontFamily={family} color="secondary">
        {description}
      </Text>
    </div>
    <div style={{ display: 'flex', gap: '48px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ textAlign: 'left' }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weights</Text>
        <Text size="sm">{weights}</Text>
      </div>
      <div style={{ textAlign: 'left' }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Character Set</Text>
        <Text size="sm">Latin, Latin Extended</Text>
      </div>
      <div style={{ textAlign: 'left' }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Usage</Text>
        <Text size="sm">{usage}</Text>
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
      {/* ── DM Sans Section (Primary) ── */}
      <TypefaceHero 
        family="dm-sans"
        name="DM Sans Typeface (Primary)"
        sample="Aa"
        description="DM Sans is the primary typeface for the FMDQ digital experience. Updated with refined kerning (-6% display/H1/H2, -4% H3-H6/paragraphs) and 120%/145% line-height proportions from Figma."
        weights="Regular, Medium, SemiBold, Bold"
        usage="Headings, Body, Form Elements, UI Components"
      />

      <section>
        <SectionHeader title="Display (DM Sans)" />
        <TypeBlock label="Display Large" size="56px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-6%">
          <Heading level="display-lg">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Display Small" size="48px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-6%">
          <Heading level="display-sm">{PHRASE}</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Headings (DM Sans)" />
        <TypeBlock label="Heading 1" size="40px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-6%">
          <Heading level={1}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 2" size="36px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-6%">
          <Heading level={2}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 3" size="32px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={3}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 4" size="28px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={4}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 5" size="24px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={5}>{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Heading 6" size="20px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={6}>{PHRASE}</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Paragraphs (DM Sans)" />
        <TypeBlock label="Paragraph Large" size="18px" weight="400 (Regular)" lineHeight="145%" letterSpacing="-4%">
          <Text size="lg">Large body text for emphasized paragraphs and introductory content.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph Medium" size="16px" weight="400 (Regular)" lineHeight="130% / 145%" letterSpacing="-4%">
          <Text size="md">Medium body text (Default) for standard content, articles, and descriptions.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph Small" size="14px" weight="400 (Regular)" lineHeight="145%" letterSpacing="-4%">
          <Text size="sm">Small body text for secondary information, sidebars, and supporting content.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph XSmall" size="12px" weight="400 (Regular)" lineHeight="145%" letterSpacing="-4%">
          <Text size="xs">Extra small body text for fine print, legal disclaimers, and micro-copy.</Text>
        </TypeBlock>
        <TypeBlock label="Paragraph XXSmall (New)" size="10px" weight="400 (Regular)" lineHeight="145%" letterSpacing="-4%">
          <Text size="xxs">Double extra small body text for dense tabular data and auxiliary notes.</Text>
        </TypeBlock>
      </section>

      <section style={{ marginBottom: '64px' }}>
        <SectionHeader title="Captions (DM Sans)" />
        <TypeBlock label="Caption Large" size="14px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="+12%">
          <Text size="caption-lg" weight="semibold">CAPTION LARGE FOR LABELS AND METADATA</Text>
        </TypeBlock>
        <TypeBlock label="Caption Small" size="12px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="+12%">
          <Text size="caption-sm" weight="semibold">CAPTION SMALL FOR LESSER EMPHASIS LABELS</Text>
        </TypeBlock>
        <TypeBlock label="Caption XSmall" size="10px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="+16%">
          <Text size="caption-xs" weight="semibold">CAPTION XS FOR TINY UI ANNOTATIONS</Text>
        </TypeBlock>
      </section>

      {/* ── Rubik Section (FMDQ NEXT) ── */}
      <TypefaceHero 
        family="rubik"
        name="Rubik Typeface (FMDQ NEXT)"
        sample="Aa"
        description="Rubik is used exclusively for FMDQ NEXT with adjusted letter-spacing (-4% display/H1/H2, -2% H3-H6, 0% body). It is not a secondary UI font."
        weights="Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)"
        usage="FMDQ NEXT Typeface"
      />

      <section>
        <SectionHeader title="Display (Rubik)" />
        <TypeBlock label="Rubik Display Large" size="56px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level="display-lg" fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Rubik Display Small" size="48px" weight="700 (Bold)" lineHeight="100%" letterSpacing="-4%">
          <Heading level="display-sm" fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Headings (Rubik)" />
        <TypeBlock label="Rubik Heading 1" size="40px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={1} fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Rubik Heading 2" size="36px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-4%">
          <Heading level={2} fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Rubik Heading 3" size="32px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={3} fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Rubik Heading 4" size="28px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={4} fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Rubik Heading 5" size="24px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={5} fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
        <TypeBlock label="Rubik Heading 6" size="20px" weight="700 (Bold)" lineHeight="120%" letterSpacing="-2%">
          <Heading level={6} fontFamily="rubik">{PHRASE}</Heading>
        </TypeBlock>
      </section>

      <section>
        <SectionHeader title="Paragraphs (Rubik)" />
        <TypeBlock label="Rubik Paragraph Large" size="18px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0%">
          <Text size="lg" fontFamily="rubik">Large body text in Rubik for secondary accent narratives and featured callouts.</Text>
        </TypeBlock>
        <TypeBlock label="Rubik Paragraph Medium" size="16px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0%">
          <Text size="md" fontFamily="rubik">Medium body text in Rubik for modern, friendly editorial components.</Text>
        </TypeBlock>
        <TypeBlock label="Rubik Paragraph Small" size="14px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0%">
          <Text size="sm" fontFamily="rubik">Small body text in Rubik for supporting descriptions and card details.</Text>
        </TypeBlock>
        <TypeBlock label="Rubik Paragraph XSmall" size="12px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0%">
          <Text size="xs" fontFamily="rubik">Extra small body text in Rubik for secondary labels and hints.</Text>
        </TypeBlock>
        <TypeBlock label="Rubik Paragraph XXSmall" size="10px" weight="400 (Regular)" lineHeight="145%" letterSpacing="0%">
          <Text size="xxs" fontFamily="rubik">Double extra small body text in Rubik for compact badge details.</Text>
        </TypeBlock>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <SectionHeader title="Captions (Rubik)" />
        <TypeBlock label="Rubik Caption Large" size="14px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="+12%">
          <Text size="caption-lg" weight="semibold" fontFamily="rubik">CAPTION LARGE IN RUBIK FOR ACCENT LABELS</Text>
        </TypeBlock>
        <TypeBlock label="Rubik Caption Small" size="12px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="+12%">
          <Text size="caption-sm" weight="semibold" fontFamily="rubik">CAPTION SMALL IN RUBIK FOR SUBTITLE TAGS</Text>
        </TypeBlock>
        <TypeBlock label="Rubik Caption XSmall" size="10px" weight="600 (SemiBold)" lineHeight="120%" letterSpacing="+16%">
          <Text size="caption-xs" weight="semibold" fontFamily="rubik">CAPTION XS IN RUBIK FOR MICRO BADGES</Text>
        </TypeBlock>
      </section>
    </div>
  );
};
