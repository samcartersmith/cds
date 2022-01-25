import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, TextStyle } from 'react-native';
import { IconPixelSize } from '@cbhq/cds-common';

import { iconGlyphMap } from './iconGlyphMap';

type IconOutlineProps = {
  animated: boolean;
  size: IconPixelSize;
  color: string;
};
export const IconOutline = ({ animated, size, color }: IconOutlineProps) => {
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

  const TextComponent = animated ? Animated.Text : Text;
  return (
    <TextComponent allowFontScaling={false} style={textStyles}>
      {iconGlyphMap.outline[size]}
    </TextComponent>
  );
};
