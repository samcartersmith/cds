const path = require('path');
const webpack = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');

const BABEL_OPTIONS = { configFile: true, rootMode: 'upward' };

module.exports = ({ config, environmentFile }) => {
  const dotEnv = require('dotenv').config({ path: path.resolve(__dirname, '.env') }).parsed;
  const envVars = { ...dotEnv, ...process.env };

  const definitions = {
    'process.env': JSON.stringify(envVars),
  };

  if (envVars.STORYBOOK_SKIP_ANIMATION) {
    definitions.STORYBOOK_SKIP_ANIMATION = true;
  }

  config.plugins?.push(
    new webpack.DefinePlugin(definitions),
  );

  const isProduction = config.mode === 'production';

  config.module?.rules?.forEach((rule) => {
    if (rule === '...' || !(rule.test instanceof RegExp) || !Array.isArray(rule.use)) {
      return;
    }

    // Add `linaria/loader` for .tsx files
    if ('.tsx'.match(rule.test) || '.ts'.match(rule.test)) {
      rule.use.push({
        loader: 'linaria/loader',
        options: {
          displayName: !isProduction,
          sourceMap: !isProduction,
          babelOptions: BABEL_OPTIONS,
        },
      });
    }

    // Add `babel-loader` for .mdx files
    if ('.mdx'.match(rule.test)) {
      rule.use.unshift({
        loader: 'babel-loader',
        options: BABEL_OPTIONS,
      });
    }

    // Update `babel-loader` options
    for (const use of rule.use) {
      if (
        typeof use === 'object' &&
        typeof use.options === 'object' &&
        use.loader?.includes('babel-loader')
      ) {
        Object.assign(use.options, BABEL_OPTIONS);
      }
    }
  });

  return config;
};
