import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { emptyArray, noop } from '@cbhq/cds-utils';
import {
  ChartDataPoint,
  ChartFormatAmount,
  ChartFormatDate,
  ChartGetMarker,
  ChartScrubParams,
} from '@cbhq/cds-common/types';
import { useSparklineCoordinates } from '@cbhq/cds-common/visualizations/useSparklineCoordinates';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import {
  ChartHoverDateRefProps,
  InteractiveSparklineBaseProps,
} from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import { minMax } from '@cbhq/cds-common/utils/chart';
import { chartFallbackPositive } from '@cbhq/cds-lottie-files';

import { ChartAnimatedPath } from './ChartAnimatedPath';
import { ChartLineVertical } from './ChartLineVertical';
import { ChartMarkerDates } from './ChartMarkerDates';
import { ChartMinMax } from './ChartMinMax';
import { ChartPanGestureHandler } from './ChartPanGestureHandler';
import { ChartPeriodSelector } from './ChartPeriodSelector';
import { ChartProvider, useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { useUpdateChartHeader } from './useUpdateChartHeader';
import { ThemeProvider } from '../../system';
import { Lottie } from '../../animation';
import { ChartHoverDate } from './ChartHoverDate';
import { Box } from '../../layout';

// We override line palette since default line color is a bit too dark.
// Changing to gray20 more closely matches the line color currently used in production
const customPalette = { line: 'gray20' } as const;
const DefaultFallback = memo(() => {
  return (
    <ThemeProvider palette={customPalette}>
      <Lottie autoplay source={chartFallbackPositive} loop />
    </ThemeProvider>
  );
});

type InteractiveSparklineMobileProps<Period extends string> =
  InteractiveSparklineBaseProps<Period> & {
    /**
     * Hides the min and max label
     *
     * @default false
     */
    hideMinMaxLabel?: boolean;

    /**
     * function used to format the amount of money used in the minMaxLabel
     */
    formatAmount: ChartFormatAmount;
  };

function InteractiveSparklineWithGeneric<Period extends string>({
  compact,
  ...props
}: InteractiveSparklineMobileProps<Period>) {
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
  formatHoverDate,
  headerNode,
}: InteractiveSparklineMobileProps<Period>) {
  const { isFallbackVisible, showFallback, chartOpacity, minMaxOpacity, compact } =
    useChartContext();
  const color = strokeColor;
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const hasFrontier = useFeatureFlag('frontierSparkline');
  const chartHoverTextInputRef = useRef<ChartHoverDateRefProps<Period> | null>(null);

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
  const [min, max] = useMemo(() => {
    return minMax<ChartDataPoint>(dataForPeriod, (d: ChartDataPoint) => d.value);
  }, [dataForPeriod]);

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

  const handleScrub = useCallback(
    (params: ChartScrubParams<Period>) => {
      chartHoverTextInputRef.current?.update(params);
      onScrub?.(params);
    },
    [onScrub],
  );

  useUpdateChartHeader({
    getMarker,
    onScrub: handleScrub,
    selectedPeriod,
  });

  let header;
  if (headerNode) {
    header = <Box spacingBottom={2}>{headerNode}</Box>;
  }

  return (
    <Animated.View
      style={{
        paddingHorizontal: chartHorizontalGutter,
      }}
    >
      {header}
      <ChartPanGestureHandler
        onScrubEnd={onScrubEnd}
        onScrubStart={onScrubStart}
        disabled={disableScrubbing}
      >
        {!!formatHoverDate && (
          <ChartHoverDate
            shouldTakeUpHeight={hideMinMaxLabel}
            formatHoverDate={formatHoverDate}
            ref={chartHoverTextInputRef}
          />
        )}
        {!hideMinMaxLabel && (
          <ChartMinMax formatAmount={formatAmount} dataPoint={max} xFunction={xFunction} />
        )}
        <View style={chartDimensionStyles}>
          {!!isFallbackVisible && !compact && (
            <View style={StyleSheet.absoluteFill}>{fallback ?? <DefaultFallback />}</View>
          )}
          <Animated.View style={{ opacity: chartOpacity }}>
            {!!hasData && !!path && (
              <>
                <ChartLineVertical color={color} showHoverDate={!!formatHoverDate} />
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
