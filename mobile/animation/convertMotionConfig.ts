import { curves, durations } from '@cbhq/cds-common/tokens/motion';
import type { MotionSpec } from '@cbhq/cds-common/types';
import { Animated, Easing } from 'react-native';

export const mobileCurves = {
  global: Easing.bezier(...curves.global),
  enterExpressive: Easing.bezier(...curves.enterExpressive),
  enterFunctional: Easing.bezier(...curves.enterFunctional),
  exitExpressive: Easing.bezier(...curves.exitExpressive),
  exitFunctional: Easing.bezier(...curves.exitFunctional),
};

export const convertMotionConfig = ({
  toValue,
  delay,
  easing,
  duration,
  useNativeDriver = true,
}: Omit<MotionSpec, 'property'>): Animated.TimingAnimationConfig => {
  return {
    toValue,
    easing: mobileCurves[easing],
    duration: durations[duration],
    delay,
    useNativeDriver,
  };
};
