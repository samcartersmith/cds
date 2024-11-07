import React, { memo } from 'react';
import { LogoMarkParams, useLogoMark } from '@cbhq/cds-common/hooks/useLogo';

import { iconStyles } from './iconStyles';

export type LogoMarkProps = LogoMarkParams;

export const LogoMark = memo(({ size, foreground }: LogoMarkProps) => {
  const { viewBox, width, height, path, color } = useLogoMark({ size, foreground });

  return (
    <svg
      aria-label="Coinbase logo"
      className={iconStyles}
      height={height}
      role="img"
      viewBox={viewBox}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Coinbase logo</title>
      <path d={path} fill={color} />
    </svg>
  );
});

LogoMark.displayName = 'LogoMark';
