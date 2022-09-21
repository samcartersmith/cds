module.exports = {
  extends: ['plugin:@cbhq/react-native'],
  overrides: [
    {
      files: ['**/__stories__/*'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
