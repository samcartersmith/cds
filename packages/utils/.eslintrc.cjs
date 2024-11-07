const { noRestrictedImportPaths } = require('../../eslint-common');
module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: ['@cbhq/cds-utils', ...noRestrictedImportPaths],
            patterns: ['@cbhq/cds-utils/*'],
          },
        ],
      },
    },
  ],
};
