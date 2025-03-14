const esModules = ['@cbhq'];

export default {
  coveragePathIgnorePatterns: ['<rootDir>/src/tokens'],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  displayName: 'cds-mobile-themes',
  preset: '@cbhq/jest-preset',
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};
