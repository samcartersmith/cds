import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { SparklineInteractiveAnimatedPathProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useValueChanges } from '@cbhq/cds-common/hooks/useValueChanges';
import { animatedPathConfig } from '@cbhq/cds-common/animation/sparkline';
import { interpolatePath } from 'd3-interpolate-path';
import 'd3-transition'; // Important! do not remove this, it sets up the linkage so you can use select().transition()
import { select } from 'd3-selection';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';
import { SparklineGradient } from '../SparklineGradient';
import { SparklineArea } from '../SparklineArea';
import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

const { duration, easing } = animatedPathConfig;

export const SparklineInteractiveAnimatedPath = memo(
  ({
    d = '',
    color,
    selectedPeriod,
    area,
    yAxisScalingFactor,
  }: SparklineInteractiveAnimatedPathProps) => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const areaRef = useRef<SVGPathElement | null>(null);
    const { chartWidth, chartHeight } = useSparklineInteractiveConstants();
    const { isFallbackVisible, hideFallback } = useSparklineInteractiveContext();

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
