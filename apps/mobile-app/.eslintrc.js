/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['../../.eslintrc.js', 'plugin:@cbhq/react-native'],
  overrides: [
    {
      files: ['*.config.js', '*.config.ts'],
      extends: ['plugin:@cbhq/node'],
      rules: {
        'no-restricted-globals': 'off',
      },
    },
    {
      files: ['scripts/**'],
      extends: ['plugin:@cbhq/node'],
      rules: {
        'import/extensions': 'off',
      },
    },
    {
      files: ['e2e/**/*'],
      extends: ['plugin:@cbhq/testing', 'plugin:@cbhq/node'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};

module.exports = config;
