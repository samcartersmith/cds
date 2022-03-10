import React, { memo } from 'react';

import Svg, { Path, G } from 'react-native-svg';
import {
  SubBrandLogoMarkParams,
  useSubBrandLogoMark,
} from '@cbhq/cds-common/hooks/useSubBrandLogo';

export type SubBrandLogoMarkProps = SubBrandLogoMarkParams;

export const SubBrandLogoMark = memo((props: SubBrandLogoMarkProps) => {
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoMark(props);

  return (
    <Svg viewBox={viewBox}>
      <G>
        <Path d={logoPath} fill={logoColor} />
        <Path d={typePath} fill={typeColor} />
      </G>
    </Svg>
  );
});

SubBrandLogoMark.displayName = 'SubBrandLogoMark';
