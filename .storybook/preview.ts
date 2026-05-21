import type { Preview } from '@storybook/react-vite'
import '../src/tokens.css'

const preview: Preview = {
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

        const aParts = a.title.split('/');
        const bParts = b.title.split('/');

        const minLength = Math.min(aParts.length, bParts.length);
        for (let i = 0; i < minLength; i++) {
          const aPartRaw = aParts[i];
          const bPartRaw = bParts[i];
          const aPart = aPartRaw.replace(/^[^a-zA-Z0-9]+/g, '').trim();
          const bPart = bPartRaw.replace(/^[^a-zA-Z0-9]+/g, '').trim();

          if (aPart !== bPart) {
            if (i === 0) {
              const aIndex = rootOrder.indexOf(aPart);
              const bIndex = rootOrder.indexOf(bPart);

              if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
              if (aIndex !== -1) return -1;
              if (bIndex !== -1) return 1;
              return aPart.localeCompare(bPart);
            }

            if (aPart === 'Start Here') return -1;
            if (bPart === 'Start Here') return 1;

            return aPart.localeCompare(bPart);
          }
        }

        return aParts.length - bParts.length;
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