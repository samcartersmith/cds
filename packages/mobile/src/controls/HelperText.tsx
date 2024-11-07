import React, { memo, useMemo } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { TextBody, TextLabel2, TextProps } from '../typography';

export type HelperTextProps = {
  /**
   * Determines the color of the text
   * @default foregroundMuted
   */
  color?: InputVariant;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
} & TextProps;

export const HelperText = memo(function HelperText({
  color,
  errorIconAccessibilityLabel,
  errorIconTestID,
  children,
  align,
  dangerouslySetColor,
  ...props
}: HelperTextProps) {
  const density = useScaleDensity();
  const TextComponent = useMemo(() => (density === 'dense' ? TextBody : TextLabel2), [density]);

  // Get info icon for negative variant
  const { iconSize, sourceSize } = useIconSize('xs', false);
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
    <TextComponent align={align} color={color} dangerouslySetColor={dangerouslySetColor} {...props}>
      {color === 'negative' && (
        <TextComponent
          accessible
          accessibilityLabel={errorIconAccessibilityLabel}
          accessibilityRole="image"
          align={align}
          allowFontScaling={false}
          color={color}
          dangerouslySetColor={dangerouslySetColor}
          style={fontStyles}
          testID={errorIconTestID}
        >
          {glyph}
        </TextComponent>
      )}
      {children}
    </TextComponent>
  );
});
