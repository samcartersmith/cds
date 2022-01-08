module.exports = {
  extends: ['../../../.stylelintrc.js'],
  ignoreFiles: ['**/*.native.*', 'mobile/**'],
  plugins: ['stylelint-high-performance-animation', 'stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-low-performance-animation-properties': [
      true,
      { ignoreProperties: ['color', 'border-color', 'background-color'] },
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: ['CoinbaseIcons'] },
    ],
    'property-no-unknown': [true, { ignoreProperties: ['aspect-ratio'] }],
  },
};
