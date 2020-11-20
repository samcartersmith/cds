import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import linaria from 'linaria/rollup';
import path from 'path';
import postcssUrl from 'postcss-url';
import babel from 'rollup-plugin-babel';
import externals from 'rollup-plugin-node-externals';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const input = [path.join(__dirname, 'src/index.ts')];
const extensions = ['.js', '.ts', '.tsx'];

export default [
  // CJS
  {
    input,
    output: {
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      externals({
        builtins: true,
        deps: true,
        devDeps: true,
        optDeps: true,
        peerDeps: true,
      }),
      resolve({ extensions, preferBuiltins: true }),
      commonjs(),
      postcss({
        extract: 'styles.css',
        minimize: true,
        plugins: [
          postcssUrl({
            url: 'rebase',
            assetsPath: './',
          }),
        ],
        to: 'eng/shared/design-system/web/dist/styles.css',
      }),
      linaria({ sourceMap: true, ...require('./linaria.config.js') }),
      babel({
        exclude: ['**/**.stories.*', '**/*.d.ts'],
        extensions,
        runtimeHelpers: true,
        rootMode: 'upward',
      }),
      terser(),
    ],
  },
];
