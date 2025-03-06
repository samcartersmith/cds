module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-prettier/recommended',
    // NOTE (hannah): autofix doesn't work with 'linaria/stylelint-config'.
    // Submitted bug report https://github.com/callstack/linaria/issues/664
    // If remove linaria stylelint config, autofix works.
    // TODO (hannah): add linaria/stylelint-config back once they fix the autofix issue.
  ],
  ignoreFiles: ['**/*.native.*', 'mobile/**'],
  plugins: [
    'stylelint-prettier',
    'stylelint-a11y',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    // formatting
    'prettier/prettier': true,
    // for uniformity
    'color-hex-case': 'lower',
    'declaration-block-no-shorthand-property-overrides': null,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'length-zero-no-unit': true,
    // for quality
    'color-named': 'never',
    'max-nesting-depth': 3,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'a11y/content-property-no-static-value': true,
    'a11y/no-display-none': true,
    'a11y/no-obsolete-attribute': true,
    'a11y/no-obsolete-element': true,
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
