import React, { memo, useCallback, useRef } from 'react';
import {
  ChartTimeseries,
  SparklineInteractivePathsProps,
  TimeseriesPathOnRenderParams,
} from '@cbhq/cds-common';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';

import { SparklineInteractiveAnimatedPath } from './SparklineInteractiveAnimatedPath';
import { SparklineInteractiveTimeseriesPaths } from './SparklineInteractiveTimeseriesPaths';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

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
          area={shouldShowFill ? area : undefined}
          color={strokeColor}
          d={path}
          initialArea={hoverAreaRef.current}
          initialPath={hoverPathRef.current}
          selectedPeriod={selectedPeriod}
          yAxisScalingFactor={yAxisScalingFactor}
        />
      )}
      {!!showHoverData && (
        <SparklineInteractiveTimeseriesPaths
          data={hoverData?.[selectedPeriod] as ChartTimeseries[]}
          height={chartHeight}
          initialPath={path}
          onRender={handleMultiTimeseriesRender}
          width={chartWidth}
        />
      )}
    </>
  );
}

export const SparklineInteractivePaths = memo(
  SparklineInteractivePathsWithGeneric,
) as typeof SparklineInteractivePathsWithGeneric;
