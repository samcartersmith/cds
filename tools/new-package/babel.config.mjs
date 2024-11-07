// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';

/** @type {import('@babel/core').TransformOptions} */
export default {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [],
};
