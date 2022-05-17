const docgenConfig = require('./docgen/config');
const webpackPlugin = require('./webpackPlugin');

const SLACK_TEAM = 'T02Q6DY7G';
const hasThemeRefresh = process.env.THEME === 'refresh';

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
    // https://docusaurus.io/docs/api/themes/configuration#navbar-items
    navbar: {
      // We only want to show the logo with no text so we have to set to empty string.
      title: '',
      logo: {
        alt: 'Coinbase',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
    },
    // https://docusaurus.io/docs/api/themes/configuration#footer-1
    footer: {
      style: 'dark',
      links: [
        {
          type: 'link',
          label: 'Coda',
          href: 'https://coda.io/d/CDS-Team_dFaC-pktuzN',
        },
        {
          type: 'link',
          label: 'Jira',
          href: 'https://jira.coinbase-corp.com/projects/CDS/summary',
        },
        {
          type: 'link',
          label: 'Storybook',
          href: 'https://cdsstorybook.cbhq.net/',
        },
        {
          type: 'link',
          label: 'Figma Libraries',
          href: 'https://www.figma.com/file/SWoyy3B5IkEpMvk60Lb4V6/CDS-Normal-%F0%9F%8C%9E?node-id=1%3A9',
        },
        {
          type: 'link',
          label: 'Github',
          href: 'https://github.cbhq.net/frontend/cds/tree/master',
        },
        {
          type: 'link',
          label: '#ask-cds',
          href: `slack://channel?team=${SLACK_TEAM}&id=C01A6PKGM3J`,
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coinbase`,
    },
  },
  // https://docusaurus.io/docs/using-plugins#docusauruspreset-classic
  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-369GEFT8FG',
        },
        docs: {
          exclude: hasThemeRefresh ? undefined : ['debug/**/*'],
          breadcrumbs: !hasThemeRefresh,
          routeBasePath: '/',
          sidebarPath: hasThemeRefresh
            ? require.resolve('./sidebarsRefresh.js')
            : require.resolve('./sidebars.js'),
          editUrl: hasThemeRefresh
            ? undefined
            : 'https://github.cbhq.net/frontend/cds/tree/master/apps/website/',
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
    webpackPlugin,
  ],
  clientModules: [require.resolve('./global.ts')],
};
