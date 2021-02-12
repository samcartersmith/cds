// This is used for building packages for NPM publishing.
// It is different from the root config as we do not want
// to convert module aliases, and we also need to support
// Linaria CSS extraction.

// Output dir is either esm or lib
const isESM = process.argv.some(arg => arg.endsWith('/esm'));

module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          loose: true,
          modules: isESM ? false : 'commonjs',
          shippedProposals: true,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
      './codegen/babel-plugins/linariaPreset.js',
    ],
  };
};
