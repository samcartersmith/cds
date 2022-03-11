import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  accordionHiddenRotate,
  accordionVisibleRotate,
  animateInRotateConfig,
  animateOutRotateConfig,
} from '@cbhq/cds-common/animation/accordion';

import { convertMotionConfig } from '../animation/convertMotionConfig';

const rotateInConfig = convertMotionConfig(animateInRotateConfig);
const rotateOutConfig = convertMotionConfig(animateOutRotateConfig);

export const useAccordionIconAnimation = () => {
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
