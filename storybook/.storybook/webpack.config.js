const path = require('path');
const Dotenv = require('dotenv-webpack');

const HtmlPlugin = require('html-webpack-plugin');

const { configureForStorybook } = require('@cbhq/webpack-utils');

module.exports = (storybook) => {
  const config = configureForStorybook(storybook);

  config.plugins?.push(
    new Dotenv({
      path: storybook.environmentFile,
      STORYBOOK_SKIP_ANIMATION: process.env.STORYBOOK_SKIP_ANIMATION,
    }),
  );

  config.plugins.push(
    new HtmlPlugin({
      inject: false,
      filename: 'addon-designs-oauth.html',
      template: path.resolve(__dirname, './figma_oauth.html'),
    }),
  );

  return config;
};
