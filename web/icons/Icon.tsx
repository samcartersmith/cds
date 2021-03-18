import { forwardRef, memo, cloneElement } from 'react';

import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';
import type { IconProps } from './IconProps';
import { iconStyles } from './iconStyles';
import { useIconPath } from './useIconPath';

export const Icon = memo(
  forwardRef<HTMLDivElement, IconProps>(
    (
      {
        size,
        color = 'primary',
        dangerouslySetColor,
        bordered = false,
        name,
        title,
        labeledBy,
        badge,
        ...props
      },
      ref
    ) => {
      const role = title ? 'img' : 'presentation';
      const { iconSize, wrapperSize } = useIconSize(size, bordered);
      const { paths, viewBox } = useIconPath(iconSize, name);
      const paletteColor = usePalette()[color];
      const finalColor = dangerouslySetColor ?? paletteColor;

      return (
        <Box ref={ref} position="relative" {...props}>
          <div style={{ width: wrapperSize, height: wrapperSize }}>
            <svg
              className={iconStyles}
              xmlns="http://www.w3.org/2000/svg"
              role={role}
              aria-labelledby={labeledBy}
              viewBox={viewBox}
              width={iconSize}
              height={iconSize}
              preserveAspectRatio="none"
            >
              {title ? <title id={labeledBy}>{title}</title> : null}
              {paths.map((item, index) => (
                <path key={`${name}-path-${index}`} d={item} fill={finalColor} />
              ))}
            </svg>
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
