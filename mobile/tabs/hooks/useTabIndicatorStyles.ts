import { TabIndicatorProps } from '@cbhq/cds-common';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common/animation/tabs';
import { Animated } from 'react-native';
import { useAnimatedValue } from '../../hooks/useAnimatedValue';

const buildTransformStyle = (translateX: Animated.Value) => ({
  transform: [{ translateX }],
});
export const useTabIndicatorStyles = ({
  width,
  xPosition,
}: Pick<TabIndicatorProps, 'width' | 'xPosition'>) => {
  const animatedWidth = useAnimatedValue(width, animateTabIndicatorBaseSpec);
  const widthStyle = buildTransformStyle(animatedWidth);

  const animatedPosition = useAnimatedValue(xPosition, animateTabIndicatorBaseSpec);
  const positionStyle = buildTransformStyle(animatedPosition);

  return { widthStyle, positionStyle };
};
