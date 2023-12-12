// @ts-check
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const BABEL_OPTIONS = { configFile: true, rootMode: 'upward' };

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

/**
 * @type {import('@storybook/core-common').StorybookConfig}
 */
const config = {
  framework: '@storybook/react', // required in v7
  stories: [
    path.resolve(__dirname, `../../../packages/web-visualization/**/*.stories.@(tsx|mdx)`),
    path.resolve(__dirname, `../../../packages/web/**/*.stories.@(tsx|mdx)`),
    path.resolve(__dirname, `../../../packages/web-overlays/**/*.stories.@(tsx|mdx)`),
    path.resolve(__dirname, '../playground/**/*.stories.tsx'),
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    'storybook-addon-designs',
    'storybook-addon-performance/register',
    // 'storybook-addon-pseudo-states', enable when addon/docs is removed
    'storybook-dark-mode',
  ],
  staticDirs: [
    {
      from: '../../../packages/icons/fonts/web',
      to: '@cbhq/cds-icons/fonts/web',
    },
    {
      from: '../../../packages/icons/src/__generated__/ui/svg',
      to: '@cbhq/cds-icons/__generated__/ui/svg',
    },
    {
      from: '../../../packages/icons/src/__generated__/nav/svg',
      to: '@cbhq/cds-icons/__generated__/nav/svg',
    },
    {
      from: '../../../packages/illustrations/src/__generated__/heroSquare/svg',
      to: '@cbhq/cds-illustrations/__generated__/heroSquare/svg',
    },
    {
      from: '../../../packages/illustrations/src/__generated__/pictogram/svg',
      to: '@cbhq/cds-illustrations/__generated__/pictogram/svg',
    },
    {
      from: '../../../packages/illustrations/src/__generated__/spotIcon/svg',
      to: '@cbhq/cds-illustrations/__generated__/spotIcon/svg',
    },
    {
      from: '../../../packages/illustrations/src/__generated__/spotRectangle/svg',
      to: '@cbhq/cds-illustrations/__generated__/spotRectangle/svg',
    },
    {
      from: '../../../packages/illustrations/src/__generated__/spotSquare/svg',
      to: '@cbhq/cds-illustrations/__generated__/spotSquare/svg',
    },
  ],
  core: {
    builder: 'webpack5',
  },
  features: {
    /** Allows to disable deprecated implicit PostCSS loader. (will be removed in 7.0) */
    postcss: false,
    /**
     * Warn when there is a pre-6.0 hierarchy separator ('.' / '|') in the story title. Will be removed in 7.0.
     */
    warnOnLegacyHierarchySeparator: true,
    buildStoriesJson: true,
    interactionsDebugger: true,
  },
  webpackFinal: async (config, { configType }) => {
    const isProduction = configType === 'PRODUCTION';

    config.module?.rules?.forEach((rule) => {
      if (rule === '...' || !(rule.test instanceof RegExp) || !Array.isArray(rule.use)) {
        return;
      }

      // Add `linaria/loader` for .tsx files
      if ('.tsx'.match(rule.test) || '.ts'.match(rule.test)) {
        rule.use.push({
          loader: 'linaria/loader',
          options: {
            displayName: !isProduction,
            sourceMap: !isProduction,
            babelOptions: BABEL_OPTIONS,
          },
        });
      }

      // Add `babel-loader` for .mdx files
      if ('.mdx'.match(rule.test)) {
        rule.use.unshift({
          loader: 'babel-loader',
          options: BABEL_OPTIONS,
        });
      }

      // Update `babel-loader` options
      for (const use of rule.use) {
        if (
          typeof use === 'object' &&
          typeof use.options === 'object' &&
          use.loader?.includes('babel-loader')
        ) {
          Object.assign(use.options, BABEL_OPTIONS);
        }
      }
    });
    config.resolve = config.resolve || {};
    /**
     * Compiler paths are not respected by storybook. So if any module alias is not working
     * you need to module alias here.
     **/
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@cbhq/cds-icons': path.resolve(__dirname, '../../../packages/icons/src'),
      '@cbhq/cds-illustrations': path.resolve(__dirname, '../../../packages/illustrations/src'),
    };

    if (!config.plugins) config.plugins = [];

    if (process.env.ANALYZE === 'true') {
      console.log('Bundle analyzer enabled because process.env.ANALYZE === "true"');
      config.plugins.push(
        // @ts-expect-error
        new BundleAnalyzerPlugin({
          analyzerMode: process.env.ANALYZE_MODE_JSON === 'true' ? 'json' : 'server',
          reportFilename: path.resolve(
            MONOREPO_ROOT,
            process.env.ANALYZE_REPORT_PATH || 'bundle-stats.json',
          ),
          excludeAssets: (assetName) => !assetName.startsWith('main'),
        }),
      );
    }

    return config;
  },
};

module.exports = config;
