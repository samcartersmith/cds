const baseConfig = require('../../babel.config');

module.exports = {
  presets: [
    ...baseConfig.presets,
    [require.resolve('../web-utils/dist/babel/linariaPreset'), require('./linaria.config')],
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
