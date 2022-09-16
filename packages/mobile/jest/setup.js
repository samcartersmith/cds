import '@cbhq/ui-mobile-a11y-engine';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  Reanimated.default.addWhitelistedUIProps = () => {};

  /*
   * We override the internal withTiming mock because its callback can have
   * state changing side-effects and the way it was mocked causes issues when there
   * are side-effets.
   * */
  const mockedWithTiming = (animatedValue, config, cb = () => {}) => {
    setTimeout(cb, config?.duration);
    return animatedValue;
  };
  Reanimated.withTiming = mockedWithTiming;
  // It's the same type def, takes a value and returns a SharedValue<T>
  Reanimated.makeMutable = Reanimated.useSharedValue;

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
