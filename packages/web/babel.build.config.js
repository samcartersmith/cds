const baseConfig = require('../../babel.build.config');

module.exports = {
  presets: [
    ...baseConfig.presets,
    // eslint-disable-next-line global-require
    ['@cbhq/cds-web-utils/babel/linariaPreset', require('./linaria.config')],
  ],
  plugins: [...baseConfig.plugins],
};
