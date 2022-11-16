import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import * as interpolate from 'd3-interpolate-path';
import { useValueChanges } from '@cbhq/cds-common/hooks/useValueChanges';
import { SparklineInteractiveAnimatedPathProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { SparklineArea } from '../SparklineArea';
import { SparklineGradient } from '../SparklineGradient';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export const SparklineInteractiveAnimatedPath = memo(
  ({
    d = '',
    color,
    selectedPeriod,
    area: areaProp,
    yAxisScalingFactor,
    initialPath,
    initialArea,
  }: SparklineInteractiveAnimatedPathProps) => {
    const { isFallbackVisible, hideFallback, animateMinMaxIn, compact } =
      useSparklineInteractiveContext();
    const path = useSharedValue(initialPath);
    const area = useSharedValue(initialArea);

    // Only tween animation on period changes
    const { hasNotChanged: skipAnimation, addPreviousValue: addPreviousPeriod } =
      useValueChanges(selectedPeriod);
    const {
      previousValue: previousPath,
      newValue: newPath,
      hasChanged: shouldUpdatePath,
      addPreviousValue: addPreviousPath,
    } = useValueChanges(d);

    const {
      previousValue: previousArea,
      newValue: newArea,
      hasChanged: shouldUpdateArea,
      addPreviousValue: addPreviousArea,
    } = useValueChanges(areaProp ?? '');

    const pathInterpolator = useMemo(
      () => interpolate.interpolatePath((previousPath ?? initialPath) as string, newPath),
      [previousPath, initialPath, newPath],
    );

    const areaInterpolator = useMemo(
      () => interpolate.interpolatePath((previousArea ?? initialArea) as string, newArea),
      [previousArea, initialArea, newArea],
    );

    const animationListener = useCallback(
      ({ value }: { value: number }) => {
        const val = Number(value.toFixed(4));
        path.value = pathInterpolator(val);
        area.value = areaInterpolator(val);
      },
      [area, areaInterpolator, path, pathInterpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      path.value = pathInterpolator(1);

      area.value = areaInterpolator(1);

      animateMinMaxIn.start();
    }, [animateMinMaxIn, area, areaInterpolator, path, pathInterpolator]);

    const playAnimation = useInterruptiblePathAnimation({
      animationListener,
      onInterrupt: updatePathWithoutAnimation,
    });

    useEffect(() => {
      addPreviousPeriod(selectedPeriod);
    }, [addPreviousPeriod, selectedPeriod]);

    useEffect(() => {
      // only update these values when they are used
      addPreviousArea(newArea);
      addPreviousPath(newPath);

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
      shouldUpdatePath,
      shouldUpdateArea,
      skipAnimation,
      updatePathWithoutAnimation,
      playAnimation,
      isFallbackVisible,
      addPreviousPath,
      addPreviousArea,
      newArea,
      newPath,
    ]);

    const { chartWidth, chartHeight } = useSparklineInteractiveConstants({ compact });

    return (
      <SparklineGradient
        animatedPath={path}
        width={chartWidth}
        height={chartHeight}
        color={color}
        yAxisScalingFactor={yAxisScalingFactor}
      >
        {!!areaProp && <SparklineArea animatedArea={area} />}
      </SparklineGradient>
    );
  },
);
