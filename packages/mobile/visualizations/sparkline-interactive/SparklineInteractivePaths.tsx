import React, { memo, useCallback, useRef } from 'react';
import { ChartTimeseries, SparklineInteractivePathsProps } from '@cbhq/cds-common';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import { SparklineInteractiveAnimatedPath } from '@cbhq/cds-mobile/visualizations/sparkline-interactive/SparklineInteractiveAnimatedPath';
import {
  SparklineInteractiveTimeseriesPaths,
  TimeseriesPathOnRenderParams,
} from '@cbhq/cds-mobile/visualizations/sparkline-interactive/SparklineInteractiveTimeseriesPaths';
import { useSparklineInteractiveConstants } from '@cbhq/cds-mobile/visualizations/sparkline-interactive/useSparklineInteractiveConstants';

function SparklineInteractivePathsWithGeneric<Period extends string>({
  showHoverData,
  fill,
  path,
  area,
  selectedPeriod,
  yAxisScalingFactor,
  strokeColor,
  hoverData,
  compact,
}: SparklineInteractivePathsProps<Period>) {
  const hoverPathRef = useRef<string | undefined>(undefined);
  const hoverAreaRef = useRef<string | undefined>(undefined);
  const hasFrontier = useFeatureFlag('frontierSparkline');
  const shouldShowFill = typeof fill !== 'undefined' ? fill : hasFrontier;

  const { chartWidth, chartHeight } = useSparklineInteractiveConstants({ compact });

  const handleMultiTimeseriesRender = useCallback(
    ({ area: timeseriesArea, path: timeseriesPath }: TimeseriesPathOnRenderParams) => {
      hoverPathRef.current = timeseriesPath;
      hoverAreaRef.current = timeseriesArea;
    },
    [],
  );

  return (
    <>
      {!showHoverData && (
        <SparklineInteractiveAnimatedPath
          initialPath={hoverPathRef.current}
          initialArea={hoverAreaRef.current}
          d={path}
          area={shouldShowFill ? area : undefined}
          color={strokeColor}
          selectedPeriod={selectedPeriod}
          yAxisScalingFactor={yAxisScalingFactor}
        />
      )}
      {!!showHoverData && (
        <SparklineInteractiveTimeseriesPaths
          initialPath={path}
          width={chartWidth}
          height={chartHeight}
          data={hoverData?.[selectedPeriod] as ChartTimeseries[]}
          onRender={handleMultiTimeseriesRender}
        />
      )}
    </>
  );
}

export const SparklineInteractivePaths = memo(
  SparklineInteractivePathsWithGeneric,
) as typeof SparklineInteractivePathsWithGeneric;
