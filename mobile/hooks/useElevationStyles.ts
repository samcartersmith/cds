import { useMemo } from 'react';

import { ElevationLevels, useSpectrum } from '@cbhq/cds-common';
import { Platform, ViewStyle } from 'react-native';

import { getColorFromSpectrumAlias } from '../utils/convertPalette';
import { usePalette } from './usePalette';

export const useElevationStyles = (elevation?: ElevationLevels): ViewStyle | undefined => {
  const palette = usePalette();
  const spectrum = useSpectrum();

  return useMemo(() => {
    if (!elevation) {
      return undefined;
    }

    const styles = Platform.select({
      ios: {
        1: {
          borderWidth: 1,
          borderColor: palette.line,
          shadowColor: getColorFromSpectrumAlias('gray40', spectrum),
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.02,
          shadowRadius: 12,
        },
        2: {
          borderWidth: 1,
          borderColor: palette.line,
          shadowColor: getColorFromSpectrumAlias('gray40', spectrum),
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 24,
        },
      },
      android: {
        1: { elevation: 2 },
        2: { elevation: 8 },
      },
    });

    return styles?.[elevation];
  }, [elevation, spectrum, palette.line]);
};
