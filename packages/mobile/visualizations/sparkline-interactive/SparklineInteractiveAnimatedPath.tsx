import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { TextInput } from 'react-native';
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
    area,
    yAxisScalingFactor,
    initialPath,
    initialArea,
  }: SparklineInteractiveAnimatedPathProps) => {
    const { isFallbackVisible, hideFallback, animateMinMaxIn, compact } =
      useSparklineInteractiveContext();
    const pathRef = useRef<TextInput | null>(null);
    const areaRef = useRef<TextInput | null>(null);

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
    } = useValueChanges(area ?? '');

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
        pathRef.current?.setNativeProps({
          d: pathInterpolator(val),
        });
        areaRef.current?.setNativeProps({
          d: areaInterpolator(val),
        });
      },
      [areaInterpolator, pathInterpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      pathRef.current?.setNativeProps({
        d: pathInterpolator(1),
      });

      areaRef.current?.setNativeProps({
        d: areaInterpolator(1),
      });

      animateMinMaxIn.start();
    }, [animateMinMaxIn, areaInterpolator, pathInterpolator]);

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
        path={initialPath}
        ref={pathRef}
        width={chartWidth}
        height={chartHeight}
        color={color}
        yAxisScalingFactor={yAxisScalingFactor}
      >
        {!!area && <SparklineArea area={initialArea} ref={areaRef} />}
      </SparklineGradient>
    );
  },
);
