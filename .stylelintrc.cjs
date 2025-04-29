module.exports = {
  extends: ['stylelint-config-recommended'],
  // NOTE: autofix doesnt work properly due to linaria v3 parsing issues.
  // DO NOT use `--fix` on files with Linaria styles until Linaria is upgraded to v5+.
  customSyntax: '@linaria/postcss-linaria',
  ignoreFiles: ['**/*.native.*', 'mobile/**'],
  plugins: [
    'stylelint-a11y',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
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
    'length-zero-no-unit': true,
    'media-query-no-invalid': null, // Disabled due to false positives from Linaria v3 / Stylelint v15 parser mismatch.
  },
};
