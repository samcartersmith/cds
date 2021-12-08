import React, { FunctionComponent, memo, useCallback, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import times from 'lodash/times';
import { ChartFormatDate, ChartGetMarker } from '@cbhq/cds-common/types';
import { usePalette } from '../../hooks/usePalette';
import { TextLabel2 } from '../../typography';
import { useLayout } from '../../hooks/useLayout';

import { useChartContext } from './ChartProvider';

const numberOfLabels = 5;

type ChartMarkerDatesProps<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
};

type GetFormattedDateParams<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
};

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

export const ChartMarkerDate: FunctionComponent<{
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

function useDateLookup<Period extends string>({
  getMarker,
  formatDate,
  selectedPeriod,
}: GetFormattedDateParams<Period>) {
  return useCallback(
    (xPos: number) => {
      const { date } = getMarker(xPos) ?? {};
      if (!date) {
        return '';
      }
      return formatDate(date, selectedPeriod);
    },
    [formatDate, getMarker, selectedPeriod],
  );
}

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
