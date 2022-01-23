module.exports = {
  displayName: 'common',
  preset: '../../jest.preset.js',
  testPathIgnorePatterns: ['/dts/', '/lib/'],
  moduleNameMapper: {
    '@cbhq/cds-utils': '<rootDir>../utils/index.ts',
    '@cbhq/cds-utils/(.*)': '<rootDir>../utils/$1',
  },
};
