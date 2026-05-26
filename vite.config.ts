import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    include: ['src'],
    exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
    tsconfigPath: './tsconfig.app.json',
    rollupTypes: true
  })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'FmdqUI',
      formats: ['es', 'umd'],
      fileName: format => `fmdq-ui.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    }
  }
});