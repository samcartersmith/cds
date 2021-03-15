import React, { memo } from 'react';

import { useLogoMark, LogoMarkParams } from '@cbhq/cds-common/hooks/useLogo';
import Svg, { Circle, Path } from 'react-native-svg';

export const LogoMark = memo(({ size }: LogoMarkParams) => {
  const { viewBox, width, height, path, color, circle } = useLogoMark({ size });
  return (
    <Svg viewBox={viewBox} width={width} height={height}>
      {circle && (
        <Circle
          cx={circle.radius}
          cy={circle.radius}
          r={circle.radius}
          fill={circle.backgroundColor}
        />
      )}
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoMark.displayName = 'LogoMark';
