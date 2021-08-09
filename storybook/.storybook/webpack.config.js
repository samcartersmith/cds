const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');

const { modifyConfigForStorybook } = require('../../../utils/webpack/modifyConfigForStorybook');

module.exports = ({ config, environmentFile }) => {
  return modifyConfigForStorybook({
    config,
    environmentFile:
      environmentFile ||
      path.resolve(__dirname, `.env${process.env.NODE_ENV === 'development' ? '.local' : '.prod'}`),
    plugins: [
      new HtmlPlugin({
        inject: false,
        filename: 'addon-designs-oauth.html',
        template: path.resolve(__dirname, './figma_oauth.html'),
      }),
    ],
  });
};
