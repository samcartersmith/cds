import React, { memo } from 'react';
import type { FC } from 'react';

import { useIconSize } from '@cbhq/cds-common';

import { Box } from '../Box/Box';
import { usePalette } from '../hooks/usePalette';
import type { IconProps } from './IconProps';
import { iconStyles } from './iconStyles';
import { useIconPath } from './useIconPath';

export const Icon: FC<IconProps> = memo(
  ({
    size,
    color = 'primary',
    dangerouslySetColor,
    bordered = false,
    name,
    title,
    titleId,
    ...props
  }) => {
    const role = title ? 'img' : 'presentation';
    const { iconSize, wrapperSize } = useIconSize(size, bordered);
    const { paths, viewBox } = useIconPath(iconSize, name);
    const paletteColor = usePalette()[color];
    const finalColor = dangerouslySetColor ?? paletteColor;

    return (
      <Box position="relative" width={wrapperSize} height={wrapperSize} {...props}>
        <svg
          className={iconStyles}
          xmlns="http://www.w3.org/2000/svg"
          role={role}
          aria-labelledby={titleId}
          viewBox={viewBox}
          width={iconSize}
          height={iconSize}
          preserveAspectRatio="none"
        >
          {title ? <title id={titleId}>{title}</title> : null}
          {paths.map((item, index) => (
            <path key={`${name}-path-${index}`} d={item} fill={finalColor} />
          ))}
        </svg>
      </Box>
    );
  }
);

Icon.displayName = 'Icon';
