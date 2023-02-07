import React, { cloneElement, forwardRef, memo } from 'react';
import { IconBaseProps, PaletteForeground, SharedAccessibilityProps } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';

import { BadgeProps } from './Badge';
import { iconGlyphMap } from './iconGlyphMap';
import { iconStyles } from './iconStyles';

export type IconBaseWebProps = {
  /** Color of the icon when used as a foreground. */
  color?: PaletteForeground | 'currentColor';
  /**
   * @deprecated Use `Icon` paired with `DotCount`/`DotSymbol`/`DotStatusColor` instead.
   *
   * Add a badge to the top right of an icon.
   */
  badge?: React.ReactElement<BadgeProps>;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export const IconBase = memo(
  forwardRef<HTMLDivElement, IconBaseWebProps & IconBaseProps>(
    (
      {
        size,
        color = 'primary',
        dangerouslySetColor,
        // TODO: border not implemented.
        bordered = false,
        name,
        accessibilityLabel,
        badge,
        testID,
        ...props
      },
      ref,
    ) => {
      const { iconSize, wrapperSize } = useIconSize(size, bordered);
      const palette = usePalette();
      const paletteColor = color === 'currentColor' ? color : palette[color];
      const finalColor = dangerouslySetColor ?? paletteColor;
      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

      return (
        <Box position="relative" {...props}>
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
              {iconGlyphMap[name as never][iconSize]}
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

IconBase.displayName = 'Icon';
