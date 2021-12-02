const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [path.resolve(__dirname, '../../web/**/*.stories.@(tsx|mdx)')],
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
    'storybook-addon-pseudo-states',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.join(__dirname, '../../../../../tsconfig.json'),
      shouldExtractLiteralValuesFromEnum: false,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
};
