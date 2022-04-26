const { noRestrictedImportPaths } = require('../../eslint-common');
module.exports = {
  extends: ['../../.eslintrc.js'],
  settings: {
    // Put deps which are dev only and removed at build time to avoid import/no-extraneous-dependencies error
    'import/core-modules': ['linaria'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: ['@cbhq/cds-web', ...noRestrictedImportPaths],
            patterns: ['@cbhq/cds-web/*'],
          },
        ],
      },
    },
    {
      files: [
        // Stories
        '**/__stories__/*',
        '**/*.stories.ts',
        '**/*.stories.tsx',
      ],
      extends: ['plugin:@cbhq/node'],
      rules: {
        'compat/compat': 'off',
        'no-console': 'off',
        // apps/storybook is using the new react JSX transform
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
      },
    },
  ],
};
