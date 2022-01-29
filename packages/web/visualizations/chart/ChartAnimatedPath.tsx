import 'd3-transition'; // Important! do not remove this, it sets up the linkage so you can use select().transition()

import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { interpolatePath } from 'd3-interpolate-path';
import { select } from 'd3-selection';
import { animatedPathConfig } from '@cbhq/cds-common/animation/sparkline';
import { useValueChanges } from '@cbhq/cds-common/hooks/useValueChanges';
import { ChartAnimatedPathProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { SparklineArea } from '../SparklineArea';
import { SparklineGradient } from '../SparklineGradient';

import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';

const { duration, easing } = animatedPathConfig;

export const ChartAnimatedPath = memo(
  ({ d = '', color, selectedPeriod, area, yAxisScalingFactor }: ChartAnimatedPathProps) => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const areaRef = useRef<SVGPathElement | null>(null);
    const { chartWidth, chartHeight } = useChartConstants();
    const { isFallbackVisible, hideFallback } = useChartContext();

    // Only tween animation on period changes
    const { hasNotChanged: skipAnimation } = useValueChanges(selectedPeriod);
    const {
      previousValue: previousPath,
      newValue: newPath,
      hasChanged: shouldUpdatePath,
    } = useValueChanges(d);

    const {
      previousValue: previousArea,
      newValue: newArea,
      hasChanged: shouldUpdateArea,
    } = useValueChanges(area ?? '');

    const pathInterpolator = useMemo(
      () => interpolatePath(previousPath as string, newPath),
      [previousPath, newPath],
    );

    const areaInterpolator = useMemo(
      () => interpolatePath(previousArea as string, newArea),
      [previousArea, newArea],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      select(pathRef.current).attr('d', pathInterpolator(1));
      select(areaRef.current).attr('d', areaInterpolator(1));
    }, [areaInterpolator, pathInterpolator]);

    const playAnimation = useCallback(() => {
      select(pathRef.current)
        .transition()
        .duration(duration)
        .ease(easing)
        .attrTween('d', function tween() {
          const previous = select(this).attr('d');
          const current = d;
          return interpolatePath(previous, current);
        });

      if (area) {
        select(areaRef.current)
          .transition()
          .duration(duration)
          .ease(easing)
          .attrTween('d', function tween() {
            const previous = select(this).attr('d');
            const current = area;
            return interpolatePath(previous, current);
          });
      }
    }, [area, d]);

    useEffect(() => {
      if (shouldUpdatePath) {
        if (isFallbackVisible) {
          hideFallback();
          updatePathWithoutAnimation();
        } else if (skipAnimation) {
          updatePathWithoutAnimation();
        } else {
          playAnimation();
        }
      } else if (shouldUpdateArea) {
        updatePathWithoutAnimation();
      }
    }, [
      hideFallback,
      isFallbackVisible,
      playAnimation,
      shouldUpdateArea,
      shouldUpdatePath,
      skipAnimation,
      updatePathWithoutAnimation,
    ]);

    return (
      <SparklineGradient
        ref={pathRef}
        width={chartWidth}
        height={chartHeight}
        color={color}
        yAxisScalingFactor={yAxisScalingFactor}
      >
        {!!area && <SparklineArea ref={areaRef} />}
      </SparklineGradient>
    );
  },
);
