import React, { memo, useMemo } from 'react';
import { Animated, Text, TextStyle } from 'react-native';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import type {
  IconBaseProps,
  PaletteForeground,
  SharedAccessibilityProps,
} from '@cbhq/cds-common/types';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { isDevelopment } from '@cbhq/cds-utils';

import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box } from '../layout/Box';
import type { DangerouslySetStyle } from '../types';

import { IconOutline } from './IconOutline';

export type IconProps = IconBaseProps & {
  /** Color of the icon when used as a foreground. */
  color?: PaletteForeground;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string | Animated.AnimatedInterpolation<string>;
} & DangerouslySetStyle<TextStyle> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

export const Icon = memo(function Icon({
  accessibilityLabel,
  accessibilityHint,
  animated = false,
  bordered = false,
  color = 'primary',
  dangerouslySetColor,
  dangerouslySetStyle,
  fallback = null,
  name,
  size,
  testID,
  // Spacing
  spacing,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  spacingVertical,
  spacingHorizontal,
}: IconProps) {
  const TextComponent = animated ? Animated.Text : Text;
  const { wrapperSize, iconSize, sourceSize } = useIconSize(size, bordered);
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
    [finalColor, iconSize],
  );

  const space = useSpacingStyles({
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
  });

  const boxStyles = useMemo(
    () => [space, dangerouslySetStyle].filter(Boolean),
    [dangerouslySetStyle, space],
  );

  const glyphKey = `ui-${name}-${sourceSize}` as const;
  const glyph = glyphMap[glyphKey];

  if (glyph === undefined) {
    if (isDevelopment()) {
      // eslint-disable-next-line no-console
      console.error(
        `Unable to find Icon with name: ${name}. Full internal lookup name is ${glyphKey}`,
      );
    }
    return fallback;
  }

  return (
    <Box animated={animated} dangerouslySetStyle={boxStyles} testID={testID}>
      <Box alignItems="center" justifyContent="center" width={wrapperSize} height={wrapperSize}>
        <TextComponent
          allowFontScaling={false}
          accessible={!!accessibilityLabel}
          accessibilityRole="image"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          style={fontStyles as TextStyle}
        >
          {glyph}
        </TextComponent>
        {bordered && (
          <IconOutline
            animated={animated}
            size={wrapperSize}
            sourceSize={sourceSize}
            color={iconColor}
          />
        )}
      </Box>
    </Box>
  );
});
