import React, { memo } from 'react';
import { Animated as RNAnimated, useWindowDimensions, View } from 'react-native';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  block,
  call,
  cond,
  eq,
  event,
  max,
  min,
  or,
  set,
  sub,
} from 'react-native-reanimated';
import { noop } from '@cbhq/cds-utils';
import { ChartScrubHandlerProps } from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';

import { Haptics } from '../../utils/haptics';
import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';

export const ChartPanGestureHandler = memo(
  ({ onScrubEnd = noop, onScrubStart = noop, children, disabled }: ChartScrubHandlerProps) => {
    const { width: screenWidth } = useWindowDimensions();
    const {
      markerXPosition,
      markerGestureState,
      animateMarkerIn,
      animateMarkerOut,
      animateMinMaxIn,
      animateMinxMaxOut,
      animateHoverDateIn,
      animateHoverDateOut,
    } = useChartContext();
    const { chartVerticalLineWidth, endX, startX } = useChartConstants({});

    if (disabled) {
      return <View>{children}</View>;
    }

    return (
      <LongPressGestureHandler
        minDurationMs={110}
        maxDist={screenWidth}
        onGestureEvent={event(
          [
            {
              nativeEvent: ({ x }: LongPressGestureHandlerGestureEvent['nativeEvent']) => {
                return set(
                  markerXPosition,
                  min(endX, max(startX, sub(x, chartVerticalLineWidth / 2))),
                );
              },
            },
          ],
          {
            useNativeDrive: true,
          },
        )}
        shouldCancelWhenOutside={false}
        onHandlerStateChange={event(
          [
            {
              nativeEvent: ({ x, state }: LongPressGestureHandlerStateChangeEvent['nativeEvent']) =>
                block([
                  cond(
                    eq(state, State.ACTIVE),
                    block([
                      call([], () => {
                        void Haptics.lightImpact();
                        onScrubStart();
                        RNAnimated.parallel([
                          animateMarkerIn,
                          animateMinxMaxOut,
                          animateHoverDateIn,
                        ]).start();
                      }),
                      set(markerGestureState, 1),
                      set(
                        markerXPosition,
                        min(endX, max(startX, sub(x, chartVerticalLineWidth / 2))),
                      ),
                    ]),
                  ),
                  cond(
                    eq(state, State.END),
                    block([
                      call([], () => {
                        // Dont trigger when cancelled/failed
                        void Haptics.lightImpact();
                      }),
                    ]),
                  ),
                  cond(
                    or(eq(state, State.END), eq(state, State.CANCELLED), eq(state, State.FAILED)),
                    block([
                      call([], () => {
                        onScrubEnd();
                        RNAnimated.parallel([
                          animateMarkerOut,
                          animateMinMaxIn,
                          animateHoverDateOut,
                        ]).start(({ finished }) => {
                          if (finished) {
                            markerXPosition.setValue(-1);
                          }
                        });
                      }),
                      set(markerGestureState, 0),
                    ]),
                  ),
                ]),
            },
          ],
          { useNativeDriver: true },
        )}
      >
        <Animated.View>{children}</Animated.View>
      </LongPressGestureHandler>
    );
  },
);
