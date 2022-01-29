import { useCallback, useMemo, useRef } from 'react';
import {
  animateRotate180InConfig,
  animateRotate180OutConfig,
} from '@cbhq/cds-common/animation/rotate';

import { Animated } from './Animated';

export const useRotate180Animation = () => {
  const rotateAnimationRef = useRef<HTMLDivElement>(null);

  const animateCaretIn = useCallback(async (): Promise<{ finished: boolean } | undefined> => {
    return Animated.timing(rotateAnimationRef, {
      ...animateRotate180InConfig,
      fromValue: `rotate(${animateRotate180InConfig.fromValue}deg)`,
      toValue: `rotate(${animateRotate180InConfig.toValue}deg)`,
    })?.start();
  }, []);

  const animateCaretOut = useCallback(async (): Promise<{ finished: boolean } | undefined> => {
    return Animated.timing(rotateAnimationRef, {
      ...animateRotate180OutConfig,
      fromValue: `rotate(${animateRotate180OutConfig.fromValue}deg)`,
      toValue: `rotate(${animateRotate180OutConfig.toValue}deg)`,
    })?.start();
  }, []);

  return useMemo(
    () => ({
      rotateAnimationRef,
      animateCaretIn,
      animateCaretOut,
    }),
    [animateCaretIn, animateCaretOut],
  );
};
