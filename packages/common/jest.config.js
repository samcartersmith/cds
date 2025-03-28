const d3 = ['d3', 'd3-.+', 'internmap'];

const esModules = ['@cbhq', ...d3];

export default {
  coveragePathIgnorePatterns: ['<rootDir>/src/tokens'],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  displayName: 'common',
  preset: '../../jest.preset.js',
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};
