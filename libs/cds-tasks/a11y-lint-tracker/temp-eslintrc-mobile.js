// .eslintrc.js for for mobile
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['react-native-a11y', '@cbhq', '@cbhq/cds'],
  extends: ['plugin:react-native-a11y/all', 'plugin:@cbhq/cds/mobile'],
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
    '@cbhq/no-overwrite-existing-error-data': 'off',

    // For react-native-a11y, Severity should be one of the following: 0 = off, 1 = warn, 2 = error (you passed '" warn"').
    'react-native-a11y/has-accessibility-hint': 1,
    'react-native-a11y/has-valid-accessibility-descriptors': 1,
    '@cbhq/cds/has-valid-accessibility-descriptors-extended': 'warn',
  },
};
