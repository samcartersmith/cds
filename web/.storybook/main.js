const path = require('path');

module.exports = {
  stories: [
    path.resolve(__dirname, '../**/*.stories.@(tsx|mdx)'),
    path.resolve(__dirname, '../../icons/**/*.stories.@(tsx|mdx)'),
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
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-addon-designs',
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
