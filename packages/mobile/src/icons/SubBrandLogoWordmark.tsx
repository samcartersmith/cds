import React, { memo } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import {
  SubBrandLogoWordmarkParams,
  useSubBrandLogoWordmark,
} from '@cbhq/cds-common/src/hooks/useSubBrandLogo';

export type SubBrandLogoWordmarkProps = SubBrandLogoWordmarkParams;

export const SubBrandLogoWordmark = memo((props: SubBrandLogoWordmarkProps) => {
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoWordmark(props);

  return (
    <Svg viewBox={viewBox}>
      <G>
        <Path d={logoPath} fill={logoColor} />
        <Path d={typePath} fill={typeColor} />
      </G>
    </Svg>
  );
});

SubBrandLogoWordmark.displayName = 'SubBrandLogoWordmark';
