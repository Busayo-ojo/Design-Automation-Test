import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react-vite'
import '../src/tokens.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <BrowserRouter basename={import.meta.env.VITE_APP_URL}>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    options: {
      storySort: (a, b) => {
        const rootOrder = [
          'Welcome',
          'Getting Started',
          'Catalog',
          'MCP',
          'Playground',
          'Changelog',
          'Migration Guide',
          'Contributing',
          'Foundations',
          'Elements',
          'Components',
          'Layout',
        ];

        const itemOrder = [
          'Colors',
          'Shadows and Blurs',
          'Spacing',
          'Typography',
          'Badge',
          'Button',
          'Chip',
          'Input',
          'Tabbed Buttons',
          'Toast',
          'Toggle',
          'Avatars',
          'Elements'
        ];

        const aRootRaw = a.title.split('/')[0];
        const bRootRaw = b.title.split('/')[0];
        const aRoot = aRootRaw.replace(/^[^a-zA-Z0-9]+/g, '').trim();
        const bRoot = bRootRaw.replace(/^[^a-zA-Z0-9]+/g, '').trim();

        if (aRoot !== bRoot) {
          const aIndex = rootOrder.indexOf(aRoot);
          const bIndex = rootOrder.indexOf(bRoot);

          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return aRoot.localeCompare(bRoot);
        }

        const aTitleRaw = a.title.split('/').pop() || '';
        const bTitleRaw = b.title.split('/').pop() || '';
        const aTitle = aTitleRaw.replace(/^[^a-zA-Z0-9]+/g, '').trim();
        const bTitle = bTitleRaw.replace(/^[^a-zA-Z0-9]+/g, '').trim();
        
        const aItemIndex = itemOrder.indexOf(aTitle);
        const bItemIndex = itemOrder.indexOf(bTitle);

        if (aItemIndex !== -1 && bItemIndex !== -1) return aItemIndex - bItemIndex;
        if (aItemIndex !== -1) return -1;
        if (bItemIndex !== -1) return 1;

        return aTitle.localeCompare(bTitle);
      },
    },
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;