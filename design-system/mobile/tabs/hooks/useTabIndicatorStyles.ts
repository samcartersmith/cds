import { TabIndicatorProps } from '@cbhq/cds-common';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common/animation/tabs';
import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const useTabIndicatorStyles = ({ width, x }: Pick<TabIndicatorProps, 'width' | 'x'>) => {
  const animatedWidth = useAnimatedTransition(width, animateTabIndicatorBaseSpec);
  const widthStyle = { transform: [{ translateX: animatedWidth }] };

  const animatedX = useAnimatedTransition(x, animateTabIndicatorBaseSpec);
  const xStyle = { transform: [{ translateX: animatedX }] };

  return { widthStyle, xStyle };
};
