import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import * as interpolate from 'd3-interpolate-path';
import { borderWidth } from '@cbhq/cds-common2/tokens/sparkline';
import {
  SparklineInteractiveTimeseriesPathsProps,
  TimeseriesPathProps,
} from '@cbhq/cds-common2/types/SparklineInteractiveBaseProps';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';
import { getSparklineTransform } from '@cbhq/cds-common2/visualizations/getSparklineTransform';
import { useTimeseriesPaths } from '@cbhq/cds-common2/visualizations/useTimeseriesPaths';
import { useTheme } from '@cbhq/cds-mobile2/hooks/useTheme';

import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';

const TimeseriesPath = memo(
  ({ timeseries, lineFn, initialPath, onRender, areaFn }: TimeseriesPathProps) => {
    const theme = useTheme();
    const pathRef = useRef<Path | null>(null);
    const { strokeColor } = timeseries;

    const lineColor = getAccessibleColor({
      background: theme.color.background,
      foreground: strokeColor,
      usage: 'graphic',
    });

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
        // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
        // Usage in this component are known making this a high risk component. Contact team for more information.

        pathRef.current?.setNativeProps({
          d: pathInterpolator(val),
        });
      },
      [pathInterpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
      // Usage in this component are known making this a high risk component. Contact team for more information.

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
        stroke={lineColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={borderWidth}
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
          key={timeseries.id}
          areaFn={areaFn}
          initialPath={initialPath}
          lineFn={lineFn}
          onRender={index === 0 ? onRender : undefined}
          timeseries={timeseries}
        />
      );
    });

    return (
      <Svg height={height} width={width}>
        <G {...translateProps}>{paths}</G>
      </Svg>
    );
  },
);
