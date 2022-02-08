import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { MotionBaseSpec } from '@cbhq/cds-common/types';
import { convertMotionConfig } from '../animation/convertMotionConfig';

type MotionSpec = Pick<MotionBaseSpec, 'easing' | 'duration'>;
export const useAnimatedValue = (nextValue: number, motionSpec: MotionSpec) => {
  const { getPreviousValue, addPreviousValue } = usePreviousValues<number>([0]);
  addPreviousValue(nextValue);
  const previousValue = getPreviousValue() ?? 0;
  const animatedValue = useRef(new Animated.Value(previousValue));

  useEffect(() => {
    Animated.timing(
      animatedValue.current,
      convertMotionConfig({
        toValue: nextValue,
        ...motionSpec,
        useNativeDriver: true,
      }),
    )?.start();
  }, [nextValue, animatedValue, motionSpec]);

  return animatedValue.current;
};
