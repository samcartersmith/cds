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
      items: [
        {
          href: '/cds/live-playground/',
          label: 'UI Playground',
          position: 'right',
        },
        {
          href: 'https://cds-storybook.cbhq.net/',
          label: 'Storybook',
          position: 'right',
        },
        {
          href: 'https://www.figma.com/files/657352101224507447/project/62154462/%E2%9C%A8-CDS-Libraries?fuid=992108968165608574',
          label: 'Figma',
          position: 'right',
        },
        {
          href: 'slack://channel?team=T02Q6DY7G&id=C05H922EYP7',
          label: 'Ask',
          position: 'right',
        },
        {
          href: 'https://github.cbhq.net/frontend/cds',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // https://docusaurus.io/docs/api/themes/configuration#footer-1
    footer: {
      style: 'dark',
      links: [
        {
          type: 'link',
          label: 'Jira',
          href: 'https://jira.coinbase-corp.com/secure/RapidBoard.jspa?rapidView=3161&projectKey=DX&view=planning.nodetail&issueLimit=100#',
        },
        {
          type: 'link',
          label: 'Storybook',
          href: 'https://cdsstorybook.cbhq.net/',
        },
        {
          type: 'link',
          label: 'Figma Libraries',
          href: 'https://www.figma.com/files/657352101224507447/project/62154462',
        },
        {
          type: 'link',
          label: 'Github',
          href: 'https://github.cbhq.net/frontend/cds/tree/master',
        },
        {
          type: 'link',
          label: '#ask-ui-systems',
          href: `slack://channel?team=${SLACK_TEAM}&id=C05H922EYP7`,
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
