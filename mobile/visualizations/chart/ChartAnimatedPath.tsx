import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { TextInput } from 'react-native';
import * as interpolate from 'd3-interpolate-path';
import { SparklineGradient } from '../SparklineGradient';

import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';

type ChartAnimatedPathProps = {
  d: string;
  color: string;
  selectedPeriod: string;
};
const useValueChanges = (newValue: string) => {
  const previousValueRef = useRef<typeof newValue>();
  const previousValue = previousValueRef.current;
  previousValueRef.current = newValue;
  return {
    hasChanged: newValue !== previousValue,
    hasNotChanged: newValue === previousValue,
    previousValue,
    newValue,
  };
};

export const ChartAnimatedPath = memo(
  ({ d = '', color, selectedPeriod }: ChartAnimatedPathProps) => {
    const { isFallbackVisible, hideFallback, animateMinMaxIn, compact } = useChartContext();
    const pathRef = useRef<TextInput | null>(null);

    // Only tween animation on period changes
    const { hasNotChanged: skipAnimation } = useValueChanges(selectedPeriod);
    const {
      previousValue: previousPath,
      newValue: newPath,
      hasChanged: shouldUpdatePath,
    } = useValueChanges(d);

    const interpolator = useMemo(
      () => interpolate.interpolatePath(previousPath as string, newPath),
      [previousPath, newPath],
    );

    const animationListener = useCallback(
      ({ value }: { value: number }) => {
        const val = Number(value.toFixed(4));
        pathRef.current?.setNativeProps({
          d: interpolator(val),
        });
      },
      [interpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      pathRef.current?.setNativeProps({
        d: interpolator(1),
      });
      animateMinMaxIn.start();
    }, [animateMinMaxIn, interpolator]);

    const playAnimation = useInterruptiblePathAnimation({
      animationListener,
      onInterrupt: updatePathWithoutAnimation,
    });

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
      }
    }, [
      hideFallback,
      shouldUpdatePath,
      skipAnimation,
      updatePathWithoutAnimation,
      playAnimation,
      isFallbackVisible,
    ]);

    const { chartWidth, chartHeight } = useChartConstants({ compact });

    return (
      <SparklineGradient ref={pathRef} width={chartWidth} height={chartHeight} color={color} />
    );
  },
);
