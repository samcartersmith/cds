// @ts-check
const path = require('path');

const BABEL_OPTIONS = { configFile: true, rootMode: 'upward' };

/**
 * @type {import('@storybook/core-common').StorybookConfig}
 */
const config = {
  framework: '@storybook/react', // required in v7
  stories: [path.resolve(__dirname, `../../../packages/web/**/*.stories.@(tsx|mdx)`)],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    'storybook-addon-designs',
    'storybook-addon-performance/register',
    // 'storybook-addon-pseudo-states', enable when addon/docs is removed
    'storybook-dark-mode',
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
    return config;
  },
};

module.exports = config;
