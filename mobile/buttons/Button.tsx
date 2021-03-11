import React, { useMemo } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { borderRadius } from '@cbhq/cds-common/tokens/borderRadius';
import { opacityDisabled, opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { Animated, GestureResponderEvent, StyleSheet, View } from 'react-native';

import { usePressAnimation } from '../hooks/usePressAnimation';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { HapticFeedbackType } from '../types';
import { TextHeadline } from '../typography/TextHeadline';
import { PressableHighlight } from './PressableHighlight';
import { useButtonVariant } from './useButtonVariant';

export interface ButtonProps extends ButtonBaseProps {
  /**
   * Haptic feedback to trigger when being pressed.
   * @default none
   */
  feedback?: HapticFeedbackType;
  /** Event fired when the button is pressed. */
  onPress?: (event: GestureResponderEvent) => void;
}

export const Button = React.memo(
  ({
    accessibilityLabel,
    block,
    children,
    compact,
    disabled,
    feedback,
    loading,
    onPress,
    testID,
    variant = 'primary',
  }: ButtonProps) => {
    const [pressIn, pressOut, pressScale] = usePressAnimation();
    const { underlay, foregroundColor, ...variantStyles } = useButtonVariant(variant, compact);
    const spacingStyles = useSpacingStyles({
      spacingHorizontal: compact ? 2 : 3,
      spacingVertical: compact ? 0.5 : 1,
    });
    const textStyles = useMemo(() => ({ color: foregroundColor }), [foregroundColor]);

    return (
      <Animated.View
        style={[
          block ? styles.block : styles.inline,
          compact ? styles.pressableCompact : styles.pressable,
          {
            transform: [{ scale: pressScale }],
          },
        ]}
      >
        <PressableHighlight
          accessibilityHint={accessibilityLabel}
          activeOpacity={opacityPressed[0]}
          disabled={disabled || loading}
          feedback={feedback}
          onPress={onPress}
          onPressIn={pressIn}
          onPressOut={pressOut}
          testID={testID}
          underlayColor={underlay}
        >
          <View
            style={[
              styles.button,
              variantStyles,
              spacingStyles,
              compact && styles.buttonCompact,
              (disabled || loading) && styles.disabled,
            ]}
          >
            <TextHeadline dangerouslySetStyle={textStyles}>{children}</TextHeadline>
          </View>
        </PressableHighlight>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 56,
    borderWidth: 1,
    borderRadius: borderRadius.standard,
    borderStyle: 'solid',
  },
  buttonCompact: {
    borderRadius: borderRadius.compact,
    width: 'auto',
    height: 36,
  },
  inline: {
    width: 'auto',
    minWidth: 64,
  },
  block: {
    width: '100%',
    maxWidth: '100%',
  },
  disabled: {
    opacity: opacityDisabled,
  },
  pressable: {
    borderRadius: borderRadius.standard,
    overflow: 'hidden',
  },
  pressableCompact: {
    borderRadius: borderRadius.compact,
    overflow: 'hidden',
  },
});
