const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const MONOREPO_ROOT_DIR = path.resolve(__dirname, '../../../../');

module.exports = () => {
  return {
    name: 'cds-docusaurus-plugin',
    configureWebpack(config) {
      const isProduction = config.mode === 'production';
      const tsModuleRule = config.module.rules.find(rule => Boolean('.tsx'.match(rule.test)));
      const tsconfigPath = path.join(MONOREPO_ROOT_DIR, 'tsconfig.json');

      return {
        resolve: {
          plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })],
        },
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
