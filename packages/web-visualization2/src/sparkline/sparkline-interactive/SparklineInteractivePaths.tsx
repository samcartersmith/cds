import React, { memo, useCallback, useRef } from 'react';
import { ChartTimeseries } from '@cbhq/cds-common2';
import { chartCompactHeight, chartHeight } from '@cbhq/cds-common2/tokens/sparkline';
import {
  SparklineInteractivePathsProps,
  TimeseriesPathOnRenderParams,
} from '@cbhq/cds-common2/types/SparklineInteractiveBaseProps';

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
  const shouldShowFill = !!fill;

  const { chartWidth } = useSparklineInteractiveConstants();
  const innerSparklineInteractiveHeight = compact ? chartCompactHeight : chartHeight;

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
          height={innerSparklineInteractiveHeight}
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
