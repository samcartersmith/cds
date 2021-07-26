import React, { forwardRef, memo, cloneElement } from 'react';

import { IconBaseProps, PaletteForeground } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';
import { visuallyHidden } from '../styles/visuallyHidden';
import { BadgeProps } from './Badge';
import { iconGlyphMap } from './iconGlyphMap';
import { iconStyles } from './iconStyles';

export interface IconBaseWebProps {
  /** Color of the icon when used as a foreground. */
  color?: PaletteForeground | 'currentColor';
  /**
   * Give the icon a description. It will show up in a tooltip after hovering over the icon for 3s.
   * This is a default browser feature and very helpful to users to understand what the icon does.
   */
  title?: string;
  /**
   * If the icon is labelled by an independent element, then provide that element's id. This is
   * used to set the aria-labelledby value on the icon. If the `title` prop is also provided,
   * then `labeledBy` will be used to set the id on the `<title>` element.
   */
  labeledBy?: string;
  /**
   * Add a badge to the top right of an icon
   */
  badge?: React.ReactElement<BadgeProps>;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
}

export const IconBase = memo(
  forwardRef<HTMLDivElement, IconBaseWebProps & IconBaseProps>(
    (
      {
        size = 'm',
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
      ref,
    ) => {
      const role = title ? 'img' : 'presentation';
      const { iconSize, wrapperSize } = useIconSize(size, bordered);
      const palette = usePalette();
      const paletteColor = color === 'currentColor' ? color : palette[color];
      const finalColor = dangerouslySetColor ?? paletteColor;

      return (
        <Box position="relative" {...props}>
          <div data-testid={testID} style={{ width: wrapperSize, height: wrapperSize }}>
            <span
              ref={ref}
              className={iconStyles}
              style={{ color: finalColor, fontSize: iconSize }}
              role={role}
              aria-labelledby={labeledBy}
              data-icon-name={name}
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
    },
  ),
);

IconBase.displayName = 'Icon';
