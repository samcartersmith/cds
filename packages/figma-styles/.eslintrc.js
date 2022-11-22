module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['scripts/**/*.ts'],
      extends: ['plugin:@cbhq/node'],
      rules: {
        'no-restricted-globals': 'off',
      },
    },
  ],
};
