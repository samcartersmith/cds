import React, { FunctionComponent, memo, useCallback, useRef } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native';
import { ChartMinMaxProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { usePalette } from '../../hooks/usePalette';
import { TextLabel2, useTypographyStyles } from '../../typography';

import { useLayout } from '../../hooks/useLayout';
import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { useMinMaxTransform } from './useMinMaxTransform';

type ChartMinMaxContentProps = {
  x: number;
};

export const ChartMinMax: FunctionComponent<ChartMinMaxProps> = memo(
  ({ formatAmount, dataPoint, xFunction }) => {
    const colors = usePalette();
    const { minMaxOpacity } = useChartContext();
    const { chartMinMaxLabelHeight } = useChartConstants({});

    return (
      <Animated.View
        style={[
          styles.outer,
          {
            opacity: minMaxOpacity,
            backgroundColor: colors.background,
            height: chartMinMaxLabelHeight,
          },
        ]}
        pointerEvents="none"
      >
        {!!dataPoint && (
          <ChartMinMaxContent x={xFunction(dataPoint.date)}>
            {formatAmount(dataPoint.value)}
          </ChartMinMaxContent>
        )}
      </Animated.View>
    );
  },
);

const ChartMinMaxContent: FunctionComponent<ChartMinMaxContentProps> = memo(({ x, children }) => {
  const colors = usePalette();
  const lineHeight = {
    label2: useTypographyStyles('label2').lineHeight,
  };
  const [minMaxLayout, onMinMaxLayout] = useLayout();
  const opacity = useRef(new Animated.Value(0)).current;
  const transform = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  useMinMaxTransform({ minMaxLayout, x, transform, opacity });

  // Only do the layout if there is a new child.
  // This prevents jitter in the case where children is
  // set to undefined, then returned to the previous value,
  // as is the case for privacy mode (where we hide the value)
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!children) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return onMinMaxLayout(event);
    },
    [onMinMaxLayout, children],
  );

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.caption,
        {
          height: lineHeight.label2,
          opacity,
          transform: transform.getTranslateTransform(),
        },
      ]}
    >
      <TextLabel2
        color="foregroundMuted"
        onLayout={onLayout}
        spacing={0}
        dangerouslySetStyle={[styles.caption, { backgroundColor: colors.background }]}
      >
        {children}
      </TextLabel2>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
  },
  caption: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
