const path = require("path");

module.exports = {
  "stories": [
      path.resolve(__dirname, `../**/*.stories.@(tsx|mdx)`),
  ],
  addons: [
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
  ],
  "core": {
    "builder": "webpack5"
  }
}