import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  overlayHiddenOpacity,
} from '@cbhq/cds-common/animation/overlay';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

const animateInConfig = convertMotionConfig(animateInOpacityConfig);
const animateOutConfig = convertMotionConfig(animateOutOpacityConfig);

export const useOverlayAnimation = (): [
  Animated.Value,
  Animated.CompositeAnimation,
  Animated.CompositeAnimation,
] => {
  const overlayAnim = useRef(new Animated.Value(overlayHiddenOpacity));
  return useMemo(() => {
    const animateIn = Animated.timing(overlayAnim.current, animateInConfig);
    const animateOut = Animated.timing(overlayAnim.current, animateOutConfig);
    return [overlayAnim.current, animateIn, animateOut];
  }, []);
};
