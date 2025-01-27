import { ViewStyle } from 'react-native';
import * as d3Color from 'd3-color';
import { blendColors } from '@cbhq/cds-common2/color/blendColors';
import { type ThemeVars } from '@cbhq/cds-common2/core/theme';
import {
  accessibleOpacityDisabled,
  highHueBackgrounds,
  opacityPressed,
} from '@cbhq/cds-common2/tokens/interactable';
import { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';
import { InteractableBaseProps } from '@cbhq/cds-common2/types/InteractableBaseProps';
import { memoize } from '@cbhq/cds-common2/utils/memoize';

import { Theme } from '../core/theme';

import { getBorderStyles } from './getBorderStyles';
import { getElevationStyles } from './getElevationStyles';

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
  elevation,
  theme,
}: GetInteractableStylesParams) {
  const elevationName = elevation ? `elevation-${elevation}` : 'no-elevation';
  return `${theme.colorScheme}-${elevationName}-${background}-${borderColor}-${borderRadius}-${borderWidth}`;
}

const blendBackgroundColor = ({
  background,
  theme,
  isDisabledState = false,
}: {
  background: ThemeVars.Color;
  theme: Theme;
  isDisabledState?: boolean;
}) => {
  const d3BackgroundColor = d3Color.color(theme.color[background]);
  // If the background is 'currentColor', we are unable to blend it with the theme background
  if (background === 'currentColor' || d3BackgroundColor === null) return undefined;

  // TO DO: use D3 color to determine if the background is a high hue color?
  const isHighHue = highHueBackgrounds.includes(background);
  const underlayColor = theme.color[isHighHue ? 'background' : 'backgroundInverse'];
  const disabledOverlayColor = d3BackgroundColor.copy({ opacity: accessibleOpacityDisabled });
  // TO DO: use 0.92 for now until we can get the hue value of the background color in the theme
  const pressedOverlayColor = d3BackgroundColor.copy({ opacity: opacityPressed[0] });

  if (isDisabledState) {
    return blendColors({
      underlayColor: theme.color.background,
      overlayColor: disabledOverlayColor,
    });
  }

  return blendColors({ underlayColor, overlayColor: pressedOverlayColor });
};

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

  const elevationStyles = getElevationStyles(elevation ?? 0, theme, background);

  /**
   * Apply an interactive background style.
   * Use the corresponding state color if available in theme;
   * if not, blend the color with the theme background or backgroundInverse values
   */
  const wrapperStyles = {
    static: {
      backgroundColor: theme.color[background],
      ...borderStyles,
      ...elevationStyles,
    },
    pressed: {
      backgroundColor:
        `${background}Pressed` in theme.color
          ? theme.color[`${background}Pressed` as ThemeVars.Color]
          : blendBackgroundColor({ background, theme }),
    },
    disabled: {
      backgroundColor:
        `${background}Disabled` in theme.color
          ? theme.color[`${background}Disabled` as ThemeVars.Color]
          : blendBackgroundColor({ background, theme, isDisabledState: true }),
    },
  };

  const contentStyles = {
    pressed: {
      // TO DO: use 0.92 for now until we can get the hue value of the background color in the theme
      opacity: opacityPressed[0],
    },
    disabled: {
      opacity: accessibleOpacityDisabled,
    },
  };
  return {
    wrapperStyles,
    contentStyles,
  };
},
getCacheKey);
