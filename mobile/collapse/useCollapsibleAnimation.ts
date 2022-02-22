import { useEffect } from 'react';
import { Animated } from 'react-native';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import type { CollapseBaseProps } from '@cbhq/cds-common/types';

type CollapsibleAnimation = {
  animateIn: Animated.CompositeAnimation;
  animateOut: Animated.CompositeAnimation;
} & Pick<CollapseBaseProps, 'expanded'>;

export const useCollapsibleAnimation = ({
  expanded,
  animateIn,
  animateOut,
}: CollapsibleAnimation) => {
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
