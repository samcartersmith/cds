import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  overlayHiddenOpacity,
} from '@cbhq/cds-common/animation/overlay';

import { MotionBaseSpec, MotionDuration } from '@cbhq/cds-common';
import { convertMotionConfig } from '../../animation/convertMotionConfig';

/**
 * Uses a default overlay animation config, but you can pass it custom duration tokens for enter and exit animations
 * If only a custom enter animation duration value is provided, it will be used for both enter and exit animations
 */
export const useOverlayAnimation = (
  animateInDuration?: MotionDuration,
  animateOutDuration?: MotionDuration,
): [Animated.Value, Animated.CompositeAnimation, Animated.CompositeAnimation] => {
  const overlayAnim = useRef(new Animated.Value(overlayHiddenOpacity));
  const customAnimateInConfig = {
    ...animateInOpacityConfig,
    duration: animateInDuration,
  } as MotionBaseSpec;
  const customAnimateOutConfig = {
    ...animateOutOpacityConfig,
    duration: animateOutDuration ?? animateInDuration,
  } as MotionBaseSpec;

  const animateInConfig = convertMotionConfig(
    animateInDuration ? customAnimateInConfig : animateInOpacityConfig,
  );
  const animateOutConfig = convertMotionConfig(
    animateOutDuration ?? animateInDuration ? customAnimateOutConfig : animateOutOpacityConfig,
  );

  return useMemo(() => {
    const animateIn = Animated.timing(overlayAnim.current, animateInConfig);
    const animateOut = Animated.timing(overlayAnim.current, animateOutConfig);
    return [overlayAnim.current, animateIn, animateOut];
  }, [animateInConfig, animateOutConfig]);
};
