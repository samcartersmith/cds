import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { LogoWordmarkParams, useLogoWordmark } from '@cbhq/cds-common2/hooks/useLogo';

import { useTheme } from '../hooks/useTheme';

export const LogoWordmark = memo(({ foreground }: Omit<LogoWordmarkParams, 'colorScheme'>) => {
  const { colorScheme } = useTheme();
  const { viewBox, path, color } = useLogoWordmark({ foreground, colorScheme });

  return (
    <Svg viewBox={viewBox}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
