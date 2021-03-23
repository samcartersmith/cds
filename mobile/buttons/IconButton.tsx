import React, { memo, useMemo } from 'react';

import { IconButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { Animated, GestureResponderEvent, StyleSheet, View } from 'react-native';

import { PressableHighlight } from '../buttons/PressableHighlight';
import { usePalette } from '../hooks/usePalette';
import { usePressAnimation } from '../hooks/usePressAnimation';
import { Icon } from '../icons/Icon';
import { HapticFeedbackType } from '../types';

export interface IconButtonProps extends IconButtonBaseProps {
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

export const IconButton = memo(
  ({
    accessibilityLabel,
    disabled = false,
    feedback = 'none',
    name,
    onLongPress,
    onPress,
    testID,
    variant = 'secondary',
  }: IconButtonProps) => {
    const palette = usePalette();
    const [pressIn, pressOut, scale] = usePressAnimation();
    const { color, backgroundColor, borderColor } = useButtonVariant(variant);
    const viewStyles = useMemo(
      () => ({ backgroundColor: palette[backgroundColor], borderColor: palette[borderColor] }),
      [palette, backgroundColor, borderColor]
    );

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <PressableHighlight
          accessibilityHint={accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
          backgroundColor={backgroundColor}
          onPress={onPress}
          onPressIn={pressIn}
          onPressOut={pressOut}
          onLongPress={onLongPress}
          disabled={disabled}
          feedback={feedback}
          borderRadius={50}
          testID={testID}
        >
          <View style={[styles.iconButton, disabled && styles.disabled, viewStyles]}>
            <Icon name={name} size="s" color={color} />
          </View>
        </PressableHighlight>
      </Animated.View>
    );
  }
);

IconButton.displayName = 'IconButton';

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: borderWidth.button,
  },
  disabled: {
    opacity: opacityDisabled,
  },
});
