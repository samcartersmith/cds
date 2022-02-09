import { TabIndicatorProps } from '@cbhq/cds-common';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common/animation/tabs';
import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const useTabIndicatorStyles = ({
  width,
  xPosition,
}: Pick<TabIndicatorProps, 'width' | 'xPosition'>) => {
  const animatedWidth = useAnimatedTransition(width, animateTabIndicatorBaseSpec);
  const widthStyle = { transform: [{ translateX: animatedWidth }] };

  const animatedPosition = useAnimatedTransition(xPosition, animateTabIndicatorBaseSpec);
  const positionStyle = { transform: [{ translateX: animatedPosition }] };

  return { widthStyle, positionStyle };
};
