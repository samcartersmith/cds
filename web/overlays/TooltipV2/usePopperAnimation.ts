import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/tooltip';
import { useEffect, useRef, useState } from 'react';
import { Animated } from '../../animation/Animated';

export const usePopperAnimation = (popper: HTMLDivElement | null, isOpen: boolean) => {
  const [isInAnimationState, setIsInAnimationState] = useState(false);
  const popperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    popperRef.current = popper;

    if (isOpen) {
      setIsInAnimationState(true);
      void Animated.parallel([
        Animated.timing(popperRef, animateInOpacityConfig),
        // TODO: add translation animation
      ]).start();
    } else {
      void Animated.parallel([
        Animated.timing(popperRef, animateOutOpacityConfig),
        // TODO: add translation animation
      ])
        .start()
        .then(() => {
          setIsInAnimationState(false);
        });
    }
  }, [isOpen, popper]);

  return { isInAnimationState };
};
