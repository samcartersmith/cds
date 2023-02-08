import React, { memo, useMemo } from 'react';
import { Animated, StyleProp, Text, TextStyle } from 'react-native';
import { PaletteForeground } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { usePalette } from '../hooks/usePalette';

import { IconProps } from './Icon';

export type TextIconProps = Pick<IconProps, 'color' | 'size' | 'name' | 'testID'> &
  (
    | {
        animated: true;
        dangerouslySetStyle: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
      }
    | {
        animated?: false | undefined;
        dangerouslySetStyle?: StyleProp<TextStyle>;
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
  dangerouslySetStyle,
}: TextIconProps) {
  const Component = animated ? Animated.Text : Text;
  const { iconSize, sourceSize } = useIconSize(size, false);
  const iconColor = usePalette()[color];

  const styles = useMemo(
    () =>
      [
        {
          fontFamily: 'CoinbaseIcons',
          fontSize: iconSize,
          color: iconColor,
        },
        dangerouslySetStyle,
      ] as TextStyle,
    [dangerouslySetStyle, iconColor, iconSize],
  );

  const glyphKey = `ui-${name}-${sourceSize}` as const;
  const glyph = glyphMap[glyphKey];

  if (glyph) {
    return (
      <Component testID={testID} allowFontScaling={false} accessibilityRole="image" style={styles}>
        {glyph}
      </Component>
    );
  }
  return null;
});
