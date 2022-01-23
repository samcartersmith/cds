module.exports = {
  displayName: 'common',
  preset: '../../jest.preset.js',
  moduleNameMapper: {
    '@cbhq/cds-utils': '<rootDir>../utils/index.ts',
    '@cbhq/cds-utils/(.*)': '<rootDir>../utils/$1',
  },
};
