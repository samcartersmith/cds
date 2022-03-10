import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  accordionHiddenRotate,
  accordionVisibleRotate,
  animateInRotateConfig,
  animateOutRotateConfig,
} from '@cbhq/cds-common/animation/accordion';

import type { AnimationHookProps } from '../animation/AnimationProps';
import { convertMotionConfig } from '../animation/convertMotionConfig';

type AccordionIconAnimation = AnimationHookProps<{
  transform: [
    {
      rotate: Animated.AnimatedInterpolation;
    },
  ];
}>;

const rotateInConfig = convertMotionConfig(animateInRotateConfig);
const rotateOutConfig = convertMotionConfig(animateOutRotateConfig);

export const useAccordionIconAnimation = (): AccordionIconAnimation => {
  const accordionIconRotate = useRef(new Animated.Value(accordionHiddenRotate));

  const animateIn = Animated.timing(accordionIconRotate.current, rotateInConfig);
  const animateOut = Animated.timing(accordionIconRotate.current, rotateOutConfig);

  const rotateValue = accordionIconRotate.current.interpolate({
    inputRange: [0, 1],
    outputRange: [`${accordionHiddenRotate}deg`, `${accordionVisibleRotate}deg`],
  });

  return useMemo(
    () => ({ animatedStyles: { transform: [{ rotate: rotateValue }] }, animateIn, animateOut }),
    [rotateValue, animateIn, animateOut],
  );
};
