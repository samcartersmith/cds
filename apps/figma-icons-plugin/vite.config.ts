/* eslint-disable @typescript-eslint/no-unused-expressions */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { argv } from 'yargs';

const { watch } = argv as { watch?: boolean };

const noop = () => {};

async function reloadFigma() {
  const { $ } = await import('zx');
  $.verbose = false;
  return {
    name: 'vite-plugin-reload-figma',
    buildEnd: function buildEnd() {
      $`./scripts/reload-figma.sh`;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), viteSingleFile(), watch ? reloadFigma() : noop],
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
});
