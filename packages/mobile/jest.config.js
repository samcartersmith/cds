module.exports = {
  displayName: 'mobile',
  preset: '@cbhq/jest-preset-mobile',
  moduleNameMapper: {
    '@cbhq/cds-utils/(.*)': '<rootDir>../utils/src/$1',
    '@cbhq/cds-utils': '<rootDir>../utils/src/index.ts',
    '@cbhq/cds-common/(.*)': '<rootDir>../common/src/$1',
    '@cbhq/cds-common': '<rootDir>../common/src/index.ts',
    '@cbhq/cds-lottie-files/(.*)': '<rootDir>../lottie-files/src/$1',
    '@cbhq/cds-lottie-files': '<rootDir>../lottie-files/src/index.ts',
  },
};
