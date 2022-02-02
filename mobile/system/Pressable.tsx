import React, { memo, useCallback, useMemo, useState } from 'react';

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

export type LinkableProps = Pick<BasePressableProps, 'onPress'>;

export type PressableProps = {
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
} & Pick<
  BasePressableProps,
  'delayLongPress' | 'hitSlop' | 'onLongPress' | 'onPress' | 'pressRetentionOffset' | 'testID'
> &
  AccessibilityProps;

export type PressableInternalProps = {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  /** Callback fired before `onPress` when button is pressed. */
  onPressIn?: (event: GestureResponderEvent) => void;
  /** Callback fired before `onPress` when button is released. */
  onPressOut?: (event: GestureResponderEvent) => void;
  /**
   * Pressable will always be the outermost component so that we can handle overflow within a child without impacting hitSlop.
   * Pass any styles that impact layout to this prop (i.e width, flex-direction, etc).
   */
  style?: BasePressableProps['style'];
} & PressableProps &
  Omit<InteractableProps, 'pressed' | 'style'>;

export const Pressable = memo(function Pressable({
  children,
  disabled,
  feedback = 'none',
  loading,
  onPress,
  onPressIn,
  onPressOut,
  noScaleOnPress,
  // Interactable
  backgroundColor,
  block,
  borderColor,
  borderRadius,
  borderWidth,
  disableDebounce,
  elevation,
  style = emptyArray,
  contentStyle,
  transparentWhileInactive,
  ...props
}: PressableInternalProps) {
  const [pressIn, pressOut, pressScale] = usePressAnimation();
  const [pressed, setPressed] = useState(false);

  const onPressHandler = useMemo(
    () => (event: GestureResponderEvent) => {
      if (feedback === 'light') {
        void Haptics.lightImpact();
      } else if (feedback === 'normal') {
        void Haptics.normalImpact();
      } else if (feedback === 'heavy') {
        void Haptics.heavyImpact();
      }

      if (onPress) {
        onPress(event);
      }
    },
    [feedback, onPress],
  );

  const debouncedOnPressHandler = useMemo(() => debounce(onPressHandler), [onPressHandler]);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (!disableDebounce) {
        debouncedOnPressHandler(event);
      } else {
        onPressHandler(event);
      }
    },
    [debouncedOnPressHandler, onPressHandler, disableDebounce],
  );

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(true);
      pressIn(event);
      onPressIn?.(event);
    },
    [pressIn, onPressIn],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(false);
      pressOut(event);
      onPressOut?.(event);
    },
    [pressOut, onPressOut],
  );

  return (
    <BasePressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: !!disabled }}
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled={disabled || loading}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      {...props}
    >
      <Interactable
        backgroundColor={backgroundColor}
        block={block}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        disabled={disabled || loading}
        elevation={elevation}
        pressed={pressed}
        style={!noScaleOnPress ? [{ transform: [{ scale: pressScale }] }] : undefined}
        contentStyle={contentStyle}
        transparentWhileInactive={transparentWhileInactive}
      >
        {children}
      </Interactable>
    </BasePressable>
  );
});
