// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@cbhq/detox-utils');

const config = createConfig({
  iosAppName: 'MobilePlayground',
  iosWorkspaceName: 'MobilePlayground',
  runnerConfig: './jest-e2e.config.json',
  universal: false,
});

// Instead of Pixel_3a_API_30
config.devices.emulator.device.avdName = 'Pixel_3a_XL_API_29';

module.exports = config;
