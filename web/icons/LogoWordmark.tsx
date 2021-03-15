import React, { memo } from 'react';

import { useLogoWordmark, LogoWordmarkParams } from '@cbhq/cds-common/hooks/useLogo';

import { iconStyles } from '../icons/iconStyles';

const LogoWordmark = memo(({ foreground }: LogoWordmarkParams) => {
  const { viewBox, paths } = useLogoWordmark({ foreground });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="Coinbase logo"
      viewBox={viewBox}
      className={iconStyles}
    >
      <title>Coinabse logo</title>
      {paths.map((item, i) => (
        <path key={`logo-wordmark-${i}`} d={item} />
      ))}
    </svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
