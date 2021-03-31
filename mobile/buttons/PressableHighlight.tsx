import React, { useCallback, useMemo, useState } from 'react';

import { PaletteBackground, usePaletteConfig } from '@cbhq/cds-common';
import { opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { extractHueStep } from '@cbhq/cds-common/utils/extractHueStep';
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

export interface InteractableProps {
  /**
   * Haptic feedback to trigger when being pressed.
   * @default none
   */
  feedback?: HapticFeedbackType;
  /** Event fired when the button is pressed. */
  onPress?: (event: GestureResponderEvent) => void;
  /** Event fired when the button is held for a long period and pressed. */
  onLongPress?: (event: GestureResponderEvent) => void;
}

export interface PressableHighlightProps extends Omit<PressableProps, 'style'>, AccessibilityProps {
  /** Background color of the overlay (element being interacted with). */
  backgroundColor: PaletteBackground;
  dangerouslySetStyle?: ViewStyle;
  feedback?: HapticFeedbackType;
  hideUnderlay?: boolean;
  loading?: boolean;
}

export const PressableHighlight = ({
  backgroundColor,
  children,
  disabled,
  feedback = 'none',
  hideUnderlay,
  loading,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: PressableHighlightProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const palette = usePalette();
  const paletteConfig = usePaletteConfig();
  const spectrumAlias = paletteConfig[backgroundColor];
  const spectrumStep = useMemo(() => extractHueStep(spectrumAlias) ?? 60, [spectrumAlias]);

  const backgroundOpacity = useMemo(() => (isPressed ? opacityPressed[spectrumStep] : 1), [
    isPressed,
    spectrumStep,
  ]);

  const underlayColor = spectrumStep > 60 ? 'background' : 'foreground';
  const underlayStyles = useMemo(
    () =>
      ({
        backgroundColor: palette[underlayColor],
        ...StyleSheet.absoluteFillObject,
      } as const),
    [palette, underlayColor]
  );

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

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      setIsPressed(true);
      onPressIn?.(event);
    },
    [onPressIn]
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      setIsPressed(false);
      onPressOut?.(event);
    },
    [onPressOut]
  );

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
      {isPressed && !disabled && !hideUnderlay && <View style={underlayStyles} />}

      <View
        style={isPressed ? { opacity: backgroundOpacity } : undefined}
        renderToHardwareTextureAndroid={isPressed}
      >
        {children}
      </View>
    </Pressable>
  );
};
