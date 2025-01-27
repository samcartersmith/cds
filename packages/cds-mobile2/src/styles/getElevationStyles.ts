import { ViewStyle } from 'react-native';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';
import { memoize } from '@cbhq/cds-common2/utils/memoize';

import { Theme } from '../core/theme';

function getCacheKey(elevation: ElevationLevels, theme: Theme, background?: ThemeVars.Color) {
  return `${elevation ? `elevation-${elevation}` : 'no-elevation'}-${
    theme.colorScheme
  }-${background}`;
}

export const getElevationStyles = memoize(
  (elevation: ElevationLevels, theme: Theme, background?: ThemeVars.Color): ViewStyle => {
    // Only override background color when background props is `background` or undefined.
    // This means no custom background color is applied, so should use elevation background color.
    const elevationStyles: Record<ElevationLevels, ViewStyle> = {
      0: {},
      1: {
        elevation: 2,
        ...(background === 'background' || background === undefined
          ? { backgroundColor: theme.color.backgroundElevation1 }
          : {}),
        ...theme.shadow.elevation1,
      },
      2: {
        elevation: 8,
        ...(background === 'background' || background === undefined
          ? { backgroundColor: theme.color.backgroundElevation2 }
          : {}),
        ...theme.shadow.elevation2,
      },
    };
    return elevationStyles[elevation];
  },
  getCacheKey,
);
