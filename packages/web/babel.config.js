const baseConfig = require('../../babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    ...baseConfig.presets,
    ['linaria/babel', { classNameSlug: (hash, title) => (isTestEnv ? title : `${title}-${hash}`) }],
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        alias: {
          '@cbhq/cds-common': '../common',
          '@cbhq/cds-utils': '../utils',
          '@cbhq/cds-lottie-files': '../lottie-files',
          '@cbhq/cds-fonts': '../fonts',
          '@cbhq/cds-web-utils': '../web-utils',
        },
      },
    ],
  ],
};
