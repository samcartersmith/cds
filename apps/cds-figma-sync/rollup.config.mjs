/* eslint-disable import/no-extraneous-dependencies */
// @ts-check
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';
// import { bundleStats } from 'rollup-plugin-bundle-stats';

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

/** @type {import('rollup').RollupOptions} */
export default {
  input: './src/index.ts',
  output: {
    format: 'esm',
    dir: 'esm',
    preserveModules: true,
  },
  plugins: [
    // Add node_modules resolution and make .js/.jsx resolve to .ts/.tsx similar to TypeScript
    resolve({ extensions, preferBuiltins: true }),
    json(),
    commonjs(),
    babel({ extensions }),
    // bundleStats(),
    // terser(),
  ],
};
