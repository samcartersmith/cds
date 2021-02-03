const config = require('./jest.config.js');

module.exports = {
  ...config,
  preset: 'react-native',
  setupFiles: ['<rootDir>/jestSetup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
