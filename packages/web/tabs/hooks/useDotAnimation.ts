import { useRef } from 'react';
import { animateDotOpacityConfig, dotHidden, dotVisible } from '@cbhq/cds-common/animation/dot';

import { Animated } from '../../animation/Animated';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const useDotAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const animateIn = Animated.timing(dotRef, {
    ...animateDotOpacityConfig,
    fromValue: dotHidden,
    toValue: dotVisible,
  });

  const animateOut = Animated.timing(dotRef, {
    ...animateDotOpacityConfig,
    fromValue: dotVisible,
    toValue: dotHidden,
  });

  return { ref, dotRef, animateIn, animateOut };
};
