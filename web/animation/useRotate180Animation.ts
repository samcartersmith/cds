import { useRef, useCallback, useMemo, useEffect } from 'react';
import {
  animateRotate180InConfig,
  animateRotate180OutConfig,
} from '@cbhq/cds-common/animation/rotate';
import { Animated } from './Animated';

export const useRotate180Animation = (shouldAnimationStart: boolean) => {
  const rotateAnimationRef = useRef<HTMLDivElement>(null);

  const animateRotateIn = useCallback(async (): Promise<{ finished: boolean } | undefined> => {
    return Animated.timing(rotateAnimationRef, {
      ...animateRotate180InConfig,
      fromValue: `rotate(${animateRotate180InConfig.fromValue}deg)`,
      toValue: `rotate(${animateRotate180InConfig.toValue}deg)`,
    })?.start();
  }, []);

  const animateRotateOut = useCallback(async (): Promise<{ finished: boolean } | undefined> => {
    return Animated.timing(rotateAnimationRef, {
      ...animateRotate180OutConfig,
      fromValue: `rotate(${animateRotate180OutConfig.fromValue}deg)`,
      toValue: `rotate(${animateRotate180OutConfig.toValue}deg)`,
    })?.start();
  }, []);

  useEffect(() => {
    if (shouldAnimationStart) {
      void animateRotateIn();
    } else {
      void animateRotateOut();
    }
  }, [animateRotateIn, animateRotateOut, shouldAnimationStart]);

  return useMemo(
    () => ({
      rotateAnimationRef,
      animateRotateIn,
      animateRotateOut,
    }),
    [animateRotateIn, animateRotateOut],
  );
};
