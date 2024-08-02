import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import { defineConfig as viteDefineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(
  viteDefineConfig({
    base: '',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [tsconfigPaths(), react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/app/__tests__/config/config.ts'],
      exclude: ['.next', 'node_modules'],
    },
  })
);
