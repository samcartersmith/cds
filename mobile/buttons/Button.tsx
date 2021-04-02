import React, { memo, useMemo } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { Animated, StyleSheet, View } from 'react-native';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { usePalette } from '../hooks/usePalette';
import { usePressAnimation } from '../hooks/usePressAnimation';
import { TextHeadline } from '../typography/TextHeadline';
import { PressableHighlight, InteractableProps } from './PressableHighlight';

export interface ButtonProps extends ButtonBaseProps, InteractableProps {}

export const Button = memo(
  ({
    accessibilityLabel,
    block,
    children,
    compact,
    disabled,
    feedback,
    loading,
    onPress,
    onLongPress,
    testID,
    variant = 'primary',
  }: ButtonProps) => {
    const palette = usePalette();
    const [pressIn, pressOut, pressScale] = usePressAnimation();
    const { color, backgroundColor, borderColor } = useButtonVariant(variant);
    const isDisabled = disabled || loading;

    const spacingStyles = useButtonSpacing(compact);
    const containerStyles = useMemo(
      () => [
        {
          borderColor: palette[borderColor],
          backgroundColor: palette[backgroundColor],
        },
      ],
      [backgroundColor, borderColor, palette]
    );
    const buttonStyles = useMemo(
      () => [
        styles.button,
        { backgroundColor: palette[backgroundColor] },
        spacingStyles,
        compact && styles.buttonCompact,
      ],
      [backgroundColor, compact, palette, spacingStyles]
    );

    return (
      <Animated.View
        style={[
          containerStyles,
          styles.pressable,
          compact && styles.pressableCompact,
          block ? styles.block : styles.inline,
          isDisabled && styles.disabled,
          {
            transform: [{ scale: pressScale }],
          },
        ]}
      >
        <PressableHighlight
          accessibilityHint={accessibilityLabel}
          backgroundColor={backgroundColor}
          disabled={isDisabled}
          feedback={feedback || (compact ? 'light' : 'normal')}
          onPress={onPress}
          onPressIn={pressIn}
          onPressOut={pressOut}
          onLongPress={onLongPress}
          testID={testID}
        >
          <View style={buttonStyles}>
            <TextHeadline color={color}>{children}</TextHeadline>
          </View>
        </PressableHighlight>
      </Animated.View>
    );
  }
);

Button.displayName = 'Button';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 56,
  },
  buttonCompact: {
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
  // eslint-disable-next-line react-native/no-color-literals
  disabled: {
    opacity: opacityDisabled,
    borderColor: 'transparent',
  },
  pressable: {
    overflow: 'hidden',
    borderWidth: borderWidth.button,
    borderRadius: borderRadius.standard,
    borderStyle: 'solid',
  },
  pressableCompact: {
    borderRadius: borderRadius.compact,
  },
});
