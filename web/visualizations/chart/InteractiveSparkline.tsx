import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { emptyArray, noop } from '@cbhq/cds-utils';
import { InteractiveSparklineBaseProps } from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import { VisualizationContainerDimension } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { chartCompactHeight, chartHeight } from '@cbhq/cds-common/tokens/sparkline';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import { useSparklineCoordinates } from '@cbhq/cds-common/visualizations/useSparklineCoordinates';
import { chartFallbackPositive } from '@cbhq/cds-lottie-files';

import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';

import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { ChartHoverDate } from './ChartHoverDate';
import { ChartProvider, useChartContext } from './ChartProvider';
import { VisualizationContainer } from '../VisualizationContainer';
import { Box } from '../../layout/Box';

import { useChartConstants } from './useChartConstants';
import { ChartScrubProvider } from './ChartScrubProvider';
import { ChartScrubHandler } from './ChartScrubHandler';
import { ChartLineVertical } from './ChartLineVertical';
import { ChartAnimatedPath } from './ChartAnimatedPath';
import { InnerChartProvider } from './InnerChartProvider';
import { ThemeProvider } from '../../system';
import { Lottie } from '../../animation';
import { ChartMarkerDates } from './ChartMarkerDates';
import { ChartPeriodSelector } from './ChartPeriodSelector';

const DefaultFallback = memo(() => {
  // We override line palette since default line color is a bit too dark.
  // Changing to gray20 more closely matches the line color currently used in production
  const customPalette = { line: 'gray20' } as const;

  // don't show lottie animation in story book
  const skipLottie = Boolean(process.env.STORYBOOK_SKIP_ANIMATION);

  return (
    <ThemeProvider palette={customPalette}>
      {!skipLottie && <Lottie autoplay source={chartFallbackPositive} loop />}
    </ThemeProvider>
  );
});

function InteractiveSparklineContentWithGeneric<Period extends string>({
  data,
  periods,
  defaultPeriod,
  onPeriodChanged,
  strokeColor,
  onScrub = noop,
  onScrubStart = noop,
  onScrubEnd = noop,
  formatDate,
  fallback = null,
  hidePeriodSelector = false,
  disableScrubbing = false,
  fill,
  yAxisScalingFactor = 1.0,
  compact,
  formatHoverDate,
  headerNode,
}: InteractiveSparklineBaseProps<Period>) {
  const innerChartHeight = compact ? chartCompactHeight : chartHeight;
  const { isFallbackVisible, showFallback } = useChartContext();

  const color = strokeColor;
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
          // minMaxOpacity.setValue(0);
        }
        setSelectedPeriod(period);
        onPeriodChanged?.(period);
      }
    },
    [data, selectedPeriod, onPeriodChanged /* , minMaxOpacity */],
  );

  const { chartWidth } = useChartConstants();

  const { path, area, getMarker } = useSparklineCoordinates({
    data: dataForPeriod,
    width: chartWidth,
    height: innerChartHeight,
    yAxisScalingFactor,
  });

  let header;
  if (headerNode) {
    header = <Box spacingHorizontal={gutter}>{headerNode}</Box>;
  }

  return (
    <div>
      {(!hidePeriodSelector || !!headerNode) && (
        <Box justifyContent="space-between" spacingBottom={2}>
          {header ?? <div />}
          <ChartPeriodSelector
            periods={periods}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={updatePeriod}
            color={color}
          />
        </Box>
      )}
      <ChartScrubProvider>
        {!!formatHoverDate && (
          <Box spacingBottom={1}>
            <ChartHoverDate />
          </Box>
        )}
        <VisualizationContainer width="100%" height={innerChartHeight}>
          {({ width, height }: VisualizationContainerDimension) => (
            <InnerChartProvider width={width} height={height}>
              <ChartScrubHandler
                onScrub={onScrub}
                onScrubEnd={onScrubEnd}
                onScrubStart={onScrubStart}
                disabled={disableScrubbing}
                selectedPeriod={selectedPeriod}
                formatHoverDate={formatHoverDate}
                getMarker={getMarker}
              >
                <Box width={width} height={height} position="relative">
                  {!!isFallbackVisible && !compact && (
                    <Box width="100%" height="100%" position="absolute" justifyContent="center">
                      {fallback ?? <DefaultFallback />}
                    </Box>
                  )}
                  <Box width="100%" height="100%">
                    {!!hasData && !!path && (
                      <>
                        <ChartAnimatedPath
                          d={path}
                          area={shouldShowFill ? area : undefined}
                          color={color}
                          selectedPeriod={selectedPeriod}
                          yAxisScalingFactor={yAxisScalingFactor}
                        />
                        <ChartLineVertical color={color} />
                      </>
                    )}
                  </Box>
                </Box>
              </ChartScrubHandler>
            </InnerChartProvider>
          )}
        </VisualizationContainer>
      </ChartScrubProvider>
      <ChartMarkerDates
        getMarker={getMarker}
        formatDate={formatDate}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const InteractiveSparklineContent = memo(
  InteractiveSparklineContentWithGeneric,
) as typeof InteractiveSparklineContentWithGeneric;

function InteractiveSparklineWithGeneric<Period extends string>({
  compact,
  ...props
}: InteractiveSparklineBaseProps<Period>) {
  return (
    <ChartProvider compact={compact}>
      <InteractiveSparklineContent compact={compact} {...props} />
    </ChartProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const InteractiveSparkline = memo(
  InteractiveSparklineWithGeneric,
) as typeof InteractiveSparklineWithGeneric;
