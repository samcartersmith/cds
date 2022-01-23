const cbhqPreset = require('@cbhq/jest-preset');

module.exports = {
  ...cbhqPreset,
  testPathIgnorePatterns: ['/dts/', '/lib/']
};
