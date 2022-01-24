module.exports = {
  displayName: 'common',
  preset: '../../jest.preset.js',
  moduleNameMapper: {
    '@cbhq/cds-utils/(.*)': '<rootDir>../utils/src/$1',
    '@cbhq/cds-utils': '<rootDir>../utils/src/index.ts',
  },
};
