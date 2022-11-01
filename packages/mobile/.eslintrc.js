module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:@cbhq/react-native'],
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
