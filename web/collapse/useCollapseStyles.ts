import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxSizeConfig,
  animateOutMaxSizeConfig,
} from '@cbhq/cds-common/animation/collapse';
import { Variants } from 'framer-motion';
import { useMemo } from 'react';
import type { CollapseBaseProps } from '@cbhq/cds-common';

import { Animated } from '../animation/Animated';

const defaultStyle = {
  display: 'block',
  overflow: 'hidden',
};

export const useCollapseStyles = (expanded: boolean, direction: CollapseBaseProps['direction']) => {
  const state = expanded ? 'expand' : 'collapse';
  const variants: Variants = useMemo(() => {
    const sizeProperty = direction === 'horizontal' ? 'width' : 'height';

    return {
      expand: {
        ...Animated.toFramerTransition([
          animateInOpacityConfig,
          { ...animateInMaxSizeConfig, toValue: 'auto', property: sizeProperty },
        ]),
      },
      collapse: {
        ...Animated.toFramerTransition([
          animateOutOpacityConfig,
          { ...animateOutMaxSizeConfig, property: sizeProperty },
        ]),
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
