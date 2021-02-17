import React, { useMemo } from 'react';

import { IconPixelSize } from '@cds/common';
import { StyleSheet, TextStyle, Animated, Text } from 'react-native';

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
    [color, size]
  );

  const TextComponent = animated ? Animated.Text : Text;
  return <TextComponent style={textStyles}>{iconGlyphMap[size]['outline']}</TextComponent>;
};
