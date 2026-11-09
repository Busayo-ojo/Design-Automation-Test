import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "staticDirs": ["../public"],
  "addons": ["@storybook/addon-links", "@storybook/addon-docs"],
  "framework": "@storybook/react-vite",
  viteFinal: async (config) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push({
      name: 'resolve-file-url-imports',
      resolveId(id: string) {
        if (id.startsWith('file://')) {
          return fileURLToPath(id);
        }
      },
    });
    config.plugins.push({
      name: 'auto-generate-changelog',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && (req.url.includes('changelog-data.json') || req.url.includes('Changelog.mdx'))) {
            try {
              execSync('node scripts/generate-changelog.mjs', { stdio: 'ignore' });
            } catch (_err) {
              // Ignore changelog generation error during hot requests
            }
          }
          next();
        });
      },
    });
    return config;
  },
};
export default config;
