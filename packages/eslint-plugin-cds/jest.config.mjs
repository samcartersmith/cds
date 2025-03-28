export default {
  preset: '../../jest.preset.js',
  moduleNameMapper: {
    // Temporarily required for ESLint v8
    // https://github.com/facebook/jest/issues/11100#issuecomment-967161978
    '@eslint/eslintrc': '@eslint/eslintrc/universal',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['json-summary'],
};
