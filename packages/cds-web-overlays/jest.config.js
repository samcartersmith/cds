module.exports = {
  displayName: 'web-overlays',
  preset: '@cbhq/jest-preset',
  setupFiles: ['<rootDir>/src/jest/setup.js'],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  coveragePathIgnorePatterns: [
    '<rootDir>/styles',
    '<rootDir>/storybook-decorators',
    '.stories.tsx',
    '__stories__',
  ],
  testMatch: ['**//**/*.test.(ts|tsx)'],
};
