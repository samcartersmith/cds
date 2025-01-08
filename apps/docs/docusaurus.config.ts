import type { Config, Plugin } from '@docusaurus/types';
import path from 'node:path';
import { themes as prismThemes } from 'prism-react-renderer';

const webpackPlugin = () => {
  const plugin: Plugin = {
    name: 'cds-docusaurus-webpack-plugin',
    configureWebpack: (config) => ({
      resolve: {
        alias: {
          ...(config.mode === 'production'
            ? {}
            : {
                '@cbhq/cds-common2': path.resolve(__dirname, '../../packages/cds-common2/src'),
                '@cbhq/cds-fonts': path.resolve(__dirname, '../../packages/fonts/src'),
                '@cbhq/cds-lottie-files': path.resolve(
                  __dirname,
                  '../../packages/lottie-files/src',
                ),
                '@cbhq/cds-icons': path.resolve(__dirname, '../../packages/icons/src'),
                '@cbhq/cds-illustrations': path.resolve(
                  __dirname,
                  '../../packages/illustrations/src',
                ),
                '@cbhq/cds-utils': path.resolve(__dirname, '../../packages/utils/src'),
                '@cbhq/cds-web2': path.resolve(__dirname, '../../packages/cds-web2/src'),
                '@cbhq/cds-web-visualization': path.resolve(
                  __dirname,
                  '../../packages/web-visualization/src',
                ),
              }),
        },
      },
      module: {
        rules: [
          config.mode === 'production'
            ? // Supports extensionless imports with ESM in cds-web2, cds-common2 and cds-utils package
              {
                test: /\.(js|ts)x?$/,
                include: /packages\/(cds-[^\\/]+|utils)/,
                resolve: {
                  fullySpecified: false,
                },
              }
            : {
                test: /\.(js|ts)x?$/,
                loader: '@linaria/webpack-loader',
                options: {
                  displayName: true,
                  sourceMap: true,
                  babelOptions: { configFile: true },
                },
              },
        ],
      },
    }),
  };
  return plugin;
};

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
        src: 'img/logos/cds_logo.svg',
        srcDark: 'img/logos/cds_logo_dark.svg',
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
    webpackPlugin,
  ],
};

export default config;
