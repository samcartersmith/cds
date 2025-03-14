const esModules = ['@cbhq'];

export default {
  coveragePathIgnorePatterns: ['<rootDir>/src/tokens'],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  displayName: 'cds-web-themes',
  preset: '@cbhq/jest-preset',
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};
