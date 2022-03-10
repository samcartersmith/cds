import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxSizeConfig,
  animateOutMaxSizeConfig,
  collapsibleHiddenOpacity,
  collapsibleVisibleOpacity,
  collapsibleHiddenMaxSize,
} from '@cbhq/cds-common/animation/collapsible';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import type { AnimationHookProps } from '../animation/AnimationProps';
import type { CollapsibleDirectionReturnValues } from './useCollapsibleDirection';

type CollapsibleAnimation = AnimationHookProps<{
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

export const useCollapsibleAnimation = (
  collapsed: boolean,
  animateTo: CollapsibleDirectionReturnValues['animateTo'],
  animateProperty: CollapsibleDirectionReturnValues['animateProperty'],
): CollapsibleAnimation => {
  const defaultExpanded = useRef(!collapsed);

  const collapsibleOpacity = useRef(new Animated.Value(collapsibleHiddenOpacity));
  const collapsibleSize = useRef(new Animated.Value(collapsibleHiddenMaxSize));

  // if it's expanded by default, fast forward the animated value to skip the animation
  if (defaultExpanded.current && animateTo > 0) {
    collapsibleOpacity.current.setValue(collapsibleVisibleOpacity);
    collapsibleSize.current.setValue(animateTo);
    defaultExpanded.current = false;
  }

  const animateIn = Animated.parallel([
    Animated.timing(collapsibleOpacity.current, opacityInConfig),
    Animated.timing(collapsibleSize.current, { ...sizeInConfig, toValue: animateTo }),
  ]);

  const animateOut = Animated.parallel([
    Animated.timing(collapsibleOpacity.current, opacityOutConfig),
    Animated.timing(collapsibleSize.current, sizeOutConfig),
  ]);

  return useMemo(() => {
    return {
      animatedStyles: {
        opacity: collapsibleOpacity.current,
        [animateProperty]: collapsibleSize.current,
      },
      animateIn,
      animateOut,
    };
  }, [animateIn, animateOut, animateProperty]);
};
