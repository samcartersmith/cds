const path = require('path');

/* eslint-disable no-param-reassign */

const BABEL_OPTIONS = { configFile: true, rootMode: 'upward' };

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
        loader: 'linaria/loader',
        options: {
          displayName: !isProduction,
          sourceMap: !isProduction,
          babelOptions: BABEL_OPTIONS,
        },
      });
    }
  });

  config.resolve.alias[':cds-website'] = path.resolve(__dirname, './');

  return {};
}

module.exports = {
  title: 'Coinbase Design System',
  tagline: '',
  url: 'https://cds.cbhq.net',
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
        {
          title: 'Prototypes',
          items: [
            {
              label: 'Navigation',
              href: '/navigation',
            },
            {
              label: 'Tables',
              href: '/tables',
            },
            {
              label: 'Cards',
              href: '/cards',
            },
            {
              label: 'Select Input',
              href: '/selectinput',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coinbase`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
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
      },
    ],
  ],
  plugins: [
    '@docusaurus/theme-live-codeblock',
    // Must run last!
    () => ({
      name: 'cds-docusaurus-plugin',
      configureWebpack: configureForDocusaurus,
    }),
  ],
  clientModules: [require.resolve('./global.ts')],
};
