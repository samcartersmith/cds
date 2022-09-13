const preset = require('../../jest.preset');

module.exports = {
  displayName: 'mobile',
  coverageReporters: preset.coverageReporters,
  preset: '@cbhq/jest-preset-mobile',
  testMatch: ['**//**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  coveragePathIgnorePatterns: ['<rootDir>/illustrations/images', '.stories.tsx', '__stories__'],
};
