module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/tokens'],
  coverageReporters: ['text-summary', 'text', 'json-summary'],
  displayName: 'common',
  preset: '@cbhq/jest-preset',
  moduleNameMapper: {
    // d3 issue: https://github.com/facebook/jest/issues/12036
    'd3-color': '<rootDir>/../../node_modules/d3-color/dist/d3-color.min.js',
  },
};
