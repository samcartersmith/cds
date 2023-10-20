import React, { FunctionComponent, memo, useCallback, useRef } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native';
import { SparklineInteractiveMinMaxProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useLayout } from '../../hooks/useLayout';
import { usePalette } from '../../hooks/usePalette';
import { TextLabel2, useTypographyStyles } from '../../typography';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useMinMaxTransform } from './useMinMaxTransform';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

type SparklineInteractiveMinMaxContentProps = {
  x: number;
};

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-mobile-visualization.
 */
export const SparklineInteractiveMinMax: FunctionComponent<
  React.PropsWithChildren<SparklineInteractiveMinMaxProps>
> = memo(({ formatMinMaxLabel, dataPoint, xFunction }) => {
  const colors = usePalette();
  const { minMaxOpacity } = useSparklineInteractiveContext();
  const { SparklineInteractiveMinMaxLabelHeight } = useSparklineInteractiveConstants({});

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.outer,
        {
          opacity: minMaxOpacity,
          backgroundColor: colors.background,
          height: SparklineInteractiveMinMaxLabelHeight,
        },
      ]}
    >
      {!!dataPoint && (
        <SparklineInteractiveMinMaxContent x={xFunction(dataPoint.date)}>
          {formatMinMaxLabel(dataPoint.value)}
        </SparklineInteractiveMinMaxContent>
      )}
    </Animated.View>
  );
});

const SparklineInteractiveMinMaxContent: FunctionComponent<
  React.PropsWithChildren<SparklineInteractiveMinMaxContentProps>
> = memo(({ x, children }) => {
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
        dangerouslySetStyle={[styles.caption, { backgroundColor: colors.background }]}
        onLayout={onLayout}
        spacing={0}
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
