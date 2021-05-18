import React, { memo, useCallback, useState } from 'react';

import { emptyArray } from '@cbhq/cds-utils';
import {
  AccessibilityProps,
  GestureResponderEvent,
  Pressable as BasePressable,
  PressableProps as BasePressableProps,
} from 'react-native';

import { usePressAnimation } from '../hooks/usePressAnimation';
import { HapticFeedbackType } from '../types';
import { debounce } from '../utils/debounce';
import { Haptics } from '../utils/haptics';
import { Interactable, InteractableProps } from './Interactable';

export interface PressableProps
  extends Pick<
      BasePressableProps,
      'delayLongPress' | 'hitSlop' | 'onLongPress' | 'onPress' | 'pressRetentionOffset' | 'testID'
    >,
    AccessibilityProps {
  /**
   * Haptic feedback to trigger when being pressed.
   * @default none
   */
  feedback?: HapticFeedbackType;
  /** Is the element currenty loading. */
  loading?: boolean;
  /**
   * React Native is historically trash at debouncing touch events. This can cause a lot of
   * unwanted behavior such as double navigations where we push a screen onto the stack 2 times.
   * Debouncing the event 500 miliseconds, but taking the leading event prevents this effect and
   * the accidental "double-tap".
   */
  disableDebounce?: boolean;
}

export interface PressableInternalProps
  extends PressableProps,
    Omit<InteractableProps, 'pressed' | 'style'> {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Pressable will always be the outermost component so that we can handle overflow within a child without impacting hitSlop.
   * Pass any styles that impact layout to this prop (i.e width, flex-direction, etc).
   */
  style?: BasePressableProps['style'];
}

export const Pressable = memo(function Pressable({
  children,
  disabled,
  feedback = 'none',
  loading,
  onPress,
  noScaleOnPress,
  // Interactable
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  disableDebounce,
  elevation,
  style = emptyArray,
  transparentWhileInactive,
  ...props
}: PressableInternalProps) {
  const [pressIn, pressOut, pressScale] = usePressAnimation();
  const [pressed, setPressed] = useState(false);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (feedback === 'light') {
        Haptics.lightImpact();
      } else if (feedback === 'normal') {
        Haptics.normalImpact();
      } else if (feedback === 'heavy') {
        Haptics.heavyImpact();
      }

      if (onPress) {
        if (disableDebounce) {
          onPress(event);
        } else {
          debounce(onPress)(event);
        }
      }
    },
    [feedback, onPress, disableDebounce]
  );

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(true);
      pressIn(event);
    },
    [pressIn]
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(false);
      pressOut(event);
    },
    [pressOut]
  );

  return (
    <BasePressable
      accessibilityComponentType="button"
      accessibilityTraits="button"
      accessibilityState={{ busy: loading, disabled: !!disabled }}
      disabled={disabled || loading}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      {...props}
    >
      <Interactable
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        disabled={disabled || loading}
        elevation={elevation}
        pressed={pressed}
        style={!noScaleOnPress ? [{ transform: [{ scale: pressScale }] }] : undefined}
        transparentWhileInactive={transparentWhileInactive}
      >
        {children}
      </Interactable>
    </BasePressable>
  );
});
