import { useCallback, useEffect, MutableRefObject } from 'react';
import {
  animateMenuOpacityInConfig,
  animateMenuOpacityOutConfig,
} from '@cbhq/cds-common/animation/menu';
import { Animated } from '../../animation/Animated';

export const usePopoverMenuAnimation = (
  triggerAnimation: boolean,
  ref: MutableRefObject<HTMLElement | null>,
) => {
  const animatePopoverMenuIn = useCallback(() => {
    return Animated.timing(ref, animateMenuOpacityInConfig)?.start();
  }, [ref]);

  const animatePopoverMenuOut = useCallback(() => {
    return Animated.timing(ref, animateMenuOpacityOutConfig)?.start();
  }, [ref]);

  useEffect(() => {
    if (triggerAnimation) {
      void animatePopoverMenuIn();
    } else {
      void animatePopoverMenuOut();
    }
  }, [animatePopoverMenuIn, animatePopoverMenuOut, triggerAnimation]);
};
