const d3 = ['d3', 'd3-.+', 'internmap'];

const esModules = ['@cbhq', ...d3];

export default {
  displayName: 'web',
  preset: '@cbhq/jest-preset',
  setupFiles: ['<rootDir>/jest/setup.js'],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/styles',
    '<rootDir>/src/storybook-decorators',
    '.stories.tsx',
    '__stories__',
  ],
  testMatch: ['**//**/*.test.(ts|tsx)'],
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};
