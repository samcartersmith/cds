import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { emptyArray, noop, isStorybook } from '@cbhq/cds-utils';
import { SparklineInteractiveBaseProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { VisualizationContainerDimension } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { chartCompactHeight, chartHeight } from '@cbhq/cds-common/tokens/sparkline';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import { useSparklineCoordinates } from '@cbhq/cds-common/visualizations/useSparklineCoordinates';
import { chartFallbackPositive } from '@cbhq/cds-lottie-files';

import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';

import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { SparklineInteractiveHoverDate } from './SparklineInteractiveHoverDate';
import {
  SparklineInteractiveProvider,
  useSparklineInteractiveContext,
} from './SparklineInteractiveProvider';
import { VisualizationContainer } from '../VisualizationContainer';
import { Box } from '../../layout/Box';

import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';
import { SparklineInteractiveScrubProvider } from './SparklineInteractiveScrubProvider';
import { SparklineInteractiveScrubHandler } from './SparklineInteractiveScrubHandler';
import { SparklineInteractiveLineVertical } from './SparklineInteractiveLineVertical';
import { SparklineInteractiveAnimatedPath } from './SparklineInteractiveAnimatedPath';
import { InnerSparklineInteractiveProvider } from './InnerSparklineInteractiveProvider';
import { ThemeProvider } from '../../system';
import { Lottie } from '../../animation';
import { SparklineInteractiveMarkerDates } from './SparklineInteractiveMarkerDates';
import { SparklineInteractivePeriodSelector } from './SparklineInteractivePeriodSelector';
import { useDimensions } from '../../hooks/useDimensions';

export * from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
export * from '@cbhq/cds-common/types/Chart';

// We override line palette since default line color is a bit too dark.
// Changing to gray20 more closely matches the line color currently used in production
const customPalette = { line: 'gray20' } as const;
const DefaultFallback = memo(() => {
  // don't show lottie animation in story book
  const skipLottie = isStorybook();
  return (
    <ThemeProvider palette={customPalette}>
      {!skipLottie && <Lottie autoplay source={chartFallbackPositive} loop />}
    </ThemeProvider>
  );
});

const mobileLayoutBreakpoint = 650;
function SparklineInteractiveContentWithGeneric<Period extends string>({
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
}: SparklineInteractiveBaseProps<Period>) {
  const innerSparklineInteractiveHeight = compact ? chartCompactHeight : chartHeight;
  const { isFallbackVisible, showFallback } = useSparklineInteractiveContext();
  const { observe: containerRef, width: containerWidth } = useDimensions();

  const isMobileLayout = containerWidth > 0 && containerWidth < mobileLayoutBreakpoint;

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
        // AnimatedSparklineInteractivePath to animate those components back in -
        // and AnimatedSparklineInteractivePath will not trigger an animation
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

  const { chartWidth } = useSparklineInteractiveConstants();

  const { path, area, getMarker } = useSparklineCoordinates({
    data: dataForPeriod,
    width: chartWidth,
    height: innerSparklineInteractiveHeight,
    yAxisScalingFactor,
  });

  let header;
  if (headerNode) {
    header = (
      <Box spacingHorizontal={!isMobileLayout ? gutter : 0} flexGrow={1}>
        {headerNode}
      </Box>
    );
  }

  const periodSelector = (
    <SparklineInteractivePeriodSelector
      periods={periods}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={updatePeriod}
      color={color}
    />
  );

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {(!hidePeriodSelector || !!headerNode) && (
        <>
          {isMobileLayout && (
            <Box spacingBottom={2} width="100%">
              {periodSelector}
            </Box>
          )}
          <Box justifyContent="space-between" spacingBottom={2}>
            {header ?? <div />}
            {!isMobileLayout && <Box flexGrow={0}>{periodSelector}</Box>}
          </Box>
        </>
      )}
      <SparklineInteractiveScrubProvider>
        {!!formatHoverDate && (
          <Box spacingBottom={1}>
            <SparklineInteractiveHoverDate />
          </Box>
        )}
        <VisualizationContainer width="100%" height={innerSparklineInteractiveHeight}>
          {({ width, height }: VisualizationContainerDimension) => (
            <InnerSparklineInteractiveProvider width={width} height={height}>
              <SparklineInteractiveScrubHandler
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
                        <SparklineInteractiveAnimatedPath
                          d={path}
                          area={shouldShowFill ? area : undefined}
                          color={color}
                          selectedPeriod={selectedPeriod}
                          yAxisScalingFactor={yAxisScalingFactor}
                        />
                        <SparklineInteractiveLineVertical color={color} />
                      </>
                    )}
                  </Box>
                </Box>
              </SparklineInteractiveScrubHandler>
            </InnerSparklineInteractiveProvider>
          )}
        </VisualizationContainer>
      </SparklineInteractiveScrubProvider>
      <SparklineInteractiveMarkerDates
        getMarker={getMarker}
        formatDate={formatDate}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineInteractiveContent = memo(
  SparklineInteractiveContentWithGeneric,
) as typeof SparklineInteractiveContentWithGeneric;

function SparklineInteractiveWithGeneric<Period extends string>({
  compact,
  ...props
}: SparklineInteractiveBaseProps<Period>) {
  return (
    <SparklineInteractiveProvider compact={compact}>
      <SparklineInteractiveContent compact={compact} {...props} />
    </SparklineInteractiveProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineInteractive = memo(
  SparklineInteractiveWithGeneric,
) as typeof SparklineInteractiveWithGeneric;
