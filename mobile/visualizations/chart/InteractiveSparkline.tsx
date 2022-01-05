import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { noop } from '@cbhq/cds-utils';
import { ChartData, ChartDataPoint, ChartFormatDate, ChartGetMarker } from '@cbhq/cds-common/types';
import { useSparklineCoordinates } from '@cbhq/cds-common/visualizations/useSparklineCoordinates';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import { InteractiveSparklineBaseProps } from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
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

type InteractiveSparklineContentProps<Period extends string> = Omit<
  InteractiveSparklineBaseProps<Period>,
  'compact'
>;

function InteractiveSparklineWithGeneric<Period extends string>({
  compact,
  ...props
}: InteractiveSparklineBaseProps<Period>) {
  return (
    <ChartProvider compact={compact}>
      <InteractiveSparklineContent {...props} />
    </ChartProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const InteractiveSparkline = memo(
  InteractiveSparklineWithGeneric,
) as typeof InteractiveSparklineWithGeneric;

function InteractiveSparklineContentWithGeneric<Period extends string>({
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
  fill,
  yAxisScalingFactor = 1.0,
}: InteractiveSparklineContentProps<Period>) {
  const { isFallbackVisible, showFallback, chartOpacity, minMaxOpacity, compact } =
    useChartContext();
  const colors = usePalette();
  const color = strokeColor ?? colors.primary;
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const hasFrontier = useFeatureFlag('frontierSparkline');

  const shouldShowFill = typeof fill !== 'undefined' ? fill : hasFrontier;

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

  const { xFunction, path, area, getMarker } = useSparklineCoordinates({
    data: dataForPeriod,
    width: chartWidth,
    height: chartHeight,
    yAxisScalingFactor,
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
                <ChartAnimatedPath
                  d={path}
                  area={shouldShowFill ? area : undefined}
                  color={color}
                  selectedPeriod={selectedPeriod}
                  yAxisScalingFactor={yAxisScalingFactor}
                />
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

const InteractiveSparklineContent = memo(
  InteractiveSparklineContentWithGeneric,
) as typeof InteractiveSparklineContentWithGeneric;

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
