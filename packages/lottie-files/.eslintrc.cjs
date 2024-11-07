const { noRestrictedImportPaths } = require('../../eslint-common');
module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/extensions': ['error', 'never', { json: 'always' }],
        'simple-import-sort/imports': 0,
        'no-restricted-imports': [
          'error',
          {
            paths: ['@cbhq/cds-lottie-files', ...noRestrictedImportPaths],
            patterns: ['@cbhq/cds-lottie-files/*'],
          },
        ],
      },
    },
  ],
};
