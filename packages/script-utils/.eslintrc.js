module.exports = {
  overrides: [
    {
      files: ['src/**/*.ts'],
      extends: ['plugin:@cbhq/node'],
      rules: {
        'no-restricted-globals': 'off',
      },
    },
  ],
};
