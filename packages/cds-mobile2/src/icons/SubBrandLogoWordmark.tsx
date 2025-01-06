import React, { memo } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import {
  SubBrandLogoWordmarkParams,
  useSubBrandLogoWordmark,
} from '@cbhq/cds-common2/hooks/useSubBrandLogo';

import { useColorScheme } from '../hooks/useColorScheme';

export type SubBrandLogoWordmarkProps = SubBrandLogoWordmarkParams;

export const SubBrandLogoWordmark = memo(
  (props: Omit<SubBrandLogoWordmarkProps, 'colorScheme'>) => {
    const colorScheme = useColorScheme();
    const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoWordmark({
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
  },
);

SubBrandLogoWordmark.displayName = 'SubBrandLogoWordmark';
