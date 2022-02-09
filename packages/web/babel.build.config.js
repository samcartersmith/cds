const baseConfig = require('../../babel.build.config');

module.exports = {
  presets: [
    ...baseConfig.presets,
    [require.resolve('../web-utils/dist/babel/linariaPreset'), require('./linaria.config')],
  ],
  plugins: [...baseConfig.plugins],
};
