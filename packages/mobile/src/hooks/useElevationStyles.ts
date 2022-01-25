import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { ElevationLevels } from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { elevation as elevationTokens } from '@cbhq/cds-common/tokens/elevation';

import { useElevationBorderColor } from './useElevationBorderColor';
import { useElevationBorderWidth } from './useElevationBorderWidth';

export const useElevationStyles = (elevation?: ElevationLevels): ViewStyle | undefined => {
  const elevationBorderColor = useElevationBorderColor();
  const elevationBorderWidth = useElevationBorderWidth();

  return useMemo(() => {
    if (!elevation) {
      return undefined;
    }

    const sharedStyles: ViewStyle = {};

    if (elevationBorderWidth) {
      sharedStyles.borderWidth = borderWidth[elevationBorderWidth];
    }

    if (elevationBorderColor) {
      sharedStyles.borderColor = elevationBorderColor;
    }

    const levels = {
      1: {
        elevation: 2,
        ...sharedStyles,
        ...elevationTokens[1],
      },
      2: {
        elevation: 8,
        ...sharedStyles,
        ...elevationTokens[2],
      },
    };

    return levels?.[elevation];
  }, [elevation, elevationBorderColor, elevationBorderWidth]);
};
