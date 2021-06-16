import { useMemo } from 'react';

import { BorderedStyles, ElevationLevels } from '@cbhq/cds-common';
import { borderRadius as borderRadii } from '@cbhq/cds-common/tokens/border';
import { ViewStyle } from 'react-native';

import { usePalette } from './usePalette';

export const useBorderStyles = ({
  bordered,
  borderedTop,
  borderedBottom,
  borderedStart,
  borderedEnd,
  borderedHorizontal,
  borderedVertical,
  borderRadius,
  elevation,
}: BorderedStyles & { elevation?: ElevationLevels }): ViewStyle => {
  const palette = usePalette();

  return useMemo(() => {
    const styles: ViewStyle = {};

    if (borderRadius) {
      styles.borderRadius = borderRadii[borderRadius];
    }

    // When elevating, always apply a border
    if (elevation) {
      styles.borderWidth = 1;

      return styles;
    }

    if (bordered !== undefined) {
      styles.borderWidth = bordered ? 1 : 0;
    }

    if (borderedVertical !== undefined) {
      styles.borderTopWidth = borderedVertical ? 1 : 0;
      styles.borderBottomWidth = borderedVertical ? 1 : 0;
    }

    if (borderedHorizontal !== undefined) {
      styles.borderStartWidth = borderedHorizontal ? 1 : 0;
      styles.borderEndWidth = borderedHorizontal ? 1 : 0;
    }

    if (borderedTop !== undefined) {
      styles.borderTopWidth = borderedTop ? 1 : 0;
    }

    if (borderedBottom !== undefined) {
      styles.borderBottomWidth = borderedBottom ? 1 : 0;
    }

    if (borderedStart !== undefined) {
      styles.borderStartWidth = borderedStart ? 1 : 0;
    }

    if (borderedEnd !== undefined) {
      styles.borderEndWidth = borderedEnd ? 1 : 0;
    }

    if (Object.keys(styles).length > (borderRadius ? 1 : 0)) {
      styles.borderColor = palette.line;
    }

    return styles;
  }, [
    elevation,
    bordered,
    borderedVertical,
    borderedHorizontal,
    borderedTop,
    borderedBottom,
    borderedStart,
    borderedEnd,
    borderRadius,
    palette.line,
  ]);
};
