module.exports = {
  displayName: 'mobile',
  preset: '@cbhq/jest-preset-mobile',
  moduleNameMapper: {
    '@cbhq/cds-utils/(.*)': '<rootDir>../utils/src/$1',
    '@cbhq/cds-utils': '<rootDir>../utils/index.ts',
    '@cbhq/cds-common/(.*)': '<rootDir>../common/$1',
    '@cbhq/cds-common': '<rootDir>../common/src/index.ts',
    '@cbhq/cds-lottie-files/(.*)': '<rootDir>../lottie-files/$1',
    '@cbhq/cds-lottie-files': '<rootDir>../lottie-files/index.ts',
  },
};
