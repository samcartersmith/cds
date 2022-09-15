module.exports = {
  assets: ['../../packages/fonts/native', '../../packages/mobile/icons/font'],
  mobileCli: {
    prebuildPrefix: 'cds_playground',
    metricsAppName: 'cds_playground',
    appIndex: 'index.js',
    metroServerOptions: [
      // For environment variables; like retail's TARGET_ENV
    ],
    android: {
      bundleName: 'index.android.bundle',
      devKeystore: {
        path: './android/app/debug.keystore',
        alias: 'androiddebugkey',
        pass: 'android',
        keyPass: 'android',
      },
      e2e: {
        app: './android/app/build/outputs/apk/functionalTestRelease/app-functionalTestRelease.apk',
      },
      debug: {
        app: './android/app/build/outputs/apk/debug/app-debug.apk',
      },
    },
    ios: {
      bundleName: 'main.jsbundle',
      e2e: {
        app: './ios/build/Build/Products/Release-iphonesimulator/MobilePlayground.app',
      },
    },
  },
};
