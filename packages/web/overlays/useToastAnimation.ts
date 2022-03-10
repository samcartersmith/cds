import { useMemo, RefObject } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInBottomConfig,
  animateOutBottomConfig,
} from '@cbhq/cds-common/animation/toast';

import { Animated } from '../animation/Animated';

export const useToastAnimation = (toastRef: RefObject<HTMLElement>) => {
  const animateIn = Animated.parallel([
    Animated.timing(toastRef, animateInOpacityConfig),
    Animated.timing(toastRef, {
      ...animateInBottomConfig,
      fromValue: `translateY(${animateInBottomConfig.fromValue}px)`,
      toValue: `translateY(${animateInBottomConfig.toValue}px)`,
    }),
  ]);

  const animateOut = Animated.parallel([
    Animated.timing(toastRef, animateOutOpacityConfig),
    Animated.timing(toastRef, {
      ...animateOutBottomConfig,
      fromValue: `translateY(${animateOutBottomConfig.fromValue}px)`,
      toValue: `translateY(${animateOutBottomConfig.toValue}px)`,
    }),
  ]);

  return useMemo(() => {
    return { toastRef, animateIn, animateOut };
  }, [toastRef, animateIn, animateOut]);
};
