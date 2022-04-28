const path = require('path');
const docgenConfig = require('./docusaurus-plugin-docgen.config');

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
      // We only want to show the logo with no text so we have to set to empty string.
      title: '',
      logo: {
        alt: 'Coinbase',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              type: 'link',
              label: 'Figma',
              href: 'https://www.figma.com/file/SWoyy3B5IkEpMvk60Lb4V6/CDS-Normal-%F0%9F%8C%9E?node-id=1%3A9',
            },
            {
              type: 'link',
              label: 'Github',
              href: 'https://github.cbhq.net/frontend/cds/tree/master',
            },
            {
              type: 'link',
              label: 'Coda',
              href: 'https://coda.io/d/CDS-Team_dFaC-pktuzN',
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
    ['@cbhq/docusaurus-plugin-docgen', docgenConfig],
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
