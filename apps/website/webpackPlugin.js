const path = require('path');

function getRefreshFile(name) {
  return path.resolve(__dirname, './src/theme-refresh', `${name}.tsx`);
}

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

  // Theme refresh conditionals
  if (process.env.THEME === 'refresh') {
    config.resolve.alias['@theme/DocSidebarItem'] = getRefreshFile('DocSidebarItem');
    config.resolve.alias['@theme/DocSidebarItems'] = getRefreshFile('DocSidebarItems');
    config.resolve.alias['@theme/DocPaginator'] = getRefreshFile('DocPaginator');
    config.resolve.alias['@theme/Footer'] = getRefreshFile('Footer');
    config.resolve.alias['@theme/Playground'] = getRefreshFile('Playground');
    config.resolve.alias['@theme/MDXComponents'] = getRefreshFile('MDXComponents');
  }

  return {};
}

function webpackPlugin() {
  return {
    name: 'cds-docusaurus-plugin',
    configureWebpack: configureForDocusaurus,
  };
}

module.exports = webpackPlugin;
