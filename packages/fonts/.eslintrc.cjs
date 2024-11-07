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
            paths: ['@cbhq/cds-fonts', ...noRestrictedImportPaths],
            patterns: ['@cbhq/cds-fonts/*'],
          },
        ],
      },
    },
  ],
};
