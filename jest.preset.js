const cbhqPreset = require('@cbhq/jest-preset');

module.exports = {
  ...cbhqPreset,
  coverageReporters: ['text-summary', 'text'],
  testPathIgnorePatterns: ['/dist/'],
};
