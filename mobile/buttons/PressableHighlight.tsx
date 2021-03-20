import React, { useState } from 'react';

import {
  AccessibilityProps,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { HapticFeedbackType } from '../types';
import { Haptics } from '../utils/haptics';

export interface PressableHighlightProps extends Omit<PressableProps, 'style'>, AccessibilityProps {
  activeOpacity?: number;
  dangerouslySetStyle?: ViewStyle;
  feedback?: HapticFeedbackType;
  loading?: boolean;
  underlayColor?: string | false;
  borderRadius?: number;
}

export const PressableHighlight = ({
  activeOpacity = 0.98,
  children,
  disabled,
  feedback = 'none',
  loading,
  onPress,
  onPressIn,
  onPressOut,
  underlayColor,
  borderRadius = 0,
  ...props
}: PressableHighlightProps) => {
  const palette = usePalette();
  const [isPressed, setIsPressed] = useState(false);

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

  const handlePressIn = (event: GestureResponderEvent) => {
    setIsPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setIsPressed(false);
    onPressOut?.(event);
  };

  return (
    <Pressable
      accessibilityComponentType="button"
      accessibilityTraits="button"
      accessibilityState={{ busy: loading, disabled: !!disabled, selected: isPressed }}
      disabled={disabled}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <View>
        {underlayColor !== false && isPressed && !disabled ? (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: borderRadius, backgroundColor: underlayColor || palette.foreground },
            ]}
          />
        ) : null}
        <View
          style={isPressed ? { opacity: activeOpacity } : undefined}
          renderToHardwareTextureAndroid={isPressed}
        >
          {children}
        </View>
      </View>
    </Pressable>
  );
};
