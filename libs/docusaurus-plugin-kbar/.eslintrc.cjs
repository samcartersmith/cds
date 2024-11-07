module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-default-export': 0,
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
