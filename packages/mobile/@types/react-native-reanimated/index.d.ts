/**
 * From retail: https://github.cbhq.net/consumer/react-native/blob/master/src/%40types/react-native-reanimated/index.d.ts
 * Extend react-native-reanimated to include these internal test helpers.
 *
 * For some reason importing from src directory fails tests
 * so exporting the types for lib
 */
declare module 'react-native-reanimated/lib/reanimated2/jestUtils' {
  export {
    withReanimatedTimer,
    advanceAnimationByTime,
    advanceAnimationByFrame,
  } from 'react-native-reanimated/src/reanimated2/jestUtils';
}
