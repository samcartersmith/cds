const cbhqPreset = require('@cbhq/jest-preset');
const nxPreset = require('@nrwl/jest/preset');

module.exports = { ...cbhqPreset, resolver: nxPreset.resolver };
