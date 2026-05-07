import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  brandTitle: 'FMDQ Design System',
  brandUrl: '/',
  brandImage: '/fmdq-logo.svg',
  brandTarget: '_self',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e4e7ec',
  appBorderRadius: 4,

  // Typography
  fontBase: '"DM Sans", "Inter", "Helvetica", "Arial", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#101828',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#667085',
  barSelectedColor: '#1d326d',
  barHoverColor: '#1d326d',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d0d5dd',
  inputTextColor: '#101828',
  inputBorderRadius: 4,

  // Brand Colors mapped
  colorPrimary: '#1d326d',
  colorSecondary: '#cc9933',
});
