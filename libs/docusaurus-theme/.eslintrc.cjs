module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-default-export': 0,
        'import/no-extraneous-dependencies': [
          'error',
          {
            // Don't error on transitive dependencies
            packageDir: [
              __dirname,
              '../../node_modules/@cbhq/cds-web',
              '../../node_modules/@docusaurus/theme-live-codeblock',
            ],
          },
        ],
      },
    },
    {
      files: ['scripts/*.ts'],
      extends: ['plugin:@cbhq/node'],
    },
  ],
};
