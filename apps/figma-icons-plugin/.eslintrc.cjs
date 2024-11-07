module.exports = {
  extends: ['plugin:@cbhq/react'],
  overrides: [
    {
      files: ['src/plugin.ts'],
      extends: ['plugin:@cbhq/node'],
    },
  ],
};
