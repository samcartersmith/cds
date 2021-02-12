import React, { useMemo } from 'react';

import { ButtonBaseProps } from '@cds/common';
import { Animated, GestureResponderEvent, StyleSheet, View } from 'react-native';

import { usePressAnimation } from '../hooks/usePressAnimation';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { PressableHighlight } from '../Pressable/PressableHighlight';
import { TextHeadline } from '../Text/Text';
import { HapticFeedbackType } from '../types';
import { useButtonVariant } from './useButtonVariant';

export interface ButtonProps extends ButtonBaseProps {
  /**
   * Haptic feedback to trigger when being pressed.
   * @default none
   */
  feedback?: HapticFeedbackType;
  /** Event fired when the button is pressed. */
  onPress?: (event: GestureResponderEvent) => void;
  /** @internal Testing purposes. */
  testID?: string;
}

export const Button = React.memo(
  ({
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
      horizontal: compact ? 2 : 3,
      vertical: compact ? 0.5 : 1,
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
          activeOpacity={0.92}
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
    borderRadius: 8,
    borderStyle: 'solid',
  },
  buttonCompact: {
    borderRadius: 4,
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
    // TODO use shared tokens
    opacity: 0.38,
  },
  pressable: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  pressableCompact: {
    borderRadius: 4,
    overflow: 'hidden',
  },
});
