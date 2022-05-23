const docgenConfig = require('./docgen/config');
const webpackPlugin = require('./webpackPlugin');

const SLACK_TEAM = 'T02Q6DY7G';
const hasThemeRefresh = process.env.THEME === 'refresh' || process.env.theme === 'refresh';
const sharedExclusions = ['**/_*.{js,jsx,ts,tsx,md,mdx}'];

const preRefreshOptions = {
  docs: {
    exclude: [...sharedExclusions, 'home/**/*'],
    breadcrumbs: true,
    routeBasePath: '/',
    sidebarPath: require.resolve('./sidebars.js'),
    editUrl: 'https://github.cbhq.net/frontend/cds/tree/master/apps/website/',
    sidebarCollapsible: true,
  },
  theme: {
    customCss: require.resolve('./src/css/custom.css'),
  },
};

const refreshPresetOptions = {
  docs: {
    exclude: [...sharedExclusions, 'cds/overview.mdx'],
    breadcrumbs: false,
    routeBasePath: '/',
    sidebarPath: require.resolve('./refresh/sidebars.js'),
    editUrl: undefined,
    sidebarCollapsible: true,
  },
};

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
  trailingSlash: false,
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
        ...(hasThemeRefresh ? refreshPresetOptions : preRefreshOptions),
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
        style: hasThemeRefresh ? 'none' : undefined,
      },
    ],
    // Must run last!
    webpackPlugin,
  ],
  clientModules: [require.resolve(hasThemeRefresh ? './refresh/global.ts' : './global.ts')],
};
