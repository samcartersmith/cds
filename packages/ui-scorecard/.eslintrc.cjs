module.exports = {
  extends: ['plugin:@cbhq/node'],
  rules: {
    'compat/compat': 'off',
  },
  ignorePatterns: ['*.d.ts', 'cjs/', 'dts/', 'node_modules/'],
};
