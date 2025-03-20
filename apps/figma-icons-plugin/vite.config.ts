import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import yargs from 'yargs';

const { argv } = yargs(process.argv);

const { watch } = argv as { watch?: boolean };

async function reloadFigma() {
  const { $ } = await import('zx');
  $.verbose = false;
  return {
    name: 'vite-plugin-reload-figma',
    buildEnd: function buildEnd() {
      void $`./scripts/reload-figma.sh`;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  const config: UserConfig = {
    plugins: [react(), viteSingleFile(), watch ? reloadFigma() : undefined],
    build: {
      target: 'esnext',
      emptyOutDir: false,
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      outDir: './lib',
      rollupOptions: {
        inlineDynamicImports: true,
      },
    },
  };

  return config;
});
