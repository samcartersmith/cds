// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@cbhq/detox-utils');

const config = createConfig({
  iosAppName: 'MobilePlayground',
  iosWorkspaceName: 'MobilePlayground',
  runnerConfig: './jest-e2e.config.json',
  universal: false,
});

/**
 * Required in order to run Android emulator on CI.
 * https://android.stackexchange.com/questions/190913/cannot-start-android-emulator64-due-to-qt-unable-to-load-xcb
 */
config.devices.emulator.bootArgs = '-writable-system -no-window';

module.exports = config;
