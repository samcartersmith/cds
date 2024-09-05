import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { sparklinePalette } from '@cbhq/cds-common/palette/constants';
import {
  ChartDataPoint,
  ChartFormatAmount,
  ChartFormatDate,
  ChartGetMarker,
  ChartScrubParams,
  SpacingScale,
} from '@cbhq/cds-common/types';
import {
  SparklineInteractiveBaseProps,
  SparklineInteractiveDefaultFallback,
  SparklineInteractiveHoverDateRefProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { minMax } from '@cbhq/cds-common/utils/chart';
import { useSparklineCoordinates } from '@cbhq/cds-common/visualizations/useSparklineCoordinates';
import { chartFallbackNegative, chartFallbackPositive } from '@cbhq/cds-lottie-files';
import { Lottie } from '@cbhq/cds-mobile/animation';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { useScreenReaderStatus } from '@cbhq/cds-mobile/hooks/useScreenReaderStatus';
import { useSpacingScale } from '@cbhq/cds-mobile/hooks/useSpacingScale';
import { Box } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
import { emptyArray, noop } from '@cbhq/cds-utils';

import { SparklineAccessibleView } from './SparklineAccessibleView';
import { SparklineInteractiveHoverDate } from './SparklineInteractiveHoverDate';
import { SparklineInteractiveLineVertical } from './SparklineInteractiveLineVertical';
import { SparklineInteractiveMarkerDates } from './SparklineInteractiveMarkerDates';
import { SparklineInteractiveMinMax } from './SparklineInteractiveMinMax';
import { SparklineInteractivePanGestureHandler } from './SparklineInteractivePanGestureHandler';
import { SparklineInteractivePaths } from './SparklineInteractivePaths';
import { SparklineInteractivePeriodSelector } from './SparklineInteractivePeriodSelector';
import {
  SparklineInteractiveProvider,
  useSparklineInteractiveContext,
} from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export * from '@cbhq/cds-common/types/Chart';
export * from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

// We override line palette since default line color is a bit too dark.
// Changing to gray20 more closely matches the line color currently used in production
const DefaultFallback = memo(({ fallbackType }: SparklineInteractiveDefaultFallback) => {
  const source = fallbackType === 'negative' ? chartFallbackNegative : chartFallbackPositive;
  return (
    <ThemeProvider name="sparkline-fallback" palette={sparklinePalette}>
      <Box alignItems="center" justifyContent="center">
        <Lottie autoplay loop height="100%" source={source} />
      </Box>
    </ThemeProvider>
  );
});

function defaultFormatMinMaxLabel(value: string | number) {
  return `${value}`;
}

type BelowChartProps<Period extends string> = {
  color: string;
  formatDate: ChartFormatDate<Period>;
  getMarker: ChartGetMarker;
  periods: { label: string; value: Period }[];
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  timePeriodGutter?: SpacingScale;
};

function BelowChartWithGeneric<Period extends string>({
  color,
  formatDate,
  getMarker,
  periods,
  selectedPeriod,
  setSelectedPeriod,
  timePeriodGutter,
}: BelowChartProps<Period>) {
  const spacing = useSpacingScale();

  const style = useMemo(() => {
    if (timePeriodGutter) {
      return {
        paddingHorizontal: spacing[timePeriodGutter],
      };
    }
    return {};
  }, [timePeriodGutter, spacing]);

  return (
    <View style={style}>
      <SparklineInteractiveMarkerDates
        formatDate={formatDate}
        getMarker={getMarker}
        selectedPeriod={selectedPeriod}
        timePeriodGutter={timePeriodGutter}
      />
      <SparklineInteractivePeriodSelector
        color={color}
        periods={periods}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
    </View>
  );
}

const BelowChart = memo(BelowChartWithGeneric) as typeof BelowChartWithGeneric;

function SparklineInteractiveContentWithGeneric<Period extends string>({
  data,
  periods,
  defaultPeriod,
  onPeriodChanged,
  strokeColor,
  onScrub = noop,
  onScrubStart = noop,
  onScrubEnd = noop,
  formatMinMaxLabel = defaultFormatMinMaxLabel,
  formatDate,
  fallback = null,
  hideMinMaxLabel = false,
  hidePeriodSelector = false,
  disableScrubbing = false,
  fill = true,
  yAxisScalingFactor = 1.0,
  formatHoverDate,
  headerNode,
  fallbackType = 'positive',
  disableHorizontalPadding = false,
  hoverData,
  timePeriodGutter,
  allowOverflowGestures,
}: SparklineInteractiveMobileProps<Period>) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const { isFallbackVisible, showFallback, chartOpacity, minMaxOpacity, compact } =
    useSparklineInteractiveContext();
  const color = strokeColor;
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const chartHoverTextInputRef = useRef<SparklineInteractiveHoverDateRefProps<Period> | null>(null);
  const palette = usePalette();
  const isScreenReaderEnabled = useScreenReaderStatus();

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

  const chartOpacityStyle = useMemo(() => {
    return { opacity: chartOpacity };
  }, [chartOpacity]);

  useEffect(() => {
    // If there is no data for selected period show fallback loader
    if (isObject(data) && !data[selectedPeriod]?.length && !isFallbackVisible) {
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
    useSparklineInteractiveConstants({ compact });

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

  const handleScrubStart = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(true);
    }

    onScrubStart?.();
  }, [hoverData, onScrubStart]);

  const handleScrubEnd = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(false);
    }

    onScrubEnd?.();
  }, [hoverData, onScrubEnd]);

  let header;
  if (headerNode) {
    header = <Box spacingBottom={2}>{headerNode}</Box>;
  }

  const style: ViewStyle = useMemo(() => {
    return {};
  }, []);
  if (!disableHorizontalPadding) {
    style.paddingHorizontal = chartHorizontalGutter;
  }

  return (
    <Animated.View style={style}>
      {header}
      <SparklineInteractivePanGestureHandler
        allowOverflowGestures={allowOverflowGestures}
        disabled={disableScrubbing}
        getMarker={getMarker}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
        onScrubStart={handleScrubStart}
        selectedPeriod={selectedPeriod}
      >
        {!!formatHoverDate && (
          <SparklineInteractiveHoverDate
            ref={chartHoverTextInputRef}
            formatHoverDate={formatHoverDate}
            shouldTakeUpHeight={hideMinMaxLabel}
          />
        )}
        {!hideMinMaxLabel && (
          <SparklineInteractiveMinMax
            dataPoint={max}
            formatMinMaxLabel={formatMinMaxLabel}
            xFunction={xFunction}
          />
        )}
        <View style={chartDimensionStyles}>
          {isScreenReaderEnabled && (
            <SparklineAccessibleView data={data} selectedPeriod={selectedPeriod} />
          )}
          {!!isFallbackVisible && (
            <View style={StyleSheet.absoluteFill}>
              {fallback ?? <DefaultFallback fallbackType={fallbackType} />}
            </View>
          )}
          <Animated.View style={chartOpacityStyle}>
            {!!hasData && !!path && (
              <>
                <SparklineInteractiveLineVertical
                  color={hoverData ? palette.lineHeavy : color}
                  showHoverDate={!!formatHoverDate}
                />
                <SparklineInteractivePaths
                  area={area}
                  compact={compact}
                  fill={fill}
                  hoverData={hoverData}
                  path={path}
                  selectedPeriod={selectedPeriod}
                  showHoverData={isScrubbing}
                  strokeColor={color}
                  yAxisScalingFactor={yAxisScalingFactor}
                />
              </>
            )}
          </Animated.View>
        </View>
        {!hideMinMaxLabel && (
          <SparklineInteractiveMinMax
            dataPoint={min}
            formatMinMaxLabel={formatMinMaxLabel}
            xFunction={xFunction}
          />
        )}
      </SparklineInteractivePanGestureHandler>
      {!hidePeriodSelector && (
        <BelowChart
          color={color}
          formatDate={formatDate}
          getMarker={getMarker}
          periods={periods}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={updatePeriod}
          timePeriodGutter={timePeriodGutter}
        />
      )}
    </Animated.View>
  );
}

const SparklineInteractiveContent = memo(
  SparklineInteractiveContentWithGeneric,
) as typeof SparklineInteractiveContentWithGeneric;

export type SparklineInteractiveMobileProps<Period extends string> =
  SparklineInteractiveBaseProps<Period> & {
    /**
     * Hides the min and max label
     *
     * @default false
     */
    hideMinMaxLabel?: boolean;

    /**
     * function used to format the amount of money used in the minMaxLabel
     */
    formatMinMaxLabel?: ChartFormatAmount;

    /**
     * The amount of padding to apply to the left and right of the chart. The chart width is calculated by (screen width - 2* gutter).
     *
     * @default 3
     */
    gutter?: SpacingScale;

    /**
     * The chart applies horizontal padding by default which is specified by the gutter.
     * If the chart is placed in a container with padding then you can disable horizontal padding and set the gutter
     * to match the container padding.
     *
     */
    disableHorizontalPadding?: boolean;
    /**
     * Allows continuous gestures on the Sparkline chart to continue outside the bounds of the chart element.
     */
    allowOverflowGestures?: boolean;
  };

function SparklineInteractiveWithGeneric<Period extends string>({
  compact,
  gutter,
  ...props
}: SparklineInteractiveMobileProps<Period>) {
  return (
    <SparklineInteractiveProvider compact={compact} gutter={gutter}>
      <SparklineInteractiveContent {...props} />
    </SparklineInteractiveProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineInteractive = memo(
  SparklineInteractiveWithGeneric,
) as typeof SparklineInteractiveWithGeneric;
