import React, { memo } from 'react';

import { useLogoWordmark, LogoWordmarkParams } from '@cbhq/cds-common/hooks/useLogo';
import Svg, { Path } from 'react-native-svg';

export const LogoWordmark = memo(({ foreground }: LogoWordmarkParams) => {
  const { viewBox, path } = useLogoWordmark({ foreground });

  return (
    <Svg viewBox={viewBox}>
      <Path d={path} />
    </Svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
