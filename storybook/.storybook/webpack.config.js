const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');

const { configureForStorybook } = require('@cbhq/webpack-utils');

module.exports = (storybook) => {
  const config = configureForStorybook({
    ...storybook,
    environmentFile: storybook.environmentFile ||
      path.resolve(__dirname, `.env${process.env.NODE_ENV === 'development' ? '.local' : '.prod'}`),
  });

  config.plugins.push(
    new HtmlPlugin({
      inject: false,
      filename: 'addon-designs-oauth.html',
      template: path.resolve(__dirname, './figma_oauth.html'),
    }),
  );

  return config;
};
