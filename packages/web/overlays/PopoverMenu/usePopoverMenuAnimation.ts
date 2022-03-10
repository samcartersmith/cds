import { useCallback, useEffect, MutableRefObject, useMemo } from 'react';
import { PopoverPositionConfig } from '@cbhq/cds-common';
import {
  animateMenuOpacityInConfig,
  animateMenuOpacityOutConfig,
  animateMenuTransformInConfig,
  animateMenuTransformOutConfig,
} from '@cbhq/cds-common/animation/menu';
import { Animated } from '../../animation/Animated';

export const usePopoverMenuAnimation = (
  triggerAnimation: boolean,
  ref: MutableRefObject<HTMLElement | null>,
  popoverPositionConfig?: PopoverPositionConfig,
) => {
  const isHorizontal = popoverPositionConfig?.placement.includes('right' || 'left');
  const translate = isHorizontal ? 'translateX' : 'translateY';

  const animatePopoverMenuIn = useCallback(async () => {
    return Animated.parallel([
      Animated.timing(ref, animateMenuOpacityInConfig),
      Animated.timing(ref, {
        ...animateMenuTransformInConfig,
        fromValue: `${translate}(${animateMenuTransformInConfig.fromValue}px)`,
        toValue: `${translate}(${animateMenuTransformInConfig.toValue}px)`,
      }),
    ])?.start();
  }, [ref, translate]);

  const animatePopoverMenuOut = useMemo(() => {
    return Animated.parallel([
      Animated.timing(ref, animateMenuOpacityOutConfig),
      Animated.timing(ref, {
        ...animateMenuTransformOutConfig,
        fromValue: `${translate}(${animateMenuTransformOutConfig.fromValue}px)`,
        toValue: `${translate}(${animateMenuTransformOutConfig.toValue}px)`,
      }),
    ]);
  }, [ref, translate]);

  useEffect(() => {
    if (triggerAnimation) {
      void animatePopoverMenuIn();
    }
  }, [animatePopoverMenuIn, triggerAnimation]);

  return { animatePopoverMenuOut };
};
