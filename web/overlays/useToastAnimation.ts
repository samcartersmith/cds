import { useMemo, RefObject } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInBottomConfig,
  animateOutBottomConfig,
} from '@cbhq/cds-common/animation/toast';

import { Animated } from '../animation/Animated';
import { toastTranslateX } from './toastStyles';

export const useToastAnimation = (toastRef: RefObject<HTMLElement>) => {
  const animateIn = Animated.parallel([
    Animated.timing(toastRef, animateInOpacityConfig),
    Animated.timing(toastRef, {
      ...animateInBottomConfig,
      fromValue: `translate(${toastTranslateX}, ${animateInBottomConfig.fromValue}px)`,
      toValue: `translate(${toastTranslateX}, ${animateInBottomConfig.toValue}px)`,
    }),
  ]);

  const animateOut = Animated.parallel([
    Animated.timing(toastRef, animateOutOpacityConfig),
    Animated.timing(toastRef, {
      ...animateOutBottomConfig,
      fromValue: `translate(${toastTranslateX}, ${animateOutBottomConfig.fromValue}px)`,
      toValue: `translate(${toastTranslateX}, ${animateOutBottomConfig.toValue}px)`,
    }),
  ]);

  return useMemo(() => {
    return { toastRef, animateIn, animateOut };
  }, [toastRef, animateIn, animateOut]);
};
