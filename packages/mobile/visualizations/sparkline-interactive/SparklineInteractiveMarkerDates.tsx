import React, { FunctionComponent, memo, useMemo } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import times from 'lodash/times';
import { SparklineInteractiveMarkerDatesProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useDateLookup } from '@cbhq/cds-common/visualizations/useDateLookup';

import { useLayout } from '../../hooks/useLayout';
import { usePalette } from '../../hooks/usePalette';
import { useSpacingScale } from '../../hooks/useSpacingScale';
import { TextLabel2 } from '../../typography';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

const numberOfLabels = 5;

function SparklineInteractiveMarkerDatesWithGeneric<Period extends string>({
  formatDate,
  selectedPeriod,
  getMarker,
  timePeriodGutter,
}: SparklineInteractiveMarkerDatesProps<Period>) {
  const spacing = useSpacingScale();
  const { markerOpacity } = useSparklineInteractiveContext();
  const colors = usePalette();
  const getFormattedDate = useDateLookup({
    getMarker,
    formatDate,
    selectedPeriod,
  });

  const paddingHorizontalStyle: ViewStyle = {};
  if (timePeriodGutter) {
    paddingHorizontalStyle.paddingHorizontal = spacing[timePeriodGutter];
  }

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: markerOpacity,
          backgroundColor: colors.background,
        },
        paddingHorizontalStyle,
      ]}
      pointerEvents="none"
    >
      {times(numberOfLabels).map((_, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <SparklineInteractiveMarkerDate key={i} getFormattedDate={getFormattedDate} />;
      })}
    </Animated.View>
  );
}

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-mobile-sparkline.
 */
export const SparklineInteractiveMarkerDates = memo(
  SparklineInteractiveMarkerDatesWithGeneric,
) as typeof SparklineInteractiveMarkerDatesWithGeneric;

const SparklineInteractiveMarkerDate: FunctionComponent<
  React.PropsWithChildren<{
    getFormattedDate: (xPosition: number) => string;
  }>
> = memo(({ getFormattedDate }) => {
  const [label, onLayout] = useLayout();
  const x = useMemo(() => {
    return label.x + label.width / 2;
  }, [label.width, label.x]);

  return (
    <TextLabel2
      color="foregroundMuted"
      align="center"
      spacingTop={3}
      onLayout={onLayout}
      dangerouslySetStyle={styles.label}
    >
      {getFormattedDate(x)}
    </TextLabel2>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  label: {
    width: `${100 / numberOfLabels}%`,
  },
});
