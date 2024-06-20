/* eslint-disable import/no-extraneous-dependencies */
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';
import path from 'node:path';

// import { fileURLToPath } from 'node:url';
import pkg from './package.json' assert { type: 'json' };

// TO DO: enable terser sometime

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: './src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    /react/,
  ],
  output: [
    // {
    //   format: 'esm',
    //   entryFileNames: '[name].js',
    //   dir: path.dirname(pkg.module),
    //   preserveModules: true,
    // },
    {
      format: 'cjs',
      entryFileNames: '[name].js',
      dir: path.dirname(pkg.main),
      preserveModules: true,
    },
  ],
  plugins: [
    resolve({
      // Make .js/.jsx resolve to .ts/.tsx similar to TypeScript
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    babel({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      // babelHelpers: 'runtime',
    }),
    // terser(),
  ],
};
