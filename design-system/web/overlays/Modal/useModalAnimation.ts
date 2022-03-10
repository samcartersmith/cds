import { useRef, useCallback, useMemo } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInScaleConfig,
  animateOutScaleConfig,
} from '@cbhq/cds-common/animation/modal';

import { Animated } from '../../animation/Animated';
import { useOverlayAnimation } from '../Overlay/useOverlayAnimation';

export const useModalAnimation = () => {
  const modalRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLElement>(null);
  const { animateIn: animateInOverlay, animateOut: animateOutOverlay } =
    useOverlayAnimation(overlayRef);

  const animateIn = useCallback(async (): Promise<{ finished: boolean } | undefined> => {
    return Animated.parallel([
      Animated.timing(modalRef, animateInOpacityConfig),
      Animated.timing(modalRef, {
        ...animateInScaleConfig,
        fromValue: `scale(${animateInScaleConfig.fromValue})`,
        toValue: `scale(${animateInScaleConfig.toValue})`,
      }),
      animateInOverlay(),
    ]).start();
  }, [modalRef, animateInOverlay]);

  const animateOut = useCallback(async (): Promise<{ finished: boolean } | undefined> => {
    return Animated.parallel([
      Animated.timing(modalRef, animateOutOpacityConfig),
      Animated.timing(modalRef, {
        ...animateOutScaleConfig,
        fromValue: `scale(${animateOutScaleConfig.fromValue})`,
        toValue: `scale(${animateOutScaleConfig.toValue})`,
      }),
      animateOutOverlay(),
    ]).start();
  }, [modalRef, animateOutOverlay]);

  return useMemo(
    () => ({
      modalRef,
      overlayRef,
      animateIn,
      animateOut,
    }),
    [animateIn, animateOut],
  );
};
