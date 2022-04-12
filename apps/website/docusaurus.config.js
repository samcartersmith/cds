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

  return {};
}

module.exports = {
  title: 'Coinbase Design System',
  tagline: '',
  url: process.env.NODE_ENV === 'production' ? 'https://cds.cbhq.net' : 'https://cds-dev.cbhq.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'frontend',
  projectName: 'cds',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themeConfig: {
    navbar: {
      title: 'Coinbase Design System',
      logo: {
        alt: 'CDS Logo',
        src: 'img/logo.svg',
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          // Add important links to display in footer here
          items: [
            {
              label: 'Overview',
              to: '/',
            },
            {
              label: 'Roadmap',
              to: 'resources/roadmap/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Figma',
              href: 'https://www.figma.com/files/657352101224507447/team/832671005685976359/Coinbase-Design-System',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coinbase`,
    },
  },
  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-369GEFT8FG',
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.cbhq.net/frontend/cds/tree/master/apps/website/',
          sidebarCollapsible: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: false,
      },
    ],
  ],
  plugins: [
    '@docusaurus/theme-live-codeblock',
    [
      '@cmfcmf/docusaurus-search-local',
      {
        language: 'en',
        indexBlog: false,
        indexDocs: true,
        indexDocSidebarParentCategories: 2,
      },
    ],
    // Must run last!
    () => ({
      name: 'cds-docusaurus-plugin',
      configureWebpack: configureForDocusaurus,
    }),
  ],
  clientModules: [require.resolve('./global.ts')],
};
