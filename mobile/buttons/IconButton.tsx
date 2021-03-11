import React from 'react';

import { IconButtonBaseProps } from '@cbhq/cds-common';
import { opacityDisabled, opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { Animated, GestureResponderEvent, StyleSheet, View } from 'react-native';

import { PressableHighlight } from '../buttons/PressableHighlight';
import { usePressAnimation } from '../hooks/usePressAnimation';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Icon } from '../icons/Icon';
import { HapticFeedbackType } from '../types';
import { useIconButtonVariant } from './useIconButtonVariant';

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

// TODO: Does not support offset prop. Need to fix
export const IconButton: React.FC<IconButtonProps> = React.memo(
  ({
    accessibilityLabel,
    feedback = 'none',
    testID,
    name,
    variant = 'secondary',
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
    onPress,
    onLongPress,
    disabled = false,
    ...props
  }) => {
    const [pressIn, pressOut, scale] = usePressAnimation();
    const { foregroundColor, ...variantStyles } = useIconButtonVariant(variant);
    const spacingStyles = useSpacingStyles({
      spacing,
      spacingTop,
      spacingBottom,
      spacingStart,
      spacingEnd,
      spacingVertical,
      spacingHorizontal,
    });

    return (
      <View {...props} style={spacingStyles} testID={testID}>
        <PressableHighlight
          accessibilityHint={accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
          activeOpacity={opacityPressed[0]}
          onPress={onPress}
          onPressIn={pressIn}
          onPressOut={pressOut}
          onLongPress={onLongPress}
          disabled={disabled}
          feedback={feedback}
          borderRadius={50}
        >
          <Animated.View
            style={[
              styles.iconButton,
              disabled ? styles.disabled : undefined,
              variantStyles,
              { transform: [{ scale }] },
            ]}
          >
            <Icon name={name} size="s" color={foregroundColor} />
          </Animated.View>
        </PressableHighlight>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
  },
  disabled: {
    opacity: opacityDisabled,
  },
});
