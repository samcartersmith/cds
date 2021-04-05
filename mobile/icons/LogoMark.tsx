import React, { memo } from 'react';

import { useLogoMark, LogoMarkParams } from '@cbhq/cds-common/hooks/useLogo';
import Svg, { Path } from 'react-native-svg';

export const LogoMark = memo(({ size }: LogoMarkParams) => {
  const { viewBox, width, height, path, color } = useLogoMark({ size });
  return (
    <Svg viewBox={viewBox} width={width} height={height}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoMark.displayName = 'LogoMark';
