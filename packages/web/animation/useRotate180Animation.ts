import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  animateRotate180InConfig,
  animateRotate180OutConfig,
} from '@cbhq/cds-common/animation/rotate';

import { Animated } from './Animated';

export const useRotate180Animation = (
  shouldAnimationStart: boolean,
  animationsEnabled?: boolean,
) => {
  const rotateAnimationRef = useRef<HTMLDivElement>(null);

  const animateRotateIn = useCallback(() => {
    return Animated.timing(rotateAnimationRef, {
      ...animateRotate180InConfig,
      fromValue: `rotate(${animateRotate180InConfig.fromValue}deg)`,
      toValue: `rotate(${animateRotate180InConfig.toValue}deg)`,
    })?.start();
  }, []);

  const animateRotateOut = useCallback(() => {
    return Animated.timing(rotateAnimationRef, {
      ...animateRotate180OutConfig,
      fromValue: `rotate(${animateRotate180OutConfig.fromValue}deg)`,
      toValue: `rotate(${animateRotate180OutConfig.toValue}deg)`,
    })?.start();
  }, []);

  useEffect(() => {
    if (animationsEnabled) {
      if (shouldAnimationStart) {
        void animateRotateIn();
      } else {
        void animateRotateOut();
      }
    }
  }, [animateRotateIn, animateRotateOut, shouldAnimationStart, animationsEnabled]);

  return useMemo(
    () => ({
      rotateAnimationRef,
      animateRotateIn,
      animateRotateOut,
    }),
    [animateRotateIn, animateRotateOut],
  );
};
