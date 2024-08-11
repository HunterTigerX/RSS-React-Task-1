import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    !process.env.VITEST
      ? remix({
          appDirectory: 'app',
        })
      : react(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['app/__tests__/config/config.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        'dist',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
        '**/.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    },
    env: loadEnv('test', process.cwd(), ''),
  },
});
