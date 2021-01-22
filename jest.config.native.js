const config = require('./jest.config.js');

module.exports = {
  ...config,
  preset: 'react-native',
  moduleFileExtensions: ['mock.ts', 'mock.js', 'ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  setupFiles: ['<rootDir>/jestSetup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
