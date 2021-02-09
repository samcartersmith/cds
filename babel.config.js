// This is used for building packages for NPM publishing.
// It is different from the root config as we do not want
// to convert module aliases, and we also need to support
// Linaria CSS extraction.

// Output dir is either esm or lib
const isESM = process.argv.some(arg => arg.endsWith('/esm'));

module.exports = api => {
  api.cache(true);

  return {
    plugins: [
      [
        'babel-plugin-transform-async-to-promises',
        { inlineHelpers: true, target: isESM ? 'es6' : 'es5' },
      ],
    ],
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
