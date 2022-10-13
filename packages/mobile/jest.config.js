module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/illustrations/images', '.stories.tsx', '__stories__'],
  coverageReporters: ['text-summary', 'text'],
  displayName: 'mobile',
  preset: '@cbhq/jest-preset-mobile',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  testMatch: ['**//**/*.test.(ts|tsx)'],
};
