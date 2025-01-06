import React, { memo } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import {
  SubBrandLogoMarkParams,
  useSubBrandLogoMark,
} from '@cbhq/cds-common2/hooks/useSubBrandLogo';

import { useColorScheme } from '../hooks/useColorScheme';

export type SubBrandLogoMarkProps = SubBrandLogoMarkParams;

export const SubBrandLogoMark = memo((props: Omit<SubBrandLogoMarkProps, 'colorScheme'>) => {
  const colorScheme = useColorScheme();
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoMark({
    ...props,
    colorScheme,
  });

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
