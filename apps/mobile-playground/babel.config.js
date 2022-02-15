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
          '@cbhq/cds-common': '../../packages/common',
          '@cbhq/cds-utils': '../../packages/utils',
          '@cbhq/cds-lottie-files': '../../packages/lottie-files',
          '@cbhq/cds-fonts': '../../packages/fonts',
          '@cbhq/cds-web-utils': '../../packages/web-utils',
          '@cbhq/cds-web': '../../packages/web',
          ':cds-website': './',
        },
      },
    ],
  ],
};
