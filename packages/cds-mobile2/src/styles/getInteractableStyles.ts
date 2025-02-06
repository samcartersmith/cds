import { ViewStyle } from 'react-native';
import { getBlendedBackgroundColor } from '@cbhq/cds-common2/color/getBlendedBackgroundColor';
import { type ThemeVars } from '@cbhq/cds-common2/core/theme';
import { accessibleOpacityDisabled, opacityPressed } from '@cbhq/cds-common2/tokens/interactable';
import { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';
import { InteractableBaseProps } from '@cbhq/cds-common2/types/InteractableBaseProps';

import { type Theme } from '../core/theme';
import { getElevationStyles } from '../layout/Box';

import { getBorderStyles } from './getBorderStyles';

export type InteractableStyles = {
  staticStyles: ViewStyle;
  pressedStyles: ViewStyle;
  disabledStyles: ViewStyle;
  contentStyles: {
    pressed: ViewStyle;
    disabled: ViewStyle;
  };
};

export type GetInteractableStylesParams = Pick<
  InteractableBaseProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'elevation'
> & {
  elevation?: ElevationLevels;
  theme: Theme;
};

export const getInteractableStyles = ({
  background,
  borderColor,
  borderRadius,
  borderWidth,
  theme,
  elevation,
}: GetInteractableStylesParams) => {
  const borderStyles = getBorderStyles({
    borderColor,
    borderRadius,
    borderWidth,
    elevation,
    theme,
  });

  const elevationStyles = getElevationStyles(elevation ?? 0, theme, background);

  /**
   * Apply an interactive background style.
   * Use the corresponding state color if available in theme;
   * if not, blend the color with the theme background or bgInverse values
   */
  const wrapperStyles = {
    static: {
      backgroundColor: theme.color[background],
      ...borderStyles,
      ...elevationStyles,
    },
    // TO DO: use 0.82 for opacity until we can get the hue value of the background color in the theme
    pressed: {
      backgroundColor:
        `${background}Pressed` in theme.color
          ? theme.color[`${background}Pressed` as ThemeVars.Color]
          : getBlendedBackgroundColor({
              background,
              themeColor: theme.color,
              opacity: opacityPressed[100],
              colorScheme: theme.colorScheme,
            }),
    },
    disabled: {
      backgroundColor:
        `${background}Disabled` in theme.color
          ? theme.color[`${background}Disabled` as ThemeVars.Color]
          : getBlendedBackgroundColor({
              background,
              themeColor: theme.color,
              opacity: accessibleOpacityDisabled,
              colorScheme: theme.colorScheme,
              isDisabled: true,
            }),
    },
  };

  const contentStyles = {
    pressed: {
      // TO DO: use 0.82 for opacity until we can get the hue value of the background color in the theme
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
