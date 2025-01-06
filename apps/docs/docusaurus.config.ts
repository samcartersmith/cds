import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Coinbase Design System',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'frontend', // Usually your GitHub org/user name.
  projectName: 'cds', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'Coinbase Design System Logo',
        src: 'img/cds_logo.svg',
        srcDark: 'img/cds_logo_dark.svg',
      },
      items: [
        { to: '/blog', label: 'Blog', position: 'right' },
        {
          href: 'https://www.figma.com/files/657352101224507447/project/62154462/%E2%9C%A8-CDS-Libraries?fuid=992108968165608574',
          label: 'Figma',
          position: 'right',
        },
        {
          href: 'https://cds-storybook.cbhq.net/',
          label: 'Storybook',
          position: 'right',
        },
        {
          href: 'https://github.cbhq.net/frontend/cds',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          label: 'Figma',
          href: 'https://www.figma.com/files/657352101224507447/project/62154462',
        },
        {
          label: 'Storybook',
          href: 'https://cdsstorybook.cbhq.net/',
        },
        {
          label: 'Github',
          href: 'https://github.cbhq.net/frontend/cds/tree/master',
        },
        {
          label: 'Blog',
          href: 'https://www.coinbase.com/blog',
        },
        {
          label: 'Careers',
          href: 'https://www.coinbase.com/careers',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },

  plugins: [
    ['@docusaurus/plugin-sitemap', { id: 'sitemap' }],
    [
      '@docusaurus/theme-live-codeblock',
      {
        playgroundPosition: 'bottom',
        id: 'codeblock',
      },
    ],
  ],
};

export default config;
