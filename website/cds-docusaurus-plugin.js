const path = require('path');
const {
  addRootModeUpwardToBabelLoaders,
} = require('../../../shared/utils/webpack/addRootModeUpwardToBabelLoaders');

module.exports = () => {
  return {
    name: 'cds-docusaurus-plugin',
    configureWebpack(config) {
      const isProduction = config.mode === 'production';
      const tsModuleRule = config.module.rules.find(rule => Boolean('.tsx'.match(rule.test)));

      addRootModeUpwardToBabelLoaders(config);

      return {
        module: {
          rules: [
            {
              test: tsModuleRule.test,
              exclude: tsModuleRule.exclude,
              use: [
                {
                  loader: 'linaria/loader',
                  options: {
                    displayName: !isProduction,
                    sourceMap: !isProduction,
                    babelOptions: { rootMode: 'upward' },
                  },
                },
              ],
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: ['file-loader'],
            },
          ],
        },
      };
    },
    /* other lifecycle API */
  };
};
