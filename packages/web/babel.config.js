const baseConfig = require('../../babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';
const isSSRBuild = process.env.SSR_BUILD;
const buildPresets = [...baseConfig.presets];

if (!isSSRBuild) {
  buildPresets.push([
    require.resolve('@cbhq/cds-web-utils/babel/linariaPreset'),
    // eslint-disable-next-line global-require
    require('./linaria.config'),
  ]);
} else {
  buildPresets.push(['linaria/babel', { classNameSlug: (hash, title) => `${title}-${hash}` }]);
}

const jestBabelConfig = {
  presets: [...baseConfig.presets, ['linaria/babel', { classNameSlug: (_, title) => title }]],
};

const buildBabelConfig = {
  presets: buildPresets,
  plugins: [...baseConfig.plugins],
};

module.exports = isTestEnv ? jestBabelConfig : buildBabelConfig;
