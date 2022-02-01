module.exports = {
  displayName: 'web',
  preset: '../../jest.preset.js',
  moduleNameMapper: {
    '@cbhq/cds-utils/(.*)': '<rootDir>../utils/$1',
    '@cbhq/cds-utils': '<rootDir>../utils/index.ts',
    '@cbhq/cds-common/(.*)': '<rootDir>../common/$1',
    '@cbhq/cds-common': '<rootDir>../common/index.ts',
    '@cbhq/cds-lottie-files/(.*)': '<rootDir>../lottie-files/$1',
    '@cbhq/cds-lottie-files': '<rootDir>../lottie-files/index.ts',
  },
};
