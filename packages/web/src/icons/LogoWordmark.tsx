import React, { memo } from 'react';
import { LogoWordmarkParams, useLogoWordmark } from '@cbhq/cds-common/hooks/useLogo';

import { iconStyles } from './iconStyles';

export const LogoWordmark = memo(({ foreground }: LogoWordmarkParams) => {
  const { viewBox, path, color } = useLogoWordmark({ foreground });

  return (
    <svg
      aria-labelledby="Coinbase logo"
      className={iconStyles}
      role="img"
      viewBox={viewBox}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Coinbase logo</title>
      <path d={path} fill={color} />
    </svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
