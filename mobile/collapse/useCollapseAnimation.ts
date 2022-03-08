import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxSizeConfig,
  animateOutMaxSizeConfig,
  collapseHiddenOpacity,
  collapseVisibleOpacity,
  collapseHiddenMaxSize,
} from '@cbhq/cds-common/animation/collapse';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import type { AnimationHookProps } from '../animation/AnimationProps';
import type { CollapseDirectionReturnValues } from './useCollapseDirection';

type CollapseAnimation = AnimationHookProps<{
  opacity: Animated.Value;
  maxHeight?: Animated.Value;
  maxWidth?: Animated.Value;
}>;

// opacity animation
const opacityInConfig = convertMotionConfig({ ...animateInOpacityConfig, useNativeDriver: false });
const opacityOutConfig = convertMotionConfig({
  ...animateOutOpacityConfig,
  useNativeDriver: false,
});

// maxHeight/maxWidth animation (need to turn off native driver)
const sizeInConfig = convertMotionConfig({ ...animateInMaxSizeConfig, useNativeDriver: false });
const sizeOutConfig = convertMotionConfig({
  ...animateOutMaxSizeConfig,
  useNativeDriver: false,
});

export const useCollapseAnimation = (
  expanded: boolean,
  animateTo: CollapseDirectionReturnValues['animateTo'],
  animateProperty: CollapseDirectionReturnValues['animateProperty'],
): CollapseAnimation => {
  const defaultExpanded = useRef(expanded);

  const collapseOpacity = useRef(new Animated.Value(collapseHiddenOpacity));
  const collapseSize = useRef(new Animated.Value(collapseHiddenMaxSize));

  // if it's expanded by default, fast forward the animated value to skip the animation
  if (defaultExpanded.current && animateTo > 0) {
    collapseOpacity.current.setValue(collapseVisibleOpacity);
    collapseSize.current.setValue(animateTo);
    defaultExpanded.current = false;
  }

  const animateIn = Animated.parallel([
    Animated.timing(collapseOpacity.current, opacityInConfig),
    Animated.timing(collapseSize.current, { ...sizeInConfig, toValue: animateTo }),
  ]);

  const animateOut = Animated.parallel([
    Animated.timing(collapseOpacity.current, opacityOutConfig),
    Animated.timing(collapseSize.current, sizeOutConfig),
  ]);

  return useMemo(() => {
    return {
      animatedStyles: {
        opacity: collapseOpacity.current,
        [animateProperty]: collapseSize.current,
      },
      animateIn,
      animateOut,
    };
  }, [animateIn, animateOut, animateProperty]);
};
