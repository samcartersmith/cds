/* eslint-disable import/no-extraneous-dependencies */
// @ts-check
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { bundleStats } from 'rollup-plugin-bundle-stats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

const srcDirectory = path.resolve(__dirname, 'src');
const externals = [/node_modules/, /^node:/, /@babel\/runtime/, /\.css$/];
const isExternal = (id) => {
  const absolutePath = path.resolve(srcDirectory, id);
  return externals.some((e) => e.test(id)) || !absolutePath.startsWith(srcDirectory);
};

/** @type {import('rollup').RollupOptions} */
export default {
  input: globSync('src/**/*.ts?(x)', { cwd: __dirname }),
  external: isExternal,
  output: {
    format: 'esm',
    dir: 'esm',
    preserveModules: true,
  },
  plugins: [
    // Add node_modules resolution and make .js/.jsx resolve to .ts/.tsx similar to TypeScript
    resolve({ extensions, preferBuiltins: true }),
    babel({ extensions }),
    // bundleStats(),
    // terser(),
  ],
};
