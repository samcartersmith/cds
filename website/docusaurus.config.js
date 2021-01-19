const path = require('path');

module.exports = {
  title: 'Coinbase Design System',
  tagline: '',
  url: 'https://design-system.cbhq.net/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'mono',
  projectName: 'repo',
  themeConfig: {
    navbar: {
      title: 'Coinbase Design System',
      logo: {
        alt: 'CDS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'http://go/repo/blob/master/eng/shared/design-system',
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
              href:
                'https://www.figma.com/files/657352101224507447/team/832671005685976359/Coinbase-Design-System',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coinbase`,
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'http://go/repo/edit/master/eng/shared/design-system/website/',
        },
        theme: {
          // TODO: add fonts package to CDS and import from there
          // customCss: [path.resolve(__dirname, '../fonts.css')],
        },
      },
    ],
  ],
  plugins: [path.resolve(__dirname, './cds-docusaurus-plugin.js')],
  clientModules: [require.resolve('./global.ts')],
};
