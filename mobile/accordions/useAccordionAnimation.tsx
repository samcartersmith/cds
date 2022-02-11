import { useEffect } from 'react';
import { Animated } from 'react-native';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import type { AccordionCommonProps } from '@cbhq/cds-common/types';

type AccordionAnimation = {
  animateIn: Animated.CompositeAnimation;
  animateOut: Animated.CompositeAnimation;
} & Pick<AccordionCommonProps, 'expanded'>;

export const useAccordionAnimation = ({ expanded, animateIn, animateOut }: AccordionAnimation) => {
  const previousExpanded = usePreviousValue(expanded);

  useEffect(() => {
    if (!previousExpanded && expanded) {
      animateIn.start();
    }
    // prevent animating on default collapsed items
    if (previousExpanded && !expanded) {
      animateOut.start();
    }
  }, [animateIn, animateOut, expanded, previousExpanded]);
};
