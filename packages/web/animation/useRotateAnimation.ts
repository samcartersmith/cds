import { useCallback, useMemo, useRef } from 'react';
import { baseConfig } from '@cbhq/cds-common/animation/rotate';

import { Animated } from './Animated';

export const useRotateAnimation = (degrees: number) => {
  const rotateAnimationRef = useRef<HTMLDivElement>(null);

  const animateClockwise = useCallback(() => {
    return Animated.timing(rotateAnimationRef, {
      ...baseConfig,
      fromValue: 'rotate(0deg)',
      toValue: `rotate(${degrees}deg)`,
    })?.start();
  }, [degrees]);

  const animateCounterClockwise = useCallback(() => {
    return Animated.timing(rotateAnimationRef, {
      ...baseConfig,
      fromValue: `rotate(${degrees}deg)`,
      toValue: 'rotate(0deg)',
    })?.start();
  }, [degrees]);

  return useMemo(
    () => ({
      rotateAnimationRef,
      animateClockwise,
      animateCounterClockwise,
    }),
    [animateClockwise, animateCounterClockwise],
  );
};
