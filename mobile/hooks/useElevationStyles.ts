import { useMemo } from 'react';

import { ElevationLevels } from '@cds/core';
import { usePalette } from '@cds/theme/native';
import { Platform, ViewStyle } from 'react-native';

export const useElevationStyles = (elevation?: ElevationLevels): ViewStyle | undefined => {
  const palette = usePalette();

  return useMemo(() => {
    if (elevation === undefined) {
      return undefined;
    }

    // TODO
    const borderWidth = 1;

    // Must avoid background color for shadows!
    // https://stackoverflow.com/a/59409707
    const styles = Platform.select({
      ios: {
        1: {
          borderWidth,
          borderColor: palette.divider,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.02,
          shadowRadius: 12,
        },
        2: {
          borderWidth,
          borderColor: palette.divider,
          shadowColor: '#000',
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
  }, [palette.divider, elevation]);
};
