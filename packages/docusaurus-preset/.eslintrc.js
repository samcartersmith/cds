module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
};
