import React, { memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { noop } from '@cbhq/cds-utils';
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

import { ChartAnimatedPath } from './ChartAnimatedPath';
import { ChartLineVertical } from './ChartLineVertical';
import { ChartMarkerDates } from './ChartMarkerDates';
import { ChartMinMax } from './ChartMinMax';
import { ChartPanGestureHandler } from './ChartPanGestureHandler';
import { ChartPeriodSelector } from './ChartPeriodSelector';
import { ChartProvider, useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { useUpdateChartHeader } from './useUpdateChartHeader';

export type SparklineContainerProps<Period extends string> = {
  /**
   * Chart data bucketed by Period. Period is a string key
   */
  data: Record<Period, ChartData>;

  /**
   * A list of periods that th chart will use. label is what is shown in the bottom of the chart and the value is the key.
   */
  periods: { label: string; value: Period }[];

  /**
   * default period value that the chart will use
   */
  defaultPeriod: Period;

  /**
   * Callback when the user selects a new period.
   * @param period
   */
  onPeriodChanged?: (period: Period) => void;

  /**
   * Callback when the user starts scrubbing
   */
  onScrubStart?: () => void;

  /**
   * Callback when a user finishes scrubbing
   */
  onScrubEnd?: () => void;

  /**
   * Calbback used when the user is scrubbing. This will be called for every data point change.
   * @param params
   */
  onScrub?: (params: ChartScrubParams<Period>) => void;

  /**
   * Disables the scrub user interaction from the chart
   *
   * @default false
   */
  disableScrubbing?: boolean;

  /**
   * function used to format the amount of money used in the minMaxLabel
   */
  formatAmount: ChartFormatAmount;

  /**
   * function used to format the date that is shown in the bottom of the chart as the user scrubs
   */
  formatDate: ChartFormatDate<Period>;

  /**
   * Color of the line
   *
   * @default primary palette color
   */
  strokeColor?: string;

  /**
   * Fallback shown in the chart when data is not available. This is usually a loading state.
   */
  fallback?: ReactNode;

  /**
   * Show the chart in compact height
   *
   * @default false
   */
  compact?: boolean;

  /**
   * Hides the min and max label
   *
   * @default false
   */
  hideMinMaxLabel?: boolean;

  /**
   * Hides the period selector at the bottom of the chart
   *
   * @default false
   */
  hidePeriodSelector?: boolean;
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

type SparklineContainerContentProps<Period extends string> = Omit<
  SparklineContainerProps<Period>,
  'compact'
>;

function SparklineContainerWithGeneric<Period extends string>({
  compact,
  ...props
}: SparklineContainerProps<Period>) {
  return (
    <ChartProvider compact={compact}>
      <SparklineContainerContent {...props} />
    </ChartProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineContainer = memo(
  SparklineContainerWithGeneric,
) as typeof SparklineContainerWithGeneric;

function SparklineContainerContentWithGeneric<Period extends string>({
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
  hideMinMaxLabel = false,
  hidePeriodSelector = false,
  disableScrubbing = false,
}: SparklineContainerContentProps<Period>) {
  const { isFallbackVisible, showFallback, chartOpacity, minMaxOpacity, compact } =
    useChartContext();
  const colors = usePalette();
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
    useChartConstants({ compact });

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
      }}
    >
      <ChartPanGestureHandler
        onScrubEnd={onScrubEnd}
        onScrubStart={onScrubStart}
        disabled={disableScrubbing}
      >
        {!hideMinMaxLabel && (
          <ChartMinMax formatAmount={formatAmount} dataPoint={max} xFunction={xFunction} />
        )}
        <View style={chartDimensionStyles}>
          {!!isFallbackVisible && !compact && (
            <View style={StyleSheet.absoluteFill}>{fallback}</View>
          )}
          <Animated.View style={{ opacity: chartOpacity }}>
            {!!hasData && !!path && (
              <>
                <ChartLineVertical />
                <ChartAnimatedPath d={path} color={color} selectedPeriod={selectedPeriod} />
              </>
            )}
          </Animated.View>
        </View>
        {!hideMinMaxLabel && (
          <ChartMinMax formatAmount={formatAmount} dataPoint={min} xFunction={xFunction} />
        )}
      </ChartPanGestureHandler>
      {!hidePeriodSelector && (
        <BelowChart
          color={color}
          formatDate={formatDate}
          getMarker={getMarker}
          periods={periods}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={updatePeriod}
        />
      )}
    </Animated.View>
  );
}

const SparklineContainerContent = memo(
  SparklineContainerContentWithGeneric,
) as typeof SparklineContainerContentWithGeneric;

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
