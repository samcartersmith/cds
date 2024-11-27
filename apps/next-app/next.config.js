// @ts-check
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {(phase: string, { defaultConfig }: { defaultConfig: import('next').NextConfig }) => import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const config = {
    ...defaultConfig,
    poweredByHeader: false,
    reactStrictMode: phase === PHASE_DEVELOPMENT_SERVER,
    productionBrowserSourceMaps: phase === PHASE_PRODUCTION_BUILD,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    transpilePackages: [
      '@cbhq/cds-common',
      '@cbhq/cds-fonts',
      '@cbhq/cds-icons',
      '@cbhq/cds-web',
      '@cbhq/cds-web-visualization',
      '@cbhq/cds-utils',
    ],
    webpack: (webpackConfig, { isServer }) => {
      webpackConfig.module.rules.push({
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: '@linaria/webpack-loader',
            options: { sourceMap: true },
          },
        ],
      });
      return webpackConfig;
    },
  };
  return config;
};
