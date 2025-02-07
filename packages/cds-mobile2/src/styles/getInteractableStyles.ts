import { ViewStyle } from 'react-native';
import { getBlendedBackgroundColor } from '@cbhq/cds-common2/color/getBlendedBackgroundColor';
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
   * Apply an interactive background style. Blend the color with the background or backgroundInverse values
   */
  const wrapperStyles = {
    static: {
      backgroundColor: theme.color[background],
      ...borderStyles,
      ...elevationStyles,
    },
    pressed: {
      backgroundColor: getBlendedBackgroundColor({
        background,
        themeColor: theme.color,
        opacity: opacityPressed[100],
        colorScheme: theme.colorScheme,
      }),
    },
    disabled: {
      backgroundColor: getBlendedBackgroundColor({
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
