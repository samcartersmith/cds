import { useCallback, useMemo, useRef } from 'react';
import {
  animateInOpacityConfig,
  animateInYConfig as baseAnimateInYConfig,
  animateOutOpacityConfig,
  animateOutYConfig as baseAnimateOutYConfig,
} from '@cbhq/cds-common/animation/tooltip';

import { Animated } from '../../animation/Animated';

const animateOutYConfig = {
  ...baseAnimateOutYConfig,
  toValue: `translateY(${baseAnimateOutYConfig.toValue}px)`,
  fromValue: `translateY(${baseAnimateOutYConfig.fromValue}px)`,
};

const animateInYConfig = {
  ...baseAnimateInYConfig,
  toValue: `translateY(${baseAnimateInYConfig.toValue}px)`,
  fromValue: `translateY(${baseAnimateInYConfig.fromValue}px)`,
};

export const useTooltipAnimation = () => {
  const popperAnimationRef = useRef<HTMLDivElement | null>(null);

  const animateIn = useCallback(() => {
    void Animated.parallel([
      Animated.timing(popperAnimationRef, animateInOpacityConfig),
      Animated.timing(popperAnimationRef, animateInYConfig),
    ]).start();
  }, []);

  const animateOut = useMemo(() => {
    return Animated.parallel([
      Animated.timing(popperAnimationRef, animateOutOpacityConfig),
      Animated.timing(popperAnimationRef, animateOutYConfig),
    ]);
  }, []);

  return { popperAnimationRef, animateIn, animateOut };
};
