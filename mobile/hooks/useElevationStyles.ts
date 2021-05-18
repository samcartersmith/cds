import { useMemo } from 'react';

import { ElevationLevels } from '@cbhq/cds-common';
import { ViewStyle } from 'react-native';

export const useElevationStyles = (elevation?: ElevationLevels): ViewStyle | undefined => {
  return useMemo(() => {
    if (!elevation) {
      return undefined;
    }

    const sharedStyles = {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
    } as const;

    const levels = {
      1: {
        shadowOpacity: 0.02,
        shadowRadius: 12,
        elevation: 2,
        ...sharedStyles,
      },
      2: {
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 8,
        ...sharedStyles,
      },
    };

    return levels?.[elevation];
  }, [elevation]);
};
