import { Animated, Easing } from 'react-native';
import { curves, durations } from '@cbhq/cds-common/tokens/motion';
import type { MotionBaseSpec } from '@cbhq/cds-common/types';

type MotionSpec = Omit<MotionBaseSpec, 'property'>;

export const mobileCurves = {
  global: Easing.bezier(...curves.global),
  enterExpressive: Easing.bezier(...curves.enterExpressive),
  enterFunctional: Easing.bezier(...curves.enterFunctional),
  exitExpressive: Easing.bezier(...curves.exitExpressive),
  exitFunctional: Easing.bezier(...curves.exitFunctional),
  linear: Easing.bezier(...curves.linear),
};

export const convertMotionConfig = ({
  toValue,
  delay,
  easing,
  duration,
  useNativeDriver = true,
}: MotionSpec): Animated.TimingAnimationConfig => {
  return {
    toValue,
    delay,
    easing: mobileCurves[easing],
    duration: durations[duration],
    useNativeDriver,
  };
};
