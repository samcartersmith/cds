module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
};
