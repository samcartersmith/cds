module.exports = {
  testRunner: 'jest',
  skipLegacyWorkersInjection: true,
  configurations: {
    'ios.debug.app': {
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/MobilePlayground.app',
      build:
        'set -o pipefail && xcodebuild -workspace ios/MobilePlayground.xcworkspace -scheme MobilePlayground -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      type: 'ios.simulator',
      device: {
        type: 'iPhone 11',
        os: 'iOS 13.7',
      },
    },
    'android.debug.app': {
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      // https://stackoverflow.com/questions/56212792/what-is-the-gradlew-task-assembleandroidtest-and-what-are-the-test-applications
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_XL_API_29',
      },
    },
  },
};
