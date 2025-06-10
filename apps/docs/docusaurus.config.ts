import type { Config, Plugin } from '@docusaurus/types';
import path from 'node:path';
import { themes as prismThemes } from 'prism-react-renderer';

import docgenConfig from './docgen.config';

const webpackPlugin = () => {
  const plugin: Plugin = {
    name: 'cds-docusaurus-webpack-plugin',
    configureWebpack: (config) => ({
      resolve: {
        alias: {
          ...(config.mode === 'production'
            ? {}
            : {
                '@cbhq/cds-common': path.resolve(__dirname, '../../packages/common/src'),
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
                '@cbhq/cds-web': path.resolve(__dirname, '../../packages/web/src'),
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
            ? // Supports extensionless imports with ESM in all packages
              {
                test: /\.(js|ts)x?$/,
                include: /packages\//,
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
  url: 'https://cds-next.cbhq.net',
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

  future: {
    // Enable Rspack
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: false,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..600;1,14..32,400..600&display=swap',
      },
    },
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: process.env.DOCUSAURUS_GOOGLE_ANALYTICS_TRACKING_ID,
        },
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
    defaultMode: 'dark',
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for the Coinbase Design System - A comprehensive collection of components, patterns, and guidelines for building crypto products.',
      },
      {
        name: 'keywords',
        content: 'design system, coinbase, components, documentation, ui, ux',
      },
    ],
    navbar: {
      items: [
        { type: 'search' },
        {
          href: 'https://cds-storybook.cbhq.net/',
          label: 'Storybook',
        },
        {
          href: 'https://www.coinbase.com/blog',
          label: 'Blog',
        },
        {
          href: 'https://github.cbhq.net/frontend/cds',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      links: [
        {
          label: 'Storybook',
          href: 'https://cds-storybook.cbhq.net/',
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
      darkTheme: prismThemes.nightOwl,
    },
  },

  plugins: [
    ['@docusaurus/plugin-sitemap', { id: 'sitemap' }],
    [
      '@docusaurus/theme-live-codeblock',
      {
        id: 'codeblock',
      },
    ],
    [
      '@cbhq/docusaurus-plugin-kbar',
      {
        docs: {
          breadcrumbs: false,
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          sidebarCollapsible: true,
        },
      },
    ],
    ['@cbhq/docusaurus-plugin-docgen', docgenConfig],
    webpackPlugin,
  ],
};

export default config;
