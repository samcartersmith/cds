const { configureForDocusaurus } = require('@cbhq/webpack-utils');

module.exports = {
  title: 'Coinbase Design System',
  tagline: '',
  url: 'https://design-system.cbhq.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'mono',
  projectName: 'repo',
  themeConfig: {
    gtag: {
      trackingID: 'G-369GEFT8FG',
    },
    navbar: {
      title: 'Coinbase Design System',
      logo: {
        alt: 'CDS Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system',
          label: 'GitHub',
          position: 'right',
        },
      ],
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
              href: 'navigation',
            },
            {
              label: 'Modal',
              href: 'modal',
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
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/website/',
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog posts',
          showReadingTime: true,
          editUrl:
            'https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/website/blog',
          feedOptions: {
            type: 'all',
            language: 'en',
          },
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
