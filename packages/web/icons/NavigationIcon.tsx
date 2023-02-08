import React, { cloneElement, forwardRef, memo } from 'react';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import type { SharedAccessibilityProps } from '@cbhq/cds-common/types';
import { NavigationBaseIconProps } from '@cbhq/cds-common/types/NavigationBaseIconProps';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { isDevelopment } from '@cbhq/cds-utils';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';

import { BadgeProps } from './Badge';
import { iconStyles } from './iconStyles';

export type { NavigationIconName, NavigationIconSize } from '@cbhq/cds-common/types';

export type NavigationIconProps = NavigationBaseIconProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /**
     * @deprecated - use Icon paired with DotCount/DotSymbol/DotStatusColor instead
     * Add a badge to the top right of an icon
     */
    badge?: React.ReactElement<BadgeProps>;
  };

export const NavigationIcon = memo(
  forwardRef<HTMLDivElement, NavigationIconProps>(
    (
      {
        accessibilityLabel,
        active = false,
        badge,
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
      },
      ref,
    ) => {
      const { wrapperSize, iconSize, sourceSize } = useIconSize(size);
      const iconColor = usePalette()[active ? 'primary' : 'foreground'];
      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

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
              style={{ color: iconColor, fontSize: iconSize }}
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
