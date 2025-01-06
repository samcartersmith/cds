import { ViewStyle } from 'react-native';
import { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';
import { InteractableBaseProps } from '@cbhq/cds-common2/types/InteractableBaseProps';
import { memoize } from '@cbhq/cds-common2/utils/memoize';

import { Theme } from '../core/theme';

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

function getCacheKey({
  background,
  borderColor,
  borderRadius,
  borderWidth,
  theme,
  elevation,
}: GetInteractableStylesParams) {
  const elevationName = elevation ? `elevation-${elevation}` : 'no-elevation';
  return `${elevationName}-${background}-${borderColor}-${borderRadius}-${borderWidth}`;
}

export const getInteractableStyles = memoize(function getInteractableStyles({
  background,
  borderColor,
  borderRadius,
  borderWidth,
  theme,
  elevation,
}: GetInteractableStylesParams) {
  const borderStyles = getBorderStyles({
    borderColor,
    borderRadius,
    borderWidth,
    elevation,
    theme,
  });

  // TO DO: Elevation and state styles

  const wrapperStyles = {
    static: {
      // ...elevationConfig?.styles,
      ...borderStyles,
      backgroundColor: theme.color[background],
    },
    pressed: {
      // backgroundColor: themeConfig.interactableTokens[background].pressed.backgroundColor,
    },
    disabled: {
      // backgroundColor: themeConfig.interactableTokens[background].disabled.backgroundColor,
    },
  };

  const contentStyles = {
    pressed: {
      // opacity: themeConfig.interactableTokens[background].pressed.contentOpacity
    },
    disabled: {
      // opacity: themeConfig.interactableTokens[background].disabled.contentOpacity,
    },
  };
  return {
    wrapperStyles,
    contentStyles,
  };
},
getCacheKey);
