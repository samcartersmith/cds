import { MotionValue, useTransform } from 'framer-motion';

export type Easing = (v: number) => number;

export type TransformOptions<T> = {
  clamp?: boolean;
  ease?: Easing | Easing[];
  mixer?: (from: T, to: T) => (v: number) => unknown;
};

type UseInterpolateParams = {
  inputRange: number[];
  outputRange: number[];
} & TransformOptions<number>;

// Mimic the Animated.interpolate API for React Native
export const useInterpolate = (
  value: MotionValue<number>,
  { inputRange, outputRange, ...opts }: UseInterpolateParams,
) => {
  return useTransform(value, inputRange, outputRange, opts);
};
