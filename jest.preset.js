const nxPreset = require('@nx/jest/preset');

function isCI() {
  return !!process.env.CI || !!process.env.BUILDKITE;
}

const config = {
  ...nxPreset,
  resolver: '@nx/jest/plugins/resolver',
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
  moduleNameMapper: {
    '\\.(scss|css|jpg|jpeg|png|gif)$': 'identity-obj-proxy',
  },
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['jest-extended', '@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/cjs/',
    '/dts/',
    '/esm/',
    '/lib/',
    '/mjs/',
    '/__fixtures__/',
    '.*\\.d\\.ts',
  ],
  testRunner: 'jest-circus/runner',
  transform: {
    // Required to find the root babel config when jest is ran in sub-folders
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
  clearMocks: true,
  restoreMocks: true,
  passWithNoTests: true,
  cacheDirectory: '.nx/cache/tools/jestTransforms',
};

if (isCI()) {
  // Only output a coverage summary, and write the full coverage text to a file for optional storage in artifacts:
  config.coverageReporters = ['text-summary', ['text', { file: 'coverage.txt' }]];
}

module.exports = config;
