import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxHeightConfig,
  animateOutMaxHeightConfig,
  accordionHiddenOpacity,
  accordionHiddenMaxHeight,
  accordionVisibleMaxHeight,
} from '@cbhq/cds-common/animation/accordion';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import type { AnimationHookProps } from '../animation/AnimationProps';

type AccordionPanelAnimation = AnimationHookProps<{
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

export const useAccordionPanelAnimation = (defaultExpanded: boolean): AccordionPanelAnimation => {
  const isDefaultExpanded = useRef(defaultExpanded);

  const accordionOpacity = useRef(new Animated.Value(accordionHiddenOpacity));
  const accordionHeight = useRef(new Animated.Value(accordionHiddenMaxHeight));

  // if it's expanded by default, fast forward the animated value to skip the animation
  if (isDefaultExpanded.current) {
    accordionOpacity.current.setValue(1);
    accordionHeight.current.setValue(accordionVisibleMaxHeight);
    isDefaultExpanded.current = false;
  }

  const animateIn = Animated.parallel([
    Animated.timing(accordionOpacity.current, opacityInConfig),
    Animated.timing(accordionHeight.current, heightInConfig),
  ]);

  const animateOut = Animated.parallel([
    Animated.timing(accordionOpacity.current, opacityOutConfig),
    Animated.timing(accordionHeight.current, heightOutConfig),
  ]);

  return useMemo(() => {
    return {
      animatedStyles: { opacity: accordionOpacity.current, maxHeight: accordionHeight.current },
      animateIn,
      animateOut,
    };
  }, [animateIn, animateOut]);
};
