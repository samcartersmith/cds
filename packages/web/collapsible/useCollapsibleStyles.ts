import { CSSProperties, useMemo } from 'react';
import { Variants } from 'framer-motion';
import {
  animateInMaxSizeConfig,
  animateInOpacityConfig,
  animateOutMaxSizeConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/collapsible';

import { Animated } from '../animation/Animated';

import type { CollapsibleProps } from './Collapsible';

export const useCollapsibleStyles = ({
  collapsed,
  direction = 'vertical',
  dangerouslyDisableOverflowHidden,
}: Pick<CollapsibleProps, 'collapsed' | 'direction' | 'dangerouslyDisableOverflowHidden'>) => {
  const state = collapsed ? 'collapsed' : 'expanded';

  const defaultStyle = useMemo(() => {
    // override visibility: hidden
    const styles = { visibility: 'visible' as CSSProperties['visibility'] };

    if (dangerouslyDisableOverflowHidden) {
      return styles;
    }
    return {
      ...styles,
      // need this for enter animation to have correct masking effect
      overflow: 'hidden',
    };
  }, [dangerouslyDisableOverflowHidden]);

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
        transitionEnd: { visibility: 'hidden' },
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
    [state, variants, defaultStyle],
  );
};
