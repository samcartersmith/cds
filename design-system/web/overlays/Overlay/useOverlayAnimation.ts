import { RefObject, useCallback, useMemo } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/overlay';

import { Animated } from '../../animation/Animated';

export const useOverlayAnimation = (overlayRef: RefObject<HTMLElement>) => {
  const animate = useCallback(
    (type: 'in' | 'out') => {
      return Animated.timing(
        overlayRef,
        type === 'in' ? animateInOpacityConfig : animateOutOpacityConfig,
      );
    },
    [overlayRef],
  );

  return useMemo(
    () => ({
      animateIn: () => animate('in'),
      animateOut: () => animate('out'),
    }),
    [animate],
  );
};
