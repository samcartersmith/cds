import { Platform } from 'react-native';

/*
 * On react native 0.65 (maybe even before) the adjustsFontSizeToFit API was broken for Android.
 * The API was fixed in 0.66 via https://github.com/facebook/react-native/pull/31538.
 * When we tried to upgrade to React Native 0.66 we noticed that the app was extremely slow,
 * so we started investigating and were able to confirm that the above PR is what caused the regression.
 * We reported the issue to React Native https://github.com/facebook/react-native/pull/33135, and submitted
 * a revert https://github.com/facebook/react-native/pull/33135. Until we upgrade to react native to a
 * version that includes this fix, we can't use adjustsFontSizeToFit on Android.
 */

const cachedValue = Platform.OS === 'ios' ? { adjustsFontSizeToFit: true } : undefined;

type GetAdjustsFontSizeToFitPropParams = { enabled?: boolean };

export function getAdjustsFontSizeToFitProp({ enabled }: GetAdjustsFontSizeToFitPropParams) {
  return enabled ? cachedValue : undefined;
}
