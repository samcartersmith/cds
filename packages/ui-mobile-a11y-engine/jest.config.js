module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    'react-native-accessibility-engine': '<rootDir>/src/index',
    'tests/(.*)': '<rootDir>/src/__tests__/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/src/__tests__/assets',
    '<rootDir>/example',
    '<rootDir>/node_modules',
    '<rootDir>/lib',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
