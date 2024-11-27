const { noRestrictedImportPaths } = require('../../eslint-common');
module.exports = {
  extends: ['../../.eslintrc.cjs'],
  settings: {},
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@cbhq/cds-common/tokens/borderWidth',
                message:
                  'This has been deprecated. Use borderWidth & borderRadius css variables from web/tokens.ts instead',
              },
              {
                name: '@cbhq/cds-common/tokens/borderWidth',
                message: 'Use borderWidth css variables from web/tokens.ts instead',
              },
              {
                name: '@cbhq/cds-common/tokens/borderRadius',
                message: 'Use borderRadius css variables from web/tokens.ts instead',
              },
              '@cbhq/cds-web',
              ...noRestrictedImportPaths,
            ],
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
