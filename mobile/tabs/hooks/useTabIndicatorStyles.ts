import { TabIndicatorProps } from '@cbhq/cds-common';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common/animation/tabs';
import { Animated } from 'react-native';
import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';

const buildTransformStyle = (translateX: Animated.Value) => ({
  transform: [{ translateX }],
});
export const useTabIndicatorStyles = ({
  width,
  xPosition,
}: Pick<TabIndicatorProps, 'width' | 'xPosition'>) => {
  const animatedWidth = useAnimatedTransition(width, animateTabIndicatorBaseSpec);
  const widthStyle = buildTransformStyle(animatedWidth);

  const animatedPosition = useAnimatedTransition(xPosition, animateTabIndicatorBaseSpec);
  const positionStyle = buildTransformStyle(animatedPosition);

  return { widthStyle, positionStyle };
};
