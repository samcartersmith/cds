import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { LogoWordmarkParams, useLogoWordmark } from '@cbhq/cds-common/src/hooks/useLogo';

export const LogoWordmark = memo(({ foreground }: LogoWordmarkParams) => {
  const { viewBox, path, color } = useLogoWordmark({ foreground });

  return (
    <Svg viewBox={viewBox}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
