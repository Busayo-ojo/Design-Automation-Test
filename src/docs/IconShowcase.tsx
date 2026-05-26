import React, { useState } from 'react';
import { Icon } from '../elements/Icon/Icon';
import { Toggle } from '../elements/Toggle';
import { Input } from '../elements/Input';

interface IconData {
  name: string;
  category: string;
  tags: string[];
}

const ALL_ICONS: IconData[] = [
  { name: 'ai-stars', category: 'AI & VR', tags: ['sparkles', 'stars', 'ai', 'magic'] }
];

const BRAND_COLORS = [
  { name: 'Default (currentColor)', value: 'currentColor' },
  { name: 'FMDQ Blue (primary-700)', value: 'primary-700' },
  { name: 'FMDQ Gold (fmdq-gold)', value: 'fmdq-gold' },
  { name: 'FMDQ Grey (fmdq-grey)', value: 'fmdq-grey' },
  { name: 'Success (success-500)', value: 'success-500' },
  { name: 'Warning (warning-500)', value: 'warning-500' },
  { name: 'Error (error-500)', value: 'error-500' }
];

const COLOR_OPTIONS = [
  ...BRAND_COLORS.map(c => ({ label: c.name, value: c.value })),
  { label: 'Custom Color...', value: 'custom' }
];

const SIZES = [
  { label: '10px (XXS)', value: '10px' },
  { label: '12px (XS)', value: '12px' },
  { label: '14px (SM)', value: '14px' },
  { label: '16px (MD)', value: '16px' },
  { label: '18px (L)', value: '18px' },
  { label: '20px (XL)', value: '20px' },
  { label: '24px (XXL)', value: '24px' },
  { label: '32px (XXXL)', value: '32px' }
];

export const IconShowcase: React.FC = () => {
  const [search, setSearch] = useState('');
  const [variant, setVariant] = useState<'linear' | 'bold'>('linear');
  const [colorMode, setColorMode] = useState('currentColor');
  const [customColor, setCustomColor] = useState('');
  const [size, setSize] = useState('24px');

  const color = colorMode === 'custom' ? customColor : colorMode;
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const getResolvedColorValue = (val: string): string => {
    if (!val) return 'currentColor';
    const trimmed = val.trim();
    if (
      trimmed.startsWith('var(') ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('rgb') ||
      trimmed.startsWith('hsl') ||
      trimmed.toLowerCase() === 'currentcolor'
    ) {
      return trimmed;
    }
    const normalized = trimmed.toLowerCase().replace(/[\s_]+/g, '-');
    if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(normalized)) {
      return `var(--color-${normalized})`;
    }
    return trimmed;
  };

  const filteredIcons = ALL_ICONS.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase()) ||
      icon.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  const categories = Array.from(new Set(ALL_ICONS.map(i => i.category)));

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div style={{
      fontFamily: '"DM Sans", sans-serif',
      color: '#101828',
      background: '#FFFFFF',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #E4E7EC',
      boxShadow: '0px 4px 20px rgba(16, 24, 40, 0.05)',
      marginTop: '20px'
    }}>
      {/* Override input width cap within the controls panel */}
      <style>{`
        .icon-controls-grid .fmdqui-input-container {
          width: 100% !important;
        }
      `}</style>

      {/* ── Controls Toolbar ── */}
      <div className="icon-controls-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        margin: '0px 0 32px 0',
        background: '#F9FAFB',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #F0F2F5'
      }}>
        {/* Search Field */}
        <div>
          <Input
            label="Search Icons"
            hasLabel={true}
            hasLeftIcon={true}
            hasRightIcon={false}
            hasHelperText={false}
            placeholder="Type name or tag (e.g. magic)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Variant Style Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="fmdqui-input__label" style={{ fontSize: '14px', fontWeight: 500, lineHeight: '20px', color: 'var(--color-neutral-900)', display: 'block' }}>Variant Style</span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '36px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#344054' }}>
              <Toggle
                type="Radio"
                name="variant-style"
                active={variant === 'linear'}
                onChange={() => setVariant('linear')}
              />
              Linear
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#344054' }}>
              <Toggle
                type="Radio"
                name="variant-style"
                active={variant === 'bold'}
                onChange={() => setVariant('bold')}
              />
              Bold
            </label>
          </div>
        </div>

        {/* Color Customizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Input
            label="Icon Color"
            state="input dropdown"
            hasLabel={true}
            hasLeftIcon={false}
            hasRightIcon={true}
            hasHelperText={false}
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
            options={COLOR_OPTIONS}
            placeholder=""
          />
          {colorMode === 'custom' && (
            <div style={{ marginTop: '8px' }}>
              <Input
                label="Custom Color Value"
                hasLabel={false}
                hasLeftIcon={false}
                hasRightIcon={false}
                hasHelperText={false}
                placeholder="e.g. primary 600"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Size Customizer */}
        <div>
          <Input
            label="Icon Size"
            state="input dropdown"
            hasLabel={true}
            hasLeftIcon={false}
            hasRightIcon={true}
            hasHelperText={false}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            options={SIZES}
            placeholder=""
          />
        </div>
      </div>

      {/* ── Category / Icon Grid ── */}
      {categories.map(cat => {
        const catIcons = filteredIcons.filter(i => i.category === cat);
        if (catIcons.length === 0) return null;

        return (
          <div key={cat} style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#344054',
              borderBottom: '2px solid #F0F2F5',
              paddingBottom: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {cat}
              <span style={{ fontSize: '12px', color: '#667085', fontWeight: '400', background: '#F0F2F5', padding: '2px 8px', borderRadius: '12px' }}>
                {catIcons.length} {catIcons.length === 1 ? 'icon' : 'icons'}
              </span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '16px'
            }}>
              {catIcons.map(icon => {
                const isSelected = selectedIcon?.name === icon.name;

                return (
                  <button
                    key={icon.name}
                    onClick={() => setSelectedIcon(isSelected ? null : icon)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: isSelected ? '#FEF6E7' : '#FFFFFF',
                      border: isSelected ? '1px solid #CC9933' : '1px solid #E4E7EC',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease-in-out',
                      outline: 'none',
                      boxShadow: isSelected ? '0px 4px 12px rgba(204, 153, 51, 0.15)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#1D326D';
                        e.currentTarget.style.background = '#F9FAFB';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#E4E7EC';
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.transform = 'none';
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      background: '#F9FAFB',
                      borderRadius: '8px',
                      border: '1px solid #F0F2F5'
                    }}>
                      <Icon
                        name={icon.name}
                        variant={variant}
                        color={color}
                        size={size}
                      />
                    </div>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: isSelected ? '#CC9933' : '#344054',
                      wordBreak: 'break-all',
                      textAlign: 'center'
                    }}>
                      {icon.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {filteredIcons.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#667085' }}>
          <p style={{ fontSize: '16px', fontWeight: '500' }}>No icons found matching "{search}"</p>
          <p style={{ fontSize: '14px', marginTop: '4px' }}>Try searching for a different keyword or tag.</p>
        </div>
      )}

      {/* ── Selected Icon Detail Drawer ── */}
      {selectedIcon && (
        <div style={{
          marginTop: '32px',
          padding: '24px',
          background: '#FEF6E7',
          border: '1px solid #FBE2B7',
          borderRadius: '12px',
          display: 'grid',
          gridTemplateColumns: '80px 1fr',
          gap: '24px',
          alignItems: 'center',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          {/* Visual Showcase */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #FBE2B7',
            boxShadow: '0px 4px 10px rgba(16, 24, 40, 0.03)'
          }}>
            <Icon
              name={selectedIcon.name}
              variant={variant}
              color={color}
              size="40px"
            />
          </div>

          {/* Details & Code Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1D326D', margin: 0 }}>
                {selectedIcon.name}
              </h4>
              <span style={{ fontSize: '12px', color: '#667085', background: '#FFFFFF', padding: '2px 8px', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
                Category: {selectedIcon.category}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* HTML Snippet */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                <span style={{ width: '90px', fontSize: '11px', fontWeight: '700', color: '#667085', textTransform: 'uppercase' }}>HTML/CSS</span>
                <code style={{ flex: 1, fontSize: '12px', color: '#099137', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {`<span class="fmdq-icon fmdq-icon-${selectedIcon.name}${variant === 'bold' ? ' style-bold' : ''}"${color !== 'currentColor' ? ` style="--icon-color: ${getResolvedColorValue(color)};"` : ''}></span>`}
                </code>
                <button
                  onClick={() => handleCopy(
                    `<span class="fmdq-icon fmdq-icon-${selectedIcon.name}${variant === 'bold' ? ' style-bold' : ''}"${color !== 'currentColor' ? ` style="--icon-color: ${getResolvedColorValue(color)};"` : ''}></span>`,
                    'html'
                  )}
                  style={{
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: '1px solid #D0D5DD',
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    color: copiedText === 'html' ? '#099137' : '#344054'
                  }}
                >
                  {copiedText === 'html' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* React Snippet */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                <span style={{ width: '90px', fontSize: '11px', fontWeight: '700', color: '#667085', textTransform: 'uppercase' }}>React</span>
                <code style={{ flex: 1, fontSize: '12px', color: '#099137', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {`<Icon name="${selectedIcon.name}"${variant === 'bold' ? ' variant="bold"' : ''}${color !== 'currentColor' ? ` color="${color}"` : ''}${size !== '24px' ? ` size="${size}"` : ''} />`}
                </code>
                <button
                  onClick={() => handleCopy(
                    `<Icon name="${selectedIcon.name}"${variant === 'bold' ? ' variant="bold"' : ''}${color !== 'currentColor' ? ` color="${color}"` : ''}${size !== '24px' ? ` size="${size}"` : ''} />`,
                    'react'
                  )}
                  style={{
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: '1px solid #D0D5DD',
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    color: copiedText === 'react' ? '#099137' : '#344054'
                  }}
                >
                  {copiedText === 'react' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* CSS Token */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                <span style={{ width: '90px', fontSize: '11px', fontWeight: '700', color: '#667085', textTransform: 'uppercase' }}>CSS Token</span>
                <code style={{ flex: 1, fontSize: '12px', color: '#099137', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {`var(--icon-${selectedIcon.name}-${variant})`}
                </code>
                <button
                  onClick={() => handleCopy(
                    `var(--icon-${selectedIcon.name}-${variant})`,
                    'css'
                  )}
                  style={{
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: '1px solid #D0D5DD',
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    color: copiedText === 'css' ? '#099137' : '#344054'
                  }}
                >
                  {copiedText === 'css' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
