import { TabIndicatorProps } from '@cbhq/cds-common2';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common2/animation/tabs';

import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';

export const useTabIndicatorStyles = ({ width, x }: Pick<TabIndicatorProps, 'width' | 'x'>) => {
  const animatedWidth = useAnimatedTransition(width, animateTabIndicatorBaseSpec);
  const widthStyle = { transform: [{ translateX: animatedWidth }] };

  const animatedX = useAnimatedTransition(x, animateTabIndicatorBaseSpec);
  const xStyle = { transform: [{ translateX: animatedX }] };

  return { widthStyle, xStyle };
};
