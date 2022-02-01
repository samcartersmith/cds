module.exports = {
  displayName: 'common',
  preset: '../../jest.preset.js',
  moduleNameMapper: {
    '@cbhq/cds-utils/(.*)': '<rootDir>../utils/$1',
    '@cbhq/cds-utils': '<rootDir>../utils/index.ts',
  },
};
