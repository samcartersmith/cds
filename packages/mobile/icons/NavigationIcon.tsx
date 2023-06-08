import React, { memo, useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { NavigationBaseIconProps } from '@cbhq/cds-common/types/NavigationBaseIconProps';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { isDevelopment } from '@cbhq/cds-utils';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';

export type NavigationIconProps = NavigationBaseIconProps;

export const NavigationIcon = memo(function NavigationIcon({
  active = false,
  fallback = null,
  name,
  size = 'm',
  testID,
  // Spacing
  spacing,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  spacingVertical,
  spacingHorizontal,
}: NavigationIconProps) {
  const { wrapperSize, iconSize, sourceSize } = useIconSize(size);
  const iconColor = usePalette()[active ? 'primary' : 'foreground'];

  const fontStyles = useMemo(
    () => ({
      fontFamily: 'CoinbaseIcons',
      fontSize: iconSize,
      height: iconSize,
      width: iconSize,
      lineHeight: iconSize,
      color: iconColor,
    }),
    [iconColor, iconSize],
  );

  const activeSuffix = active ? 'active' : 'inactive';
  const glyphKey = `nav-${name}-${sourceSize}-${activeSuffix}` as const;
  const glyph = glyphMap[glyphKey];

  if (glyph === undefined) {
    if (isDevelopment()) {
      // eslint-disable-next-line no-console
      console.error(
        `Unable to find NavigationIcon with name: ${name}. Full internal lookup name is ${glyphKey}`,
      );
    }
    return fallback;
  }

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      width={wrapperSize}
      height={wrapperSize}
      spacing={spacing}
      spacingTop={spacingTop}
      spacingBottom={spacingBottom}
      spacingStart={spacingStart}
      spacingEnd={spacingEnd}
      spacingVertical={spacingVertical}
      spacingHorizontal={spacingHorizontal}
      testID={testID}
    >
      <Text allowFontScaling={false} accessibilityRole="image" style={fontStyles as TextStyle}>
        {glyph}
      </Text>
    </Box>
  );
});

NavigationIcon.displayName = 'NavigationIcon';
