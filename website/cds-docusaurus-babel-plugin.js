const { addRootModeUpwardToBabelLoaders } = require('@cbhq/webpack-utils');

module.exports = () => {
  return {
    name: 'cds-docusaurus-babel-plugin',
    configureWebpack(config) {
      addRootModeUpwardToBabelLoaders(config);

      return {
        mergeStrategy: { 'module.rules': 'prepend' },
        module: {
          rules: [
            {
              test: /\.mdx?$/,
              use: [{ loader: 'babel-loader', options: { rootMode: 'upward' } }],
            },
          ],
        },
      };
    },
    /* other lifecycle API */
  };
};
