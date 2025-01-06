import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, TextStyle } from 'react-native';
import { IconPixelSize, IconSourcePixelSize } from '@cbhq/cds-common2';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

type IconOutlineProps = {
  animated: boolean;
  size: IconPixelSize;
  sourceSize: IconSourcePixelSize;
  color: string;
};
export const IconOutline = ({ animated, size, sourceSize, color }: IconOutlineProps) => {
  const textStyles: TextStyle = useMemo(
    () => ({
      color,
      fontFamily: 'CoinbaseIcons',
      height: size,
      width: size,
      lineHeight: size,
      fontSize: size,
      textAlign: 'center' as const,
      textAlignVertical: 'center' as const,
      ...StyleSheet.absoluteFillObject,
    }),
    [color, size],
  );

  const glyphKey = `ui-outline-${sourceSize}` as const;
  const glyph = glyphMap[glyphKey];

  const TextComponent = animated ? Animated.Text : Text;
  return (
    <TextComponent allowFontScaling={false} style={textStyles}>
      {glyph}
    </TextComponent>
  );
};
