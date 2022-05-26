const path = require('path');

module.exports = {
  stories: [
    path.resolve(__dirname, `../../../packages/web/**/*.stories.@(tsx|mdx)`),
    path.resolve(
      __dirname,
      `../../../packages/docusaurus-plugin-docgen/src/**/*.stories.@(tsx|mdx)`,
    ),
  ],
  addons: [
    '@storybook/addon-measure',
    '@storybook/addon-backgrounds',
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          parser: 'typescript',
        },
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-addon-designs',
    'storybook-addon-performance/register',
    // 'storybook-addon-pseudo-states', enable when addon/docs is removed
    'storybook-dark-mode',
  ],
  core: {
    builder: 'webpack5',
  },
};
