import React, { cloneElement, forwardRef, memo } from 'react';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import type {
  IconBaseProps,
  PaletteForeground,
  SharedAccessibilityProps,
} from '@cbhq/cds-common/types';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { isDevelopment } from '@cbhq/cds-utils';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';

import type { BadgeProps } from './Badge';
import { iconStyles } from './iconStyles';

export type { IconName, IconSize } from '@cbhq/cds-common/types';

export type IconProps = IconBaseProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Color of the icon when used as a foreground. */
    color?: PaletteForeground | 'currentColor';
    /**
     * @deprecated - use Icon paired with DotCount/DotSymbol/DotStatusColor instead
     * Add a badge to the top right of an icon
     */
    badge?: React.ReactElement<BadgeProps>;
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
  };

export const Icon = memo(
  forwardRef<HTMLDivElement, IconProps>(
    (
      {
        accessibilityLabel,
        badge,
        // TODO: border not implemented.
        bordered = false,
        color = 'primary',
        dangerouslySetColor,
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
      },
      ref,
    ) => {
      const { iconSize, wrapperSize, sourceSize } = useIconSize(size, bordered);
      const palette = usePalette();
      const paletteColor = color === 'currentColor' ? color : palette[color];
      const finalColor = dangerouslySetColor ?? paletteColor;
      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

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
        <Box
          position="relative"
          spacing={spacing}
          spacingTop={spacingTop}
          spacingBottom={spacingBottom}
          spacingStart={spacingStart}
          spacingEnd={spacingEnd}
          spacingVertical={spacingVertical}
          spacingHorizontal={spacingHorizontal}
        >
          <div data-testid={testID} style={{ width: wrapperSize, height: wrapperSize }}>
            <span
              ref={ref}
              className={iconStyles}
              style={{ color: finalColor, fontSize: iconSize }}
              role="img"
              aria-label={accessibilityLabel}
              aria-hidden={!accessibilityLabel}
              title={accessibilityLabel}
              data-icon-name={name}
              data-testid={glyphTestId}
            >
              {glyph}
            </span>
            {badge &&
              cloneElement(badge, {
                position: 'absolute',
                top: '-45%',
                right: '-50%',
              })}
          </div>
        </Box>
      );
    },
  ),
);
