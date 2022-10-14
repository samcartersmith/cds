import '@cbhq/ui-mobile-a11y-engine';
import 'react-native-gesture-handler/jestSetup';

import { mockStatusBarHeight } from './constants';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// https://docs.swmansion.com/react-native-reanimated/docs/guide/testing/
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.StatusBarManager = {
    getHeight: jest.fn((cb) => cb({ height: mockStatusBarHeight })),
  };

  return RN;
});
