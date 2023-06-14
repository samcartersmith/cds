import React, { memo, useCallback, useRef } from 'react';
import { ChartTimeseries } from '@cbhq/cds-common';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import { chartCompactHeight, chartHeight } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractivePathsProps,
  TimeseriesPathOnRenderParams,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

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
          height={innerSparklineInteractiveHeight}
          data={hoverData?.[selectedPeriod] as ChartTimeseries[]}
          onRender={handleMultiTimeseriesRender}
        />
      )}
    </>
  );
}

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-web-sparkline.
 */
export const SparklineInteractivePaths = memo(
  SparklineInteractivePathsWithGeneric,
) as typeof SparklineInteractivePathsWithGeneric;
