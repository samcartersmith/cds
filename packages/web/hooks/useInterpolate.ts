import { MotionValue, useTransform } from 'framer-motion';
import { TransformOptions } from 'framer-motion/types/utils/transform';

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
