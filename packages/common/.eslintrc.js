const { noRestrictedImportPaths } = require('../../eslint-common');

module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['internal/**'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: ['@cbhq/cds-common', ...noRestrictedImportPaths],
            patterns: ['@cbhq/cds-common/*'],
          },
        ],
      },
    },
  ],
};
