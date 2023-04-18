import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { interpolatePath } from 'd3-interpolate-path';
import { select } from 'd3-selection';
import { SparklineInteractiveTimeseriesPathsProps, TimeseriesPathProps } from '@cbhq/cds-common';
import { animatedPathConfig } from '@cbhq/cds-common/animation/sparkline';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { useTimeseriesPaths } from '@cbhq/cds-common/visualizations/useTimeseriesPaths';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { SparklinePath } from '../SparklinePath';

const { duration, easing } = animatedPathConfig;

const TimeseriesPath = memo(
  ({ timeseries, lineFn, initialPath, onRender, areaFn }: TimeseriesPathProps) => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const { strokeColor } = timeseries;

    const lineColor = useAccessibleForeground({ color: strokeColor, usage: 'graphic' });

    const newPath = useMemo(() => lineFn(timeseries.points) as string, [lineFn, timeseries.points]);
    const newArea = useMemo(
      () => (onRender ? (areaFn(timeseries.points) as string) : null),
      [areaFn, onRender, timeseries.points],
    );

    const playAnimation = useCallback(() => {
      select(pathRef.current)
        .transition()
        .duration(duration)
        .ease(easing)
        .attrTween('d', function tween() {
          const current = newPath;
          return interpolatePath(initialPath, current);
        });
    }, [initialPath, newPath]);

    useEffect(() => {
      playAnimation();
      onRender?.({
        path: newPath,
        area: newArea as string,
      });
    }, [newArea, newPath, onRender, playAnimation]);

    return <SparklinePath ref={pathRef} path={initialPath} stroke={lineColor} />;
  },
);

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-web-sparkline.
 */
export const SparklineInteractiveTimeseriesPaths = memo(
  ({ data, width, height, initialPath, onRender }: SparklineInteractiveTimeseriesPathsProps) => {
    const { lineFn, areaFn } = useTimeseriesPaths({
      data,
      width,
      height,
    });
    const translateProps = useMemo(() => getSparklineTransform(width, height), [width, height]);

    const paths = data.map((timeseries, index) => {
      return (
        <TimeseriesPath
          timeseries={timeseries}
          key={timeseries.id}
          lineFn={lineFn}
          initialPath={initialPath}
          areaFn={areaFn}
          onRender={index === 0 ? onRender : undefined}
        />
      );
    });

    return (
      <svg width={width} height={height}>
        <g {...translateProps}>{paths}</g>
      </svg>
    );
  },
);
