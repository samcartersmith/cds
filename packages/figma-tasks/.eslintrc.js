module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['src/**/*.ts'],
      extends: ['plugin:@cbhq/node'],
    },
  ],
};
