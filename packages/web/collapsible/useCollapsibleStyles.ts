import { useMemo } from 'react';
import { Variants } from 'framer-motion';
import type { CollapsibleDirection } from '@cbhq/cds-common';
import {
  animateInMaxSizeConfig,
  animateInOpacityConfig,
  animateOutMaxSizeConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/collapsible';

import { Animated } from '../animation/Animated';

const defaultStyle = {
  display: 'block',
  overflow: 'hidden',
};

export const useCollapsibleStyles = (collapsed: boolean, direction: CollapsibleDirection) => {
  const state = collapsed ? 'collapsed' : 'expanded';
  const variants: Variants = useMemo(() => {
    return {
      expanded: Animated.toFramerTransition([
        animateInOpacityConfig[direction],
        { ...animateInMaxSizeConfig[direction], toValue: 'auto' },
      ]),
      collapsed: {
        ...Animated.toFramerTransition([
          animateOutOpacityConfig[direction],
          animateOutMaxSizeConfig[direction],
        ]),
        // prevent focus on collapsed element
        transitionEnd: { display: 'none' },
      },
    };
  }, [direction]);

  return useMemo(
    () => ({
      style: defaultStyle,
      variants,
      // prevent animation on mount
      initial: state,
      animate: state,
    }),
    [state, variants],
  );
};
