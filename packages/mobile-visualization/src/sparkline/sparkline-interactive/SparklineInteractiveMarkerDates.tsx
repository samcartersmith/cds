import React, { FunctionComponent, memo, useMemo } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import times from 'lodash/times';
import { SparklineInteractiveMarkerDatesProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useDateLookup } from '@cbhq/cds-common/visualizations/useDateLookup';
import { useLayout } from '@cbhq/cds-mobile/hooks/useLayout';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { useSpacingScale } from '@cbhq/cds-mobile/hooks/useSpacingScale';
import { TextLabel2 } from '@cbhq/cds-mobile/typography';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

const numberOfLabels = 5;

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
      align="center"
      color="foregroundMuted"
      dangerouslySetStyle={styles.label}
      onLayout={onLayout}
      spacingTop={3}
    >
      {getFormattedDate(x)}
    </TextLabel2>
  );
});

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

  const paddingHorizontalStyle = useMemo(() => {
    const localStyle: ViewStyle = {};
    if (timePeriodGutter) {
      localStyle.paddingHorizontal = spacing[timePeriodGutter];
    }

    return localStyle;
  }, [spacing, timePeriodGutter]);

  const rootStyle = useMemo(() => {
    return {
      ...styles.wrapper,
      opacity: markerOpacity,
      backgroundColor: colors.background,
      ...paddingHorizontalStyle,
    };
  }, [colors.background, markerOpacity, paddingHorizontalStyle]);

  return (
    <Animated.View pointerEvents="none" style={rootStyle}>
      {times(numberOfLabels).map((_, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <SparklineInteractiveMarkerDate key={i} getFormattedDate={getFormattedDate} />;
      })}
    </Animated.View>
  );
}

export const SparklineInteractiveMarkerDates = memo(
  SparklineInteractiveMarkerDatesWithGeneric,
) as typeof SparklineInteractiveMarkerDatesWithGeneric;
