import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { chartCompactHeight, chartHeight } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractiveBaseProps,
  SparklineInteractiveDefaultFallback,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { VisualizationContainerDimension } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { debounce } from '@cbhq/cds-common/utils/debounce';
import { useSparklineCoordinates } from '@cbhq/cds-common/visualizations/useSparklineCoordinates';
import { chartFallbackNegative, chartFallbackPositive } from '@cbhq/cds-lottie-files';
import { emptyArray, isStorybook, noop } from '@cbhq/cds-utils';
import { Lottie } from '@cbhq/cds-web/animation';
import { useDimensions } from '@cbhq/cds-web/hooks/useDimensions';
import { usePalette } from '@cbhq/cds-web/hooks/usePalette';
import { Box } from '@cbhq/cds-web/layout/Box';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';
import { VisualizationContainer } from '@cbhq/cds-web/visualizations/VisualizationContainer';

import { InnerSparklineInteractiveProvider } from './InnerSparklineInteractiveProvider';
import { SparklineInteractiveHoverDate } from './SparklineInteractiveHoverDate';
import { SparklineInteractiveLineVertical } from './SparklineInteractiveLineVertical';
import { SparklineInteractiveMarkerDates } from './SparklineInteractiveMarkerDates';
import { SparklineInteractivePaths } from './SparklineInteractivePaths';
import { SparklineInteractivePeriodSelector } from './SparklineInteractivePeriodSelector';
import {
  SparklineInteractiveProvider,
  useSparklineInteractiveContext,
} from './SparklineInteractiveProvider';
import { SparklineInteractiveScrubHandler } from './SparklineInteractiveScrubHandler';
import { SparklineInteractiveScrubProvider } from './SparklineInteractiveScrubProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export * from '@cbhq/cds-common/types/Chart';
export * from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

// We override line palette since default line color is a bit too dark.
// Changing to gray20 more closely matches the line color currently used in production
const customPalette = { line: 'gray20' } as const;
const DefaultFallback = memo(({ fallbackType }: SparklineInteractiveDefaultFallback) => {
  // don't show lottie animation in story book
  const skipLottie = isStorybook();

  const source = fallbackType === 'negative' ? chartFallbackNegative : chartFallbackPositive;
  return (
    <ThemeProvider palette={customPalette}>
      {!skipLottie && <Lottie autoplay loop height="100%" source={source} width="100%" />}
    </ThemeProvider>
  );
});
const stylesToPreventInteraction = { pointerEvents: 'none' } as const;

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
  fill = true,
  yAxisScalingFactor = 1.0,
  compact,
  formatHoverDate,
  headerNode,
  fallbackType = 'positive',
  timePeriodGutter,
  hoverData,
  periodSelectorPlacement = 'above',
}: SparklineInteractiveBaseProps<Period>) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isMarkerDateVisible, setIsMarkerDateVisible] = useState(false);
  const innerSparklineInteractiveHeight = compact ? chartCompactHeight : chartHeight;
  const { isFallbackVisible, showFallback } = useSparklineInteractiveContext();
  const { observe: containerRef, width: containerWidth } = useDimensions();
  const palette = usePalette();

  const isMobileLayout = containerWidth > 0 && containerWidth < mobileLayoutBreakpoint;

  const color = strokeColor;
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const dataForPeriod = useMemo(() => {
    if (!data) {
      return emptyArray;
    }
    return data[selectedPeriod] ?? emptyArray;
  }, [data, selectedPeriod]);

  const handleScrubStart = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(true);
    }

    setIsMarkerDateVisible(true);
    onScrubStart?.();
  }, [hoverData, onScrubStart]);

  const handleScrubEnd = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(false);
    }

    setIsMarkerDateVisible(false);
    onScrubEnd?.();
  }, [hoverData, onScrubEnd]);

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
      <Box flexGrow={1} spacingHorizontal={!isMobileLayout ? gutter : 0}>
        {headerNode}
      </Box>
    );
  }

  const showBottomMarkerDates = useMemo(
    () => periodSelectorPlacement === 'above' || isMarkerDateVisible,
    [isMarkerDateVisible, periodSelectorPlacement],
  );

  const periodSelector = (
    <SparklineInteractivePeriodSelector
      color={color}
      periods={periods}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={updatePeriod}
    />
  );

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {(!hidePeriodSelector || !!headerNode) && (
        <>
          {isMobileLayout && periodSelectorPlacement === 'above' && (
            <Box spacingBottom={2} width="100%">
              {periodSelector}
            </Box>
          )}
          <Box alignItems="center" justifyContent="space-between" spacingBottom={2}>
            {header ?? <div />}
            {!isMobileLayout && periodSelectorPlacement === 'above' && (
              <Box flexGrow={0}>{periodSelector}</Box>
            )}
          </Box>
        </>
      )}
      <SparklineInteractiveScrubProvider>
        {!!formatHoverDate && (
          <Box spacingBottom={1}>
            <SparklineInteractiveHoverDate />
          </Box>
        )}
        <VisualizationContainer height={innerSparklineInteractiveHeight} width="100%">
          {({ width, height }: VisualizationContainerDimension) => (
            <InnerSparklineInteractiveProvider height={height} width={width}>
              <SparklineInteractiveScrubHandler
                disabled={disableScrubbing}
                formatHoverDate={formatHoverDate}
                getMarker={getMarker}
                onScrub={onScrub}
                onScrubEnd={handleScrubEnd}
                onScrubStart={handleScrubStart}
                selectedPeriod={selectedPeriod}
              >
                <Box height={height} position="relative" width={width}>
                  {!!isFallbackVisible && (
                    <Box height="100%" justifyContent="center" position="absolute" width="100%">
                      {fallback ?? <DefaultFallback fallbackType={fallbackType} />}
                    </Box>
                  )}
                  <Box height="100%" width="100%">
                    {!!hasData && !!path && (
                      <>
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

                        <SparklineInteractiveLineVertical
                          color={hoverData ? palette.lineHeavy : color}
                        />
                      </>
                    )}
                  </Box>
                </Box>
              </SparklineInteractiveScrubHandler>
            </InnerSparklineInteractiveProvider>
          )}
        </VisualizationContainer>
      </SparklineInteractiveScrubProvider>
      {showBottomMarkerDates && (
        <Box background style={stylesToPreventInteraction} width="100%">
          <SparklineInteractiveMarkerDates
            formatDate={formatDate}
            getMarker={getMarker}
            selectedPeriod={selectedPeriod}
            timePeriodGutter={timePeriodGutter}
          />
        </Box>
      )}
      {periodSelectorPlacement === 'below' && !isMarkerDateVisible && (
        <Box background spacingTop={1} width="100%" zIndex={1}>
          {periodSelector}
        </Box>
      )}
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
  const [resizeKey, setResizeKey] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeHandler = useCallback(
    debounce(() => {
      // no resizing on percy
      if (!isStorybook()) {
        setResizeKey((prev) => prev + 1);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    getBrowserGlobals()?.window?.addEventListener('resize', resizeHandler);
    return () => {
      getBrowserGlobals()?.window?.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <SparklineInteractiveProvider key={resizeKey} compact={compact}>
      <SparklineInteractiveContent compact={compact} {...props} />
    </SparklineInteractiveProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineInteractive = memo(
  SparklineInteractiveWithGeneric,
) as typeof SparklineInteractiveWithGeneric;
