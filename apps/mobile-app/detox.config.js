// @ts-check

const { isCI } = require('@cbhq/mono-tasks');

/**
 * TODO: handle config automatically based on eas build profiles
 */
/** @type {Detox.DetoxConfig} */
const config = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
  },
  apps: {
    'ios-local': {
      type: 'ios.app',
      binaryPath: 'prebuilds/ios-local-hermes.app',
    },
    'android-local': {
      type: 'android.apk',
      binaryPath: 'prebuilds/android-local-hermes/binary.apk',
      testBinaryPath: 'prebuilds/android-local-hermes/testBinary.apk',
    },
    'ios-production': {
      type: 'ios.app',
      binaryPath: 'prebuilds/ios-production-hermes.app',
    },
    'android-production': {
      type: 'android.apk',
      binaryPath: 'prebuilds/android-production-hermes/binary.apk',
      testBinaryPath: 'prebuilds/android-production-hermes/testBinary.apk',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: isCI() ? 'iPhone 12' : 'iPhone 14',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: isCI() ? 'Pixel_3a_API_30' : 'pixel_4',
      },
    },
  },
  configurations: {
    'ios-local': {
      device: 'simulator',
      app: 'ios-local',
    },
    'android-local': {
      device: 'emulator',
      app: 'android-local',
    },
    'ios-production': {
      device: 'simulator',
      app: 'ios-production',
    },
    'android-production': {
      device: 'emulator',
      app: 'android-production',
    },
  },
};

module.exports = config;
