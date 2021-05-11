import React, { forwardRef, memo, cloneElement } from 'react';

import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';
import { visuallyHidden } from '../styles/visuallyHidden';
import { iconGlyphMap } from './iconGlyphMap';
import type { IconProps } from './IconProps';
import { iconStyles } from './iconStyles';

export const Icon = memo(
  forwardRef<HTMLDivElement, IconProps>(
    (
      {
        size,
        color = 'primary',
        dangerouslySetColor,
        // TODO: border not implemented.
        bordered = false,
        name,
        title,
        labeledBy,
        badge,
        testID,
        ...props
      },
      ref
    ) => {
      const role = title ? 'img' : 'presentation';
      const { iconSize, wrapperSize } = useIconSize(size, bordered);
      const palette = usePalette();
      const paletteColor = color === 'currentColor' ? color : palette[color];
      const finalColor = dangerouslySetColor ?? paletteColor;

      return (
        <Box ref={ref} position="relative" {...props}>
          <div data-testid={testID} style={{ width: wrapperSize, height: wrapperSize }}>
            <span
              className={iconStyles}
              style={{ color: finalColor, fontSize: iconSize }}
              role={role}
              aria-labelledby={labeledBy}
            >
              {iconGlyphMap[name][iconSize]}
            </span>
            {title ? (
              <span id={labeledBy} className={visuallyHidden}>
                {title}
              </span>
            ) : null}
            {badge &&
              cloneElement(badge, {
                position: 'absolute',
                top: '-45%',
                right: '-50%',
              })}
          </div>
        </Box>
      );
    }
  )
);

Icon.displayName = 'Icon';
