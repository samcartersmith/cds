import React, { memo } from 'react';

import { useLogoWordmark, LogoWordmarkParams } from '@cbhq/cds-common/hooks/useLogo';

import { iconStyles } from './iconStyles';

export const LogoWordmark = memo(({ foreground }: LogoWordmarkParams) => {
  const { viewBox, path, color } = useLogoWordmark({ foreground });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="Coinbase logo"
      viewBox={viewBox}
      className={iconStyles}
    >
      <title>Coinbase logo</title>
      <path d={path} fill={color} />
    </svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
