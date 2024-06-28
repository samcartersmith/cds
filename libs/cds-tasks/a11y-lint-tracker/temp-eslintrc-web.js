// .eslintrc.js for web
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['jsx-a11y', '@cbhq', '@cbhq/cds'],
  extends: ['plugin:jsx-a11y/strict', 'plugin:@cbhq/cds/web'], // 'plugin:@cbhq/cds/web', , 'airbnb/rules/react-a11y'
  root: true,
  parserOptions: {
    ecmaVersion: 2020, // Or 2021, 2022 depending on what you need
    sourceType: 'module', // Allows use of imports
  },
  env: {
    es6: true, // Ensures ESLint recognizes ES6 globals
    node: true, // If you're using Node.js
    // Add other environments as needed, such as "browser": true, etc.
  },
  rules: {
    '@cbhq/cds/control-has-associated-label-extended': 'warn',
    '@cbhq/no-overwrite-existing-error-data': 'off',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/no-onchange': 'warn',
    'jsx-a11y/control-has-associated-label': [
      'warn',
      {
        labelAttributes: [
          'accessibilityLabel',
          'aria-label',
          'aria-labelledby',
          'accessibilityLabelledBy',
        ],
        controlComponents: ['IconButton', 'NavigationIconButton', 'InputIconButton'],
        depth: 1,
      },
    ],
  },
};
