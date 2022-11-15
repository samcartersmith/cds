module.exports = {
  extends: ['plugin:@cbhq/react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
