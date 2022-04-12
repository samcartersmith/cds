const withPlugins = require('next-compose-plugins');
const withLinaria = require('next-linaria');

const isProdEnv = process.env.NODE_ENV === 'production';
const useSwc = false; // Not until CDS works with it

const defaultConfig = {
    // Enable advanced features
    compiler: useSwc
        ? {
            reactRemoveProperties: true,
            removeConsole: isProdEnv,
            styledComponents: true,
        }
        : undefined,

    // Always enable compression
    compress: true,

    // We have our own linting infrastructure, so avoid Next's
    eslint: {
        ignoreDuringBuilds: true,
    },

    // This conflicts with how we use project refs and aliases
    typescript: {
        ignoreBuildErrors: true,
    },

    // Do not broadcast that we're using Next
    poweredByHeader: false,

    // Generate source maps for production builds
    productionBrowserSourceMaps: isProdEnv,

    // Enable strict mode in development
    reactStrictMode: !isProdEnv,

    // Minifiy for production builds
    swcMinify: useSwc,

    // This is required for SSG to generate index.html files
    // for every route, which is required for S3 static sites
    trailingSlash: !!process.env.NX_NEXT_SSG,
};

// CDS imports css files directly and next doesn't like it so we transpile them instead https://nextjs.org/docs/messages/css-npm
const withTM = require('next-transpile-modules')(['@cbhq/cds-fonts', '@cbhq/cds-web']);

/** Ignores css requires from CDS */
const nextConfigWebpackFixCDSCSSRequires = (config) => {
    // Ignore loading CDS CSS files on the server
    config.module.rules.push({
        test: /^@cbhq\/(fonts|web).+\.css$/i,
        use: ['null-loader'],
    });
    return config;
};

const nextConfig = withPlugins([withTM, withLinaria], {
    ...defaultConfig,
    webpack: (config) => nextConfigWebpackFixCDSCSSRequires(config),
});

module.exports = nextConfig;
