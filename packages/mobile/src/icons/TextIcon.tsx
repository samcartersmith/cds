import React, { memo, useMemo } from 'react';
import { Animated, StyleProp, Text, TextStyle } from 'react-native';
import { IconName, PaletteForeground } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { usePalette } from '../hooks/usePalette';

import { IconProps } from './Icon';

export type TextIconProps = Pick<IconProps, 'color' | 'size' | 'testID'> & {
  name: IconName;
} & (
    | {
        animated: true;
        style: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
      }
    | {
        animated?: false | undefined;
        style?: StyleProp<TextStyle>;
      }
  );
/**
 *
 * This is a simplified, text-only version of the Icon component.
 * Nested text components need to all be RN Text and the Icon component has a box wrapper to handle border and badges.
 * Adheres to all the requirements for Nested Text on react native. https://reactnative.dev/docs/text#nested-text
 */
export const TextIcon = memo(function TextIcon({
  animated,
  color = 'primary' as PaletteForeground,
  size,
  name,
  testID,
  style,
}: TextIconProps) {
  const Component = animated ? Animated.Text : Text;
  const { iconSize, sourceSize } = useIconSize(size || 'm', false);
  const iconColor = usePalette()[color];

  const styles = useMemo(
    () =>
      [
        {
          fontFamily: 'CoinbaseIcons',
          fontSize: iconSize,
          color: iconColor,
        },
        style,
      ] as TextStyle,
    [style, iconColor, iconSize],
  );

  const glyphKey = `ui-${name}-${sourceSize}` as const;
  const glyph = glyphMap[glyphKey];

  if (glyph) {
    return (
      <Component accessibilityRole="image" allowFontScaling={false} style={styles} testID={testID}>
        {glyph}
      </Component>
    );
  }
  return null;
});
