import { CSSProperties, useMemo } from 'react';
import {
  animateInMaxSizeConfig,
  animateInOpacityConfig,
  animateOutMaxSizeConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/collapsible';

import { useMotionProps } from '../motion/useMotionProps';

import type { CollapsibleProps } from './Collapsible';

export const useCollapsibleMotionProps = ({
  collapsed,
  direction = 'vertical',
  dangerouslyDisableOverflowHidden,
}: Pick<CollapsibleProps, 'collapsed' | 'direction' | 'dangerouslyDisableOverflowHidden'>) => {
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

  return useMotionProps({
    enterConfigs: [
      animateInOpacityConfig[direction],
      { ...animateInMaxSizeConfig[direction], toValue: 'auto' },
    ],
    exitConfigs: {
      tokens: [animateOutOpacityConfig[direction], animateOutMaxSizeConfig[direction]],
      // prevent focus on collapsed element
      transitionEnd: { visibility: 'hidden' },
    },
    style: defaultStyle,
    // prevent animation on mount
    initial: false,
    animate: collapsed ? 'exit' : 'enter',
  });
};
