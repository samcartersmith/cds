module.exports = {
  extends: ['plugin:@cbhq/react'],
  rules: {
    'no-restricted-globals': 'off',
  },
  overrides: [
    {
      files: ['src/plugin.ts'],
      extends: ['plugin:@cbhq/node'],
    },
  ],
};
