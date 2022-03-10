import React, { memo } from 'react';
import { LogoMarkParams, useLogoMark } from '@cbhq/cds-common/hooks/useLogo';

import { iconStyles } from './iconStyles';

export type LogoMarkProps = LogoMarkParams;

export const LogoMark = memo(({ size }: LogoMarkProps) => {
  const { viewBox, width, height, path, color } = useLogoMark({ size });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="Coinbase logo"
      viewBox={viewBox}
      width={width}
      height={height}
      className={iconStyles}
    >
      <title>Coinbase logo</title>
      <path d={path} fill={color} />
    </svg>
  );
});

LogoMark.displayName = 'LogoMark';
