import React, { memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import noop from 'lodash/noop';
import {
  ChartData,
  ChartDataPoint,
  ChartFormatAmount,
  ChartFormatDate,
  ChartGetMarker,
  ChartScrubParams,
} from '@cbhq/cds-common/types';
import { useSparklineCoordinates } from '@cbhq/cds-common/visualizations/useSparklineCoordinates';
import { usePalette } from '../../hooks/usePalette';
import { useSpacingScale } from '../../hooks/useSpacingScale';

import { ChartAnimatedPath } from './ChartAnimatedPath';
import { ChartLineVertical } from './ChartLineVertical';
import { ChartMarkerDates } from './ChartMarkerDates';
import { ChartMinMax } from './ChartMinMax';
import { ChartPanGestureHandler } from './ChartPanGestureHandler';
import { ChartPeriodSelector } from './ChartPeriodSelector';
import { ChartProvider, useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { useUpdateChartHeader } from './useUpdateChartHeader';

export type ChartProps<Period extends string> = {
  data?: Record<Period, ChartData>;
  periods: { label: string; value: Period }[];
  defaultPeriod: Period;
  onPeriodChanged?: (period: Period) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  onScrub?: (params: ChartScrubParams<Period>) => void;
  formatAmount: ChartFormatAmount;
  formatDate: ChartFormatDate<Period>;
  strokeColor?: string;
  fallback?: ReactNode;
  compact?: boolean;
  isChartHeightExperiment?: boolean;
};

const emptyArray = [] as ChartData;
const minMax = (data: ChartData) => {
  let min: ChartDataPoint | undefined;
  let max: ChartDataPoint | undefined;

  for (let index = data.length; index >= 0; index -= 1) {
    const datum = data[index];
    if (min === undefined || datum.value < min.value) {
      min = datum;
    }
    if (max === undefined || datum.value > max.value) {
      max = datum;
    }
  }

  return [min, max];
};

type ChartContentProps<Period extends string> = Omit<ChartProps<Period>, 'compact'>;

function ChartWithGeneric<Period extends string>({
  compact,
  isChartHeightExperiment,
  ...props
}: ChartProps<Period>) {
  return (
    <ChartProvider compact={compact} isChartHeightExperiment={isChartHeightExperiment}>
      <ChartContent {...props} />
    </ChartProvider>
  );
}

export const Chart = memo(ChartWithGeneric) as typeof ChartWithGeneric;

function ChartContentWithGeneric<Period extends string>({
  data,
  periods,
  defaultPeriod,
  onPeriodChanged,
  strokeColor,
  onScrub = noop,
  onScrubStart = noop,
  onScrubEnd = noop,
  formatAmount,
  formatDate,
  fallback = null,
}: ChartContentProps<Period>) {
  const {
    isFallbackVisible,
    showFallback,
    chartOpacity,
    minMaxOpacity,
    compact,
    isChartHeightExperiment,
  } = useChartContext();
  const colors = usePalette();
  const spacing = useSpacingScale();
  const color = strokeColor ?? colors.primary;
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const dataForPeriod = useMemo(() => {
    if (!data) {
      return emptyArray;
    }
    return data[selectedPeriod] ?? emptyArray;
  }, [data, selectedPeriod]);

  // If dataForPeriod is empty we know that we are either loading
  // or backend returned bad data and we should show fallback UI.
  const hasData = dataForPeriod.length > 0;
  const [min, max] = minMax(dataForPeriod);

  useEffect(() => {
    // If there is no data for selected period show fallback loader
    if (isObject(data) && !data[selectedPeriod] && !isFallbackVisible) {
      showFallback();
    }
  }, [data, isFallbackVisible, selectedPeriod, showFallback]);

  const updatePeriod = useCallback(
    (period: Period) => {
      if (isObject(data) && period !== selectedPeriod) {
        // This can sometimes happen for newer assets which
        // will have their 'all' chart data be the same as
        // their 'year' chart data. In those cases we don't
        // want to animate out the min/max since we rely on
        // AnimatedChartPath to animate those components back in -
        // and AnimatedChartPath will not trigger an animation
        // if it's chartData is the same between re-renders
        if (!isEqual(data[period], data[selectedPeriod])) {
          minMaxOpacity.setValue(0);
        }
        setSelectedPeriod(period);
        onPeriodChanged?.(period);
      }
    },
    [data, selectedPeriod, onPeriodChanged, minMaxOpacity],
  );

  const { chartHorizontalGutter, chartDimensionStyles, chartWidth, chartHeight } =
    useChartConstants({ compact, isChartHeightExperiment });

  const { xFunction, path, getMarker } = useSparklineCoordinates({
    data: dataForPeriod,
    width: chartWidth,
    height: chartHeight,
  });
  useUpdateChartHeader({
    getMarker,
    onScrub,
    selectedPeriod,
  });

  return (
    <Animated.View
      style={{
        paddingHorizontal: chartHorizontalGutter,
        marginTop: spacing[2],
      }}
    >
      <ChartPanGestureHandler onScrubEnd={onScrubEnd} onScrubStart={onScrubStart}>
        <ChartMinMax formatAmount={formatAmount} dataPoint={max} xFunction={xFunction} />
        <View style={chartDimensionStyles}>
          {!!isFallbackVisible && !compact && (
            <View style={StyleSheet.absoluteFill}>{fallback}</View>
          )}
          <Animated.View style={{ opacity: chartOpacity }}>
            {!!hasData && !!path && (
              <>
                <ChartLineVertical isChartHeightExperiment={isChartHeightExperiment} />
                <ChartAnimatedPath d={path} color={color} selectedPeriod={selectedPeriod} />
              </>
            )}
          </Animated.View>
        </View>
        <ChartMinMax formatAmount={formatAmount} dataPoint={min} xFunction={xFunction} />
      </ChartPanGestureHandler>
      <BelowChart
        color={color}
        formatDate={formatDate}
        getMarker={getMarker}
        periods={periods}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={updatePeriod}
      />
    </Animated.View>
  );
}

export const ChartContent = memo(ChartContentWithGeneric) as typeof ChartContentWithGeneric;

type BelowChartProps<Period extends string> = {
  color: string;
  formatDate: ChartFormatDate<Period>;
  getMarker: ChartGetMarker;
  periods: { label: string; value: Period }[];
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
};

function BelowChartWithGeneric<Period extends string>({
  color,
  formatDate,
  getMarker,
  periods,
  selectedPeriod,
  setSelectedPeriod,
}: BelowChartProps<Period>) {
  return (
    <View>
      <ChartMarkerDates
        getMarker={getMarker}
        formatDate={formatDate}
        selectedPeriod={selectedPeriod}
      />
      <ChartPeriodSelector
        periods={periods}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        color={color}
      />
    </View>
  );
}

const BelowChart = memo(BelowChartWithGeneric) as typeof BelowChartWithGeneric;
