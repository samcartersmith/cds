const path = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const MONOREPO_ROOT_DIR = path.resolve(__dirname, '../../../../../');
const envFile = `.env${process.env.NODE_ENV === 'development' ? '.local' : ''}`;

/**
 * Customize and extending storybook default webpack config.
 * Storybook's default webpack config has typescript support starting v6.
 */
module.exports = ({ config, tsconfig, environmentFile }) => {
  const isProduction = config.mode === 'production';

  config.stats = isProduction ? 'errors-only' : 'verbose';

  config.plugins = [
    ...config.plugins,
    new Dotenv({
      path: environmentFile || path.resolve(__dirname, envFile),
    }),
    new HtmlPlugin({
      inject: false,
      filename: 'addon-designs-oauth.html',
      template: path.resolve(__dirname, './figma_oauth.html'),
    }),
  ];

  // Add linaria/loader to storybook default webpack config module rules for .tsx files
  const tsModuleRule = config.module.rules.find(rule => Boolean('.tsx'.match(rule.test)));
  if (!tsModuleRule) {
    throw new Error("Cannot find module rule for '.tsx'");
  }
  tsModuleRule.use.push({
    loader: 'linaria/loader',
    options: {
      displayName: !isProduction,
      sourceMap: !isProduction,
      babelOptions: { rootMode: 'upward' },
    },
  });

  config.resolve.modules = [path.resolve(MONOREPO_ROOT_DIR), 'node_modules'];
  const tsconfigPath = tsconfig || path.join(MONOREPO_ROOT_DIR, 'tsconfig.json');
  config.resolve.plugins = [
    ...config.resolve.plugins,
    new TsconfigPathsPlugin({ configFile: tsconfigPath }),
  ];

  return config;
};
