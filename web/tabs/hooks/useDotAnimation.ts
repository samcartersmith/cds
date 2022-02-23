import {
  animateDotScaleConfig,
  animateDotOpacityConfig,
  dotHidden,
  dotVisible,
} from '@cbhq/cds-common/animation/dot';
import { useCallback, useRef } from 'react';
import { Animated } from '../../animation/Animated';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const useDotAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    void Animated.parallel([
      Animated.timing(ref, {
        ...animateDotOpacityConfig,
        fromValue: dotHidden,
        toValue: dotVisible,
      }),
      Animated.timing(ref, {
        ...animateDotScaleConfig,
        fromValue: `scale(${dotHidden})`,
        toValue: `scale(${dotVisible})`,
      }),
    ]).start();
  }, []);

  const animateOut = useCallback(() => {
    void Animated.parallel([
      Animated.timing(ref, {
        ...animateDotOpacityConfig,
        fromValue: dotVisible,
        toValue: dotHidden,
      }),
      Animated.timing(ref, {
        ...animateDotScaleConfig,
        fromValue: `scale(${dotVisible})`,
        toValue: `scale(${dotHidden})`,
      }),
    ]).start();
  }, []);

  return { ref, animateIn, animateOut };
};
