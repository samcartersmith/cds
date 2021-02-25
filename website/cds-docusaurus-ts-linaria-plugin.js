const path = require('path');

module.exports = () => {
  return {
    name: 'cds-docusaurus-ts-linaria-plugin',
    configureWebpack(config) {
      const isProduction = config.mode === 'production';
      const tsModuleRule = config.module.rules.find(rule => Boolean('.tsx'.match(rule.test)));

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
          ],
        },
      };
    },
    /* other lifecycle API */
  };
};
