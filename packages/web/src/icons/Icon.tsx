import React, { forwardRef, memo } from 'react';
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

import { iconStyles } from './iconStyles';

export type IconProps = IconBaseProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Color of the icon when used as a foreground. */
    color?: PaletteForeground | 'currentColor';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
  };

export const Icon = memo(
  forwardRef<HTMLDivElement, IconProps>(
    (
      {
        accessibilityLabel,
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
          spacingBottom={spacingBottom}
          spacingEnd={spacingEnd}
          spacingHorizontal={spacingHorizontal}
          spacingStart={spacingStart}
          spacingTop={spacingTop}
          spacingVertical={spacingVertical}
        >
          <div data-testid={testID} style={{ width: wrapperSize, height: wrapperSize }}>
            <span
              ref={ref}
              aria-hidden={!accessibilityLabel}
              aria-label={accessibilityLabel}
              className={iconStyles}
              data-icon-name={name}
              data-testid={glyphTestId}
              role="img"
              style={{ color: finalColor, fontSize: iconSize }}
              title={accessibilityLabel}
            >
              {glyph}
            </span>
          </div>
        </Box>
      );
    },
  ),
);

export type { IconName, IconSize } from '@cbhq/cds-common/types';
