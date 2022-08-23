import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { LogoMarkParams, useLogoMark } from '@cbhq/cds-common/hooks/useLogo';

export const LogoMark = memo(({ size, foreground }: LogoMarkParams) => {
  const { viewBox, width, height, path, color } = useLogoMark({ size, foreground });

  return (
    <Svg viewBox={viewBox} width={width} height={height}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoMark.displayName = 'LogoMark';
