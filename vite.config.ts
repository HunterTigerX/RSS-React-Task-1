import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes: async (defineRoutes) => {
        return defineRoutes((route) => {
          route('/color/:id', 'routes/color.$number.tsx');
          route('/color/:id/pokemon/:pokemonId', 'routes/color.$number.pokemon.$pokemonId.tsx');
        });
      },
    }),
    tsconfigPaths(),
  ],
});
