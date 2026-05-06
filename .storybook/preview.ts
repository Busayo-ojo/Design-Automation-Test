import type { Preview } from '@storybook/react-vite'
import '../src/tokens.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: (a, b) => {
        const order = [
          'Welcome',
          'Getting Started',
          'Catalog',
          'MCP',
          'Playground',
          'Foundations',
          'Elements',
          'Components',
          'Layout',
          'Changelog',
          'Migration Guide',
          'Contributing',
        ];

        const aRoot = a.title.split('/')[0];
        const bRoot = b.title.split('/')[0];

        if (aRoot !== bRoot) {
          const aIndex = order.indexOf(aRoot);
          const bIndex = order.indexOf(bRoot);

          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return aRoot.localeCompare(bRoot);
        }

        return a.title.localeCompare(b.title);
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