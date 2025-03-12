import React, { memo, useMemo } from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { IconSize, IconSourcePixelSize } from '@cbhq/cds-common2/types/IconSize';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { useTheme } from '../hooks/useTheme';
import { TextLabel2, TextProps } from '../typography';

export type HelperTextProps = {
  /**
   * Determines the color of the text
   * @default fgMuted
   */
  color?: ThemeVars.Color;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
} & TextProps;

const sourceSizeMap: {
  [key in IconSize]: IconSourcePixelSize;
} = {
  xs: 12,
  s: 12,
  m: 16,
  l: 24,
};

export const HelperText = memo(function HelperText({
  color,
  errorIconAccessibilityLabel,
  errorIconTestID,
  children,
  align,
  dangerouslySetColor,
  ...props
}: HelperTextProps) {
  const theme = useTheme();
  // Get info icon for negative variant
  const iconSize = theme.iconSize.xs;
  const sourceSize = sourceSizeMap.xs;
  const glyphKey = `ui-info-${sourceSize}` as const;
  const glyph = glyphMap[glyphKey];

  const fontStyles = useMemo(
    () => ({
      fontFamily: 'CoinbaseIcons',
      fontSize: iconSize,
      height: iconSize,
      width: iconSize,
      letterSpacing: 4,
    }),
    [iconSize],
  );

  return (
    <TextLabel2 align={align} color={color} dangerouslySetColor={dangerouslySetColor} {...props}>
      {color === 'fgNegative' && (
        <TextLabel2
          accessible
          accessibilityLabel={errorIconAccessibilityLabel}
          accessibilityRole="image"
          align={align}
          color={color}
          dangerouslySetColor={dangerouslySetColor}
          style={fontStyles}
          testID={errorIconTestID}
        >
          {glyph}
        </TextLabel2>
      )}
      {children}
    </TextLabel2>
  );
});
