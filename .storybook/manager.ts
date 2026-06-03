import { addons } from 'storybook/manager-api';
import fmdqTheme from './fmdqTheme';

addons.setConfig({
  theme: fmdqTheme,
  sidebar: {
    showRoots: true,
  },
});
