import { getExpoSDKVersion } from '@expo/config';
import type { ExpoConfig } from '@expo/config-types';

const profile = process.env.APP_PROFILE ?? ('local' as const);
const jsEngine = process.env.APP_JS_ENGINE ?? ('hermes' as const);
const newArchEnabled = process.env.APP_NEW_ARCH_ENABLED === '1';
const bundleIdentifier = process.env.APP_IOS_BUNDLE_IDENTIFIER ?? 'com.ui-systems.local-ios-hermes';
const packageIdentifier =
  process.env.APP_ANDROID_PACKAGE_IDENTIFIER ?? 'com.ui_systems.local_hermes';

const lookupKey = `${profile}-${jsEngine}` as const;
const iconName = `icon-${lookupKey}` as const;
const splashName = `splash-${lookupKey}` as const;
const splashColor = {
  'local-jsc': '#44C28D',
  'local-hermes': '#D058C1',
  'production-jsc': '#E7C95B',
  'production-hermes': '#06BEEC',
}[lookupKey];

const expo: ExpoConfig = {
  name: 'CDS',
  slug: 'cds', // we might need to change so it's unique across builds for deep linking
  scheme: 'cds',
  owner: 'ui-systems',
  extra: {
    eas: {
      projectId: '8a4fadbb-9625-486f-abfc-7ad9d2c58c98',
    },
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  orientation: 'portrait' as const,
  icon: `./assets/${iconName}.png`,

  sdkVersion: getExpoSDKVersion(__dirname),
  jsEngine,
  userInterfaceStyle: 'automatic' as const,
  splash: {
    image: `./assets/${splashName}.png`, // TODO: dynamically generate based on jsEngine https://github.com/expo/fyi/blob/main/black-screen-before-splash.md
    resizeMode: 'contain',
    backgroundColor: splashColor,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: splashColor,
    },
    package: packageIdentifier,
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          newArchEnabled,
        },
        android: {
          kotlinVersion: '1.8.0',
          newArchEnabled,
          /**
           * https://docs.expo.dev/build-reference/e2e-tests/#51-patch-buildgradle
           * Temporary patch required until detox integration is first class
           *
           * The Android build command that we use to produce the test build is ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release (defined in e2e config of eas.json)
           * Notice that it consists of two Gradle tasks. Unfortunately, when building the *AndroidTest task, some versions of the expo-modules-core module change
           * what native libraries are included in the app binary. Those settings don't work with settings for assembleRelease.
           * To fix the problem, add the pickFirsts list under android.packagingOptions in your android/app/build.gradle.
           * The pickFirsts property overrides the setting for your project.
           */
          packagingOptions: {
            /** https://docs.expo.dev/versions/latest/sdk/build-properties/#pluginconfigtypeandroidpackagingoptions */
            pickFirst: [
              'lib/**/libc++_shared.so',
              'lib/**/libreactnativejni.so',
              'lib/**/libreact_nativemodule_core.so',
              'lib/**/libglog.so',
              'lib/**/libjscexecutor.so',
              'lib/**/libfbjni.so',
              'lib/**/libfolly_json.so',
              'lib/**/libfolly_runtime.so',
              'lib/**/libhermes.so',
              'lib/**/libjsi.so',
            ],
          },
        },
      },
    ],
    '@config-plugins/detox',
  ],
};

export default {
  expo,
};
