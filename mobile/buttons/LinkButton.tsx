import React, { useMemo, memo } from 'react';

import {
  useLinkButtonVariant,
  LinkButtonVariant,
} from '@cbhq/cds-common/hooks/useLinkButtonVariant';
import { Animated, View } from 'react-native';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { usePalette } from '../hooks/usePalette';
import { usePressAnimation } from '../hooks/usePressAnimation';
import { TextHeadline } from '../typography/TextHeadline';
import { ButtonProps } from './Button';
import { baseStyles } from './buttonStyle';
import { PressableHighlight } from './PressableHighlight';

export interface LinkButtonProps extends Omit<ButtonProps, 'variant' | 'loading'> {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: LinkButtonVariant;
}

export const LinkButton = memo(
  ({
    accessibilityLabel,
    block,
    children,
    compact,
    disabled,
    feedback,
    onPress,
    testID,
    variant = 'primary',
  }: LinkButtonProps) => {
    const palette = usePalette();
    const [pressIn, pressOut, pressScale] = usePressAnimation();
    const spacingStyles = useButtonSpacing(compact);
    const { color, backgroundColor, borderColor } = useLinkButtonVariant(variant);
    const viewStyles = useMemo(
      () => ({ backgroundColor: palette[backgroundColor], borderColor: palette[borderColor] }),
      [palette, backgroundColor, borderColor]
    );

    return (
      <Animated.View
        style={[
          block ? baseStyles.block : baseStyles.inline,
          compact ? baseStyles.pressableCompact : baseStyles.pressable,
          {
            transform: [{ scale: pressScale }],
          },
        ]}
      >
        <PressableHighlight
          accessibilityHint={accessibilityLabel}
          disabled={disabled}
          feedback={feedback}
          onPress={onPress}
          onPressIn={pressIn}
          onPressOut={pressOut}
          testID={testID}
          backgroundColor={backgroundColor}
        >
          <View
            style={[
              baseStyles.button,
              spacingStyles,
              compact && baseStyles.buttonCompact,
              disabled && baseStyles.disabled,
              viewStyles,
            ]}
          >
            <TextHeadline color={color}>{children}</TextHeadline>
          </View>
        </PressableHighlight>
      </Animated.View>
    );
  }
);

LinkButton.displayName = 'LinkButton';
