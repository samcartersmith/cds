const isTestEnv = process.env.NODE_ENV === 'test';

const sharedPresets = ['@babel/preset-typescript'];

const jestBabelConfig = {
  plugins: [],
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: 'commonjs',
        exclude: [
          '@babel/plugin-proposal-dynamic-import',
          // Preserve native async/await
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-async-to-generator',
        ],
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ...sharedPresets,
  ],
};

const buildBabelConfig = {
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-destructuring', { loose: true }],
    'replace-ts-export-assignment',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: 'commonjs',
        corejs: undefined,
        exclude: ['@babel/plugin-proposal-dynamic-import'],
      },
    ],
    ['@babel/preset-react', { runtime: 'classic' }],
    ...sharedPresets,
  ],
};

module.exports = isTestEnv ? jestBabelConfig : buildBabelConfig;