import { useCallback, useMemo } from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  useWindowDimensions,
} from 'react-native';
import { NoopFn, PinningDirection } from '@cbhq/cds-common';
import {
  DISMISSAL_DRAG_THRESHOLD,
  DISMISSAL_VELOCITY_THRESHOLD,
  MAX_OVER_DRAG,
  MIN_PAN_DISTANCE,
} from '@cbhq/cds-common/animation/drawer';
import { horizontalDrawerWidth } from '@cbhq/cds-common/tokens/drawer';
import { modulate } from '@cbhq/cds-common/utils/modulate';

type UseDrawerPanResponderParams = {
  drawerAnimation: Animated.Value;
  animateDrawerIn: Animated.CompositeAnimation;
  pin: PinningDirection;
  handleCloseRequest: NoopFn;
  disableCapturePanGestureToDismiss: boolean;
};
type DragDirection = 'up' | 'down' | 'left' | 'right' | undefined;

/** accumulated distance of the gesture - max over drag */
const calculateDragOffset = (x: number) => {
  const newX = x / 100;
  return MAX_OVER_DRAG * Math.tanh(newX);
};

export const useDrawerPanResponder = ({
  pin,
  drawerAnimation,
  animateDrawerIn,
  handleCloseRequest,
  disableCapturePanGestureToDismiss,
}: UseDrawerPanResponderParams) => {
  const { width } = useWindowDimensions();
  const drawerWidth = width * horizontalDrawerWidth;

  /** calculates drawer transformation based on gesture event */
  const normalizeDragDistance = useCallback(
    (
      distance: number,
      inputMax: number,
      /** this basically creates a lag between press velocity and drawer animation, changes variably based on drawer size/layout */
      outputMax: number,
      clamp: boolean,
    ): number => {
      return modulate(distance, {
        inputRange: [0, inputMax],
        outputRange: [0, outputMax],
        clamp,
      });
    },
    [],
  );

  /** calculates whether gesture was great enough to warrant a response */
  const shouldHandleGesture = useCallback(
    ({ dx, dy }: PanResponderGestureState) => {
      if (pin === 'bottom') {
        return dy > MIN_PAN_DISTANCE || dy < -MIN_PAN_DISTANCE;
      }
      return dx > MIN_PAN_DISTANCE || dx < -MIN_PAN_DISTANCE;
    },
    [pin],
  );

  const shouldCaptureGestures = useCallback(
    (_: GestureResponderEvent, state: PanResponderGestureState) => {
      if (disableCapturePanGestureToDismiss) {
        return false;
      }
      return shouldHandleGesture(state);
    },
    [shouldHandleGesture, disableCapturePanGestureToDismiss],
  );

  /** translate gesture state based on pin position */
  const parseGestureState = useCallback(
    (gestureState: PanResponderGestureState) => {
      let dragDirection: DragDirection;
      let isOverDrag = false;

      const distance = pin === 'top' || pin === 'bottom' ? gestureState.dy : gestureState.dx;
      const velocity = pin === 'top' || pin === 'bottom' ? gestureState.vy : gestureState.vx;
      const isDragging = Math.abs(distance) > MIN_PAN_DISTANCE;

      switch (pin) {
        case 'left':
        case 'right':
          dragDirection = gestureState.dx <= 0 ? 'left' : 'right';
          break;
        case 'bottom':
        case 'top':
        default:
          dragDirection = gestureState.dy <= 0 ? 'up' : 'down';
          break;
      }

      switch (pin) {
        case 'left':
          isOverDrag = dragDirection === 'right';
          break;
        case 'right':
          isOverDrag = dragDirection === 'left';
          break;
        case 'bottom':
          isOverDrag = dragDirection === 'up';
          break;
        case 'top':
        default:
          isOverDrag = dragDirection === 'down';
          break;
      }

      return {
        distance,
        velocity,
        isDragging,
        dragDirection,
        isOverDrag,
      };
    },
    [pin],
  );

  const isTryingToDismiss = useCallback(
    (dragDirection: DragDirection) => {
      if (
        (pin === 'left' && dragDirection === 'left') ||
        (pin === 'right' && dragDirection === 'right') ||
        (pin === 'bottom' && dragDirection === 'down') ||
        (pin === 'top' && dragDirection === 'up')
      ) {
        return true;
      }
      return false;
    },
    [pin],
  );

  const shouldDismiss = useCallback(
    (gestureState: PanResponderGestureState): boolean => {
      const { velocity, dragDirection, distance } = parseGestureState(gestureState);
      if (isTryingToDismiss(dragDirection)) {
        switch (pin) {
          case 'top':
          case 'left':
            return (
              velocity <= -DISMISSAL_VELOCITY_THRESHOLD || distance <= -DISMISSAL_DRAG_THRESHOLD
            );
          case 'bottom':
          case 'right':
          default:
            return velocity >= DISMISSAL_VELOCITY_THRESHOLD || distance > DISMISSAL_DRAG_THRESHOLD;
        }
      }
      return false;
    },
    [isTryingToDismiss, parseGestureState, pin],
  );

  const panGestureHandlers = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: shouldCaptureGestures,
      onMoveShouldSetPanResponderCapture: shouldCaptureGestures,
      onPanResponderMove: (_, gestureState) => {
        const { isDragging, distance, isOverDrag } = parseGestureState(gestureState);
        const invertedPin = pin === 'bottom' || pin === 'right';
        const isHorizontalDrawer = pin === 'left' || pin === 'right';

        if (isDragging) {
          if (isOverDrag) {
            const normalizedDistance = normalizeDragDistance(
              Math.abs(distance),
              MAX_OVER_DRAG,
              0.1,
              true,
            );
            drawerAnimation.setOffset(calculateDragOffset(normalizedDistance));
          } else {
            // output max is ideal for when drawer reaches max height
            const normalizedDistance = normalizeDragDistance(
              distance,
              invertedPin ? -drawerWidth : drawerWidth,
              isHorizontalDrawer ? 0.7 : 0.4,
              false,
            );
            drawerAnimation.setOffset(normalizedDistance);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        drawerAnimation.flattenOffset();
        if (shouldDismiss(gestureState)) {
          return handleCloseRequest();
        }
        return animateDrawerIn.start();
      },
    });
  }, [
    drawerAnimation,
    animateDrawerIn,
    parseGestureState,
    shouldCaptureGestures,
    shouldDismiss,
    handleCloseRequest,
    drawerWidth,
    normalizeDragDistance,
    pin,
  ]);

  return panGestureHandlers;
};
