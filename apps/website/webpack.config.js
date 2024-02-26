const path = require('path');

/* eslint-disable no-param-reassign */
function configureForDocusaurus(config) {
  const isProduction = config.mode === 'production';

  // Modify rules to support our tooling
  config.module?.rules?.forEach((rule) => {
    if (rule === '...' || !(rule.test instanceof RegExp) || !Array.isArray(rule.use)) {
      return;
    }

    // Add `linaria/loader` for .tsx files
    if ('.tsx'.match(rule.test)) {
      rule.use.push({
        loader: '@linaria/webpack-loader',
        options: {
          sourceMap: !isProduction,
        },
      });
    }
  });

  config.resolve.alias.linaria$ = '@linaria/core';
  config.resolve.alias[':cds-website'] = path.resolve(__dirname, './');
  config.resolve.alias['@cbhq/cds-web-visualization'] = path.resolve(
    __dirname,
    '../../packages/web-visualization/src',
  );

  return {};
}

function webpackPlugin() {
  return {
    name: 'cds-docusaurus-webpack-plugin',
    configureWebpack: configureForDocusaurus,
  };
}

module.exports = webpackPlugin;
