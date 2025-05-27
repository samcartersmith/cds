const esModules = ['@cbhq'];

export default {
  coveragePathIgnorePatterns: ['<rootDir>/src/tokens'],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  displayName: 'cds-web-themes',
  preset: '../../jest.preset.js',
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};
