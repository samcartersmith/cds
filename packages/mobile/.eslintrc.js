module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:@cbhq/react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/forbid-component-props': [
          'error',
          {
            forbid: [
              {
                propName: 'adjustsFontSizeToFit',
                message: 'You must interact with this prop via getAdjustsFontSizeToFitProp',
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
