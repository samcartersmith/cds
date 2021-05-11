import React, { useMemo, cloneElement } from 'react';

import { PaletteForeground } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { Animated, Text } from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box } from '../layout/Box';
import { iconGlyphMap } from './iconGlyphMap';
import { IconOutline } from './IconOutline';
import { IconProps } from './IconProps';

export type { IconProps };

export const Icon = ({
  animated = false,
  badge,
  bordered = false,
  color = 'primary' as PaletteForeground,
  size,
  name,
  testID,
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
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
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

  const boxStyles = useMemo(() => [space, dangerouslySetStyle].filter(Boolean), [
    dangerouslySetStyle,
    space,
  ]);

  if (name in iconGlyphMap && iconSize in iconGlyphMap[name]) {
    return (
      <Box dangerouslySetStyle={boxStyles} testID={testID}>
        <Box alignItems="center" justifyContent="center" width={wrapperSize} height={wrapperSize}>
          <TextComponent allowFontScaling={false} style={fontStyles}>
            {iconGlyphMap[name][iconSize]}
          </TextComponent>
          {bordered && <IconOutline animated size={wrapperSize} color={iconColor} />}
          {badge &&
            cloneElement(badge, {
              position: 'absolute',
              top: '-45%',
              right: '-50%',
            })}
        </Box>
      </Box>
    );
  }
  return <>{null}</>;
};
