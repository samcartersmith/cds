import { ViewStyle } from 'react-native';
import { getBlendedColor } from '@cbhq/cds-common2/color/getBlendedColor';
import { accessibleOpacityDisabled, opacityPressed } from '@cbhq/cds-common2/tokens/interactable';
import { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';

import { type Theme } from '../core/theme';

export type InteractableStyles = {
  staticStyles: ViewStyle;
  pressedStyles: ViewStyle;
  disabledStyles: ViewStyle;
  contentStyles: {
    pressed: ViewStyle;
    disabled: ViewStyle;
  };
};

export type GetInteractableStylesParams = {
  theme: Theme;
  background: string;
  pressedBackground?: string;
  disabledBackground?: string;
  elevation?: ElevationLevels;
};

export const getInteractableStyles = ({
  theme,
  background,
  pressedBackground,
  disabledBackground,
}: GetInteractableStylesParams) => {
  /**
   * Apply an interactive background style. Blend the color with the background or backgroundInverse values
   */
  const wrapperStyles = {
    base: {
      backgroundColor: background,
    },
    pressed: {
      backgroundColor: getBlendedColor({
        color: pressedBackground ?? background,
        opacity: opacityPressed[100],
        colorScheme: theme.colorScheme,
      }),
    },
    disabled: {
      backgroundColor: getBlendedColor({
        color: disabledBackground ?? background,
        opacity: accessibleOpacityDisabled,
        colorScheme: theme.colorScheme,
        isDisabled: true,
      }),
    },
  };

  const contentStyles = {
    pressed: {
      opacity: opacityPressed[100],
    },
    disabled: {
      opacity: accessibleOpacityDisabled,
    },
  };
  return {
    wrapperStyles,
    contentStyles,
  };
};
