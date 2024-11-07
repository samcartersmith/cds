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

  /**
   * These aliases are necessary to make ECMAScript Modules work with Docusaurus. In
   * v3+ we should probably try to switch to a config similar to other webpack configs
   * in this repo, where aliases are only applied in dev mode.
   */
  config.resolve.alias['@cbhq/cds-common'] = path.resolve(__dirname, '../../packages/common/src');
  config.resolve.alias['@cbhq/cds-icons'] = path.resolve(__dirname, '../../packages/icons/src');
  config.resolve.alias['@cbhq/cds-illustrations'] = path.resolve(
    __dirname,
    '../../packages/illustrations/src',
  );
  config.resolve.alias['@cbhq/cds-lottie-files'] = path.resolve(
    __dirname,
    '../../packages/lottie-files/src',
  );
  config.resolve.alias['@cbhq/cds-utils'] = path.resolve(__dirname, '../../packages/utils/src');
  config.resolve.alias['@cbhq/cds-web'] = path.resolve(__dirname, '../../packages/web/src');
  config.resolve.alias['@cbhq/cds-web-visualization'] = path.resolve(
    __dirname,
    '../../packages/web-visualization/src',
  );

  // config.resolve.alias['@cbhq/docusaurus-plugin-docgen'] = path.resolve(
  //   __dirname,
  //   '../../libs/docusaurus-plugin-docgen/src',
  // );
  // config.resolve.alias['@cbhq/docusaurus-plugin-kbar'] = path.resolve(
  //   __dirname,
  //   '../../libs/docusaurus-plugin-kbar/src',
  // );
  // config.resolve.alias['@cbhq/docusaurus-preset'] = path.resolve(
  //   __dirname,
  //   '../../libs/docusaurus-preset/src',
  // );
  // config.resolve.alias['@cbhq/docusaurus-theme'] = path.resolve(
  //   __dirname,
  //   '../../libs/docusaurus-theme/src',
  // );

  return {};
}

function webpackPlugin() {
  return {
    name: 'cds-docusaurus-webpack-plugin',
    configureWebpack: configureForDocusaurus,
  };
}

module.exports = webpackPlugin;
