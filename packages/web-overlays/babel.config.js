const baseConfig = require('../../babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';
const buildPresets = [...baseConfig.presets];

buildPresets.push(['linaria/babel', { classNameSlug: (hash, title) => `${title}-${hash}` }]);

const jestBabelConfig = {
  presets: [...baseConfig.presets, ['linaria/babel', { classNameSlug: (_, title) => title }]],
};

const buildBabelConfig = {
  presets: buildPresets,
  plugins: [...baseConfig.plugins],
};

module.exports = isTestEnv ? jestBabelConfig : buildBabelConfig;
