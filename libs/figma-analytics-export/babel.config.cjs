// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [['@babel/preset-env', { modules: 'commonjs' }], '@babel/preset-typescript'],
  ignore: isTestEnv
    ? []
    : ['**/__tests__/**', '**/__mocks__/**', '**/__fixtures__/**', '**/*.test.*', '**/*.spec.*'],
};
