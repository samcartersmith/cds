import { curves, durations } from '@cbhq/cds-common/tokens/motion';
import type { MotionCurve, MotionDuration } from '@cbhq/cds-common/types';
import { Animated, Easing } from 'react-native';

export const mobileCurves = {
  global: Easing.bezier(...curves.global),
  enterExpressive: Easing.bezier(...curves.enterExpressive),
  enterFunctional: Easing.bezier(...curves.enterFunctional),
  exitExpressive: Easing.bezier(...curves.exitExpressive),
  exitFunctional: Easing.bezier(...curves.exitFunctional),
};

type MotionConfig = {
  toValue: number;
  curve: MotionCurve;
  duration: MotionDuration;
  delay?: number;
};

export const convertMotionConfig = ({
  toValue,
  delay,
  curve,
  duration,
}: MotionConfig): Animated.TimingAnimationConfig => {
  return {
    toValue,
    easing: mobileCurves[curve],
    duration: durations[duration],
    delay,
    useNativeDriver: true,
  };
};
