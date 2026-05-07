import React, { useState } from 'react';
import { Heading, Text } from './index';
import './Typography.css';

export const TypographyPlayground: React.FC = () => {
  const [inputText, setInputText] = useState('The quick brown fox jumps over the lazy dog');
  const [selectedStyle, setSelectedStyle] = useState<string>('heading-1');
  const [showCode, setShowCode] = useState(false);

  const styles = [
    { label: 'Display Large', value: 'display-lg', type: 'heading' },
    { label: 'Display Small', value: 'display-sm', type: 'heading' },
    { label: 'Heading 1', value: '1', type: 'heading' },
    { label: 'Heading 2', value: '2', type: 'heading' },
    { label: 'Heading 3', value: '3', type: 'heading' },
    { label: 'Heading 4', value: '4', type: 'heading' },
    { label: 'Heading 5', value: '5', type: 'heading' },
    { label: 'Heading 6', value: '6', type: 'heading' },
    { label: 'Paragraph Large', value: 'lg', type: 'text' },
    { label: 'Paragraph Medium', value: 'md', type: 'text' },
    { label: 'Paragraph Small', value: 'sm', type: 'text' },
    { label: 'Paragraph XS', value: 'xs', type: 'text' },
    { label: 'Caption Large', value: 'caption-lg', type: 'text' },
    { label: 'Caption Small', value: 'caption-sm', type: 'text' },
    { label: 'Caption XS', value: 'caption-xs', type: 'text' },
  ];

  const currentStyle = styles.find(s => s.value === selectedStyle);

  const renderPreview = () => {
    if (!currentStyle) return null;

    if (currentStyle.type === 'heading') {
      return (
        <Heading level={currentStyle.value as any}>
          {inputText || 'Please enter some text'}
        </Heading>
      );
    }

    return (
      <Text size={currentStyle.value as any}>
        {inputText || 'Please enter some text'}
      </Text>
    );
  };

  const getCodeSnippet = () => {
    if (!currentStyle) return '';
    if (currentStyle.type === 'heading') {
      return `<Heading level="${currentStyle.value}">\n  ${inputText}\n</Heading>`;
    }
    return `<Text size="${currentStyle.value}">\n  ${inputText}\n</Text>`;
  };

  return (
    <div className="typography-playground" style={{
      border: '1px solid #E4E7EC',
      borderRadius: '16px',
      padding: '32px',
      backgroundColor: 'white',
      marginTop: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4 style={{ margin: 0, fontSize: '16px', color: '#101828', fontWeight: '600' }}>
            Typography Playground
          </h4>
          <button 
            onClick={() => setShowCode(!showCode)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #D0D5DD',
              backgroundColor: showCode ? '#F9FAFB' : 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '2 1 400px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: '#475467', fontWeight: '500' }}>Preview Text</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #D0D5DD',
                fontSize: '14px',
                outline: 'none',
                minHeight: '80px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: '#475467', fontWeight: '500' }}>Select Style</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #D0D5DD',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23667085'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px'
              }}
            >
              {styles.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {showCode && (
        <div style={{ marginBottom: '24px' }}>
          <pre style={{
            backgroundColor: '#101828',
            color: '#F9FAFB',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflowX: 'auto',
            margin: 0,
            border: '1px solid #1D2939'
          }}>
            <code>{getCodeSnippet()}</code>
          </pre>
        </div>
      )}

      <div style={{
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#F9FAFB',
        borderRadius: '12px',
        border: '1px dashed #EAECF0',
        overflowWrap: 'anywhere',
        textAlign: 'center'
      }}>
        {renderPreview()}
      </div>
    </div>
  );
};
