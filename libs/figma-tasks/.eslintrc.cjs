module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['src/**/*.ts'],
      extends: ['plugin:@cbhq/node'],
    },
  ],
};
