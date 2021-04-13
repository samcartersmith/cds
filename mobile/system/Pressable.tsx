import React, { memo, useCallback } from 'react';

import { emptyArray } from '@cbhq/cds-utils';
import {
  AccessibilityProps,
  GestureResponderEvent,
  Pressable as BasePressable,
  PressableProps as BasePressableProps,
} from 'react-native';

import { usePressAnimation } from '../hooks/usePressAnimation';
import { HapticFeedbackType } from '../types';
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
}

export interface PressableInternalProps extends PressableProps, Omit<InteractableProps, 'pressed'> {
  /** Dont scale on press. */
  noScaleOnPress?: boolean;
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
  style = emptyArray,
  ...props
}: PressableInternalProps) {
  const [pressIn, pressOut, pressScale] = usePressAnimation();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (feedback === 'light') {
        Haptics.lightImpact();
      } else if (feedback === 'normal') {
        Haptics.normalImpact();
      } else if (feedback === 'heavy') {
        Haptics.heavyImpact();
      }

      onPress?.(event);
    },
    [feedback, onPress]
  );

  return (
    <BasePressable
      accessibilityComponentType="button"
      accessibilityTraits="button"
      accessibilityState={{ busy: loading, disabled: !!disabled }}
      disabled={disabled || loading}
      onPress={handlePress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      {...props}
    >
      {({ pressed }) => (
        <Interactable
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          disabled={disabled || loading}
          pressed={pressed}
          style={[...style, !noScaleOnPress && { transform: [{ scale: pressScale }] }]}
        >
          {children}
        </Interactable>
      )}
    </BasePressable>
  );
});
