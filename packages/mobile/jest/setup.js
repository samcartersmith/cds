import 'react-native-gesture-handler/jestSetup';
import 'react-native-accessibility-engine';
import '@testing-library/jest-native/extend-expect';

import { setUpTests } from 'react-native-reanimated/lib/reanimated2/jestUtils';

import { mockStatusBarHeight } from './constants';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.StatusBarManager = {
    getHeight: jest.fn((cb) => cb({ height: mockStatusBarHeight })),
  };

  return RN;
});

setUpTests();
