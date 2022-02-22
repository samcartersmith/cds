import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxHeightConfig,
  animateOutMaxHeightConfig,
  collapseHiddenOpacity,
  collapseHiddenMaxHeight,
} from '@cbhq/cds-common/animation/collapse';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import type { AnimationHookProps } from '../animation/AnimationProps';

type CollapseAnimation = AnimationHookProps<{
  opacity: Animated.Value;
  maxHeight: Animated.Value;
}>;

// opacity animation
const opacityInConfig = convertMotionConfig({ ...animateInOpacityConfig, useNativeDriver: false });
const opacityOutConfig = convertMotionConfig({
  ...animateOutOpacityConfig,
  useNativeDriver: false,
});

// maxHeight animation (need to turn off native driver)
const heightInConfig = convertMotionConfig({ ...animateInMaxHeightConfig, useNativeDriver: false });
const heightOutConfig = convertMotionConfig({
  ...animateOutMaxHeightConfig,
  useNativeDriver: false,
});

export const useCollapseAnimation = (
  defaultExpanded: boolean,
  animateToHeight: number,
): CollapseAnimation => {
  const isDefaultExpanded = useRef(defaultExpanded);

  const collapseOpacity = useRef(new Animated.Value(collapseHiddenOpacity));
  const collapseHeight = useRef(new Animated.Value(collapseHiddenMaxHeight));

  // if it's expanded by default, fast forward the animated value to skip the animation
  if (isDefaultExpanded.current && animateToHeight > 0) {
    collapseOpacity.current.setValue(1);
    collapseHeight.current.setValue(animateToHeight);
    isDefaultExpanded.current = false;
  }

  const animateIn = Animated.parallel([
    Animated.timing(collapseOpacity.current, opacityInConfig),
    Animated.timing(collapseHeight.current, { ...heightInConfig, toValue: animateToHeight }),
  ]);

  const animateOut = Animated.parallel([
    Animated.timing(collapseOpacity.current, opacityOutConfig),
    Animated.timing(collapseHeight.current, heightOutConfig),
  ]);

  return useMemo(() => {
    return {
      animatedStyles: { opacity: collapseOpacity.current, maxHeight: collapseHeight.current },
      animateIn,
      animateOut,
    };
  }, [animateIn, animateOut]);
};
