const baseConfig = require('../../babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    ...baseConfig.presets,
    ['linaria/babel', { classNameSlug: (hash, title) => (isTestEnv ? title : `${title}-${hash}`) }],
  ],
};
