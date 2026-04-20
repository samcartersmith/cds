import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    codeSplitting: false,
    rollupOptions: {
      output: {
        // IIFE output has no import/export syntax — safe to inline into Figma's
        // sandboxed iframe without needing type="module" on the script tag.
        format: 'iife',
        name: 'PluginUI',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
