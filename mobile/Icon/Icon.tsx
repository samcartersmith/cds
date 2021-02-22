import React, { useMemo } from 'react';

import { PaletteForeground, useIconSize } from '@cbhq/cds-common';
import { Animated, Text, TextStyle } from 'react-native';

import { Box } from '../Box/Box';
import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { iconGlyphMap } from './iconGlyphMap';
import { IconOutline } from './IconOutline';
import { IconProps } from './IconProps';

export type { IconProps };

export const Icon = ({
  animated = false,
  bordered = false,
  color = 'primary' as PaletteForeground,
  size,
  name,
  dangerouslySetColor,
  dangerouslySetStyle,
  // Spacing
  spacing,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  spacingVertical,
  spacingHorizontal,
}: IconProps) => {
  const space = useSpacingStyles({
    all: spacing,
    top: spacingTop,
    bottom: spacingBottom,
    start: spacingStart,
    end: spacingEnd,
    vertical: spacingVertical,
    horizontal: spacingHorizontal,
  });
  const TextComponent = animated ? Animated.Text : Text;
  const { wrapperSize, iconSize } = useIconSize(size, bordered);
  const iconColor = usePalette()[color];
  const finalColor = dangerouslySetColor ?? iconColor;

  const fontStyles = useMemo(
    () => ({
      fontFamily: 'CoinbaseIcons',
      fontSize: iconSize,
      height: iconSize,
      width: iconSize,
      lineHeight: iconSize,
      color: finalColor,
    }),
    [finalColor, iconSize]
  );

  const style = useMemo(
    () => [fontStyles, space, dangerouslySetStyle as TextStyle].filter(Boolean),
    [dangerouslySetStyle, fontStyles, space]
  );

  if (iconSize in iconGlyphMap && name in iconGlyphMap[iconSize]) {
    return (
      <Box alignItems="center" justifyContent="center" width={wrapperSize} height={wrapperSize}>
        <TextComponent style={style}>{iconGlyphMap[iconSize][name]}</TextComponent>
        {bordered && <IconOutline animated size={wrapperSize} color={iconColor} />}
      </Box>
    );
  }
  return <>{null}</>;
};
