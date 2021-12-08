import { useEffect } from 'react';
import { Animated, LayoutRectangle } from 'react-native';
import { durations } from '@cbhq/cds-common/tokens/motion';

import { useChartConstants } from './useChartConstants';

type MinMaxTransformParams = {
  minMaxLayout: LayoutRectangle;
  x: number;
  transform: Animated.ValueXY;
  opacity: Animated.Value;
};

export function useMinMaxTransform({ minMaxLayout, x, transform, opacity }: MinMaxTransformParams) {
  const { height, width } = minMaxLayout;
  const { chartMinMaxLabelHeight, chartWidth } = useChartConstants({});

  useEffect(() => {
    // If onLayout has not finished we don't want to show min/max
    // or else it will abruptly change positions
    if (height === 0 && width === 0) {
      opacity.setValue(0);
      return;
    }
    // Position min or max at center of the desired x coordinate when possible.
    // If this is not possible, ensure that it's never positioned outside of chart container.
    // This means the x transform should never be less than 0 or greater than chartWidth - labelWidth
    const idealX = x - width / 2;
    const translateX = Math.round(Math.max(0, Math.min(idealX, chartWidth - width)));
    // Vertically center the min/max label within chartMinMaxLabelHeight.
    // This is the area between the vertical dotted line and the top or bottom
    // of sparkline where min/max is displayed
    const translateY = chartMinMaxLabelHeight / 2 - height / 2;

    transform.setValue({ x: translateX, y: translateY });
    Animated.timing(opacity, {
      toValue: 1,
      duration: durations.moderate1,
      useNativeDriver: true,
    }).start();
  }, [chartMinMaxLabelHeight, chartWidth, height, opacity, transform, width, x]);
}
