import { RefObject, useCallback, useMemo } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/overlay';
import { MotionDuration } from '@cbhq/cds-common/types';

import { Animated } from '../../animation/Animated';

export const useOverlayAnimation = (
  overlayRef: RefObject<HTMLElement>,
  motionDuration?: MotionDuration,
) => {
  const animateInConfig = useMemo(
    () => ({
      ...animateInOpacityConfig,
      duration: motionDuration ?? animateInOpacityConfig.duration,
    }),
    [motionDuration],
  );
  const animateOutConfig = useMemo(
    () => ({
      ...animateOutOpacityConfig,
      duration: motionDuration ?? animateOutOpacityConfig.duration,
    }),
    [motionDuration],
  );

  const animate = useCallback(
    (type: 'in' | 'out') => {
      return Animated.timing(overlayRef, type === 'in' ? animateInConfig : animateOutConfig);
    },
    [overlayRef, animateInConfig, animateOutConfig],
  );

  return useMemo(
    () => ({
      animateIn: () => animate('in'),
      animateOut: () => animate('out'),
    }),
    [animate],
  );
};
