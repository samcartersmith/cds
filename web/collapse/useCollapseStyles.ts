import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxHeightConfig,
  animateOutMaxHeightConfig,
} from '@cbhq/cds-common/animation/collapse';
import { Variants } from 'framer-motion';
import { useMemo } from 'react';

import { Animated } from '../animation/Animated';

const variants: Variants = {
  expand: {
    ...Animated.toFramerTransition([
      animateInOpacityConfig,
      { ...animateInMaxHeightConfig, toValue: 'auto' },
    ]),
  },
  collapse: {
    ...Animated.toFramerTransition([animateOutOpacityConfig, animateOutMaxHeightConfig]),
    transitionEnd: { display: 'none' },
  },
};

const defaultStyle = {
  display: 'block',
  overflow: 'hidden',
};

export const useCollapseStyles = (expanded: boolean) => {
  const state = expanded ? 'expand' : 'collapse';

  return useMemo(
    () => ({
      style: defaultStyle,
      variants,
      // prevent animation on mount
      initial: state,
      animate: state,
    }),
    [state],
  );
};
