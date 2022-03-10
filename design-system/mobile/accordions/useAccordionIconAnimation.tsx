import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';
import {
  animateInRotateConfig,
  animateOutRotateConfig,
  accordionHiddenRotate,
  accordionVisibleRotate,
} from '@cbhq/cds-common/animation/accordion';
import { convertMotionConfig } from '../animation/convertMotionConfig';
import type { AnimationHookProps } from '../animation/AnimationProps';

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
