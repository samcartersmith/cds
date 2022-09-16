import React, { useCallback } from 'react';
import { Animated as RNAnimated, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ChartGetMarker, ChartScrubParams } from '@cbhq/cds-common/types/Chart';
import { SparklineInteractiveScrubHandlerProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { noop } from '@cbhq/cds-utils';

import { Haptics } from '../../utils/haptics';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export type SparklineInteractivePanGestureHandlerProps<Period extends string> = {
  onScrub?: (params: ChartScrubParams<Period>) => void;
  getMarker: ChartGetMarker;
  selectedPeriod: Period;
} & SparklineInteractiveScrubHandlerProps;

// Generics do not work with React.memo or forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012
export const SparklineInteractivePanGestureHandler = function SparklineInteractivePanGestureHandler<
  Period extends string,
>({
  onScrubEnd = noop,
  onScrubStart = noop,
  onScrub = noop,
  getMarker,
  selectedPeriod,
  children,
  disabled,
}: SparklineInteractivePanGestureHandlerProps<Period>) {
  const {
    markerXPosition,
    markerGestureState,
    animateMarkerIn,
    animateMarkerOut,
    animateMinMaxIn,
    animateMinxMaxOut,
    animateHoverDateIn,
    animateHoverDateOut,
  } = useSparklineInteractiveContext();
  const { chartVerticalLineWidth, endX, startX } = useSparklineInteractiveConstants({});

  const handleGestureStart = useCallback(() => {
    void Haptics.lightImpact();
    onScrubStart();
    RNAnimated.parallel([animateMarkerIn, animateMinxMaxOut, animateHoverDateIn]).start();
    markerGestureState.value = 1;
  }, [animateHoverDateIn, animateMarkerIn, animateMinxMaxOut, markerGestureState, onScrubStart]);

  const handleUpdate = useCallback(
    (event) => {
      const newMarkerXPosition = Math.min(
        endX,
        Math.max(startX, event.x - chartVerticalLineWidth / 2),
      );
      markerXPosition.value = newMarkerXPosition;
      if (markerGestureState.value === 1) {
        const dataPoint = getMarker(markerXPosition.value);
        if (dataPoint) {
          onScrub({
            point: dataPoint,
            period: selectedPeriod,
          });
        }
      }
    },
    [
      chartVerticalLineWidth,
      endX,
      getMarker,
      markerGestureState.value,
      markerXPosition,
      onScrub,
      selectedPeriod,
      startX,
    ],
  );

  const handleGestureEndOrCancelled = useCallback(() => {
    onScrubEnd();
    RNAnimated.parallel([animateMarkerOut, animateMinMaxIn, animateHoverDateOut]).start(
      ({ finished }) => {
        if (finished) {
          markerXPosition.value = -1;
        }
      },
    );
    markerGestureState.value = 0;
  }, [
    animateHoverDateOut,
    animateMarkerOut,
    animateMinMaxIn,
    markerGestureState,
    markerXPosition,
    onScrubEnd,
  ]);

  const handleGestureEnd = useCallback(() => {
    handleGestureEndOrCancelled();
    // Dont trigger when cancelled/failed
    void Haptics.lightImpact();
  }, [handleGestureEndOrCancelled]);

  if (disabled) {
    return <View>{children}</View>;
  }

  const longPressGesture = Gesture.Pan()
    .activateAfterLongPress(110)
    .shouldCancelWhenOutside(true)
    .onStart(handleGestureStart)
    .onUpdate(handleUpdate)
    .onEnd(handleGestureEnd)
    .onTouchesCancelled(handleGestureEndOrCancelled);

  return (
    <GestureDetector gesture={longPressGesture}>
      <Animated.View>{children}</Animated.View>
    </GestureDetector>
  );
};
