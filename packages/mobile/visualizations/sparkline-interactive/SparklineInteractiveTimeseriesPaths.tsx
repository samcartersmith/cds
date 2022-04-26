import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { TextInput } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import * as interpolate from 'd3-interpolate-path';
import { Area, Line } from 'd3-shape';
import { ChartDataPoint, ChartTimeseries } from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { useTimeseriesPaths } from '@cbhq/cds-common/visualizations/useTimeseriesPaths';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';

import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';

export type TimeseriesPathOnRenderParams = {
  path: string;
  area: string;
};

type SparklineInteractiveTimeseriesPathsProps = {
  initialPath: string;
  data: ChartTimeseries[];
  width: number;
  height: number;
  onRender: ({ path, area }: TimeseriesPathOnRenderParams) => void;
};

type TimeseriesPathProps = {
  lineFn: Line<ChartDataPoint>;
  areaFn: Area<ChartDataPoint>;
  timeseries: ChartTimeseries;
  initialPath: string;
  onRender?: ({ path, area }: TimeseriesPathOnRenderParams) => void;
};

const TimeseriesPath = memo(
  ({ timeseries, lineFn, initialPath, onRender, areaFn }: TimeseriesPathProps) => {
    const pathRef = useRef<TextInput | null>(null);
    const { strokeColor } = timeseries;

    const lineColor = useAccessibleForeground({ color: strokeColor, usage: 'graphic' });

    const newPath = useMemo(() => lineFn(timeseries.points) as string, [lineFn, timeseries.points]);
    const newArea = useMemo(
      () => (onRender ? (areaFn(timeseries.points) as string) : null),
      [areaFn, onRender, timeseries.points],
    );

    const pathInterpolator = useMemo(
      () => interpolate.interpolatePath(initialPath, newPath),
      [initialPath, newPath],
    );

    const animationListener = useCallback(
      ({ value }: { value: number }) => {
        const val = Number(value.toFixed(4));
        pathRef.current?.setNativeProps({
          d: pathInterpolator(val),
        });
      },
      [pathInterpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      pathRef.current?.setNativeProps({
        d: pathInterpolator(1),
      });
    }, [pathInterpolator]);

    const playAnimation = useInterruptiblePathAnimation({
      animationListener,
      onInterrupt: updatePathWithoutAnimation,
      ignoreMinMax: true,
    });

    useEffect(() => {
      playAnimation();

      onRender?.({
        path: newPath,
        area: newArea as string,
      });
    }, [newArea, newPath, onRender, pathInterpolator, playAnimation]);

    return (
      <Path
        ref={pathRef}
        d={initialPath}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={borderWidth.sparkline}
        stroke={lineColor}
      />
    );
  },
);

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
      <Svg width={width} height={height}>
        <G {...translateProps}>{paths}</G>
      </Svg>
    );
  },
);
