import { memo } from 'react';

import { useLogoMark, LogoMarkParams } from '@cbhq/cds-common/hooks/useLogo';

import { iconStyles } from '../icons/iconStyles';

export type LogoMarkProps = LogoMarkParams;

export const LogoMark = memo(({ size }: LogoMarkProps) => {
  const { viewBox, width, height, path, color, circle } = useLogoMark({ size });
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
      {circle && (
        <circle
          cx={circle.radius}
          cy={circle.radius}
          r={circle.radius}
          fill={circle.backgroundColor}
        />
      )}
      <path d={path} fill={color} />
    </svg>
  );
});

LogoMark.displayName = 'LogoMark';
