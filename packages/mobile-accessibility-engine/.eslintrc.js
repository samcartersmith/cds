module.exports = {
  extends: ['plugin:@cbhq/react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'guard-for-in': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'jest/require-top-level-describe': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'react-native/no-color-literals': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'react-native-a11y/has-accessibility-hint': 'off',
        'react-native-a11y/has-valid-accessibility-value': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react-native-a11y/has-valid-accessibility-ignores-invert-colors': 'off',
        'react/forbid-component-props': [
          'error',
          {
            forbid: [
              {
                propName: 'adjustsFontSizeToFit',
                message: 'Interact with this prop via the getAdjustsFontSizeToFitProp helper.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/__stories__/*'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
