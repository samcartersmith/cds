module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/illustrations/images', '.stories.tsx', '__stories__'],
  coverageReporters: ['text-summary', 'text'],
  displayName: 'mobile',
  preset: '@cbhq/jest-preset-mobile',
  // https://docs.swmansion.com/react-native-gesture-handler/docs/guides/testing
  setupFiles: ['<rootDir>/../../node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  testMatch: ['**//**/*.test.(ts|tsx)'],
  // https://github.com/facebook/jest/blob/main/docs/Configuration.md#faketimers-object
  fakeTimers: {
    enableGlobally: true,
  },
};
