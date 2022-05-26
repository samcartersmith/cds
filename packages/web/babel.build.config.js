const baseConfig = require('../../babel.build.config');

const isSSRBuild = process.env.SSR_BUILD;

const presets = [...baseConfig.presets];

if (!isSSRBuild) {
  presets.push([
    require.resolve('@cbhq/cds-web-utils/babel/linariaPreset'),
    // eslint-disable-next-line global-require
    require('./linaria.config'),
  ]);
} else {
  presets.push('linaria/babel');
}

module.exports = {
  presets,
  plugins: [...baseConfig.plugins],
};
