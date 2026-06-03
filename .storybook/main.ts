import { fileURLToPath } from 'url';
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
    return config;
  },
};
export default config;
