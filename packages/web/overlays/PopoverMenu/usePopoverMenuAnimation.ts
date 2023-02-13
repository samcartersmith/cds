import { MutableRefObject, useCallback, useEffect } from 'react';
import { DropdownPositionConfig } from '@cbhq/cds-common';
import {
  animateMenuOpacityInConfig,
  animateMenuOpacityOutConfig,
  animateMenuTransformInConfig,
  animateMenuTransformOutConfig,
} from '@cbhq/cds-common/animation/menu';

import { Animated } from '../../animation/Animated';

/** @deprecated */
export const usePopoverMenuAnimation = (
  triggerAnimation: boolean,
  ref: MutableRefObject<HTMLElement | null>,
  popoverPositionConfig?: DropdownPositionConfig,
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

  const animatePopoverOverlayOut = Animated.timing(ref, animateMenuOpacityOutConfig);
  const animatePopoverTranslateOut = Animated.timing(ref, {
    ...animateMenuTransformOutConfig,
    fromValue: `${translate}(${animateMenuTransformOutConfig.fromValue}px)`,
    toValue: `${translate}(${animateMenuTransformOutConfig.toValue}px)`,
  });

  useEffect(() => {
    if (triggerAnimation) {
      void animatePopoverMenuIn();
    }
  }, [animatePopoverMenuIn, triggerAnimation]);

  return { animatePopoverOverlayOut, animatePopoverTranslateOut };
};
