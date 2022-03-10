import { useMemo } from 'react';
import { Variants } from 'framer-motion';
import type { CollapsibleBaseProps } from '@cbhq/cds-common';
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

export const useCollapsibleStyles = (
  collapsed: boolean,
  direction: CollapsibleBaseProps['direction'],
) => {
  const state = collapsed ? 'collapsed' : 'expanded';
  const variants: Variants = useMemo(() => {
    const sizeProperty = direction === 'horizontal' ? 'width' : 'height';

    return {
      expanded: {
        ...Animated.toFramerTransition([
          animateInOpacityConfig,
          { ...animateInMaxSizeConfig, toValue: 'auto', property: sizeProperty },
        ]),
      },
      collapsed: {
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
