import { MutableRefObject, useCallback, useRef } from 'react';
import { Placement } from '@popperjs/core';
import {
  animateMenuOpacityInConfig,
  animateMenuOpacityOutConfig,
  animateMenuTransformInConfig,
  animateMenuTransformOutConfig,
} from '@cbhq/cds-common/animation/menu';

import { Animated } from '../animation/Animated';
import { useOverlayAnimation } from '../overlays/Overlay/useOverlayAnimation';

export const useDropdownAnimation = (
  ref: MutableRefObject<HTMLElement | null>,
  placement?: Placement,
  showOverlay?: boolean,
) => {
  const isHorizontal = placement === 'right' || placement === 'left';
  const translate = isHorizontal ? 'translateX' : 'translateY';

  const overlayRef = useRef<HTMLElement | null>(null);
  const { animateIn: animateOverlayIn, animateOut: animateOverlayOut } = useOverlayAnimation(
    overlayRef,
    animateMenuOpacityInConfig.duration,
  );

  const animateDropdownOpacityIn = Animated.timing(ref, animateMenuOpacityInConfig);
  const animateDropdownTranslateIn = Animated.timing(ref, {
    ...animateMenuTransformInConfig,
    fromValue: `${translate}(${animateMenuTransformInConfig.fromValue}px)`,
    toValue: `${translate}(${animateMenuTransformInConfig.toValue}px)`,
  });

  const animatePopoverOverlayOut = Animated.timing(ref, animateMenuOpacityOutConfig);
  const animatePopoverTranslateOut = Animated.timing(ref, {
    ...animateMenuTransformOutConfig,
    fromValue: `${translate}(${animateMenuTransformOutConfig.fromValue}px)`,
    toValue: `${translate}(${animateMenuTransformOutConfig.toValue}px)`,
  });

  const animateIn = useCallback(() => {
    if (showOverlay) {
      void Animated.parallel([
        animateDropdownOpacityIn,
        animateDropdownTranslateIn,
        animateOverlayIn(),
      ]).start();
    } else {
      void Animated.parallel([animateDropdownOpacityIn, animateDropdownTranslateIn]).start();
    }
  }, [animateDropdownOpacityIn, animateDropdownTranslateIn, animateOverlayIn, showOverlay]);

  return {
    animatePopoverOverlayOut,
    animatePopoverTranslateOut,
    animateOverlayOut,
    overlayRef,
    animateIn,
  };
};
