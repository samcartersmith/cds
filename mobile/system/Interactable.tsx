import { memo } from 'react';

import { BorderRadius } from '@cbhq/cds-common';
import type { PaletteBackground } from '@cbhq/cds-common/types/Palette';
import {
  Animated,
  AccessibilityProps,
  GestureResponderEvent,
  Pressable,
  PressableProps,
} from 'react-native';

import { HapticFeedbackType } from '../types';
import { Haptics } from '../utils/haptics';
import { InteractionOpacity } from './InteractionOpacity';

export interface InteractableProps extends PressableProps, AccessibilityProps {
  backgroundColor: PaletteBackground;
  feedback?: HapticFeedbackType;
  disabled?: boolean;
  loading?: boolean;
  borderRadius?: BorderRadius;
  pressScale?: Animated.Value;
}

export const Interactable: React.FC<InteractableProps> = memo(function Interactable({
  children,
  disabled,
  feedback = 'none',
  loading,
  onPress,
  backgroundColor,
  borderRadius,
  pressScale,
  style,
  ...props
}) {
  const handlePress = (event: GestureResponderEvent) => {
    if (feedback === 'light') {
      Haptics.lightImpact();
    } else if (feedback === 'normal') {
      Haptics.normalImpact();
    } else if (feedback === 'heavy') {
      Haptics.heavyImpact();
    }

    onPress?.(event);
  };

  return (
    <Pressable
      accessibilityState={{ busy: loading, disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={style}
      {...props}
    >
      {({ pressed }) => (
        <InteractionOpacity
          pressed={pressed}
          backgroundColor={backgroundColor}
          disabled={disabled}
          loading={loading}
          borderRadius={borderRadius}
          pressScale={pressScale}
        >
          {children}
        </InteractionOpacity>
      )}
    </Pressable>
  );
});
