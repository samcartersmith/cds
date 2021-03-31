import React, { memo, useMemo } from 'react';

import { IconButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { Animated, StyleSheet, View } from 'react-native';

import { PressableHighlight, InteractableProps } from '../buttons/PressableHighlight';
import { usePalette } from '../hooks/usePalette';
import { usePressAnimation } from '../hooks/usePressAnimation';
import { Icon } from '../icons/Icon';

export interface IconButtonProps extends IconButtonBaseProps, InteractableProps {}

export const IconButton = memo(
  ({
    accessibilityLabel,
    disabled,
    feedback,
    name,
    onLongPress,
    onPress,
    testID,
    variant = 'secondary',
  }: IconButtonProps) => {
    const palette = usePalette();
    const [pressIn, pressOut, scale] = usePressAnimation();
    const { color, backgroundColor, borderColor } = useButtonVariant(variant);

    const containerStyles = useMemo(
      () => ({
        borderColor: palette[borderColor],
        backgroundColor: palette[backgroundColor],
      }),
      [backgroundColor, borderColor, palette]
    );
    const buttonStyles = useMemo(
      () => [
        styles.iconButton,
        { backgroundColor: palette[backgroundColor], borderColor: palette[borderColor] },
      ],
      [palette, backgroundColor, borderColor]
    );

    return (
      <Animated.View
        style={[
          containerStyles,
          styles.pressable,
          disabled && styles.disabled,
          { transform: [{ scale }] },
        ]}
      >
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
          testID={testID}
        >
          <View style={buttonStyles}>
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
  },
  disabled: {
    opacity: opacityDisabled,
  },
  pressable: {
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: borderWidth.button,
    borderStyle: 'solid',
  },
});
