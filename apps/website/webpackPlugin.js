const path = require('path');

function getRefreshComponent(name) {
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
    config.resolve.alias['@theme/CdsProviders'] = getRefreshComponent('CdsProviders');
    config.resolve.alias['@theme/DocSidebarItem'] = getRefreshComponent('DocSidebarItem');
    config.resolve.alias['@theme/DocSidebarItems'] = getRefreshComponent('DocSidebarItems');
    config.resolve.alias['@theme/DocPaginator'] = getRefreshComponent('DocPaginator');
    config.resolve.alias['@theme/Footer'] = getRefreshComponent('Footer');
    config.resolve.alias['@theme/MDXComponents'] = getRefreshComponent('MDXComponents');
    config.resolve.alias['@theme/Playground'] = getRefreshComponent('Playground');
    config.resolve.alias['@theme/ExampleWithThemeToggles'] =
      getRefreshComponent('ExampleWithThemeToggles');
    config.resolve.alias['@theme/ThemeToggles'] = getRefreshComponent('ThemeToggles');
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
