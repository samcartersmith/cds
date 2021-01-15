module.exports = {
  extends: ['../../../.stylelintrc.js'],
  ignoreFiles: ['**/*.native.*', 'mobile/**'],
  plugins: ['stylelint-high-performance-animation', 'stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-low-performance-animation-properties': true,
    'plugin/no-unsupported-browser-features': null,
    'number-max-precision': [
      0,
      {
        ignoreUnits: ['em', 'rem', 's'],
      },
    ],
  },
};
