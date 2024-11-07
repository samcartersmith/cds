module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['scripts/**/*.ts'],
      extends: ['plugin:@cbhq/node'],
    },
  ],
};
