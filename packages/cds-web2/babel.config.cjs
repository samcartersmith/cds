// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTestEnv ? 'commonjs' : false }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
    [
      require.resolve('@cbhq/cds-web-utils/babel/linariaPreset'),
      {
        sourceDir: 'packages/cds-web2/src',
        outputDir: 'packages/cds-web2/esm',
        linariaOptions: {
          classNameSlug: (hash, title) => (isTestEnv ? title : `cds-${title}-${hash}`),
        },
      },
    ],
  ],
  // plugins: [
  //   [
  //     'babel-plugin-react-compiler',
  //     {
  //       runtimeModule: 'react-compiler-runtime',
  //     },
  //   ],
  // ],
  ignore: isTestEnv
    ? []
    : [
        '**/__stories__/**',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/__fixtures__/**',
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.spec.*',
      ],
};
