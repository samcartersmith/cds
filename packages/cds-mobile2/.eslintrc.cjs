module.exports = {
  extends: ['../../.eslintrc.cjs', 'plugin:@cbhq/react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['reanimated'],
      rules: {
        'reanimated/js-function-in-worklet': 2,
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
        'no-restricted-imports': [
          'error',
          {
            paths: ['@cbhq/cds-mobile'],
            patterns: ['@cbhq/cds-mobile/*'],
          },
        ],
        'react-native-a11y/has-accessibility-hint': 0,
      },
    },
    {
      files: ['**/__stories__/*'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.figma.tsx'],
      rules: {
        'react-native/no-raw-text': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
      },
    },
  ],
};
