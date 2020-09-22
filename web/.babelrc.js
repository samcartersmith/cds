const { argv } = require('yargs');

module.exports = api => {
  // Whether or not webpack was run with production mode
  const isProduction = argv.mode === 'production';
  // Whether or not we're running in jest
  const isTestingEnvironment = api.env('test');

  // In development mode, outside of bazel, everything is local to this directory.
  let moduleResolverConfig = {
    root: ['./'],
    alias: {
      '@cb/design-system-web': './src',
    },
  };

  // When we're in production / testing environment, the CWD is the root of the monorepo so we'll adjust accordingly
  if (isProduction || isTestingEnvironment) {
    moduleResolverConfig = {
      root: ['./eng/shared/design-system/web'],
      alias: {
        '@cb/design-system-web': './eng/shared/design-system/web/src',
      },
    };
  }

  return {
    plugins: ['@babel/plugin-proposal-class-properties', ['module-resolver', moduleResolverConfig]],
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      '@babel/preset-env',
      'linaria/babel',
    ],
  };
};
