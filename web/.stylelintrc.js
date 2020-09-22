module.exports = {
  extends: ['../../../../.stylelintrc.js'],
  plugins: ['stylelint-high-performance-animation', 'stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-low-performance-animation-properties': true,
    'plugin/no-unsupported-browser-features': true,
  },
};
