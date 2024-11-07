// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: 'commonjs' }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
    '@linaria/babel-preset',
  ],
};
