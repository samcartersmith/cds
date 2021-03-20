import React, { memo } from 'react';

import { useLogoWordmark, LogoWordmarkParams } from '@cbhq/cds-common/hooks/useLogo';
import Svg, { Path } from 'react-native-svg';

const LogoWordmark = memo(({ foreground }: LogoWordmarkParams) => {
  const { viewBox, paths } = useLogoWordmark({ foreground });

  return (
    <Svg viewBox={viewBox}>
      {paths.map((item, i) => (
        <Path key={`logo-wordmark-${i}`} d={item} />
      ))}
    </Svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
