const docgenConfig = require('./docgen.config');
const kbarConfig = require('./kbar.config');
const webpackConfig = require('./webpack.config');

const SLACK_TEAM = 'T02Q6DY7G';

module.exports = {
  title: 'Coinbase Design System',
  tagline: '',
  url: process.env.NODE_ENV === 'production' ? 'https://cds.cbhq.net' : 'https://cds-dev.cbhq.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'frontend',
  projectName: 'cds',
  trailingSlash: true,
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
        {
          type: 'link',
          label: 'Feedback',
          href: `https://docs.google.com/forms/d/1v9HbYPasSKxNG2m3UhiQObjDerLBeUQVgeykJ8AVhUA/edit`,
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coinbase`,
    },
  },
  // https://docusaurus.io/docs/using-plugins#docusauruspreset-classic
  presets: [
    [
      '@cbhq/docusaurus-preset',
      {
        gtag: {
          trackingID: 'G-369GEFT8FG',
        },
        docs: {
          breadcrumbs: false,
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebar.config.js'),
          editUrl: undefined,
          sidebarCollapsible: true,
        },
        docgen: docgenConfig,
        kbar: kbarConfig,
      },
    ],
  ],
  plugins: [
    // Must run last!
    webpackConfig,
  ],
  customFields: {
    contentful: {
      accessToken: 'qc2teuIgEZgdYwzyoADTo2WxiMMLKirc6XvrG8GBZ5Q',
      space: 'w5g94q9p2q4k',
      clientKey: 'home',
      host: 'contentful.coinbase.com',
      // contentful environment aliases
      environment: process.env.CONTENTFUL_ENV ?? 'develop',
    },
  },
};
