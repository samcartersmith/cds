module.exports = {
  preset: '../../jest.preset.js',
  // uncomment when we have stuff in this file:
  // setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  moduleNameMapper: {
    '^:next-app/(.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
};
