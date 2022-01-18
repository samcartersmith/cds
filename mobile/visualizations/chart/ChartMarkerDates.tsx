import React, { FunctionComponent, memo, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import times from 'lodash/times';
import { ChartMarkerDatesProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useDateLookup } from '@cbhq/cds-common/visualizations/useDateLookup';

import { usePalette } from '../../hooks/usePalette';
import { TextLabel2 } from '../../typography';
import { useLayout } from '../../hooks/useLayout';

import { useChartContext } from './ChartProvider';

const numberOfLabels = 5;

function ChartMarkerDatesWithGeneric<Period extends string>({
  formatDate,
  selectedPeriod,
  getMarker,
}: ChartMarkerDatesProps<Period>) {
  const { markerOpacity } = useChartContext();
  const colors = usePalette();
  const getFormattedDate = useDateLookup({
    getMarker,
    formatDate,
    selectedPeriod,
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: markerOpacity,
          backgroundColor: colors.background,
        },
      ]}
      pointerEvents="none"
    >
      {times(numberOfLabels).map((_, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <ChartMarkerDate key={i} getFormattedDate={getFormattedDate} />;
      })}
    </Animated.View>
  );
}

export const ChartMarkerDates = memo(
  ChartMarkerDatesWithGeneric,
) as typeof ChartMarkerDatesWithGeneric;

const ChartMarkerDate: FunctionComponent<{
  getFormattedDate: (xPosition: number) => string;
}> = memo(({ getFormattedDate }) => {
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
    width: '100%',
    zIndex: 1,
  },
  label: {
    width: `${100 / numberOfLabels}%`,
  },
});
