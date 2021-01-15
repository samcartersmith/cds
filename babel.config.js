// This is used for building packages for NPM publishing.
// It is different from the root config as we do not want
// to convert module aliases, and we also need to support
// Linaria CSS extraction.

module.exports = api => {
  api.cache(true);

  return {
    plugins: [['babel-plugin-transform-async-to-promises', { inlineHelpers: true, target: 'es6' }]],
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          loose: true,
          modules: false,
          shippedProposals: true,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
      './codegen/babel-plugins/linariaPreset.js',
    ],
  };
};
