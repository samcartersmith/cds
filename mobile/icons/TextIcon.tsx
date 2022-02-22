import React, { memo, useMemo } from 'react';
import { Animated, StyleProp, Text, TextStyle } from 'react-native';
import { PaletteForeground } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';

import { usePalette } from '../hooks/usePalette';
import { IconProps } from './Icon';
import { iconGlyphMap } from './iconGlyphMap';

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
  const { iconSize } = useIconSize(size, false);
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

  if (iconGlyphMap[name][iconSize]) {
    return (
      <Component testID={testID} allowFontScaling={false} accessibilityRole="image" style={styles}>
        {iconGlyphMap[name][iconSize]}
      </Component>
    );
  }
  return <>{null}</>;
});
