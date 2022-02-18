const baseConfig = require('../../babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    ...baseConfig.presets,
    'module:metro-react-native-babel-preset',
    ['linaria/babel', { classNameSlug: (hash, title) => (isTestEnv ? title : `${title}-${hash}`) }],
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        alias: {
          ':cds-website': './',
        },
      },
    ],
  ],
};
