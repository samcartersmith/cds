import React, { memo, useCallback, useEffect, useMemo } from 'react';
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import Svg, { G, Path } from 'react-native-svg';
import * as interpolate from 'd3-interpolate-path';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import {
  SparklineInteractiveTimeseriesPathsProps,
  TimeseriesPathProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { useTimeseriesPaths } from '@cbhq/cds-common/visualizations/useTimeseriesPaths';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';

import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const TimeseriesPath = memo(
  ({ timeseries, lineFn, initialPath, onRender, areaFn }: TimeseriesPathProps) => {
    const { strokeColor } = timeseries;
    const animatedPath = useSharedValue<string>(initialPath);

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
        animatedPath.value = pathInterpolator(val);
      },
      [animatedPath, pathInterpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      animatedPath.value = pathInterpolator(1);
    }, [animatedPath, pathInterpolator]);

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

    const animatedPathProps = useAnimatedProps(() => ({
      d: animatedPath.value,
    }));

    return (
      <AnimatedPath
        d={initialPath}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={borderWidth.sparkline}
        stroke={lineColor}
        animatedProps={animatedPathProps}
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
