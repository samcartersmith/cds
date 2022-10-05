module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/illustrations/images', '.stories.tsx', '__stories__'],
  coverageReporters: ['text-summary', 'text'],
  displayName: 'mobile',
  preset: '@cbhq/jest-preset-mobile',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  testMatch: ['**//**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    // d3 issue: https://github.com/facebook/jest/issues/12036
    'd3-color': '<rootDir>/../../node_modules/d3-color/dist/d3-color.min.js',
  },
};
