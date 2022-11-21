import { withDelay, withTiming } from 'react-native-reanimated';

import { convertMotionConfig } from './convertMotionConfig';

/**
 * Util worklet to convert CDS motion config to Reanimated withTiming config
 * @param motionConfig CDS motion config
 * @returns Reanimated withTiming
 */
export const withMotionTiming = (motionConfig: ReturnType<typeof convertMotionConfig>) => {
  'worklet';

  const timing = withTiming(motionConfig.toValue, {
    duration: motionConfig.duration,
    easing: motionConfig.easing,
  });

  return motionConfig.delay ? withDelay(motionConfig.delay, timing) : timing;
};
