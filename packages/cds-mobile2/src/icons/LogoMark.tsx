import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { LogoMarkParams, useLogoMark } from '@cbhq/cds-common2/hooks/useLogo';

import { useColorScheme } from '../hooks/useColorScheme';

export const LogoMark = memo(({ size, foreground }: Omit<LogoMarkParams, 'colorScheme'>) => {
  const colorScheme = useColorScheme();
  const { viewBox, width, height, path, color } = useLogoMark({ size, foreground, colorScheme });

  return (
    <Svg height={height} viewBox={viewBox} width={width}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoMark.displayName = 'LogoMark';
