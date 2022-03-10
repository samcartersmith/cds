import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateInYConfig,
  animateOutOpacityConfig,
  animateOutYConfig,
  tooltipHiddenOpacity,
  tooltipHiddenY,
} from '@cbhq/cds-common/animation/tooltip';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

// opacity animation
const opacityInConfig = convertMotionConfig(animateInOpacityConfig);
const opacityOutConfig = convertMotionConfig(animateOutOpacityConfig);

// Y transform animation
const yInConfig = convertMotionConfig(animateInYConfig);
const yOutConfig = convertMotionConfig(animateOutYConfig);

export const useTooltipAnimation = () => {
  const opacity = useRef(new Animated.Value(tooltipHiddenOpacity)).current;
  const translateY = useRef(new Animated.Value(tooltipHiddenY)).current;

  const animateIn = useMemo(() => {
    return Animated.parallel([
      Animated.timing(opacity, opacityInConfig),
      Animated.timing(translateY, yInConfig),
    ]);
  }, [opacity, translateY]);

  const animateOut = useMemo(() => {
    return Animated.parallel([
      Animated.timing(opacity, opacityOutConfig),
      Animated.timing(translateY, yOutConfig),
    ]);
  }, [opacity, translateY]);

  return {
    opacity,
    translateY,
    animateIn,
    animateOut,
  };
};
